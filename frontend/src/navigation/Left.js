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

  renderSourceList = () => {
    const { sourcesLoaded, sourceList } = this.props;
    const renderListItems = () => !sourceList.size ? <div>Empty :(</div> : sourceList.map(source => (
      <Link to={`/source/${source.get('id')}`} key={`source-${source.get('id')}`}>{source.get('name')}</Link>
    ));

    return (
      <div>
        <h3>Srouces</h3><br />
        { !sourcesLoaded
          ? <div>Loading...</div>
          : renderListItems() }
      </div>
    );
  }

  render() {
    const { sourceId } = this.props;
    return (
      <div style={style.leftBar}>
        <Link to="/">Newest Images</Link><br />
        {!sourceId ? this.renderSourceList() : 'collections'}
      </div>
    );
  }
}

export default connect(state => {
  return {
    sourcesLoaded: state.sources.list.get('loaded'),
    sourceList: state.sources.list.get('data')
  };
})(Left);
