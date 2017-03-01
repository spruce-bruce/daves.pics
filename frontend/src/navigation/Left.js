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
        <h3>Sources</h3><br />
        { !sourcesLoaded ? <div>Loading...</div> : renderListItems() }
      </div>
    );
  }

  renderCollectionList = () => {
    const { collectionListLoaded, collectionList } = this.props;

    const renderListItems = () => !collectionList.size ? <div>Empty :(</div> : collectionList.map(collection => (
      <Link key={`collection-${collection.get('id')}`}>{collection.get('name')}</Link>
    ));

    return (
      <div>
        <h3>Collections</h3><br />
        { ! collectionListLoaded ? <div>Loading...</div> : renderListItems() }
      </div>
    );
  }

  render() {
    const { sourceId } = this.props;
    return (
      <div style={style.leftBar}>
        <Link to="/">Newest Images</Link><br />
        {!sourceId
          ? this.renderSourceList()
          : this.renderCollectionList()}
      </div>
    );
  }
}

export default connect((state, props) => {
  const { sourceId } = props;
  return {
    sourcesLoaded: state.sources.list.get('loaded'),
    sourceList: state.sources.list.get('data'),
    collectionList: sourceId ? state.collections.collectionList.getIn([sourceId, 'data']) : null,
    collectionListLoaded: sourceId ? state.collections.collectionList.getIn([sourceId, 'loaded']) : false,
  };
})(Left);
