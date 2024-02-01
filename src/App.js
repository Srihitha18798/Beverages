import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import ViewCart from "./components/ViewCart";
import PaymentSuccess from "./components/PaymentSuccess";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
        </div>
        <div className="bg-image">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/ProductDetails" element={<ProductDetails />}></Route>
            <Route exact path="/ViewCart" element={<ViewCart />}></Route>
            <Route exact path="/PaymentSuccess" element={<PaymentSuccess />}></Route>
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
