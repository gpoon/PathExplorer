import React from 'react';

import _ from 'underscore';
import Header from './Header';
import StatsContainer from './StatsContainer';

export default class PathContainer extends React.Component{
  constructor(props) {
    super(props);

    this._selectedData = null;
    this._made = 0;
    this._histogramDat = [];
    this.state = {
      offDef: 'Off',
      gridSel: [],
      selectNewPlayer: false
    };

    this.computeSelectedData = this.computeSelectedData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.gridClick = this.gridClick.bind(this);
    this.addGridSel = this.addGridSel.bind(this);
    this.removeGridSel = this.removeGridSel.bind(this);
    this.setGridSel = this.setGridSel.bind(this);
    this.passFilter = this.passFilter.bind(this);
    this.checkGrids = this.checkGrids.bind(this);
    this.getNumPossessions = this.getNumPossessions.bind(this);
    this.getFGPercent = this.getFGPercent.bind(this);
    this.getHistogramData = this.getHistogramData.bind(this);
    this.toggleOffDef = this.toggleOffDef.bind(this);
    this.showPlayerChange = this.showPlayerChange.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
  }
  
  computeSelectedData() {
    this._selectedData = this.props.allData === null ? null : this.filterData();
  }

  filterData() {
    this._made = 0;
    this._histogramDat = [];
    return _.filter(this.props.allData, function(poss) {
      if (this.passFilter(poss)) {
        if (poss.made) this._made += 1;
        this._histogramDat.push(poss.t);
        return true;
      } else {
        return false;
      }
    }.bind(this));
  }

  gridClick(x, y, shiftDown) {
    var coords = '(' + x + ', ' + y + ')';
    if (!shiftDown) {
      this.setGridSel(coords);
    } else {
      if (this.state.gridSel.indexOf(coords) === -1) {
        this.addGridSel(coords);
      } else {
        this.removeGridSel(coords);
      } 
    }
    this.props.handleTooltipClick(x, y, shiftDown);
  }

  addGridSel(coords) {
    var newGridSel = [coords].concat(this.state.gridSel);
    this.setState({gridSel: newGridSel});  
  }

  removeGridSel(coords) {
    var newGridSel = this.state.gridSel.slice();
    var ind = this.state.gridSel.indexOf(coords);
    newGridSel.splice(ind, 1);
    this.setState({gridSel: newGridSel});
  }

  setGridSel(coords) {
    var newGridSel = _.isEqual(this.state.gridSel, [coords]) ? [] : [coords];
    this.setState({gridSel: newGridSel});
  }

  passFilter(poss) {
    return this.state.offDef === poss.off_def && this.checkGrids(poss);
  }

  checkGrids(poss) {
    for (var i = 0; i < this.state.gridSel.length; i++) {
      if (poss.g.indexOf(this.state.gridSel[i]) == -1) {
        return false
      };
    }
    return true;
  }

  getNumPossessions() {
    return (this._selectedData === null) ? null : this._selectedData.length;
  }

  getFGPercent() {
    return (this._selectedData === null) ? null : Math.round(this._made / this._selectedData.length * 100) + '%';
  }

  getHistogramData() {
    return this._histogramDat;
  }

  toggleOffDef() {
    var newOffDef = this.state.offDef == 'Off' ? 'Def' : 'Off';
    this.setState({offDef: newOffDef});
  }

  showPlayerChange() {
    this.setState({selectNewPlayer: !this.state.selectNewPlayer});
  }

  handlePlayerChange(player) {
    this.props.triggerPlayerChange(player);
    this.setState({selectNewPlayer: !this.state.selectNewPlayer, gridSel: []});
  }

  render() {
    this.computeSelectedData();

    return (
      <div className="path-container col-sm-8 col-sm-offset-2">
        <Header
          showPlayerChange={this.showPlayerChange}
          player={this.props.player}
          selectNewPlayer={this.state.selectNewPlayer}
          offDef={this.state.offDef}
          toggleOffDef={this.toggleOffDef} />
        <StatsContainer
          width={this.props.width}
          selectNewPlayer={this.state.selectNewPlayer}
          numPossessions={this.getNumPossessions()}
          fGPercent={this.getFGPercent()}
          histogramData={this.getHistogramData()} />
      </div>
    );
  }
}
