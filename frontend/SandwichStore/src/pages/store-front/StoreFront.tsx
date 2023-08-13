import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import { ImageSlider } from "../../components/ImageSlider";
import { StoreMenu } from "../../components/StoreMenu";
import LoginModal from "../../components/LoginModal";
import { Box, Fab } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartFab } from "../../components/CartFab";
import { CartDrawer } from "../../components/CartDrawer";
import RegisterModal from "../../components/RegisterModal";

export const StoreFront: React.FC = ({}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <CartDrawer/>
      <LoginModal />
      <RegisterModal/>
      <ImageSlider />
      <StoreMenu />
      <CartFab/>
    </Box>
  );
};
