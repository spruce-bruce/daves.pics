import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'synfrastructure';
import { toggleModal } from '../actions';

function StyleGuideModal({ dispatch, modalVisible }) {
  return (
    <div className="paper">
      <div className="styleguide__title">Modal</div>
      <button
        type="button"
        className="button button--color--primary button--size--small"
        onClick={evt => dispatch(toggleModal())}
      >
        Open Modal
      </button>
      <Modal
        isVisible={modalVisible}
        onClose={evt => dispatch(toggleModal())}
      >
        I am a modal
      </Modal>
    </div>
  );
};

StyleGuideModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  modalVisible: state.styleGuide.modalVisible,
});

export default connect(mapStateToProps)(StyleGuideModal);
