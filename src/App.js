import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddDish from "./Component/AddDish";
import Login from "./Component/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewDish from "./Component/ViewDish";
import Header from "./Component/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/AddDish" element={<AddDish />} />
          <Route path="/ViewDish" element={<ViewDish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
