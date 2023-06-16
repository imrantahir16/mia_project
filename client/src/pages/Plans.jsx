import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import Spinner from "../components/common/Spinner";

const Plans = () => {
  const { user } = useSelector((state) => state.auth);
  const [plan, setPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  const billingPortalHandler = async () => {
    const { data: res } = await axios.post(
      "api/subs/customer-portal",
      {},
      config
    );
    // console.log(res.data);

    window.location.href = res.url;
  };

  const fetchPlan = async () => {
    const { data: res } = await axios.get("api/plans", config);
    setPlan(res);
    // console.log(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlan();
  }, []);
  return (
    <section className="text-center">
      <Container>
        {isLoading && <Spinner />}
        {plan.planId && (
          <>
            <h2 className="mt-5">You have subscribed to our {plan.planName}</h2>
            <button
              className="btn btn-primary my-5"
              onClick={billingPortalHandler}
            >
              Manage you plan
            </button>
          </>
        )}
        {!plan.planId && !isLoading && (
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
