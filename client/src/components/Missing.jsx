import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>OOPS!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit our HomePage</Link>
      </div>
    </article>
  );
};
export default Missing;
