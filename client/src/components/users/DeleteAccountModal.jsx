import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const DeleteAccountModal = ({ onShow, onClose, token }) => {
  const navigate = useNavigate();
  const deleteHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete("api/users", config);
    if (res.status === 200) {
      toast.success(res.data.message);
      localStorage.removeItem("user");
      navigate("/login");
    }
    // console.log(res);
    // console.log(token);
    onClose();
  };
  return (
    <Modal show={onShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this your account?</Modal.Body>
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
export default DeleteAccountModal;
