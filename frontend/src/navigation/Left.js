import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSourceList } from '../sources/source-actions';
import { Link } from 'react-router';

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
    this.props.dispatch(fetchSourceList());
  }

  renderList = () => {
    const { sourceList } = this.props;
    return !sourceList.size ? <div>Empty :(</div> : sourceList.map(source => (
      <Link to={`/source/${source.get('id')}`} key={`source-${source.get('id')}`}>{source.get('name')}</Link>
    ));
  }

  render() {
    const { loaded } = this.props;
    return (
      <div style={style.leftBar}>
        <Link to="/">Newest Images</Link>
        <h3>Sources</h3><br />

        { !loaded ? <div>Loading...</div> : this.renderList() }
      </div>
    );
  }
}

export default connect(state => {
  return {
    loaded: state.sources.list.get('loaded'),
    sourceList: state.sources.list.get('data')
  };
})(Left);
