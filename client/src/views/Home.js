import React, { useState } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/register">
        <button className={`fixed right-0 mr-8 my-8 ${styles.button}`}>
          Log In
        </button>
      </Link>
      <div className="font-thin container mx-auto px-64 py-20">
        Hello this is home and it works
      </div>
    </div>
  );
}

export default Home;
