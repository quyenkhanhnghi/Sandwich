import { Container, Grow, Snackbar, Typography } from '@mui/material';

import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider';
import { SandwichCard } from './SandwichCard';



export const StoreMenu: React.FC = ({}) => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <Container sx={{ mt: 10, mb: 20 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "40px", mb: 5  }}>
          MENU
        </Typography>
        <Container sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center"}}>
          {
            state.sandwiches.map(
              sandwich => <SandwichCard key={sandwich._id} item={sandwich}/>
            )
          }
        </Container>
        <Snackbar
          open={state.snackOpen}
          onClose={() => dispatch({ type : "close-snackbar" })}
          message= {state.snackMessage}
        />
    </Container>
  );
}