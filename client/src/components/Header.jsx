import Logo from "./common/Logo";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel`}></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {user && (
              <Nav className="d-flex align-items-center justify-content-center justify-content-md-end flex-grow-1 pe-3">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
                <a className="nav-link" href="/users">
                  Users
                </a>
                <a className="nav-link" href="/reports">
                  Reports
                </a>
                <NavDropdown
                  id="nav-dropdown-example"
                  title="Contacts"
                  menuVariant="light"
                >
                  <NavDropdown.Item href="/emergencies">
                    Emergency
                  </NavDropdown.Item>
                  <NavDropdown.Item href="mechanics">Mechanic</NavDropdown.Item>
                  <NavDropdown.Item href="/tows">Tow</NavDropdown.Item>
                </NavDropdown>
                <a className="nav-link" href="/subscription">
                  Subscription
                </a>
                <button
                  className="btn btn-primary ms-0 ms-md-4"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default Header;
