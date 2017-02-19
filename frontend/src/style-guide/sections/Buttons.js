import React from 'react';

function Buttons() {
  return (
    <div className="paper">
      <div className="styleguide__title">Buttons</div>
      <div className="styleguide__row">
        <label>Large</label>
        <button className="button button--color--primary button--size--large">
          Primary
        </button>
        <button className="button button--color--secondary button--size--large">
          Secondary
        </button>
        <button className="button button--color--dark button--size--large">
          Dark
        </button>
        <button className="button button--color--light button--size--large">
          Light
        </button>
      </div>
      <div className="styleguide__row">
        <label>Small</label>
        <button className="button button--color--primary button--size--small">
          Primary
        </button>
        <button className="button button--color--secondary button--size--small">
          Secondary
        </button>
        <button className="button button--color--dark button--size--small">
          Dark
        </button>
        <button className="button button--color--light button--size--small">
          Light
        </button>
      </div>
      <div className="styleguide__row">
        <label>Disabled</label>
        <button className="button button--color--primary button--size--small button--disabled" disabled>
          Primary
        </button>
        <button className="button button--color--secondary button--size--small button--disabled" disabled>
          Secondary
        </button>
        <button className="button button--color--dark button--size--small button--disabled" disabled>
          Dark
        </button>
        <button className="button button--color--light button--size--small button--disabled" disabled>
          Light
        </button>
      </div>
      <div className="styleguide__row">
        <label>Outline</label>
        <button className="button button--color--primary button--size--small button--theme--outline">
          Primary
        </button>
        <button className="button button--color--secondary button--size--small button--theme--outline">
          Secondary
        </button>
        <button className="button button--color--dark button--size--small button--theme--outline">
          Dark
        </button>
        <button className="button button--color--light button--size--small button--theme--outline">
          Light
        </button>
      </div>
      <div className="styleguide__row">
        <label>Full Width</label>
        <button className="button button--color--primary button--size--small button--full-width">
          Primary
        </button>
      </div>
    </div>
  );
}

export default Buttons;
