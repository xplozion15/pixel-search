import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">Pixel-search</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </ul>
      </nav>
    </>
  );
};

export { Navbar };
