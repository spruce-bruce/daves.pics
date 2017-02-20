import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImageList } from './image-actions';

class ImageList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchImageList(1));
  }

  pickThumb = (files) => {
    return files.find(file => parseInt(file.get('height'), 10) <= 250).get('location');
  }

  renderImage = (image) => {

    return <img key={image.get('id')} alt="family doing stuff" src={this.pickThumb(image.get('files'))} />;
  }

  render() {
    const { imageList } = this.props;
    return (
      <div>
        {imageList.map(image => this.renderImage(image))}
      </div>
    );
  }
}

export default connect(state => {
  return {
    loaded: state.images.list.get('loaded'),
    imageList: state.images.list.getIn(['data', 'collection']),
  };
})(ImageList);
