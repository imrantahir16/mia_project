import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { register, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [policeId, setPoliceId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name === "policeId") {
      setPoliceId(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };
  const registerHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      if (!name) {
        setNameError("Name is required");
      }
      if (!email) {
        setEmailError("Email is required");
      }
      if (!password) {
        setPasswordError("Password is required");
      }
      if (!confirmPassword) {
        setConfirmPasswordError("Confirm Password is required");
      }
    } else if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
        phone,
        policeId,
      };
      dispatch(register(userData));
    }
    setValidated(true);
  };

  useEffect(() => {
    if (isError) {
      // console.log(message);
      toast.error(message);
    }

    if (isSuccess || (user && user.user.isVerified !== true)) {
      toast.success(user.message);
      navigate("/verify-account");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Card className="p-3 mw-100">
        <Form
          noValidate
          validated={validated}
          className="mw-100"
          onSubmit={registerHandler}
        >
          <div className="d-flex align-item-center justify-content-center py-3">
            <h1 className="text-primary">Register</h1>
          </div>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInputName"
              label="Full Name"
              className="mb-1"
            >
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                onChange={(e) => onChangeHandler(e)}
                placeholder="full name"
              />
              <Form.Control.Feedback className={"ms-3"} type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInputEmail"
              label="Email Address"
              className="mb-1"
            >
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChangeHandler(e)}
                placeholder="Email"
              />
              <Form.Control.Feedback className={"ms-3"} type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInputPhone"
              label="Phone number"
              className="mb-1"
            >
              <Form.Control
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => onChangeHandler(e)}
                placeholder="phone number"
              />
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInputPassword"
              label="Password"
              className="mb-1"
            >
              <span
                className={`showPassword
                ${!validated ? "notValidated" : "validated"}`}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
              <Form.Control
                required
                minLength={6}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
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
              controlId="floatingInputConfirmPassword"
              label="Confirm Password"
              className="mb-1"
            >
              <span
                className={`showPassword
                ${!validated ? "notValidated" : "validated"}`}
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
                required
                minLength={6}
                placeholder="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChangeHandler(e)}
              />
              <Form.Control.Feedback className={"ms-3"} type="invalid">
                {confirmPasswordError}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInputPoliceid"
              label="Police ID"
              className="mb-1"
            >
              <Form.Control
                type="text"
                name="policeId"
                value={policeId}
                onChange={(e) => onChangeHandler(e)}
                placeholder="Police Id"
              />
            </FloatingLabel>
          </Col>
          <Form.Group as={Row} className="mb-4 text-center">
            <Col>
              <Button type="submit" disabled={isLoading}>{`${
                isLoading ? "Registering" : "Register"
              }`}</Button>
            </Col>
          </Form.Group>
          <hr className="divider" />
          <Form.Group as={Row} className="mt-3 mb-3 text-center">
            <Col>
              <div className="text-center">
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
                {/* <p>or sign in with:</p>
                <Button
                  className="btn btn-secondary"
                  onClick={googleRegisterHandler}
                >
                  <FcGoogle className="me-2" />
                  <span>Login with Google</span>
                </Button> */}
              </div>
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};
export default Register;
