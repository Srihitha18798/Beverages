import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartCount } from "../userActions";

const JSON_SERVER_URL = "http://localhost:5000/cart";

const ViewCart = () => {
  const user = useSelector((state) => state.user);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCartData = async () => {
      try {
        const response = await axios.get(JSON_SERVER_URL);

        setCartData(response.data);
        setCartCount(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getCartData();
  }, [user]);

  const removeCartItam = async (id) => {
    try {
      const deleteResponse = await axios.delete(`${JSON_SERVER_URL}/${id}`);
      console.log(deleteResponse);
      navigate("/Home");
      dispatch(updateCartCount(cartCount - 1));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table
          style={{
            paddingLeft: "50dp",
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "1000px",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "1px solid black",
                }}
              >
                Product Image
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "1px solid black",
                }}
              >
                Product Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "1px solid black",
                }}
              >
                Category
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "1px solid black",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "1px solid black",
                }}
              >
                Total Price
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "1px solid black",
                }}
              >
                Remove
              </TableCell>
            </TableRow>
            {cartData.map((cart) => (
              <TableRow
                key={cart.id}
                style={{ height: "150px", alignItems: "center" }}
              >
                <TableCell style={{ border: "1px solid black" }}>
                  <img
                    src={require(`../${cart.img}`)}
                    alt={cart.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  ></img>
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {cart.name}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {cart.category}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {cart.quantity}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {cart.price}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  <Button
                    style={{
                      textDecoration: "none",
                      backgroundColor: "white",
                      color: "blue",
                    }}
                    onClick={() => removeCartItam(cart.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        style={{
          marginBottom: "10px",
          paddingLeft: "25px",
          backgroundColor: "#29a329",
          color: "white",
        }}
        onClick={() => navigate("/PaymentSuccess")}
      >
        Place Order
      </Button>
    </>
  );
};

export default ViewCart;
