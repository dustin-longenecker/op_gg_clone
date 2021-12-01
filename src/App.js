import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Landing from "./pages/Landing";
import Nav from "./components/Nav"

function App() {
  return (
    <div className="App">
    <Nav />
    <Router>
       <Routes>
        <Route path="/" element={ <Landing />} />
        <Route path="/*" element={ <NoMatch /> } />

      </Routes >
    </Router>
    </div>
  );
}

export default App;
