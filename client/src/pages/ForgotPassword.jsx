import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [validated, setValidated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      if (!email) {
        setEmailError("Email is required");
      }
    } else {
      try {
        const response = await axios.post("api/reset-password/sendotp", {
          email,
        });
        // console.log(response);
        toast.success(response.data.message);
        navigate("/resetPassword");
      } catch (error) {
        // console.log(error);
        if (error.response.status === 404) {
          toast.error("Invalid Email");
        } else if (error.response.status === 400) {
          toast.error("You account is not verified!");
        } else {
          toast.error("Server error");
        }
      }
    }
    setValidated(true);
    setIsLoading(false);
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
            onSubmit={forgotPasswordHandler}
          >
            <div className="d-flex align-item-center justify-content-center py-3">
              <h1 className="text-primary">Forgot Password</h1>
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
