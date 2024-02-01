import {
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCartCount } from "../userActions";

const JSON_SERVER_URL = "http://localhost:5000/cart";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [category, setCategory] = useState("2-pack");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    const data = {
      name: product.name,
      info: product.info,
      img: product.img,
      price: product.price,
      category: category,
      quantity: 1,
    };
    try {
      const response = await axios.get(
        `${JSON_SERVER_URL}?name=${product.name}&category=${category}`
      );
      const cartResponse = await axios.get(JSON_SERVER_URL);
      if (response.data.length > 0) {
        const existingCartItem = response.data[0];
        const updatedQuantity = existingCartItem.quantity + 1;

        const patchResponse = await axios.patch(
          `${JSON_SERVER_URL}/${existingCartItem.id}`,
          { quantity: updatedQuantity }
        );

        console.log(patchResponse);
      } else {
        const postResponse = await axios.post(JSON_SERVER_URL, data);
        dispatch(updateCartCount(cartResponse.data.length+1));
        console.log(postResponse.data);
      }

      console.log(response.data);
      navigate("/ViewCart");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <Card
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          width: "600px",
          height: "500px",
          marginTop: "100px",
          marginLeft: "100px",
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: "1px",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            height="300"
            image={require(`../${product.img}`)}
            alt=""
            style={{
              borderRadius: "5px",
              width: "300px",
              height: "450px",
              objectFit: "cover",
              marginLeft: "10px",
              marginRight: "10px",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "1px",
            }}
          ></CardMedia>
          <CardContent>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {product.name}
            </Typography>
            <br />
            <br />
            <Typography variant="body2">{product.info}</Typography>
            <br />
            <br />
            <Typography variant="body2">Price: {product.price}</Typography>
            <br />
            <br />
            <Typography variant="body2">Category: </Typography>
            <Select
              value={category}
              onChange={(e) => handleCategChange(e)}
              style={{ marginTop: "5px", width: "100px" }}
            >
              <MenuItem value="2-pack">2 Pack</MenuItem>
              <MenuItem value="4-pack">4 Pack</MenuItem>
              <MenuItem value="5-pack">5 Pack</MenuItem>
              <MenuItem value="6-pack">6 Pack</MenuItem>
              <MenuItem value="8-pack">8 Pack</MenuItem>
              <MenuItem value="10-pack">10 Pack</MenuItem>
            </Select>
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
              onClick={() => getData()}
            >
              Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ProductDetails;
