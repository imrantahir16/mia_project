import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoading = false;
  const onChangeHandler = (e) => {
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
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
  };
  return (
    <section>
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <Card className="p-3 mw-100">
          <Form className="mw-100" onSubmit={forgotPasswordHandler}>
            <div className="d-flex align-item-center justify-content-center py-3">
              <h1 className="text-primary">Forgot Password</h1>
            </div>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInput"
                label="OTP"
                className="mb-1"
              >
                <Form.Control
                  name="otp"
                  value={otp}
                  onChange={(e) => onChangeHandler(e)}
                  type="number"
                  placeholder="Email"
                />
              </FloatingLabel>
            </Col>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-1"
              >
                <span
                  className="showPassword"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                />
              </FloatingLabel>
            </Col>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInput"
                label="Confirm Password"
                className="mb-1"
              >
                <span
                  className="showPassword"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onChangeHandler(e)}
                />
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
export default ForgotPassword;
