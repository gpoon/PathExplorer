import React from 'react';
import d3 from 'd3';
import d3_queue from 'd3-queue';

import ModalOverlay from './ModalComponents/ModalOverlay';
import PathContainer from './PathContainer';

export default class PlayerContainer extends React.Component{
  constructor(props) {
    super(props);
    this._contentWidth = window.innerWidth * 8 / 12;
    this.state = {
      player: 'Marc Gasol',
      allData: null,
      tooltipState: document.cookie.indexOf('visitedPathExplorer') > -1 ? 8 : 0
    };

    this.getAllData = this.getAllData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.triggerPlayerChange = this.triggerPlayerChange.bind(this);
    this.handleTooltipClick = this.handleTooltipClick.bind(this);
    this.incrementTooltipState = this.incrementTooltipState.bind(this);

    document.cookie = 'visitedPathExplorer=1';
  }

  scalePath(scale, d) {
    var reM = /M(\d+),(\d+)/;
    var reC = /(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)/;
    var splitStr = d.split("C");
    var newP = 'M' + reM.exec(splitStr[0])
      .slice(1)
      .map(function(d) {
        return Math.round(parseInt(d) * (scale / 9400));
      })
      .join(',');

    for (var i = 1; i < splitStr.length; i++) {
      newP += 'C' + reC.exec(splitStr[i])
        .slice(1)
        .map(function(d) {
          return Math.round(parseInt(d) * (scale / 9400));
        })
        .join(',');
    }
    return newP;
  }

  getAllData() {
    var path = '/static/data/marc_compressed_combined.json';
    d3_queue.queue()
      .defer(d3.json, path)
      .await(function(err, json) {
        var data = json.map(function(d) {
          d.p = this.scalePath(this._contentWidth, d.p);
          return d;
        }.bind(this))
        this.setState({allData: data});

      }.bind(this));
  }

  componentDidMount() {
    this.getAllData();
  }

  triggerPlayerChange(player) {
    this.setState({player: player, allData: null});
    this.getAllData();
  }

  handleTooltipClick(x, y, shiftDown) {
    switch (this.state.tooltipState) {
      case 2:
        if (x === 12 && y === 5) {
          this.incrementTooltipState();
        }
        break;
      case 4:
      case 6:
        if (x === 17 && y === 2 && shiftDown) {
         this.incrementTooltipState();
        }
        break;
      default:
        break;
    }
  }

  incrementTooltipState() {
    var curState = this.state.tooltipState;
    this.setState({tooltipState: curState + 1});
  }

  render() {
    const overlay = (function() {
      switch (this.state.tooltipState) {
        case 8:
          return false;
        default:
          return (
            <ModalOverlay
              tooltipState={this.state.tooltipState}
              incrementTooltipState={this.incrementTooltipState} />
          );
      }
    }.bind(this))();

    return (
      <div className="player-container container-fluid">
        {overlay}
        <PathContainer
          width={this._contentWidth}
          player={this.state.player}
          allData={this.state.allData}
          triggerPlayerChange={this.triggerPlayerChange}
          startTooltip={this.incrementTooltipState}
          tooltipState={this.state.tooltipState}
          handleTooltipClick={this.handleTooltipClick} />
      </div>
    )
  }
}
