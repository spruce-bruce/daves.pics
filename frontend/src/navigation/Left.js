import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSourceList } from '../sources/source-actions';

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

class Left extends Component {
  componentWillMount() {
    this.props.dispatch(fetchSourceList);
  }

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

export default connect(() => ({}))(Left);
