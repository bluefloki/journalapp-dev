import React from "react";
import Navbar from "./Navbar";

export const DefaultLayout = ({ children }) => {
  return <div>{children}</div>;
};

export const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};
