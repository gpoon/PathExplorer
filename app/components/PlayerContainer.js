import React from 'react';
import d3 from 'd3';
import d3_queue from 'd3-queue';

import ModalOverlay from './ModalComponents/ModalOverlay';
import PathContainer from './PathContainer';

export default class PlayerContainer extends React.Component{
  constructor(props) {
    super(props);
    this._contentWidth = window.innerWidth * 0.6667;
    this.state = {
      player: 'Marc Gasol',
      allData: null,
      tooltipState: document.cookie.indexOf('visitedPathExplorer') >= 0 ? 8 : 9
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
    var path = './data/marc_compressed_combined.json';
    d3_queue.queue()
      .defer(d3.json, path)
      .await(function(err, json) {
        var data = json.map(function(d) {
          d.p = this.scalePath(this._contentWidth, d.p);
          return d;
        }.bind(this))
        this.setState({allData: data});

        if (this.state.tooltipState === 9) {
          setTimeout(function() {
            this.setState({tooltipState: 0})
          }.bind(this), 5000);
        }

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
      case 0:
        if (x === 12 && y === 5) {
          this.incrementTooltipState(3500);
        }
        break;
      case 1:
      case 2:
        if (x === 17 && y === 2 && shiftDown) {
         this.incrementTooltipState(3000); 
        }
        break;
      default:
        break;
    }
  }

  incrementTooltipState(delay) {
    var curState = this.state.tooltipState;
    this.setState({tooltipState: 9});
    setTimeout(function() {
      this.setState({tooltipState: curState + 1});
    }.bind(this), delay);
  }

  render() {
    const overlay = this.state.tooltipState === 8 ? false : <ModalOverlay />
    return (
      <div className="player-container container-fluid">
        {overlay}
        <PathContainer
          width={this._contentWidth}
          player={this.state.player}
          allData={this.state.allData}
          triggerPlayerChange={this.triggerPlayerChange}
          tooltipState={this.state.tooltipState}
          handleTooltipClick={this.handleTooltipClick} />
      </div>
    )
  }
}
