import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageList from '../images/ImageList';
import { fetchImageList } from '../images/image-actions';
import { currentCollectionSelector } from '../collections/collection-selectors';

class SourceImages extends Component {
  componentWillMount() {
    this.fetchImages();
  }

  componentDidUpdate(oldProps) {
    const { location, params: { splat } } = this.props;

    if (location.query.page !== oldProps.location.query.page || oldProps.params.splat !== splat) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { location, dispatch, collectionList, params: { sourceId, splat } } = this.props;
    const page = location.query.page || 1;
    let filter = {
      source: sourceId,
    };
    if (splat) {
      const currentCollectionValues = currentCollectionSelector(collectionList, splat);
      if (currentCollectionValues.get('currentCollection')) {
        filter.collectionId = currentCollectionValues.getIn(['currentCollection', 'id']);
      }
    }

    dispatch(fetchImageList(page, filter));
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
    collectionList: sourceId ? state.collections.collectionList.getIn([sourceId, 'data']) : null,
  };
})(SourceImages);
