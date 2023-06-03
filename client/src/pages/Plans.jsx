import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import Spinner from "../components/common/Spinner";

const Plans = () => {
  const { user } = useSelector((state) => state.auth);
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  const fetchPlan = async () => {
    const { data: res } = await axios.get("/api/plans", config);
    setPlan(res.plan);
    console.log(res.plan);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPlan();
  }, []);
  return (
    <section className="text-center">
      <Container>
        {isLoading && <Spinner />}
        {plan && <h2 className="mt-5">You have subscribed to our {plan}</h2>}
        {!plan && !isLoading && (
          <>
            <h2 className="mt-5">You have not subscribed to any plan yet</h2>
            <a className="btn btn-primary mt-4" href="/subscription">
              Subscribe Now
            </a>
          </>
        )}
      </Container>
    </section>
  );
};
export default Plans;
