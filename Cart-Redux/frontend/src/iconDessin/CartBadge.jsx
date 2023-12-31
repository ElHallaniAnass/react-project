import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartBadge() {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.cartSliceFromStore);
  return (
    <StyledBadge badgeContent={selectedProducts.length} color="secondary">
      <ShoppingCartIcon />
    </StyledBadge>
  );
}
