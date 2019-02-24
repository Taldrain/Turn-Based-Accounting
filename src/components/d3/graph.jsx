import React from 'react';
import PropTypes from 'prop-types';

import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import {
  timeDay,
  timeWeek,
  timeMonth,
  timeYear,
} from 'd3-time';
import 'd3-transition';

import { convertAmount, getAmount } from '../../utils/entry';
import {
  getStartDate,
  getEndDate,
  nextDate,
  isDateBefore,
  isDateBetween,
} from '../../utils/date';

function d3TimeScale(displayType, type) {
  if (displayType === 'day' && type === 'year') {
    // to avoid displaying to many ticks
    return timeMonth;
  }

  switch (displayType) {
    case 'day':
      return timeDay;
    case 'week':
      return timeWeek;
    case 'month':
      return timeMonth;
    case 'year':
      return timeYear;
    default:
      return timeDay;
  }
}

class Graph extends React.Component {
  componentDidMount() {
    const svg = select(this.node)
      .append('svg');

    const xScale = scaleTime();
    const yScale = scaleLinear();

    const mainContainer = svg.append('g');
    const xContainer = mainContainer.append('g');
    const yContainer = mainContainer.append('g');
    const lineRecurrentContainer = mainContainer.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5);
    const linePunctualContainer = mainContainer.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5);
    const lineSumContainer = mainContainer.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'purple')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5);

    this.el = {
      svg,
      line: line(),
      xScale,
      yScale,
      mainContainer,
      xContainer,
      yContainer,
      lineRecurrentContainer,
      linePunctualContainer,
      lineSumContainer,
    };

    this.sizes = {
      w: 0,
      h: 500,
      margin: {
        top: 5,
        bottom: 20,
        left: 40,
        right: 20,
      },
    };

    this.amountsPerDate = [];

    this.initDraw();
  }

  componentDidUpdate(prevProps) {
    let hasUpdatedRecurrents = false;
    let hasUpdatedPunctuals = false;
    let hasUpdatedType = false;

    if (prevProps.displayType !== this.props.displayType
      || prevProps.date !== this.props.date
      || prevProps.type !== this.props.type
    ) {
      hasUpdatedType = true;
      this.initAmountsPerDate();
    }

    if (prevProps.recurrents.length !== this.props.recurrents.length || hasUpdatedType) {
      hasUpdatedRecurrents = true;
      this.updateWithRecurents();
    }

    if (prevProps.punctuals.length !== this.props.punctuals.length || hasUpdatedType) {
      hasUpdatedPunctuals = true;
      this.updateWithPunctuals();
    }

    if (hasUpdatedPunctuals || hasUpdatedRecurrents) {
      this.draw();
    }
  }

  initAmountsPerDate() {
    const { date, type, displayType } = this.props;
    this.amountsPerDate = [];
    // TODO - why is this TODO
    let cnt = getStartDate(date, type);
    // TODO we could use a range function from moment
    while (isDateBefore(cnt, getEndDate(date, type), 'day')) {
      this.amountsPerDate.push({ x: cnt, punctual: 0, recurrent: 0 });
      cnt = nextDate(cnt, displayType);
    }
  }

  updateWithRecurents() {
    const { amountsPerDate } = this;
    const { displayType } = this.props;

    for (let i = 0; i < amountsPerDate.length; i += 1) {
      amountsPerDate[i].recurrent = 0;
      this.props.recurrents.forEach((recurrent) => {
        if (isDateBetween(
          recurrent.startDate,
          recurrent.endDate,
          amountsPerDate[i].x,
          displayType,
        )) {
          amountsPerDate[i].recurrent += getAmount(convertAmount(recurrent, amountsPerDate[i].x, displayType), 'computedAmount');
        }
      });
    }
  }

  updateWithPunctuals() {
    const { amountsPerDate } = this;
    const { displayType } = this.props;

    for (let i = 0; i < amountsPerDate.length; i += 1) {
      amountsPerDate[0].punctual = 0;
    }

    // TODO need som doc for the two next blocks
    this.props.punctuals.forEach((punctual) => {
      for (let i = 0; i < amountsPerDate.length; i += 1) {
        if ((displayType === 'day' && punctual.date === amountsPerDate[i].x)
          || (isDateBetween(
            getStartDate(amountsPerDate[i].x, displayType),
            getEndDate(amountsPerDate[i].x, displayType),
            punctual.date,
            'day',
          ))) {
          amountsPerDate[i].punctual += getAmount(punctual);
          break;
        }
      }
    });
  }

  initDraw() {
    this.sizes.w = this.node.clientWidth;
    const width = this.sizes.w - this.sizes.margin.left - this.sizes.margin.right;
    const height = this.sizes.h - this.sizes.margin.top - this.sizes.margin.bottom;

    this.el.svg
      .attr('width', this.sizes.w)
      .attr('height', this.sizes.h);

    this.el.mainContainer
      .attr('transform', `translate(${this.sizes.margin.left},${this.sizes.margin.top})`);

    this.el.xScale
      .range([0, width]);

    this.el.yScale
      .rangeRound([height, 0]);

    this.el.xContainer
      .attr('transform', `translate(0,${height})`);

    this.el.line
      .x(d => this.el.xScale(new Date(d.x)));

    this.initAmountsPerDate();

    if (this.props.punctuals.length > 0) {
      this.updateWithPunctuals();
    }

    if (this.props.recurrents.length > 0) {
      this.updateRecurrents();
    }

    if (this.props.recurrents.length > 0 || this.props.punctuals.length > 0) {
      this.draw();
    }
  }

  draw() {
    const { amountsPerDate } = this;
    const { date, type, displayType } = this.props;

    const yExtent = extent(
      [].concat(
        extent(amountsPerDate, i => i.recurrent),
        extent(amountsPerDate, i => i.punctual),
      ),
    );
    const yRange = yExtent[1] - yExtent[0];

    this.el.xScale
      .domain([new Date(getStartDate(date, type)), new Date(getEndDate(date, type))]);

    this.el.yScale
      .domain([yExtent[0] - (yRange * 0.1), yExtent[1] + (yRange * 0.1)]);

    this.el.xContainer
      .call(axisBottom(this.el.xScale).ticks(d3TimeScale(displayType, type).every(1)));

    this.el.yContainer
      .call(axisLeft(this.el.yScale));

    this.el.lineRecurrentContainer
      .datum(amountsPerDate)
      .transition()
      .duration(300)
      .attr('d', this.el.line.y(d => this.el.yScale(d.recurrent)));

    this.el.linePunctualContainer
      .datum(amountsPerDate)
      .transition()
      .duration(300)
      .attr('d', this.el.line.y(d => this.el.yScale(d.punctual)));

    this.el.lineSumContainer
      .datum(amountsPerDate)
      .transition()
      .duration(300)
      .attr('d', this.el.line.y(d => this.el.yScale(d.punctual + d.recurrent)));
  }

  render() {
    return (
      <div
        ref={(node) => {
          this.node = node;
          return undefined;
        }}
      />
    );
  }
}

Graph.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  displayType: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  punctuals: PropTypes.arrayOf(PropTypes.object).isRequired,
  recurrents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Graph;
