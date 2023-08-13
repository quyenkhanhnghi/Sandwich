import { Fab } from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StoreContext } from "../context/StoreProvider";

export const CartFab: React.FC = ({}) => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <Fab
      variant="extended"
      sx={{ mr: 3, mb: 2, position: "fixed", bottom: "0px", right: "0px" }}
      onClick={ () => dispatch({ type : "togle-cart" })}
    >
      <ShoppingCartIcon />
      Cart
    </Fab>
  );
};
