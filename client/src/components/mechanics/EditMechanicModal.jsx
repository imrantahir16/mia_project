import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axios";

const EditMechanicModal = ({ onShow, onClose }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const { editingId, mechanics } = useSelector((state) => state.mechanic);
  const { user } = useSelector((state) => state.auth);

  const editHandler = async () => {
    const mechanicData = { name, contact };
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    const response = await axios.put(
      `api/mechanic/${editingId}`,
      mechanicData,
      config
    );
    onClose();
    window.location.reload(true);
  };
  useEffect(() => {
    const { name, contact } = mechanics.filter(
      (mechanic) => mechanic._id === editingId
    )[0];
    setName(name);
    setContact(contact);
  }, []);

  return (
    <Modal show={onShow} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="col-12">
          <Container>
            <Row className="align-items-end gap-3">
              <Col md={12}>
                <label htmlFor="inputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Col>
              <Col md={12}>
                <label htmlFor="inputContact">Phone no.</label>
                <input
                  type="tel"
                  className="form-control"
                  id="inputContact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={editHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditMechanicModal;
