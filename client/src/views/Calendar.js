import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Calendar = () => {
  const { entries, getEntries } = useGlobalContext();

  useEffect(() => {
    getEntries();
  }, []);

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  const d = new Date();

  let days = [];

  for (let i = 1; i <= daysInMonth(d.getMonth(), d.getFullYear()); i++) {
    days.push(i);
  }

  return (
    <div className="font-thin container mx-auto px-64 py-20">
      <h2 className="text-center text-2xl font-semibold mb-6">
        <i className="fas fa-arrow-left mr-16 cursor-pointer hover:text-primary transition-all ease-in-out duration-500"></i>
        {`${d.toLocaleString("default", {
          month: "long",
        })}, ${d.getFullYear()}`}
        <i className="fas fa-arrow-right ml-16 cursor-pointer hover:text-primary transition-all ease-in-out duration-500"></i>
      </h2>
      <div className="grid grid-cols-10 gap-8 items-center">
        {days.map((day) => {
          return (
            <Link to="/entry/1">
              <div className="flex flex-col items-center" key={day}>
                <div className="text-lg">{day}</div>
                <div>✅</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
