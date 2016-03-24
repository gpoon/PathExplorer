import React from 'react';

import SearchBar from './SearchBar';
import PositionToggleGroup from './PositionToggleGroup';

export default class SearchFilters extends React.Component{
  render() {
    return (
      <div className='row search-filters'>
        <SearchBar
          onChange={this.props.onSearchInput}
          width={this.props.width} />
        <PositionToggleGroup
          toggleFilter={this.props.onFilter}
          filteredPosition={this.props.filteredPosition} />
      </div>
    );
  }
}
