import { useGetOneproductByIdQuery } from "redux/services/ProductsApi";
import "./Product-details.css";

import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { useRef, useState } from "react";

const ProductDetails = () => {
  let { id } = useParams();
  const { data, error, isLoading } = useGetOneproductByIdQuery(id);
  const [index, setIndex] = useState(0);
  const myRefImage = useRef(null);
  const handleTab = (index) => {
    setIndex(index);

    const images = myRefImage.current.children;
    console.log("imageeeeeeeeeeee", images);
    // for (let i = 0; i < images.length; i++) {
    //   images[i].className = images.replace("active", "");
    // }
    // images[index].className = "active";
  };
  // console.log(data);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          Error
        </Typography>
      </Box>
    );
  }
  if (data) {
    return (
      <div className="box-product-details">
        {/* Product-details {id} */}
        <div className="father-img">
          <img className="tail-img" src={data.imageLink[0]}></img>
        </div>
        <div className="details-and-changing">
          <h1 className="t-shirt">{data.productName}</h1>
          <p className="descrption">{data.description}</p>
          <div
            className="list-img"
            ref={
              // @ts-ignore
              myRefImage
            }
          >
            {data.imageLink.map((imgLinkItem, imgLinkIndex) => (
              <img
                className="boy-img"
                src={imgLinkItem}
                key={imgLinkIndex}
                onClick={() => {
                  handleTab(imgLinkIndex);
                  console.log("tttttttttt");
                  console.log(imgLinkIndex);
                }}
              ></img>
            ))}
          </div>

          {/* {selectedProductsID.includes(itemProduct.id) ? ( */}
          {false ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70px",
              }}
            >
              <IconButton
              // onClick={() => {
              //   dispatch(increaseQuantity(itemProduct));
              // }}
              >
                <Add />
              </IconButton>
              <Badge
                sx={{ mx: "8px" }}
                color="secondary"
                // badgeContent={1}
                badgeContent={10}
                // badgeContent={quantityProsuct(itemProduct)}
                // badgeContent={selectedProducts[indexProduct].quantity}
                showZero
              ></Badge>
              <IconButton
              // onClick={() => {
              //   dispatch(decreaseQuantity(itemProduct));
              // }}
              >
                <Remove />
              </IconButton>
            </Box>
          ) : (
            <Button
              sx={{ textTransform: "capitalize", lineHeight: "1.1" }}
              variant="contained"
              color="primary"
              // onClick={() => {
              //   dispatch(addToCart(itemProduct));
              // }}
            >
              add to cart
            </Button>
          )}
          {/* <button className="btn-addToStart">Add To Start</button> */}
        </div>
      </div>
    );
  }
};

export default ProductDetails;
