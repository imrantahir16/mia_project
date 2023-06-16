import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "otp") {
      setOtp(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      if (!email) {
        setEmailError("Email is required");
      }
      if (!otp) {
        setOtpError("OTP is required");
      }
      if (otp.length < 5) {
        setOtpError("OTP is invalid");
      }
      if (!password) {
        setPasswordError("Password is required");
      }
      if (!confirmPassword) {
        setConfirmPasswordError("confirm Password is required");
      }
    } else if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      const resetPasswordData = { email, otp, password, confirmPassword };
      try {
        const res = await axios.post("api/reset-password", resetPasswordData);

        toast.success(res.data.message);
        navigate("/login");
      } catch (error) {
        if (error.response.status === 500) {
          toast.error("Server error");
        }
        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          navigate("/verify-account");
        }
      }
    }
    setIsLoading(false);
    setValidated(true);
  };
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
            onSubmit={resetPasswordHandler}
          >
            <div className="d-flex align-item-center justify-content-center py-3">
              <h1 className="text-primary">Reset Password</h1>
            </div>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-1"
              >
                <Form.Control
                  required
                  name="email"
                  value={email}
                  onChange={(e) => onChangeHandler(e)}
                  type="email"
                  placeholder="Email"
                />
                <Form.Control.Feedback className={"ms-3"} type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
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
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInputPassword"
                label="Password"
                className="mb-1"
              >
                <span
                  className={`showPassword ${
                    !validated ? "notValidated" : "validated"
                  }`}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                <Form.Control
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                />
                <Form.Control.Feedback className={"ms-3"} type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInputconfirmpassword"
                label="Confirm Password"
                className="mb-1"
              >
                <span
                  className={`showPassword ${
                    !validated ? "notValidated" : "validated"
                  }`}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>
                <Form.Control
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="password"
                  name="confirmPassword"
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => onChangeHandler(e)}
                />
                <Form.Control.Feedback className={"ms-3"} type="invalid">
                  {confirmPasswordError}
                </Form.Control.Feedback>
                <Form.Control.Feedback className={"ms-3"} type="invalid">
                  {passwordMatchError}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Form.Group as={Row} className="my-4 text-center">
              <Col>
                <Button type="submit" disabled={isLoading}>{`${
                  isLoading ? "Submitting" : "Submit"
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
