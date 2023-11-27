import { createSlice } from "@reduxjs/toolkit";

// use "useSelector" to get the array
const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductsID: localStorage.getItem("selectedProductsID")
    ? JSON.parse(localStorage.getItem("selectedProductsID"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // @ts-ignore
      state.selectedProducts.push({ ...action.payload, quantity: 1 });
      // @ts-ignore
      if (!state.selectedProductsID.includes(action.payload.id)) {
        // @ts-ignore
        state.selectedProductsID.push(action.payload.id);
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },

    increaseQuantity: (state, action) => {
      const currentProduct = state.selectedProducts.find((selectedProduct) => {
        return selectedProduct.id === action.payload.id;
      });
      currentProduct.quantity += 1;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    decreaseQuantity: (state, action) => {
      const currentProduct = state.selectedProducts.find((selectedProduct) => {
        return selectedProduct.id === action.payload.id;
      });
      currentProduct.quantity -= 1;

      if (currentProduct.quantity === 0) {
        const newSelectedProducts = state.selectedProducts.filter(
          (selectedProduct) => {
            return selectedProduct.id !== action.payload.id;
          }
        );
        const newSelectedProductsID = state.selectedProductsID.filter(
          (selectedProductID) => {
            return selectedProductID !== action.payload.id;
          }
        );
        state.selectedProducts = newSelectedProducts;
        state.selectedProductsID = newSelectedProductsID;

        localStorage.setItem(
          "selectedProductsID",
          JSON.stringify(state.selectedProductsID)
        );
      }

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    deleteProducte: (state, action) => {
      // @ts-ignore
      const newSelectedProducts = state.selectedProducts.filter(
        (selectedProduct) => {
          return selectedProduct.id !== action.payload.id;
        }
      );
      const newSelectedProductsID = state.selectedProductsID.filter(
        (selectedProductID) => {
          return selectedProductID !== action.payload.id;
        }
      );
      state.selectedProducts = newSelectedProducts;
      state.selectedProductsID = newSelectedProductsID;

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, increaseQuantity, decreaseQuantity, deleteProducte } =
  cartSlice.actions;

export default cartSlice.reducer;
