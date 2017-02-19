import React, { Component } from 'react';
import { Radio } from 'synfrastructure';
import ToggleScaffold from '../../common/forms/ToggleScaffold';

class Radios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedRadio: null,
    };
  }

  toggleRadio(e) {
    this.setState({ checkedRadio: e.target.value });
  }

  render() {
    const cmyk = ['cyan', 'magenta', 'yellow', 'key', 'disabled'];

    return (
      <div className="paper">
        <div className="styleguide__title">Radio Inputs</div>
        <div className="styleguide__row">
          {cmyk.map(color => {
            const colorLabel = `${color.charAt(0).toUpperCase()}${color.substr(1)}`;
            return (
              <ToggleScaffold
                key={color}
                label={colorLabel}
                disabled={color === 'disabled'}
              >
                <Radio
                  id={color}
                  value={color}
                  checked={this.state.checkedRadio === color}
                  onChange={this.toggleRadio.bind(this)}
                  disabled={color === 'disabled'}
                />
              </ToggleScaffold>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Radios;
