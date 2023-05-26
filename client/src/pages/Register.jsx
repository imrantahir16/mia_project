import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Card className="p-3 mw-100">
        <Form className="mw-100" onSubmit={registerHandler}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={12}>
              Name
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="text" placeholder="Full Name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={12}>
              Email
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
            <Form.Label column sm={12}>
              Phone
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="tel" placeholder="Phone number" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={12}>
              Password
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalConfirmPassword"
          >
            <Form.Label column sm={12}>
              Confirm Password
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4 text-center">
            <Col>
              <Button type="submit">Register</Button>
            </Col>
          </Form.Group>
          <hr className="divider" />
          <Form.Group as={Row} className="mt-3 mb-3 text-center">
            <Col>
              <div className="text-center">
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
                <p>or sign in with:</p>
                <Button className="btn btn-secondary">
                  <FcGoogle className="me-2" />
                  <span>Login with Google</span>
                </Button>
              </div>
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};
export default Register;
