import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageList from '../images/ImageList';
import { fetchImageList } from '../images/image-actions';
import { fetchCollectionList } from '../collections/collection-actions';

class SourceImages extends Component {
  componentWillMount() {
    const page = this.props.location.query.page || 1;
    const { dispatch, params: { sourceId } } = this.props;

    dispatch(fetchImageList(page, {
      source: sourceId
    }));

    dispatch(fetchCollectionList(sourceId));
  }

  componentDidUpdate(oldProps) {
    const { collectionList, location, dispatch } = this.props;

    if (location.query.page !== oldProps.location.query.page) {
      const page = location.query.page || 1;
      dispatch(fetchImageList(page));
    }

    if (collectionList && !oldProps.collectionList) {
      console.log(`set left nav with collectionList`);
      console.log(collectionList.toJS());
    }
  }

  render() {
    const { loaded, imageList, pagination, router, source, location} = this.props;

    return (
      <div>
        {source ? (
          <div>
            <h1>{source.get('name')} Images</h1>
            <div>{source.get('description')}</div>
          </div>
        ) : null}
        <br />

        <ImageList
          loaded={loaded}
          imageList={imageList}
          pagination={pagination}
          routerPush={router.push}
          pathname={location.pathname}
        />
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const { params: { sourceId } } = ownProps;

  return {
    loaded: state.images.list.get('loaded'),
    imageList: state.images.list.getIn(['data', 'collection']),
    pagination: state.images.list.getIn(['data', 'pagination']),
    source: state.sources.list.get('data').find(source => source.get('id') === sourceId),
    collectionList: state.collections.collectionList.getIn([sourceId, 'data'])
  };
})(SourceImages);
