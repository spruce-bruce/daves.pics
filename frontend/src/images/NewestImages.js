import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import { fetchImageList } from './image-actions';

class NewestImages extends Component {
  componentWillMount() {
    const page = this.props.location.query.page || 1;
    this.props.dispatch(fetchImageList(page));
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.query.page !== nextProps.location.query.page) {
      const page = nextProps.location.query.page || 1;
      this.props.dispatch(fetchImageList(page));
    }
  }

  render() {
    const { loaded, imageList, pagination, router, location } = this.props;

    return (
      <div>
        <h1>Newest Images</h1>
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

export default connect(state => {
  return {
    loaded: state.images.list.get('loaded'),
    imageList: state.images.list.getIn(['data', 'collection']),
    pagination: state.images.list.getIn(['data', 'pagination']),
  };
})(NewestImages);
