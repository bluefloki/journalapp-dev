import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const Entries = () => {
  const { entries, getEntries, removeEntry } = useGlobalContext();
  const [redirect, setRedirect] = useState(false);
  const [entryId, setEntryId] = useState(" ");

  //GET ENTRIES
  useEffect(() => {
    getEntries();
  }, []);

  //CREATE ENTRY
  const AddJournalEntry = async () => {
    const title = prompt("Please enter the title:");
    console.log(title);
    if (title !== "") {
      const res = await axios.post(
        "/entries",
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      localStorage.setItem("title", title);
      localStorage.setItem("content", res.data.content);
      setEntryId((id) => res.data._id);
      setRedirect(true);
    }
  };

  if (redirect) return <Redirect to={`/journal/${entryId}`} />;

  return (
    <div className="font-thin container mx-auto px-64 py-20">
      <button
        className="mb-4 justify-between bg-dark-400 hover:text-primary-dark px-4 py-2 transition-all ease-in-out duration-300 rounded-sm font-semibold focus:outline-none"
        onClick={AddJournalEntry}
      >
        <i className="fas fa-plus mr-2"></i>Add Entry
      </button>
      {entries.map((entry) => {
        return (
          <div
            className="grid grid-cols-12 items-center gap-10"
            key={entry._id}
          >
            <Link
              className="grid grid-cols-12 items-center my-4 bg-dark-400 hover:text-primary-dark px-4 py-2 transition-all ease-in-out duration-300 rounded-sm content-center col-span-11"
              to={`journal/${entry._id}`}
              onClick={() => {
                localStorage.setItem("title", entry.title);
                localStorage.setItem("content", entry.content);
              }}
            >
              <div className="text-lg col-span-8">{entry.title}</div>
              <Moment format="MMMM DD, YYYY" className="col-span-3">
                {entry.createdAt}
              </Moment>
              <div className="col-span-1">
                {entry.words >= 250 ? (entry.words >= 750 ? "👑" : " ⭐") : ""}
              </div>
            </Link>
            <button
              onClick={() => removeEntry(entry._id)}
              className="focus:outline-none"
            >
              <i className="far fa-times-circle text-lg m-0 text-red-600"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
