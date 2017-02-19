import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImageList } from './image-actions';

class ImageList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchImageList(1));
  }

  render() {
    return (
      <div>ImageList</div>
    );
  }
}

export default connect(state => ({}))(ImageList);
