import React, { Component } from 'react';

const style = {
  leftBar: {
    color: 'white',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '15%',
    padding: '1%'
  }
};

export default class extends Component {
  render() {
    return (
      <div style={style.leftBar}>
        <h3>Sources</h3>
        <div>Source 1</div>
        <div>Source 2</div>
      </div>
    );
  }
}
