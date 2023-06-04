import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteTow } from "../../features/tows/towSlice";
import { useEffect } from "react";
const DeleteTowModal = ({ onShow, onClose }) => {
  const { deletingId } = useSelector((state) => state.tow);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteTow(deletingId));
    console.log(deletingId);
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
export default DeleteTowModal;