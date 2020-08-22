import React, { useContext, createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";

export const authHeader = {
  Authorization: `Bearer ${localStorage.accessToken}`,
};

const initialState = {
  wordCount: 0,
  signed: localStorage.signed,
  entries: [],
  entry: {},
};

const GlobalContext = createContext(initialState);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const countWords = (str) => {
    return str.split(" ").filter(function (n) {
      return n !== "";
    }).length;
  };

  //SET WORD COUNT
  const setWordCount = (string) => {
    const count = countWords(string);
    dispatch({
      type: "SET_WORD_COUNT",
      payload: count,
    });
  };

  //SET SIGNED
  const setSigned = (payload) => {
    dispatch({
      type: "SET_SIGNED",
      payload,
    });
  };

  //GET ALL ENTRIES
  const getEntries = async () => {
    try {
      const res = await axios.get("/entries", { headers: authHeader });
      dispatch({
        type: "GET_ALL_ENTRIES",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //GET SINGLE ENTRY
  const getSingleEntry = async (id) => {
    try {
      const res = await axios.get(`/entries/${id}`, { headers: authHeader });
      dispatch({
        type: "GET_SINGLE_ENTRY",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //CLEAR ENTRY
  const clearEntry = () => {
    dispatch({
      type: "CLEAR_ENTRY",
    });
  };

  //DELETE ENTRY
  const removeEntry = async (id) => {
    try {
      await axios.delete(`entries/${id}`, { headers: authHeader });
      dispatch({
        type: "REMOVE_ENTRY",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        wordCount: state.wordCount,
        signed: state.signed,
        entries: state.entries,
        entry: state.entry,
        setWordCount,
        setSigned,
        getEntries,
        getSingleEntry,
        clearEntry,
        removeEntry,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
