import React from 'react';

export default class CourtBackground extends React.Component {
  render() {
    const classStr = this.props.onOffense ? 'offense-court' : 'defense-court';
    const styleDict = {width: this.props.width, height: this.props.height};

    return (
      <div className='court-background-container'>
        <div
          className={'basket ' + classStr}
          style={styleDict} />
        <div
          className='court-background'
          style={styleDict} />
      </div>
    );
  }
}