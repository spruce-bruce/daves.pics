import React, { Component } from 'react';
import Left from './Left';

const style = {
  app : {
    display: 'flex',
  }
};

export default class Layout extends Component {
  state = {
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
  };
  componentWillMount() {
    window.addEventListener('resize', e => {
      this.setState({
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      });
    })
  }

  render() {
    var appStyle = Object.assign({}, style.app);
    appStyle.height = this.state.height;

    return (
      <div style={appStyle}>
        <Left />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
