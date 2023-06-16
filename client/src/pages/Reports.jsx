import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReports, reset } from "../features/reports/reportSlice";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Reports = () => {
  const { reports, isError, isLoading, message } = useSelector(
    (state) => state.report
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      // console.log(message);
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getAllReports());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, message, isError, navigate]);

  if (isError) {
    // console.log(message);
    toast.error(message);
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container>
      <div className="d-flex flex-column gap-4 px-2 py-3 px-md-3">
        <div className="pt-3">
          <h2>Reports</h2>
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
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    key={report._id}
                    onClick={() => navigate(`/report-detail/${report._id}`)}
                  >
                    <td className="nowrap">
                      {report?.username ? report.username : "No Name"}
                    </td>
                    <td>{report?.location?.description}</td>
                    <td>{report?.weather}</td>
                    <td>{report?.time}</td>
                    <td>{report?.speed}</td>
                    <td>{report?.traffic}</td>
                    {/* <td>{report?.traffic}</td> */}
                    {/* <td>
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <Link
                          className="btn btn-sm btn-primary d-flex align-items-center justify-content-center p-2"
                          to={`/report-detail/${report._id}`}
                        >
                          <AiOutlineEye />
                        </Link>
                        <Button
                          className="btn btn-sm btn-danger d-flex align-items-center justify-content-center p-2"
                          onClick={() => deleteModalShowHandler(report._id)}
                        >
                          <HiOutlineTrash />
                        </Button>
                        {isDeleteModalOpen && (
                          <DeleteReportModal
                            onShow={isDeleteModalOpen}
                            onClose={deleteModalCloseHandler}
                          />
                        )}
                      </div>
                    </td> */}
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
