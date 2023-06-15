import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteMechanic } from "../../features/mechanics/mechanicSlice";
import { toast } from "react-toastify";
const DeleteTowModal = ({ onShow, onClose }) => {
  const { deletingId } = useSelector((state) => state.mechanic);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteMechanic(deletingId));
    // console.log(deletingId);
    onClose();
    window.location.reload(true);
    toast.success("Contact deleted");
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
