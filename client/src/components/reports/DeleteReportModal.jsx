import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport } from "../../features/reports/reportSlice";
import { useNavigate } from "react-router-dom";

const DeleteReportModal = ({ onShow, onClose }) => {
  const { deletingId } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {
    dispatch(deleteReport(deletingId));
    console.log(deletingId);
    navigate("/reports");
    onClose();
    window.location.reload(true);
  };

  return (
    <Modal show={onShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this report?</Modal.Body>
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
export default DeleteReportModal;
