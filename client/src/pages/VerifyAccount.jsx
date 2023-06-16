import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  resetAfterVerify,
  verifyAccount,
} from "../features/auth/authSlice";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [validated, setValidated] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    if (e.target.name === "otp") {
      setOtp(e.target.value);
    }
  };
  const verifyAccountHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      if (!otp) {
        setOtpError("OTP is required");
      }
      if (otp.length < 5) {
        setOtpError("OTP is invalid");
      }
    } else {
      dispatch(verifyAccount({ otp }));
    }
    // setLoading(false);
    setValidated(true);
  };

  useEffect(() => {
    if (isError) {
      // console.log(message);
      toast.error(message);
    }

    if (isSuccess || (user && user.user.isVerified === true)) {
      toast.success(user.message);
      // dispatch(reset());
      navigate("/login");
    }

    if (isSuccess || (user && user.user.isVerified !== true)) {
      navigate("/verify-account");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section>
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <Card className="p-3 mw-100">
          <Form
            noValidate
            validated={validated}
            className="mw-100"
            onSubmit={verifyAccountHandler}
          >
            <div className="d-flex align-item-center justify-content-center py-3">
              <h1 className="text-primary">Verify Account</h1>
            </div>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInputOtp"
                label="OTP"
                className="mb-1"
              >
                <Form.Control
                  required
                  name="otp"
                  value={otp}
                  minLength={5}
                  onChange={(e) => onChangeHandler(e)}
                  type="text"
                  placeholder="OTP"
                />
                <Form.Control.Feedback className={"ms-3"} type="invalid">
                  {otpError}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Form.Group as={Row} className="my-4 text-center">
              <Col>
                <Button type="submit" disabled={isLoading}>{`${
                  isLoading ? "Verifing" : "Verify"
                }`}</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </section>
  );
};
export default ResetPassword;
