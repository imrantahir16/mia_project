import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const DeleteModal = ({ onShow, onClose, onDelete }) => {
  const deleteHandler = () => {
    // onDelete();
    onClose();
    window.location.reload(true);
  };
  return (
    <Modal show={onShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this contact?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteModal;
