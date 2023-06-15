import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { BiSave } from "react-icons/bi";
import DeleteUserModal from "./DeleteUserModal";
import { setDeletingId } from "../../features/users/userSlice";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";

const UserDetailPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserPlan, setSelectedUserPlan] = useState({});
  const { user } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState("user");

  const deleteModalCloseHandler = () => setIsDeleteModalOpen(false);
  const deleteModalShowHandler = (id) => {
    dispatch(setDeletingId(id));
    setIsDeleteModalOpen(true);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`api/users/${params.id}`, config);
        // console.log(response);
        setSelectedUser(response.data);
        setUserType(response?.data?.roles?.Admin ? "admin" : "user");
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPlan = async () => {
      const response = await axios.get(`api/plans/${selectedUser._id}`, config);
      setSelectedUserPlan(response.data);
      // console.log(response.data);
    };
    if (selectedUser._id) {
      fetchPlan();
    }
  }, [selectedUser._id]);

  const updateHandler = async () => {
    let userData;
    setIsEditEnabled(false);
    console.log(selectedUser);
    const { policeId } = selectedUser;
    if (userType === "admin") {
      userData = {
        policeId,
        adminCode: 5051,
      };
    } else {
      userData = {
        policeId,
      };
    }

    try {
      const response = await axios.put(
        `api/users/${params.id}`,
        userData,
        config
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("User updated");
      }
    } catch (error) {
      if (error.response.status !== 200) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <div className="d-flex flex-column gap-4 p-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="pt-3">
            <h2>User Detail</h2>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-1">
            {!isEditEnabled && (
              <Button
                className="btn btn-sm btn-primary d-flex align-items-center justify-content-center p-2"
                onClick={() => setIsEditEnabled(true)}
              >
                <FiEdit />
                <span className="ms-1">Edit</span>
              </Button>
            )}
            {isEditEnabled && (
              <Button
                className="btn btn-sm btn-primary d-flex align-items-center justify-content-center p-2"
                onClick={updateHandler}
              >
                <BiSave />
                <span className="ms-1">Save</span>
              </Button>
            )}
            <Button
              className="btn btn-sm btn-danger d-flex align-items-center justify-content-center p-2"
              onClick={() => deleteModalShowHandler(params.id)}
            >
              <HiOutlineTrash />
              <span className="ms-1">Delete</span>
            </Button>
            {isDeleteModalOpen && (
              <DeleteUserModal
                onShow={isDeleteModalOpen}
                onClose={deleteModalCloseHandler}
              />
            )}
          </div>
        </div>
        <div>
          <Form style={{ width: "100%" }}>
            <Row>
              <Col className="d-flex justify-content-center mb-4">
                {selectedUser?.profileImage &&
                selectedUser?.profileImage !== "" ? (
                  <img
                    className="userProfile"
                    // src={`https://ilikemia.com/api/${selectedUser?.profileImage}`}
                    src={`${process.env.REACT_APP_API_BASE_URL}api/${selectedUser?.profileImage}`}
                    alt={`${selectedUser.name}'s profile`}
                  />
                ) : (
                  <img
                    className="userProfile"
                    src={"/noprofile.webp"}
                    alt={`${selectedUser.name}'s profile`}
                  />
                )}
              </Col>
            </Row>
            <Row className="align-items-center gap-2">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputVerified">
                  Account Verified
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputVerified"
                  placeholder="verification"
                  value={selectedUser?.isVerified || false}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputSubs">
                  Subscribed
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputSubs"
                  placeholder="Email address"
                  value={selectedUser.isSubscribed || false}
                  disabled
                />
              </Col>
            </Row>
            <Row className="align-items-center gap-2">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputName">
                  Role
                </label>
                <Form.Select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  aria-label="User roles"
                  disabled={!isEditEnabled}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputPlan">
                  Subscription Plan
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputPlan"
                  placeholder="Subscription Plan"
                  value={selectedUserPlan?.planName || ""}
                  disabled
                />
              </Col>
            </Row>
            <Row className="align-items-center gap-2">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputName">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputName"
                  placeholder="User Name"
                  value={selectedUser?.name || ""}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputEmail">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control`}
                  id="inputEmail"
                  placeholder="Email address"
                  value={selectedUser.email || ""}
                  disabled
                />
              </Col>
            </Row>
            <Row className="align-items-center gap-2 ">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputPhone">
                  Phone
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputPhone"
                  placeholder="Location description"
                  value={selectedUser?.phone || ""}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputPoliceId">
                  Police ID
                </label>
                <InputGroup>
                  <Form.Control
                    id="inputPoliceId"
                    aria-label="policeId"
                    type="text"
                    value={`${selectedUser?.policeId || ""}`}
                    disabled={!isEditEnabled}
                    onChange={(e) => {
                      setSelectedUser((currentUser) => {
                        return {
                          ...currentUser,
                          policeId: e.target.value,
                        };
                      });
                    }}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Form>
          <div className="pt-3">
            <h3 className="py-2">Images</h3>
            <Row>
              <Col md={6} className={"p-3 mb-2 align-items-center"}>
                <span>Driving License</span>
                {selectedUser?.drivingLicense &&
                selectedUser?.drivingLicense !== "" ? (
                  <img
                    className="userDataImage mt-3"
                    // src={`https://ilikemia.com/api/${selectedUser?.drivingLicense}`}
                    src={`${process.env.REACT_APP_API_BASE_URL}api/${selectedUser?.drivingLicense}`}
                    alt={`${selectedUser.name}'s driving license`}
                  />
                ) : (
                  <img
                    className="userDataImage mt-3"
                    src={"/noImage.jpg"}
                    alt={`${selectedUser.name}'s driving license`}
                  />
                )}
              </Col>
              <Col className={"p-3 mb-2 align-items-center"}>
                <span>Insurance</span>
                {selectedUser?.insurance && selectedUser?.insurance !== "" ? (
                  <img
                    className="userDataImage mt-3"
                    // src={`https://ilikemia.com/api/${selectedUser?.insurance}`}
                    src={`${process.env.REACT_APP_API_BASE_URL}api/${selectedUser?.insurance}`}
                    alt={`${selectedUser.name}'s insurance`}
                  />
                ) : (
                  <img
                    className="userDataImage mt-3"
                    src={"/noImage.jpg"}
                    alt={`${selectedUser.name}'s insurance`}
                  />
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default UserDetailPage;
