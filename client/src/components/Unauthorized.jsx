import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="text-center mt-5">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div>
        <a className="btn btn-primary" href="login">
          Go Back
        </a>
      </div>
    </section>
  );
};

export default Unauthorized;
