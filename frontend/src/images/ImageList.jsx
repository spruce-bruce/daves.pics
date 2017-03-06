import React, { Component, PropTypes } from 'react';
import Pagination from '../common/Pagination';

const style = {
  img : {
    height: '200px',
    paddingRight: '5px',
    paddingBottom: '5px',
  }
}

class ImageList extends Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    imageList: PropTypes.object.isRequired,
    routerPush: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { pathname } = this.props;
    document.onkeyup = (e) => {
      const { page, pageCount } = this.props.pagination.toJS();
      const { routerPush } = this.props;
      if (e.keyCode === 39 && page < pageCount) routerPush(`${pathname}?page=${page + 1}`);
      if (e.keyCode === 37 && page > 1) routerPush(`${pathname}?page=${page - 1}`);
    }
  }

  componentDidUpdate(oldProps) {
    const { pathname } = this.props;
    if (oldProps.pathname !== pathname) {
      document.onkeyup = (e) => {
        const { page, pageCount } = this.props.pagination.toJS();
        const { routerPush } = this.props;
        if (e.keyCode === 39 && page < pageCount) routerPush(`${pathname}?page=${page + 1}`);
        if (e.keyCode === 37 && page > 1) routerPush(`${pathname}?page=${page - 1}`);
      }
    }
  }

  pickThumb = (files) => {
    return files.find(file => parseInt(file.get('height'), 10) <= 250).get('location');
  }

  renderImage = (image) => {
    return <img style={style.img} key={image.get('id')} alt="no description yet" src={this.pickThumb(image.get('files'))} />;
  }

  render() {
    const { imageList, pagination, pathname } = this.props;
    return (
      <div>
        {imageList.size ? imageList.map(image => this.renderImage(image)) : 'Loading...'}
        {imageList.size ? (<Pagination
          page={pagination.get('page')}
          pageCount={pagination.get('pageCount')}
          pathname={pathname}
        />) : null}
      </div>
    );
  }
}

export default ImageList;
