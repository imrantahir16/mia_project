import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset } from "../features/users/userSlice";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";
// import noProfileImage from "../assets/noprofile.webp";
import { getReports } from "../features/reports/reportSlice";
const Reports = () => {
  const { reports, isError, isLoading, message } = useSelector(
    (state) => state.report
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
      dispatch(getReports());
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
    <Container>
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
                <th scope="col">User</th>
                <th scope="col">Location</th>
                <th scope="col">Weather</th>
                <th scope="col">Time</th>
                <th scope="col">Speed</th>
                <th scope="col">Traffic</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                return (
                  <tr key={report._id}>
                    <td className="nowrap">{report.userId}</td>
                    <td>{report?.location?.description}</td>
                    <td>{report?.weather}</td>
                    <td>{report?.time}</td>
                    <td>{report?.weather}</td>
                    <td>{report?.speed}</td>
                    <td>{report?.traffic}</td>
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
    </Container>
  );
};
export default Reports;
