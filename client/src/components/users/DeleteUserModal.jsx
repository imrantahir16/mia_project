import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const DeleteUserModal = ({ onShow, onClose }) => {
  const { deletingId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = () => {
    dispatch(deleteUser(deletingId)).then((res) => {
      // console.log(res);
      toast.success("User deleted");
    });
    // console.log(deletingId);
    onClose();
    navigate("/users");
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
