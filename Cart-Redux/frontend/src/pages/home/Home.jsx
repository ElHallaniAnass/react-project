import "./Home.css";
import {
  Stack,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import { useGetproductsByNameQuery } from "../../redux/services/ProductsApi";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "redux/data/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// const receviedDataFromAPI = [];
const Home = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery();
  const dispatch = useDispatch();
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.cartSliceFromStore
  );
  const navigate = useNavigate();

  const quantityProsuct = (itemProduct) => {
    const mySelectedProduct = selectedProducts.find((item) => {
      return item.id === itemProduct.id;
    });
    // console.log("mySelectedProduct", mySelectedProduct);
    return mySelectedProduct.quantity;
    // return mySelectedProduct.quantity === null ? 0 : mySelectedProduct.quantity;
    // console.log("mySelectedProduct.quantity", mySelectedProduct.quantity);
  };

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
      <Stack direction={"row"} flexWrap="wrap" justifyContent={"space-evenly"}>
        {data.map((itemProduct, indexProduct) => (
          <Card
            key={itemProduct.id}
            sx={{
              maxWidth: 277,
              mx: 2,
              mb: 6,
              ":hover": {
                scale: "1.01",
                rotate: "0.5deg",
                transition: "0.3s",
              },
            }}
          >
            <CardMedia
              component="img"
              height="277"
              image={itemProduct.imageLink[0]}
              alt="Paella dish"
              onClick={() => {
                navigate(`product-details/${itemProduct.id}`);
              }}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {itemProduct.description}
              </Typography>
            </CardContent>

            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {selectedProductsID.includes(itemProduct.id) ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // width: "70px",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      dispatch(increaseQuantity(itemProduct));
                    }}
                  >
                    <Add />
                  </IconButton>
                  <Badge
                    sx={{ mx: "8px" }}
                    color="secondary"
                    // badgeContent={1}
                    badgeContent={quantityProsuct(itemProduct)}
                    // badgeContent={selectedProducts[indexProduct].quantity}
                    showZero
                  ></Badge>
                  <IconButton
                    onClick={() => {
                      dispatch(decreaseQuantity(itemProduct));
                    }}
                  >
                    <Remove />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  sx={{ textTransform: "capitalize", lineHeight: "1.1" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addToCart(itemProduct));
                  }}
                >
                  add to cart
                </Button>
              )}

              <Typography variant="body1" color={theme.palette.error.light}>
                {itemProduct.price}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>
    );
  }
};

export default Home;
