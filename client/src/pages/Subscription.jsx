import Container from "react-bootstrap/Container";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscription = () => {
  const { user } = useSelector((state) => state.auth);
  const [prices, setPrices] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  const createSession = async (priceId) => {
    const { data: res } = await axios.post(
      "api/subs/session",
      { priceId },
      config
    );
    console.log(res.url);
    window.location.href = res.url;
  };

  const fetchPrices = async () => {
    const { data: res } = await axios.get("api/subs/prices", config);
    // console.log(res);
    setPrices(res.data);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <section>
      <Container>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Pricing</h1>
          <p className="lead">Choose the plan which best suit your budget.</p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="card-deck mb-3 text-center d-flex align-items-center gap-4">
            {prices.map((price) => {
              return (
                <div key={price.id} className="card mb-4 box-shadow">
                  <div className="card-header">
                    <h4 className="my-0 font-weight-normal text-capitalize">
                      {price.lookup_key}
                    </h4>
                  </div>
                  <div className="card-body d-flex align-items-center flex-column">
                    <h1 className="card-title pricing-card-title fs-1">
                      ${price.unit_amount / 100}{" "}
                      <small className="text-muted fs-4">
                        / {price.recurring.interval}
                      </small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>30 days support</li>
                      <li>30 days coverage</li>
                      <li>Priority email support</li>
                      <li>Help center access</li>
                    </ul>
                    <div>
                      <button
                        className="btn btn-lg btn-block btn-primary"
                        id="checkout-and-portal-button"
                        onClick={() => createSession(price.id)}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Subscription;
