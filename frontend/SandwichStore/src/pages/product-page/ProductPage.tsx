import { Box, Fab } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import { ImageSlider } from '../../components/ImageSlider';
import LoginModal from '../../components/LoginModal';
import Navbar from '../../components/Navbar';
import { StoreMenu } from '../../components/StoreMenu';

import { Product } from '../../components/Product';
import { CartFab } from '../../components/CartFab';
import { CartDrawer } from '../../components/CartDrawer';
import RegisterModal from '../../components/RegisterModal';


export const ProductPage: React.FC = ({}) => {
  let product = useParams();



  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <CartDrawer/>
      <LoginModal />
      <RegisterModal/>
      <Product id={product.id ? product.id : ""}/>
      <CartFab/>
    </Box>
  );
}