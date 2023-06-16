import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import axios from "../api/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isLoggedIn, isSuccess, isError, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      // console.log(message);
      toast.error(message);
    }

    if (isSuccess || (user && isLoggedIn)) {
      navigate("/");
    }
    if (isSuccess || (user && user.user.isVerified !== true)) {
      navigate("/verify-account");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChangeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      if (!email) {
        setEmailError("Email is required");
      }
      if (!password) {
        setPasswordError("Password is required");
      }
    } else {
      const userData = { email, password };
      dispatch(login(userData));
    }
    setValidated(true);
  };

  // const googleLoginHandler = async (e) => {
  //   const res = await axios.get("api/auth/google");
  //   console.log(res);
  // };
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
            onSubmit={loginHandler}
          >
            <div className="d-flex align-item-center justify-content-center py-3">
              <h1 className="text-primary">Login</h1>
            </div>
            <Col sm={12}>
              <FloatingLabel
                controlId="floatingInputEmail"
                label="Email Address"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  minLength={6}
                  value={password}
                  required
                  onChange={(e) => onChangeHandler(e)}
                />
                <Form.Control.Feedback className={"ms-3"} type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            {message && <Form.Label>{message}</Form.Label>}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCheck"
            >
              <Col className="d-flex justify-content-end">
                <a href="/forgotPassword">Forgot Password?</a>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 text-center">
              <Col>
                <Button type="submit" disabled={isLoading}>{`${
                  isLoading ? "Signing" : "Login"
                }`}</Button>
              </Col>
            </Form.Group>
            <hr className="divider" />
            <Form.Group as={Row} className="mt-3 mb-3 text-center">
              <Col>
                <div className="text-center">
                  <p>
                    Not a member? <a href="/register">Register</a>
                  </p>
                  {/* <p>or sign in with:</p>
                  <Button
                    className="btn btn-secondary"
                    onClick={googleLoginHandler}
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
    </section>
  );
};
export default Login;
