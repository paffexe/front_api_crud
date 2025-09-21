import { memo } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Phones from "./pages/Phones";

const App = () => {
  return (
    <div className="App">
      <Link to={"/"}>Home</Link>
      <Link to={"/phone"}>Phones</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phone" element={<Phones />} />
      </Routes>
    </div>
  );
};

export default memo(App);
