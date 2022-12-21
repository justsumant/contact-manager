import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container ">
        <a className="navbar-brand" href="#">
          Contact manager
        </a>
        <button className="btn btn-secondary">Logout </button>
      </div>
    </nav>
  );
};

export default Header;
