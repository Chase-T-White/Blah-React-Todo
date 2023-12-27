// import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section>
      <img
        src="https://i.imgur.com/00h26Sj_d.webp?maxwidth=520&shape=thumb&fidelity=high"
        alt="Not that road"
      />
      <p>Yo, that page doesn't exist.</p>
      <Link to="/" className="link">
        Home
      </Link>
    </section>
  );
};

export default Error;
