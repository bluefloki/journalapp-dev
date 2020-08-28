import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";
import { useGlobalContext } from "../context/GlobalContext";
import { styles } from "../styles";
import axios from "axios";

function Journal(props) {
  const { wordCount } = useGlobalContext();
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  //GET TITLE
  const handleTitle = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("title", e.target.value);
  };

  //SAVE ENTRY
  const saveEntry = async () => {
    try {
      if (title !== " " && title !== null) {
        await axios.patch(
          `/entries/${props.match.params.id}`,
          {
            title,
            content: localStorage.getItem("content"),
            words: wordCount,
          },
          { headers: { Authorization: `Bearer ${localStorage.accessToken}` } }
        );
        console.log(localStorage.getItem("content"));
        alert("Entry Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <button
          className={`fixed right-0 mr-8 my-8 ${styles.button}`}
          onClick={saveEntry}
        >
          Save
        </button>
        <div
          className={`fixed right-0 bottom-0 mr-8 mb-8 font-semibold ${
            wordCount >= 250
              ? wordCount >= 750
                ? "text-yellow-500"
                : "text-green-500"
              : ""
          }`}
        >
          {wordCount} words
        </div>
      </div>
      <div className="font-thin container mx-auto px-64 py-20">
        <div className="text-center mx-auto">
          <input
            className="appearance-none bg-dark w-full text-xl text-white leading-tight focus:outline-none mb-8"
            type="text"
            name="title"
            placeholder="Title"
            autoComplete="off"
            onChange={handleTitle}
            value={title}
          />
        </div>
        <Editor />
      </div>
    </div>
  );
}

export default Journal;
