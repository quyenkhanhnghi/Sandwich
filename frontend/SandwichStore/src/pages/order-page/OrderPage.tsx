import { Box } from '@mui/material';
import React from 'react'
import { CartFab } from '../../components/CartFab';
import { Order } from '../../components/Order';
import Navbar from '../../components/Navbar';
import { CartDrawer } from '../../components/CartDrawer';

export const OrderPage: React.FC = ({}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <CartFab/>
      <CartDrawer/>
      <Order/>
    </Box>
  );
}