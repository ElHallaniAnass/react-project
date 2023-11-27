import "./Cart.css";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProducte,
  increaseQuantity,
} from "redux/data/cartSlice";

const Cart = () => {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.cartSliceFromStore);
  const dispatch = useDispatch();
  let subToatl = 0;

  console.log(selectedProducts);
  return (
    <Box>
      {selectedProducts.map((selectedProduct) => {
        subToatl += selectedProduct.quantity * selectedProduct.price;
        return (
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              p: "2px",
              border: "1px solid #ffr",
              borderRadius: "10px",
              // width: "500px",
              mb: "15px",

              /* Extra small devices (phones, 600px and down) */
              "@media only screen and (max-width: 600px)": {
                width: "300px",
              },

              /* Small devices (portrait tablets and large phones, 600px and up) */
              "@media only screen and (min-width: 600px)": {
                width: "400px",
              },

              /* Medium devices (landscape tablets, 768px and up) */
              "@media only screen and (min-width: 768px)": {
                width: "500px",
              },
            }}
          >
            <IconButton
              onClick={() => {
                dispatch(deleteProducte(selectedProduct));
              }}
            >
              <Delete />
            </IconButton>
            <Typography>
              $
              {Number(selectedProduct.price) * Number(selectedProduct.quantity)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: "30px",
                width: "80px",
              }}
            >
              <IconButton
                onClick={() => {
                  dispatch(increaseQuantity(selectedProduct));
                }}
              >
                <Add />
              </IconButton>
              <Badge
                sx={{ mx: "8px" }}
                color="secondary"
                badgeContent={selectedProduct.quantity}
                showZero
              ></Badge>
              <IconButton
                onClick={() => {
                  dispatch(decreaseQuantity(selectedProduct));
                }}
              >
                <Remove />
              </IconButton>
            </Box>
            <Typography>{selectedProduct.productName}</Typography>

            <img
              src={selectedProduct.imageLink[0]}
              alt={"img"}
              loading="lazy"
              style={{ maxWidth: "80px", maxHeight: "100px" }}
            ></img>
          </Paper>
        );
      })}

      <Divider sx={{ mt: "40px", mb: "40px" }}></Divider>

      <Paper
        sx={{
          display: "flex",

          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ffr",
          borderRadius: "10px",
          m: "auto",
          width: "100%",

          /* Extra small devices (phones, 600px and down) */
          "@media only screen and (max-width: 600px)": {
            width: "150px",
          },

          /* Small devices (portrait tablets and large phones, 600px and up) */
          "@media only screen and (min-width: 600px)": {
            width: "250px",
          },

          /* Medium devices (landscape tablets, 768px and up) */
          "@media only screen and (min-width: 768px)": {
            width: "350px",
          },
        }}
      >
        <Typography>Cart Summer </Typography>
        <Divider></Divider>

        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Typography mr={"40px"}>Subtotal</Typography>
          <Typography ml={"40px"}>${subToatl}</Typography>
        </Stack>
        <Button>CHEKOUT</Button>
      </Paper>
    </Box>
  );
};

export default Cart;
