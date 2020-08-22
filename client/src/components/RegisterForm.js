import React, { useReducer, useState } from "react";
import { styles } from "../styles";
import { useGlobalContext, authHeader } from "../context/GlobalContext";
import axios from "axios";
import { Redirect } from "react-router-dom";

export const BaseForm = ({ signUp }) => {
  const [redirect, setRedirect] = useState(false);
  const { setSigned } = useGlobalContext();

  //SET USER INPUT
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      username: "",
      email: "",
      password: "",
    }
  );

  //Handle User input
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUserInput({ [key]: value });
  };

  const renderNameField = () => {
    if (signUp) {
      return (
        <div className="mb-4">
          <label className={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            className={styles.inputField}
            placeholder="Username"
            required
            onChange={handleChange}
          />
        </div>
      );
    }
  };

  const renderHeadings = () => {
    let heading = signUp ? "Sign Up" : "Log In";
    return heading;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint;
    endpoint = signUp ? "users" : "users/login";
    try {
      const res = await axios.post(`/${endpoint}`, userInput);
      if (endpoint.includes("login")) {
        setSigned(true);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("signed", true);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) return <Redirect to="/journal" />;

  return (
    <div className="relative" style={{ top: "5vh" }}>
      <h3 className="my-2 text-3xl font-semibold">{renderHeadings()}</h3>
      <form
        onSubmit={handleSubmit}
        className={`px-8 pt-6 pb-8 mb-4 `}
        style={{ width: "450px" }}
      >
        {renderNameField()}
        <div className="mb-4">
          <label className={styles.label}>Email</label>
          <input
            type="text"
            name="email"
            className={styles.inputField}
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            className={styles.inputField}
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className={styles.button}>
            {signUp ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};
