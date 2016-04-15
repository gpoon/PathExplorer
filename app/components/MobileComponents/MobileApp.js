import React from 'react';
import NavArrow from './NavArrow';

export default class MobileApp extends React.Component{
  render() {
    return (
      <div className='page-container'>
        <div className='page' id='top'>
          <div></div>
          <div className='txt'>
            This is a visualization of where Steph Curry moved on the court during offense for the first half of the 2015-16 season.
          </div>
          <NavArrow
            destination='static-img'
            top={false}
            symbol='expand_more'
          />
        </div>
        <div className='page' id='static-img'>
          <NavArrow
            destination='top'
            top={true}
            symbol='expand_less'
          />
          <img className='static-court court-imgs' />
          <NavArrow
            destination='explain-txt'
            top={false}
            symbol='expand_more'
          />
        </div>
        <div className='page' id='explain-txt'>
          <NavArrow
            destination='static-img'
            top={true}
            symbol='expand_less'
          />
          <div className='txt'>
            Each line on the court shows where Steph moved during one offensive possession.
          </div>
          <NavArrow
            destination='explore-txt'
            top={false}
            symbol='expand_more'
          />
        </div>
        <div className='page' id='explore-txt'>
          <NavArrow
            destination='explain-txt'
            top={true}
            symbol='expand_less'
          />
          <div className='txt'>
            Explore further and see other players on the real, interactive version using a desktop/laptop.
          </div>
          <NavArrow
            destination='gif'
            top={false}
            symbol='expand_more'
          />
        </div>
        <div className='page' id='gif'>
          <NavArrow
            destination='explore-txt'
            top={true}
            symbol='expand_less'
          />
          <img className='gif-court court-imgs' />
          <div></div>
        </div>
      </div>
    );
  }
}
