export default (state, action) => {
  switch (action.type) {
    case "SET_WORD_COUNT":
      return {
        ...state,
        wordCount: action.payload,
      };
    case "SET_SIGNED":
      return {
        ...state,
        signed: action.payload,
      };
    case "GET_ALL_ENTRIES":
      return {
        ...state,
        entries: action.payload,
      };
    case "GET_SINGLE_ENTRY":
      return {
        ...state,
        entry: action.payload,
      };
    case "CLEAR_ENTRY":
      return {
        ...state,
        entry: {},
      };
    case "REMOVE_ENTRY":
      localStorage.removeItem("content");
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    default:
      return state;
  }
};
