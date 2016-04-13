import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import d3_queue from 'd3-queue';
import d3 from 'd3';
import lunr from 'lunr';

import SearchFilters from './SearchFilters';
import SelectionContainer from './SelectionContainer';

export default class PlayerSelectContainer extends React.Component{
  constructor(props) {
    super(props);

    this._allTeams = null;
    this._allPlayers = null;
    this._lunrIndex = null;
    this._lunrStore = {};
    this._query = null;
    this._positionFilter = -1;
    this.state = {selectedPlayers: null};

    this.componentWillMount = this.componentWillMount.bind(this);
    this._getTeamPlayerData = this._getTeamPlayerData.bind(this);
    this._setupLunr = this._setupLunr.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handlePositionFilter = this.handlePositionFilter.bind(this);
    this._updateSearch = this._updateSearch.bind(this);
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  componentWillMount() {
    this._getTeamPlayerData();
  }

  _getTeamPlayerData() {
    const teamPath = '/static/data/teams.json';
    const playerPath = '/static/data/players.json';
    d3_queue.queue()
      .defer(d3.json, teamPath)
      .defer(d3.json, playerPath)
      .await(function(err, teams, players) {
        this._allTeams = teams;
        this._allPlayers = players;

        this._setupLunr(players);
        this.setState({selectedPlayers: players});
      }.bind(this));
  }

  _setupLunr(players) {
    this._lunrIndex = lunr(function() {
      this.field('name', {boost: 10});
      this.field('team');
      this.ref('id');
    });
    this._lunrIndex.pipeline.remove(lunr.stopWordFilter);
    players.forEach(function(player, i) {
      this._lunrIndex.add({
        'id': i,
        'name': player.name,
        'team': player.team
      });
      this._lunrStore[i] = player;
    }.bind(this));
  }

  handleSearchInput(query) {
    this._query = query.length > 1 ? query : null;
    this._updateSearch();
  }

  handlePositionFilter(newPosition) {
    this._positionFilter = newPosition;
    this._updateSearch();
  }

  _updateSearch() {
    var results;
    if (this._query) {
      results = this._lunrIndex.search(this._query)
        .map(function(obj){
          return this._lunrStore[obj.ref];
        }.bind(this));
    } else {
      results = this._allPlayers;
    }
    results = results.filter(function(player) {
        return this._positionFilter === -1 || player.positions.indexOf(this._positionFilter) !== -1;
      }.bind(this));

    this.setState({selectedPlayers: results});
  }

  handlePlayerClick(playerName) {
    this.props.triggerPlayerChange(playerName);
  }

  render() {
    return (
      <div className='player-select-container'
        style={{width: this.props.width, height: this.props.height}} >
        <SearchFilters
          width={this.props.width * 0.3}
          onSearchInput={this.handleSearchInput}
          onFilter={this.handlePositionFilter}
          filteredPosition={this._positionFilter}
          showPlayerChange={this.props.showPlayerChange} />
        <SelectionContainer
          height={this.props.height}
          teams={this._allTeams}
          players={this.state.selectedPlayers}
          playerClick={this.handlePlayerClick} />
      </div>
    );
  }
}
