import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartCount } from "../userActions";

const JSON_SERVER_URL = "http://localhost:5000/products";
const JSON_SERVER_URL_CART = "http://localhost:5000/cart";

const Home = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(JSON_SERVER_URL);
        const cartResponse = await axios.get(JSON_SERVER_URL_CART);
        dispatch(updateCartCount(cartResponse.data.length));

        //console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [user]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "100px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() =>
              navigate("/ProductDetails", {
                state: {
                  product: product,
                },
              })
            }
            style={{ margin: "10px", textAlign: "center" }}
          >
            <img
              src={require(`../${product.img}`)}
              alt={product.name}
              style={{ width: "300px", height: "300px", objectFit: "contain" }}
            />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
