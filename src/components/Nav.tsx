import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-item">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav; // Make sure this line is present
