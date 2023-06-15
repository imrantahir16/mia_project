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
import DeleteReportModal from "./DeleteReportModal";
import { setDeletingId } from "../../features/reports/reportSlice";
import ImageOrVideo from "./ImageOrVideo";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";

const ReportDetailPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [report, setReport] = useState({});
  const { user } = useSelector((state) => state.auth);

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
  const originalDate = new Date(report?.time);
  const formattedDate = originalDate.toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = originalDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const finalFormattedDate = `${formattedDate} ${formattedTime}`;
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const report = await axios.get(`api/report/${params.id}`, config);
        setReport(report.data);
      } catch (error) {
        if (error.response.status !== 200) {
          toast.error(error.response.data.message);
        }
      }
    };
    fetchReport();
  }, []);

  const updateHandler = async () => {
    setIsEditEnabled(false);
    // console.log(report);
    const { location, weather, speed, traffic } = report;
    const { description, lat, lng } = location;
    try {
      const response = await axios.put(
        `api/report/${params.id}`,
        {
          ["location.description"]: description,
          ["location.lat"]: lat,
          ["location.lng"]: lng,
          weather,
          speed,
          traffic,
        },
        config
      );
      if (response.status === 200) {
        toast.success("Report updated");
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
            <h2>Report Detail</h2>
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
              <DeleteReportModal
                onShow={isDeleteModalOpen}
                onClose={deleteModalCloseHandler}
              />
            )}
          </div>
        </div>
        <div>
          <Form style={{ width: "100%" }}>
            <Row className="align-items-center gap-2">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputName">
                  Reported By
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputName"
                  placeholder="User Name"
                  value={report?.username || ""}
                  disabled
                  onChange={(e) => {}}
                />
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputTime">
                  Added on
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputTime"
                  placeholder="Reporting Time"
                  value={finalFormattedDate || ""}
                  disabled
                />
              </Col>
            </Row>
            <Row className="align-items-center gap-2 ">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputLocation">
                  Location
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputLocation"
                  placeholder="Location description"
                  value={report?.location?.description || ""}
                  disabled={!isEditEnabled}
                  onChange={(e) =>
                    setReport((currentReport) => {
                      return {
                        ...currentReport,
                        location: {
                          ...currentReport.location,
                          description: e.target.value,
                        },
                      };
                    })
                  }
                />
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputLatLng">
                  Lat and Lng
                </label>
                <InputGroup>
                  <Form.Control
                    aria-label="latitude"
                    type="number"
                    value={`${report?.location?.lat || ""}`}
                    disabled={!isEditEnabled}
                    onChange={(e) =>
                      setReport((currentReport) => {
                        return {
                          ...currentReport,
                          location: {
                            ...currentReport.location,
                            lat: e.target.value,
                          },
                        };
                      })
                    }
                  />
                  <InputGroup.Text>,</InputGroup.Text>
                  <Form.Control
                    aria-label="Longitude"
                    type="number"
                    value={`${report?.location?.lng || ""}`}
                    disabled={!isEditEnabled}
                    onChange={(e) =>
                      setReport((currentReport) => {
                        return {
                          ...currentReport,
                          location: {
                            ...currentReport.location,
                            lng: e.target.value,
                          },
                        };
                      })
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="align-items-center gap-2 ">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputWeather">
                  Weather
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputWeather"
                  placeholder="Weather"
                  value={report?.weather || ""}
                  disabled={!isEditEnabled}
                  onChange={(e) =>
                    setReport((currentReport) => {
                      return {
                        ...currentReport,
                        weather: e.target.value,
                      };
                    })
                  }
                />
              </Col>
              <Col>
                <label className="ms-2 mb-2" htmlFor="inputTraffic">
                  Traffic
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  id="inputTraffic"
                  placeholder="Traffic"
                  value={report?.traffic || ""}
                  disabled={!isEditEnabled}
                  onChange={(e) =>
                    setReport((currentReport) => {
                      return {
                        ...currentReport,
                        traffic: e.target.value,
                      };
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="align-items-center gap-2 ">
              <Col md={6}>
                <label className="ms-2 mb-2" htmlFor="inputSpeed">
                  Speed
                </label>
                <input
                  type="number"
                  className={`form-control`}
                  id="inputSpeed"
                  placeholder="Speed"
                  value={report?.speed || ""}
                  disabled={!isEditEnabled}
                  onChange={(e) =>
                    setReport((currentReport) => {
                      return {
                        ...currentReport,
                        speed: e.target.value,
                      };
                    })
                  }
                />
              </Col>
            </Row>
          </Form>
          <div className="pt-3">
            <h3 className="py-2">Images</h3>
            <Row>
              {report?.reportImages?.length === 0 && (
                <span>No Images found</span>
              )}
              {report?.reportImages?.length > 0 &&
                report?.reportImages?.map((image) => (
                  <Col
                    key={image}
                    md={6}
                    className={"p-3 mb-2 align-items-center"}
                  >
                    <ImageOrVideo data={image} />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ReportDetailPage;
