import React, { Component } from 'react';
import InputScaffold from '../../common/forms/InputScaffold';

class SelectInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
      colorDisabled: 'violet',
    };
  }

  onChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const roygbiv = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    return (
      <div className="paper">
        <div className="styleguide__title">Select Inputs</div>
        <div className="styleguide__row">
          <InputScaffold
            label="Colors"
            validation={null}
          >
            <select
              value={this.state.color}
              onChange={this.onChange.bind(this, 'color')}
            >
              {
                roygbiv.map(color => (
                  <option key={color} value={color}>{`${color.charAt(0).toUpperCase()}${color.slice(1)}`}</option>
                ))
              }
            </select>
          </InputScaffold>
        </div>
        <div className="styleguide__row">
          <InputScaffold
            label="Colors"
            validation={null}
            disabled
          >
            <select
              className="select-input"
              value={this.state.colorDisabled}
              onChange={this.onChange.bind(this, 'colorDisabled')}
              disabled
            >
              {
                roygbiv.map(color => (
                  <option key={color} value={color}>{`${color.charAt(0).toUpperCase()}${color.slice(1)}`}</option>
                ))
              }
            </select>
          </InputScaffold>
        </div>
      </div>
    );
  }
}

export default SelectInputs;
