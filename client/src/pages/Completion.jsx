import Container from "react-bootstrap/Container";
import axios from "../api/axios";

const Completion = ({ sessionId }) => {
  const portalSessionHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("api/create-port-session", {
      sesssion_id: sessionId,
    });
    console.log(response.data);
  };
  return (
    <section>
      <div className="product Box-root">
        {/* <Logo /> */}
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form onSubmit={portalSessionHandler}>
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};
export default Completion;
