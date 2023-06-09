import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <section className="text-center mt-5">
      <article style={{ padding: "100px" }}>
        <h1>OOPS!</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
          <Link to="/">HomePage</Link>
        </div>
      </article>
    </section>
  );
};
export default Missing;
