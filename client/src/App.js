import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { createBrowserHistory } from "history";
import Routes from "./routes";

function App() {
  return (
    <div className="bg-dark text-white min-h-screen font-serif">
      <GlobalProvider>
        <Router history={createBrowserHistory()}>
          <Routes />
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
