import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImageList } from './image-actions';
import Pagination from '../common/Pagination';

class ImageList extends Component {
  componentWillMount() {
    const page = this.props.location.query.page || 1;
    this.props.dispatch(fetchImageList(page));

    document.onkeyup = (e) => {
      const { page, pageCount } = this.props.pagination.toJS();
      const { router } = this.props;

      if(e.keyCode === 39) {
        // navigate next
        console.log('navigate next');
        if (page < pageCount) {
          router.push(`/?page=${page + 1}`);
        }
      }

      if (e.keyCode === 37) {
        // navigate prev
        if (page > 1) {
          console.log('navigate previous');
          router.push(`/?page=${page - 1}`)
        }
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.query.page !== nextProps.location.query.page) {
      const page = nextProps.location.query.page || 1;
      this.props.dispatch(fetchImageList(page));
    }
  }

  pickThumb = (files) => {
    return files.find(file => parseInt(file.get('height'), 10) <= 250).get('location');
  }

  renderImage = (image) => {

    return <img key={image.get('id')} alt="no description yet" src={this.pickThumb(image.get('files'))} />;
  }

  render() {
    const { imageList, pagination } = this.props;
    console.log(pagination.toJS());
    return (
      <div>
        {imageList.size ? imageList.map(image => this.renderImage(image)) : 'Loading...'}
        {imageList.size ? (<Pagination
          page={pagination.get('page')}
          pageCount={pagination.get('pageCount')}
        />) : null}
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
})(ImageList);
