import React from 'react';

import SearchBar from './SearchBar';
import PositionToggleGroup from './PositionToggleGroup';

export default class SearchFilters extends React.Component{
  constructor(props) {
    super(props);

    this.closeSelection = this.closeSelection.bind(this);
  }

  closeSelection() {
    this.props.showPlayerChange();
  }

  render() {
    return (
      <div className='row search-filters'>
        <SearchBar
          onChange={this.props.onSearchInput}
          width={this.props.width} />
        <PositionToggleGroup
          toggleFilter={this.props.onFilter}
          filteredPosition={this.props.filteredPosition} />
        <img className='close-btn' onClick={this.closeSelection} />
      </div>
    );
  }
}
