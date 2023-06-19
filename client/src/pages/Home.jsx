import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../components/common/Logo";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <section className="text-center mt-5">
      <Container>
        <h1 className="">Welcome to My Insurance App</h1>
        <div className="mt-3">
          <p>
            Your all-in-one solution for hassle-free insurance management for
            autos.
          </p>
          <div className="home_logo">
            <img src="/mia_logo.png" alt="logo" />
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Home;
