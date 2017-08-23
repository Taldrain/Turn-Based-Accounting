import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { connect } from 'react-redux';

import * as d3 from '../../d3';

const Colors = require('../../colors.js');
const TextDisplay = require('../../components/display/text.jsx');

const EntryUtils = require('../../utils/entry.js');
// const AmountUtils = require('../../utils/amount.js');

const margin = {
  top: 20,
  left: 50,
  right: 20,
  bottom: 30,
};

const styles = {
  div: {
    width: '100%',
  },
};

function mapStateToProps(state) {
  const punctual =
    EntryUtils.sortByDate(EntryUtils.listPunctualData(state.punctual));

  const recurrent =
    EntryUtils.sortByDate(EntryUtils.listRecurrentData(state.recurrent, state.punctual));

  // const sum = EntryUtils.computeSumbyDay(punctual, recurrent);

  return ({
    recurrent,
    punctual,
    // sum,
  });
}

class GraphGlobalView extends React.Component {
  componentDidMount() {
    const width = parseInt(this.node.clientWidth, 10) - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .domain(d3.extent(
        d3.extent(this.props.recurrent, i => new Date(i.date)).concat(
          d3.extent(this.props.punctual, i => new Date(i.date))
        )
      ))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(
        d3.extent(this.props.recurrent, i => i.amount).concat(
          d3.extent(this.props.punctual, i => i.amount)
        )
      ))
      .range([height, 0]);

    this.line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.amount));

    this.svg = d3.select(this.node)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.punctual = this.svg.append('path');
    this.recurrent = this.svg.append('path');
    this.sum = this.svg.append('path');

    // x axis
    this.svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // y axis
    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.drawPunctual(this.props.punctual);
    this.drawRecurrent(this.props.recurrent);
    // this.drawSum(this.props.sum);
  }

  drawPunctual(data) {
    this.punctual
      .datum(data)
      .attr('d', this.line)
      .style('stroke', Colors.graphs.punctual);
  }

  drawRecurrent(data) {
    this.recurrent
      .datum(data)
      .attr('d', this.line.curve(d3.curveStepAfter))
      .style('stroke', Colors.graphs.recurrent);
  }

  drawSum(data) {
    this.sum
      .datum(data)
      .attr('d', this.line)
      .style('stroke', Colors.graphs.sum);
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography type="title">
            <TextDisplay value="global.Global view" />
          </Typography>
        </CardContent>
        <CardContent>
          <div
            className="d3-svg"
            style={styles.div}
            ref={(node) => {
              this.node = node;
              return undefined;
            }}
          />
        </CardContent>
      </Card>
    );
  }
}


GraphGlobalView.propTypes = {
  punctual: PropTypes.arrayOf(PropTypes.object).isRequired,
  recurrent: PropTypes.arrayOf(PropTypes.object).isRequired,
  // sum: PropTypes.arrayOf(PropTypes.object).isRequired,
};

module.exports = connect(mapStateToProps)(GraphGlobalView);
