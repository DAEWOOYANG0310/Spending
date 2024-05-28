import "./App.css";
import Router from "../shared/Router";
import Detail from "../pages/Detail";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
