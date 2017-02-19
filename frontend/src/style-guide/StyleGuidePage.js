import React from 'react';

import Typography from './sections/Typography';
import TextInputs from './sections/TextInputs';
import SelectInputs from './sections/SelectInputs';
import Checkboxes from './sections/Checkboxes';
import Radios from './sections/Radios';
import Buttons from './sections/Buttons';
import Modal from './sections/Modal';

function StyleGuide() {
  return (
    <div className="container">
      <Typography />
      <TextInputs />
      <SelectInputs />
      <Checkboxes />
      <Radios />
      <Buttons />
      <Modal />
    </div>
  );
}

export default StyleGuide;
