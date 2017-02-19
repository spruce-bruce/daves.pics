import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Label } from 'synfrastructure';

class ToggleScaffold extends Component {
  render() {
    const scaffoldClasses = {
      'toggle-scaffold': true,
      [`${this.props.className}`]: this.props.className,
    };

    const labelClasses = {
      'toggle': true,
      'toggle--disabled': this.props.disabled,
    };

    return (
      <div className={classNames(scaffoldClasses)}>
        <Label className={classNames(labelClasses)}>
          {this.props.children}
          {this.props.label ? <span className="toggle-label">{this.props.label}</span> : null}
        </Label>
        {this.props.validation ? <div className="toggle-validation">{this.props.validation}</div> : null}
      </div>
    );
  }
}

ToggleScaffold.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  validation: PropTypes.any,
}

ToggleScaffold.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  label: null,
  validation: null,
}

export default ToggleScaffold;
