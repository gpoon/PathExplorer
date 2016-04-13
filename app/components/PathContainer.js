import React from 'react';
import filter from 'lodash.filter';
import isEqual from 'lodash.isequal';

import Header from './HeaderComponents/Header';
import PlayerSelectContainer from './SelectionComponents/PlayerSelectContainer';
import CourtContainer from './CourtComponents/CourtContainer';
import StatsContainer from './StatsComponents/StatsContainer';

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
    return filter(this.props.allData, function(poss) {
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
    if (this.props.tooltipState > 1) {
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
    var newGridSel = isEqual(this.state.gridSel, [coords]) ? [] : [coords];
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
    return this._selectedData ? this._selectedData.length : null;
  }

  getFGPercent() {
    return this._selectedData ? Math.round(this._made / this._selectedData.length * 100) + '%' : null;
  }

  getHistogramData() {
    return this._selectedData ? this._histogramDat : null;
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
    const mainContent = (function() {
      if (this.state.selectNewPlayer) {
        return (
          <PlayerSelectContainer
            triggerPlayerChange={this.handlePlayerChange}
            showPlayerChange={this.showPlayerChange}
            width={this.props.width} 
            height={this.props.width / 1.88} />
        );
      } else {
        return (
          <CourtContainer
            canvasData={this._selectedData}
            gridClick={this.gridClick}
            selectedGrids={this.state.gridSel}
            onOffense={this.state.offDef == 'Off'}
            width={this.props.width} 
            height={this.props.width / 1.88}
            incrementIntro={this.props.incrementIntro}
            tooltipState={this.props.tooltipState} />
        );
      }
    }.bind(this))();

    return (
      <div className="path-container col-sm-8 col-sm-offset-2">
        <Header
          showPlayerChange={this.showPlayerChange}
          player={this.props.player}
          selectNewPlayer={this.state.selectNewPlayer}
          offDef={this.state.offDef}
          toggleOffDef={this.toggleOffDef} />
        <div className='row main-content'>
          {mainContent}
        </div>
        <StatsContainer
          width={this.props.width}
          selectNewPlayer={this.state.selectNewPlayer}
          numPossessions={this.getNumPossessions()}
          fGPercent={this.getFGPercent()}
          histogramData={this.getHistogramData()}
          tooltipState={this.props.tooltipState} />
      </div>
    );
  }
}
