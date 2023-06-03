import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "../components/common/Spinner";
import {
  createMechanic,
  deleteMechanic,
  getMechanics,
  reset,
} from "../features/mechanics/mechanicSlice";

const Mechanics = () => {
  const [mechanicName, setMechanicName] = useState("");
  const [mechanicContact, setMechanicContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mechanics, isError, isLoading, message } = useSelector(
    (state) => state.mechanic
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editModalCloseHandler = () => setIsEditModalOpen(false);
  const editModalShowHandler = () => setIsEditModalOpen(true);

  const deleteModalCloseHandler = () => setIsDeleteModalOpen(false);
  const deleteModalShowHandler = () => setIsDeleteModalOpen(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch(getMechanics());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, message, isError]);

  const createContactHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(createMechanic({ name: mechanicName, contact: mechanicContact }));
    setIsSubmitting(false);
    setMechanicName("");
    setMechanicContact("");
  };

  if (isError) {
    console.log(message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="d-flex flex-column gap-4 p-3">
        <div className="pt-3">
          <h2>Mechanic Contacts</h2>
        </div>
        <Form className="col-12" onSubmit={createContactHandler}>
          <Container>
            <Row className="align-items-end gap-2">
              <Col sm={4}>
                <label htmlFor="inputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Contact Name"
                  required
                  onChange={(e) => setMechanicName(e.target.value)}
                />
              </Col>
              <Col sm={4}>
                <label htmlFor="inputContact">Phone no.</label>
                <input
                  type="tel"
                  className="form-control"
                  id="inputContact"
                  placeholder="Contact number"
                  required
                  onChange={(e) => setMechanicContact(e.target.value)}
                />
              </Col>
              <Col sm={2} className="flex-grow-1">
                <button type="submit" className="btn btn-primary">
                  {isSubmitting ? "Adding..." : "Add contact"}
                </button>
              </Col>
            </Row>
          </Container>
        </Form>
        <div className="p-3">
          {mechanics.length > 0 ? (
            <Table
              responsive
              className="table table-hover table-bordered overflow-x-scroll"
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.contact}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <Button
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center p-2"
                            onClick={editModalShowHandler}
                          >
                            <FiEdit />
                          </Button>
                          <EditModal
                            contactId={item._id}
                            onShow={isEditModalOpen}
                            onClose={editModalCloseHandler}
                          />
                          <Button
                            className="btn btn-sm btn-danger d-flex align-items-center justify-content-center p-2"
                            onClick={deleteModalShowHandler}
                          >
                            <HiOutlineTrash />
                          </Button>
                          <DeleteModal
                            onDelete={() => dispatch(deleteMechanic(item._id))}
                            onShow={isDeleteModalOpen}
                            onClose={deleteModalCloseHandler}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h3 className="text-center">You don't have any contact!</h3>
          )}
        </div>
      </div>
    </div>
  );
};
export default Mechanics;
