import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <section className="">
      <Container>
        <h1 className="">Welcome to home page</h1>
        <div className="">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nobis
            aperiam asperiores et dignissimos inventore minus, reprehenderit
            atque, distinctio alias iste ratione, dolor autem quos culpa
            recusandae assumenda omnis dolorum quod adipisci debitis maxime
            deserunt quibusdam natus. Quas nesciunt, cupiditate ipsum quae sunt,
            nemo, voluptas dicta non impedit assumenda alias minima atque eaque
            in. Dicta delectus veritatis magnam dolores sapiente repellendus
            optio officia eos repudiandae molestias corrupti ipsam ducimus error
            omnis dignissimos, iure quia autem nam similique. Mollitia est
            consequatur delectus? Nemo ad molestias minus alias accusantium
            neque? Distinctio dignissimos delectus deleniti laborum adipisci,
            itaque quidem. Illo ratione ex provident.
          </p>
        </div>
      </Container>
    </section>
  );
};
export default Home;
