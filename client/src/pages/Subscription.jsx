import Container from "react-bootstrap/Container";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import Completion from "./Completion";
import Cancelled from "./Cancelled";
import { useSelector } from "react-redux";

const Subscription = () => {
  const user = useSelector((state) => state.auth.user);
  let [message, setMessage] = useState("");
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);

  //   if (query.get("success")) {
  //     setSuccess(true);
  //     setSessionId(query.get("session_id"));
  //   }

  //   if (query.get("canceled")) {
  //     setSuccess(false);
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }, [sessionId]);
  const monthlySubHandler = async (e) => {
    e.preventDefaul();
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${user.accessToken}`,
    //   },
    // };
    // console.log("i am send data");
    // const response = await axios.post(
    //   "api/create-checkout-session",
    //   {
    //     lookup_keys: "monthly",
    //   },
    //   config
    // );
    fetch(process.env.REACT_APP_BASE - URL + "api/create-checkout-session", {
      lookup_key: "monthly",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    // console.log(response.data);
  };
  const yealySubHandler = (e) => {
    e.preventDefaul();
  };

  useEffect(() => {});
  return (
    <>
      <section>
        <Container>
          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">Pricing</h1>
            <p className="lead">Choose the plan which best suit your budget.</p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="card-deck mb-3 text-center d-flex align-items-center gap-4">
              <div className="card mb-4 box-shadow">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Monthly</h4>
                </div>
                <div className="card-body d-flex align-items-center flex-column">
                  <h1 className="card-title pricing-card-title">
                    $10 <small className="text-muted">/ mo</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>30 days support</li>
                    <li>30 days coverage</li>
                    <li>Priority email support</li>
                    <li>Help center access</li>
                  </ul>
                  <div>
                    <form onSubmit={monthlySubHandler}>
                      {/* Add a hidden field with the lookup_key of your Price */}
                      <input
                        type="hidden"
                        name="lookup_key"
                        value="{{PRICE_LOOKUP_KEY}}"
                      />
                      <button
                        className="btn btn-lg btn-block btn-primary"
                        id="checkout-and-portal-button"
                        type="submit"
                      >
                        Checkout
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card mb-4 box-shadow">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Yearly</h4>
                </div>
                <div className="card-body d-flex align-items-center flex-column">
                  <h1 className="card-title pricing-card-title">
                    $100 <small className="text-muted">/ yr</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>365 days support</li>
                    <li>365 days coverage</li>
                    <li>Phone and email support</li>
                    <li>Help center access</li>
                  </ul>
                  <div>
                    <form onSubmit={yealySubHandler}>
                      {/* Add a hidden field with the lookup_key of your Price */}
                      <input
                        type="hidden"
                        name="lookup_key"
                        value="{{PRICE_LOOKUP_KEY}}"
                      />
                      <button
                        className="btn btn-lg btn-block btn-primary"
                        id="checkout-and-portal-button"
                        type="submit"
                      >
                        Checkout
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* )} */}
      {success && sessionId !== "" && <Completion sessionId={sessionId} />}
      {message !== "" && <Cancelled message={message} />}
    </>
  );
};
export default Subscription;
