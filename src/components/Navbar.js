import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../components/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../userActions";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/cart";

const Navbar = () => {
  const navigate = useNavigate();
  //const [cartCount, setCartCount] = useState(0);
  //const { user } = useContext(UserContext);

  //const { handleLogout } = useContext(UserContext);

  const [cartEnable, setCartEnabled] = useState(true);

  const user = useSelector((state) => state.user);
  const cartCount = useSelector((state) => state.cartCount);
  const dispatch = useDispatch();

  const getCartCount = async () => {
    try {
      const response = await axios.get(JSON_SERVER_URL);

      if (response.data.length > 0) {
        setCartEnabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCount();
  }, [user, cartCount]);

  const LogoutClick = () => {
    dispatch(logoutUser());
    //handleLogout();
    navigate("/Login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        Beverages Online &nbsp;&nbsp;
        {user && (
          <Link
            to="/Home"
            style={{
              color: "black",
              fontSize: "0.8em",
              textDecoration: "none",
              fontStyle: "normal",
              fontWeight: "normal",
            }}
          >
            Home
          </Link>
        )}
      </div>
      {user ? (
        <>
          <div className="navbar-links">
            <Button
              className="navbar-link button"
              style={{ backgroundColor: "lightgreen", color: "white" }}
              onClick={() => navigate("/ViewCart")}
              disabled={cartEnable}
            >
              View Cart({cartCount})
            </Button>
            <Button
              className="navbar-link button"
              style={{ color: "black" }}
              onClick={() => LogoutClick()}
            >
              Logout
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-links">
            <Link to="/ContactUs">CatactUs</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
