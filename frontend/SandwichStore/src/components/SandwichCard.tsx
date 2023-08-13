import React from "react";
import { Sandwich } from "../context/reducer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const LinkStyle = {
  color : "black",
  backgroundColor : "white",
  textDecoration: "none",
  "&:link": {
    textDecoration: "none"
  },
  "&:visited": {
    textDecoration: "none"
  },
  "&:hover": {
    textDecoration: "none"
  },
  "&:active": {
    textDecoration: "none"
  }
}

const LoginButtonStyle = {
  color : "white",
  backgroundColor : "black",
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}

interface SandwichCardProps {
  item: Sandwich;
}

export const SandwichCard: React.FC<SandwichCardProps> = ({ item }) => {
  
  
  return (
    <Card sx={{ width: "100%", maxWidth: 350, flexGrow: 1 }}>
      <Link to={`/sandwich/${item._id}`}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.image}
          title={item.name}
        />
      </Link>
      <CardContent>
        <Link to={`/sandwich/${item._id}`} style={LinkStyle}>
          <Typography sx={LinkStyle} gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  )
};
