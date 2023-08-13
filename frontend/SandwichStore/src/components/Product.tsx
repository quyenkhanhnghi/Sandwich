import { Box, Button, ButtonGroup, Container, IconButton, Snackbar, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreProvider";
import CloseIcon from '@mui/icons-material/Close';

interface ProductProps {
  id: string;
}

export const Product: React.FC<ProductProps> = ({ id }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [open, setOpen] = React.useState(false);

  const sandwich = state.sandwiches.find((s) => s._id === id);

  useEffect(() => {
    dispatch({ type: "set-current-sandwich", payload: sandwich });
  }, [sandwich])
  
  
  const onAddToCart = () => {
    setOpen(true);
    dispatch({ type : "add-to-cart" });
    dispatch({ type: "set-current-sandwich", payload: sandwich });
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return sandwich && state.currentSandwich ? (
    <Container
      sx={{
        mt: 15,
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gap: 2,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Sandwich added to the cart!"
        action={action}
      />
      <Box
        component="img"
        sx={{
          height: "90vh",
          objectFit: "cover",
          width: "100%",
        }}
        alt={sandwich.name}
        src={sandwich.image}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          <strong>{sandwich.name}</strong>
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, ml: 1 }}>
          {sandwich.price}€
        </Typography>

        <Typography variant="h5" sx={{ ml: 1 }}>
          <strong>Description: </strong>
          {sandwich.description}
        </Typography>

        <Typography variant="h5" sx={{ mt: 3, ml: 1 }}>
          <strong>Bread type:</strong> {sandwich.breadType}
        </Typography>

        <Typography variant="h5" sx={{ ml: 1, mt: 3 }}>
          <strong>Toping:</strong>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 5,
            mt: 2,
          }}
        >
          {state.currentSandwich.toppings.map((topping, i) => {
            return (
              <Box sx={{ display: "flex", mb: 1, width: "80%" }} key={topping.id}>
                <Typography variant="h6">{topping.name}</Typography>
                <Typography sx = {{ml : "auto", alignSelf: "flex-end"}} variant="h6">x{topping.number}</Typography>
                <ButtonGroup
                  sx={{ ml : "auto", alignSelf: "flex-end" }}
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button onClick={() => dispatch({ type: "set-current-topping", id: i, number: -1})}>-</Button>
                  <Button onClick={() => dispatch({ type: "set-current-topping", id: i, number: 1})}>+</Button>
                </ButtonGroup>
              </Box>
            );
          })}
        <Typography variant="subtitle1">
          Each topping cost 0.5
        </Typography>
        </Box>


        <Button onClick={onAddToCart}>
          Add to cart
        </Button>
      </Box>
      <Snackbar
          open={state.snackOpen}
          onClose={() => dispatch({ type : "close-snackbar" })}
          message= {state.snackMessage}
        />
    </Container>
  ) : null;
};
