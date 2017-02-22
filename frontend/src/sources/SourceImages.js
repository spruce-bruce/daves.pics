import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageList from '../images/ImageList';
import { fetchImageList } from '../images/image-actions';

class SourceImages extends Component {
  componentWillMount() {
    const page = this.props.location.query.page || 1;
    this.props.dispatch(fetchImageList(page, {
      source: this.props.params.sourceId
    }));
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.query.page !== nextProps.location.query.page) {
      const page = nextProps.location.query.page || 1;
      this.props.dispatch(fetchImageList(page));
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
  return {
    loaded: state.images.list.get('loaded'),
    imageList: state.images.list.getIn(['data', 'collection']),
    pagination: state.images.list.getIn(['data', 'pagination']),
    source: state.sources.list.get('data').find(source => source.get('id') === ownProps.params.sourceId),
  };
})(SourceImages);
