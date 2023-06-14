import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/users/userSlice";
const DeleteUserModal = ({ onShow, onClose }) => {
  const { deletingId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteUser(deletingId));
    console.log(deletingId);
    onClose();
    window.location.reload(true);
  };
  return (
    <Modal show={onShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this user account?</Modal.Body>
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
export default DeleteUserModal;
