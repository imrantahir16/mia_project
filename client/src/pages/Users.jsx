import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset } from "../features/users/userSlice";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";
import noProfileImage from "../../public/assets/noprofile.webp";
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
      <div className="d-flex flex-column gap-4 px-2 py-3 px-md-3">
        <div className="pt-3">
          <h2>Users</h2>
        </div>
        <div className="px-0 py-3 px-md-3">
          <Table
            responsive
            className="table table-hover table-bordered overflow-x-scroll"
          >
            <thead>
              <tr>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    key={user._id}
                    onClick={() => navigate(`/user-detail/${user._id}`)}
                  >
                    <td className="d-flex align-items-center justify-content-center">
                      <div className="userProfileImage">
                        {user.profileImage !== "" ? (
                          <img
                            // src={`https://ilikemia.com/api/${user.profileImage}`}
                            src={`${process.env.REACT_APP_API_BASE_URL}api/${user.profileImage}`}
                            alt={user.name}
                          />
                        ) : (
                          <img src={noProfileImage} alt={user.name} />
                        )}
                      </div>
                    </td>
                    <td className="nowrap">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
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
