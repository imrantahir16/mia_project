import Table from "react-bootstrap/Table";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../components/common/DeleteModal";
import { getAllUsers, reset } from "../features/users/userSlice";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const { users, isError, isLoading, message } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getAllUsers());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, message, isError, navigate]);

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
          <h2>Users</h2>
        </div>
        <div className="p-3">
          <Table
            responsive
            className="table table-hover table-bordered overflow-x-scroll"
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <button className="btn btn-sm btn-primary d-flex align-items-center justify-content-center p-2">
                          <FiEdit />
                        </button>
                        <button className="btn btn-sm btn-danger d-flex align-items-center justify-content-center p-2">
                          <HiOutlineTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default Users;
