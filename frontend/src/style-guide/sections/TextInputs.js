import React, { Component } from 'react';
import InputScaffold from '../../common/forms/InputScaffold';

class TextInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'Red',
      colorDisabled: 'Orange',
      colorMore: 'Yellow, Green, Blue, Indigo and Violet.',
    };
  }

  onChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    return (
      <div className="paper">
        <div className="styleguide__title">Text Input</div>
        <div className="styleguide__row">
          <InputScaffold
            label="Favorite Color"
            validation={null}
          >
            <input
              type="text"
              placeholder="e.g. Red"
              value={this.state.color}
              onChange={this.onChange.bind(this, 'color')}
            />
          </InputScaffold>
        </div>
        <div className="styleguide__row">
          <InputScaffold
            label="Favorite Color"
            validation={null}
            disabled
          >
            <input
              type="text"
              placeholder="e.g. Red"
              value={this.state.colorDisabled}
              onChange={this.onChange.bind(this, 'colorDisabled')}
              disabled
            />
          </InputScaffold>
        </div>
        <div className="styleguide__title">Textarea</div>
        <div className="styleguide__row">
          <InputScaffold
            label="Favorite Color"
            validation={null}
          >
            <textarea
              placeholder="e.g. Red"
              value={this.state.colorMore}
              onChange={this.onChange.bind(this, 'colorMore')}
            />
          </InputScaffold>
        </div>
      </div>
    );
  }
}

export default TextInputs;
