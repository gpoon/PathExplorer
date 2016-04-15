import React from 'react';
import d3 from 'd3';
import d3_queue from 'd3-queue';

import ModalOverlay from './ModalComponents/ModalOverlay';
import PathContainer from './PathContainer';

export default class PlayerContainer extends React.Component{
  constructor(props) {
    super(props);
    var visited = document.cookie.indexOf('visitedPathExplorer') > -1;
    this._contentWidth = (window.innerWidth - 17) * 8 / 12;
    this.state = {
      player: 'Stephen Curry',
      allData: visited ? null : [{'off_def':'Off','made':false,'g':['(12,5)','(20,3)','(17,6)','(16,4)','(18,4)','(15,4)','(19,6)','(11,5)','(13,4)','(16,6)','(18,6)','(18,2)','(18,3)','(20,6)','(19,2)','(21,4)','(14,4)','(17,4)','(17,3)','(21,5)','(12,4)'],'p':'M4871,2256C4903,2236,4936,2213,4953,2201C4970,2190,4970,2190,4984,2178C5000,2166,5030,2143,5061,2119C5093,2096,5126,2073,5161,2051C5196,2030,5233,2010,5275,1991C5316,1973,5363,1956,5411,1941C5460,1926,5510,1913,5556,1901C5603,1890,5646,1880,5691,1871C5736,1863,5783,1856,5830,1848C5876,1840,5923,1830,5973,1825C6023,1820,6076,1820,6130,1820C6183,1820,6236,1820,6286,1818C6336,1816,6383,1813,6431,1808C6480,1803,6530,1796,6581,1791C6633,1786,6686,1783,6738,1780C6790,1776,6840,1773,6888,1771C6936,1770,6983,1770,7030,1768C7076,1766,7123,1763,7168,1763C7213,1763,7256,1766,7291,1765C7326,1763,7353,1756,7373,1753C7393,1750,7406,1750,7413,1753C7420,1756,7420,1763,7414,1775C7410,1786,7400,1803,7378,1803C7356,1803,7323,1786,7291,1761C7260,1736,7230,1703,7201,1674C7173,1646,7146,1623,7125,1601C7103,1580,7086,1560,7073,1539C7060,1520,7050,1500,7046,1483C7043,1466,7046,1453,7058,1443C7070,1433,7090,1426,7121,1415C7153,1403,7196,1386,7246,1365C7296,1343,7353,1316,7413,1288C7473,1260,7536,1230,7603,1205C7670,1180,7740,1160,7813,1156C7886,1153,7963,1166,8036,1191C8110,1216,8180,1253,8245,1300C8310,1346,8370,1403,8423,1463C8476,1523,8523,1586,8558,1653C8593,1720,8616,1790,8629,1860C8643,1930,8646,2000,8646,2073C8646,2146,8643,2223,8633,2293C8623,2363,8606,2426,8585,2478C8563,2530,8536,2570,8506,2598C8476,2626,8443,2643,8406,2653C8370,2663,8330,2666,8284,2663C8240,2660,8190,2650,8136,2633C8083,2616,8026,2593,7961,2573C7896,2553,7823,2536,7743,2529C7663,2523,7576,2526,7485,2528C7393,2530,7296,2530,7195,2529','gId':'0021400009','t':1}],
      tooltipState: visited ? 11 : 0,
      initialData: true
    };
    if (!visited) {
      this.state.allData[0].p = this.scalePath(this._contentWidth, this.state.allData[0].p);
    }

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

  getAllData(playerId) {
    var path = 'http://s3-us-west-1.amazonaws.com/sportvucombined/' + playerId + '.json';
    d3_queue.queue()
      .defer(d3.json, path)
      .await(function(err, json) {
        var data = json.map(function(d) {
          d.p = this.scalePath(this._contentWidth, d.p);
          return d;
        }.bind(this))
        this.setState({
          allData: data,
          initialData: false
        });

      }.bind(this));
  }

  componentDidMount() {
    this.getAllData(201939);
  }

  triggerPlayerChange(playerName, playerId) {
    this.setState({player: playerName, allData: null});
    this.getAllData(playerId);
  }

  handleTooltipClick(x, y, shiftDown) {
    switch (this.state.tooltipState) {
      case 3:
        this.incrementTooltipState();
        break;
      case 5:
      case 7:
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
    // For when the data loads slowly
    if (curState === 1 && this.state.initialData) {
      this.setState({
        allData: null,
        initialData: false
      });
    }

    if ([3,5,7].indexOf(curState) > -1) {
      setTimeout(function() {
        this.setState({tooltipState: curState + 1})
      }.bind(this), 600);
    } else {
      this.setState({tooltipState: curState + 1});
    }
  }

  render() {
    const overlay = (function() {
      switch (this.state.tooltipState) {
        case 11:
          return false;
        default:
          return (
            <ModalOverlay
              tooltipState={this.state.tooltipState}
              incrementIntro={this.incrementTooltipState} />
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
          incrementIntro={this.incrementTooltipState}
          tooltipState={this.state.tooltipState}
          handleTooltipClick={this.handleTooltipClick} />
      </div>
    )
  }
}
