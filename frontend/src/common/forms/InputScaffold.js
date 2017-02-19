import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Label } from 'synfrastructure';

class InputScaffold extends Component {
  render() {
    const scaffoldClasses = {
      'input-scaffold': true,
      [`${this.props.className}`]: this.props.className,
    };

    const labelClasses = {
      'input': true,
      'input--disabled': this.props.disabled,
    };

    return (
      <div className={classNames(scaffoldClasses)}>
        <Label className={classNames(labelClasses)}>
          {this.props.label ? <span className="input-label">{this.props.label}</span> : null}
          {this.props.children}
        </Label>
        {this.props.validation ? <div className="input-validation">{this.props.validation}</div> : null}
      </div>
    );
  }
}

InputScaffold.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  validation: PropTypes.any,
}

InputScaffold.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  label: null,
  validation: null,
}

export default InputScaffold;
