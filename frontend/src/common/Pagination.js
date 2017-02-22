import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router';

const style = {
  paginationContainer : {
    display: 'flex',
  },
  link : {
    width: '1.5em'
  }
};

export default class extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  calculateStart = () => {
    const { page, pageCount } = this.props;

    let start = page - 3;
    if (pageCount - 3 < page) {
      start -= 3 - (pageCount - page);
    }

    return start < 1 ? 1 : start;
  }

  calculateStop = (start) => {
    const { pageCount } = this.props;
    let stop = start + 6;
    return stop > pageCount ? pageCount : stop;
  }

  addPrev = (links) => {
    const { page, pathname } = this.props;
    if (page > 4) {
      links.push(<li style={style.link} key={`first`}><Link to={{pathname, query: {page: 1}}}>&laquo;</Link></li>);
    }

    if (page > 1) {
      links.push(<li style={style.link} key={`prev`}><Link to={{pathname, query: {page: page - 1}}}>&lt;</Link></li>);
    }

    return links;
  }

  addNext = (links) => {
    const { pageCount, page, pathname } = this.props;

    if ( page < pageCount ) {
      links.push(<li style={style.link} key={`next`}><Link to={{pathname, query: {page: page + 1}}}>&gt;</Link></li>);
    }

    if ( page < (pageCount - 3) ) {
      links.push(<li style={style.link} key={`last`}><Link to={{pathname, query: {page: pageCount}}}>&raquo;</Link></li>);
    }

    return links;
  }

  renderLinks = () => {
    const { page, pathname } = this.props;
    const start = this.calculateStart(), stop = this.calculateStop(start);
    let links = [];

    this.addPrev(links);
    for (var i = start; i <= stop; i++) {
      if (page === i) {
        links.push(<li style={style.link} key={`page-current`}><span>{i}</span></li>);
      } else {
        links.push(<li style={style.link} key={`page-${i}-link`}><Link to={{pathname, query: {page: i}}}>{i}</Link></li>);
      }
    }
    this.addNext(links);
    return links;
  }

  render() {
    return (
      <ul style={style.paginationContainer}>
        {this.renderLinks()}
      </ul>
    );
  }
}
