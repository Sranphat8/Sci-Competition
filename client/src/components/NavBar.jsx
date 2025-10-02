import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";
const NavBar = () => {
  const { user } = useAuthContext();
  console.log(user);

  const menuItems = [
    {
      name: "News",
      url: "/news",
    },
    {
      name: "Activities",
      url: "/activities",
    },
    {
      name: "Add new activity",
      url: "/add-activity",
    },
    {
      name: "About Us",
      url: "/",
    },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.url}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/">
          SCI Competetion
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => {
            return (
              <li key={item.name}>
                <a href={item.url}>{item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <div>
            <UserProfile />
          </div>
        ) : (
          <div className="space-x-2">
            {" "}
            <a href="/register" className="btn btn-soft btn-primary">
              Register
            </a>
            <a href="/login" className="btn btn-soft btn-success">
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
