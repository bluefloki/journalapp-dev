import React from "react";
import { BaseForm } from "../components/RegisterForm";
import { Link } from "react-router-dom";
import { styles } from "../styles";

export default function Register() {
  return (
    <div style={{ height: "100vh" }}>
      <Link to="/">
        <button className={`fixed right-0 mr-8 my-8 ${styles.button}`}>
          Home
        </button>
      </Link>
      <div className="container mx-auto px-32 py-4">
        <div className="grid grid-cols-2 gap-4">
          <BaseForm signUp />
          <BaseForm />
        </div>
      </div>
    </div>
  );
}
