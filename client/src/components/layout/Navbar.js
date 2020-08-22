import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Navbar = () => {
  const { setSigned } = useGlobalContext();
  const [redirect, setRedirect] = useState(false);
  const links = [
    {
      id: 2,
      name: "Entries",
      href: "/entries",
      icon: "fas fa-book",
    },
    {
      id: 3,
      name: "Achievements",
      href: "/achievements",
      icon: "fas fa-trophy",
    },
  ];

  //LOGOUT FUNCTION
  const Logout = () => {
    setSigned(false);
    localStorage.removeItem("signed");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("title");
    localStorage.removeItem("content");
    setRedirect(true);
  };

  //Render Redirect
  if (redirect) return <Redirect to="/register" />;

  return (
    <nav className="navbar fixed h-screen bg-dark-400 w-20 shadow-lg">
      <ul className="navbar-nav flex flex-col items-center">
        {links.map((link) => {
          return (
            <li className="nav-item w-full" key={link.id}>
              <Link
                to={link.href}
                className="nav-link flex flex-row items-center h-20"
              >
                <i className={link.icon}></i>
                <span className="link-text">{link.name}</span>
              </Link>
            </li>
          );
        })}
        <li className="nav-item w-full">
          <span className="nav-link flex flex-row items-center h-20 cursor-pointer">
            <i className="fas fa-moon"></i>
            <span className="link-text">Theme</span>
          </span>
        </li>
        <li className="nav-item w-full" onClick={Logout}>
          <span className="nav-link flex flex-row items-center h-20 cursor-pointer">
            <i className="fas fa-sign-out-alt"></i>
            <span className="link-text">Logout</span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
