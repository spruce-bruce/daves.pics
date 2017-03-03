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
    const { collectionListLoaded, collectionList, params: { splat, sourceId } } = this.props;

    const collectionPath = splat ? splat.split('/') : [];
    const collectionFind = i => collection => collection.get('name') === collectionPath[i];

    let renderableCollectionList = collectionList;
    let currentCollection;

    for (var i = 0; collectionList && i < collectionPath.length; i++) {
      currentCollection = renderableCollectionList.find(collectionFind(i));
      renderableCollectionList = currentCollection && currentCollection.get('children')
        ? currentCollection.get('children')
        : renderableCollectionList;
    }

    let splatStr = '';
    if (currentCollection && currentCollection.get('children')) {
      splatStr = splat ? `${splat}/` : '';
    } else {
      splatStr = splat.replace(/[^/]+(?=\/$|$)/, '');
    }

    const renderListItems = () => !renderableCollectionList.size ? <div>Empty :(</div> : renderableCollectionList.map(collection => (
      <Link
        key={`collection-${collection.get('id')}`}
        to={`/source/${sourceId}/${splatStr}${collection.get('name')}`}
      >
        {collection.get('name')}
      </Link>
    ));

    return (
      <div>
        <h3>Collections</h3><br />
        { ! collectionListLoaded ? <div>Loading...</div> : renderListItems() }
      </div>
    );
  }

  render() {
    const { params: { sourceId } } = this.props;
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
  const { params: { sourceId } } = props;
  return {
    sourcesLoaded: state.sources.list.get('loaded'),
    sourceList: state.sources.list.get('data'),
    collectionList: sourceId ? state.collections.collectionList.getIn([sourceId, 'data']) : null,
    collectionListLoaded: sourceId ? state.collections.collectionList.getIn([sourceId, 'loaded']) : false,
  };
})(Left);
