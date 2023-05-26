const Subscription = () => {
  return (
    <section>
      <div className="container">
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Pricing</h1>
          <p className="lead">Choose the plan which best suit your budget.</p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="card-deck mb-3 text-center d-flex align-items-center justify-content-between gap-4">
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Monthly</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $10 <small className="text-muted">/ mo</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>30 days support</li>
                  <li>30 days coverage</li>
                  <li>Priority email support</li>
                  <li>Help center access</li>
                </ul>
                <a
                  href="/monthly"
                  type="button"
                  className="btn btn-lg btn-block btn-primary"
                >
                  Get started
                </a>
              </div>
            </div>
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Yearly</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $100 <small className="text-muted">/ yr</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>365 days support</li>
                  <li>365 days coverage</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
                <a
                  href="/yearly"
                  type="button"
                  className="btn btn-lg btn-block btn-primary"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Subscription;
