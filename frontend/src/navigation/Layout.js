import React, { Component } from 'react';
import Left from './Left';
import Bottom from './Bottom';

const style = {
  app : {
    display: 'flex',
    height: '100vh',
  },
  right : {
    padding: '1% 1% 0 1%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1',
  }
};

export default class Layout extends Component {
  state = {
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  };

  // componentWillMount() {
  //   // storing window width/height in state because i'm too lazy
  //   // to learn about responsive css
  //   window.addEventListener('resize', e => {
  //     this.setState({
  //       height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
  //       width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  //     });
  //   })
  // }

  render() {
    return (
      <div style={style.app}>
        <Left />
        <div style={style.right}>
          <div style={style.content}>
            {this.props.children}
          </div>
          <Bottom />
        </div>
      </div>
    )
  }
}
