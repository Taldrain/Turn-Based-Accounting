import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from '../../d3';

import { convertAmount, getAmount } from '../../utils/entry';
import {
  getStartDate,
  getEndDate,
  nextDate,
  isDateBefore,
  isDateBetween,
} from '../../utils/date';

class Graph extends React.Component {
  componentDidMount() {
    const svg = d3.select(this.node)
      .append('svg');

    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();
    const line = d3.line();

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
      line,
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

    if (this.props.recurrents.length > 0 || this.props.punctuals.length > 0) {
      this.draw();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recurrents.length !== this.props.recurrents.length
      || prevProps.punctuals.length !== this.props.punctuals.length) {
      this.draw();
    }
  }

  draw() {
    const { date, type } = this.props;
    this.sizes.w = this.node.clientWidth;
    const width = this.sizes.w - this.sizes.margin.left - this.sizes.margin.right;
    const height = this.sizes.h - this.sizes.margin.top - this.sizes.margin.bottom;

    this.el.svg
      .attr('width', this.sizes.w)
      .attr('height', this.sizes.h);

    this.el.mainContainer
      .attr('transform', `translate(${this.sizes.margin.left},${this.sizes.margin.top})`);

    this.el.xScale
      .domain([new Date(getStartDate(date, type)), new Date(getEndDate(date, type))])
      .range([0, width]);

    // TODO
    const amountsPerDate = {};
    let cnt = getStartDate(date, type);
    while (isDateBefore(cnt, getEndDate(date, 'day'), 'day')) {
      amountsPerDate[cnt] = ({ x: cnt, punctual: 0, recurrent: 0 });
      cnt = nextDate(cnt, 'day');
    }

    this.props.punctuals.forEach((punctual) => {
      if (punctual.date in amountsPerDate) {
        amountsPerDate[punctual.date].punctual += getAmount(punctual);
      } else {
        console.error('untracked date: ', punctual);
      }
    });

    const values = Object.values(amountsPerDate).map((i) => {
      const res = Object.assign({}, i);

      this.props.recurrents.forEach((recurrent) => {
        if (isDateBetween(recurrent.startDate, recurrent.endDate, res.x, 'day')) {
          res.recurrent += getAmount(convertAmount(recurrent, res.x, 'day'), 'computedAmount');
        }
      });

      return res;
    });


    // TODO check automatic increase
    const yExtent = d3.extent(
      [].concat(d3.extent(values, i => i.recurrent), d3.extent(values, i => i.punctual)),
    );
    const yRange = yExtent[1] - yExtent[0];

    this.el.yScale
      .domain([yExtent[0] - (yRange * 0.1), yExtent[1] + (yRange * 0.1)])
      .rangeRound([height, 0]);

    this.el.line
      .x(d => this.el.xScale(new Date(d.x)));

    this.el.xContainer
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(this.el.xScale).ticks(d3.timeDay.every(1)));

    this.el.yContainer
      .call(d3.axisLeft(this.el.yScale));

    this.el.lineRecurrentContainer
      .datum(values)
      .transition()
      .duration(300)
      .attr('d', this.el.line.y(d => this.el.yScale(d.recurrent)));

    this.el.linePunctualContainer
      .datum(values)
      .transition()
      .duration(300)
      .attr('d', this.el.line.y(d => this.el.yScale(d.punctual)));

    this.el.lineSumContainer
      .datum(values)
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
  punctuals: PropTypes.arrayOf(PropTypes.object).isRequired,
  recurrents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Graph;
