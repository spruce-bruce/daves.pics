import React, { Component } from 'react';
import { Checkbox } from 'synfrastructure';
import ToggleScaffold from '../../common/forms/ToggleScaffold';

class Checkboxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedBoxes: [],
    };
  }

  toggleCheckbox(e) {
    const toggledValue = e.target.value;
    let checkedBoxes = [ ...this.state.checkedBoxes ];

    if (checkedBoxes.indexOf(toggledValue) === -1) {
      checkedBoxes.push(toggledValue);
    } else {
      checkedBoxes = checkedBoxes.filter(value => value !== toggledValue);
    }

    this.setState({ checkedBoxes: checkedBoxes });
  }

  render() {
    const rgb = ['red', 'green', 'blue', 'disabled'];

    return (
      <div className="paper">
        <div className="styleguide__title">Checkbox Inputs</div>
        <div className="styleguide__row">
          {rgb.map(color => {
            const colorLabel = `${color.charAt(0).toUpperCase()}${color.substr(1)}`;
            return (
              <ToggleScaffold
                key={color}
                label={colorLabel}
                disabled={color === 'disabled'}
              >
                <Checkbox
                  id={color}
                  value={color}
                  checked={this.state.checkedBoxes.indexOf(color) !== -1}
                  onChange={this.toggleCheckbox.bind(this)}
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

export default Checkboxes;
