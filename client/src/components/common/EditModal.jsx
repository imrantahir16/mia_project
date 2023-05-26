import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";

const EditModal = ({ onShow, onClose, currentId }) => {
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
                  placeholder="Contact Name"
                  required
                />
              </Col>
              <Col md={12}>
                <label htmlFor="inputContact">Phone no.</label>
                <input
                  type="tel"
                  className="form-control"
                  id="inputContact"
                  placeholder="Contact number"
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
        <Button variant="primary" onClick={onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditModal;
