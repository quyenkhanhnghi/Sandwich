import React from 'react';
import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import { Container, Typography } from '@mui/material';


const bogliasco = "https://i.ibb.co/K0BjnqH/tasty-breakfast-appetizing-croissant-with-salami-cheese-tomatoes-2829-5526-Large.png";
const countyClare = "https://i.ibb.co/yyMHkwV/juicy-red-pepper-looks-from-wholemeal-bread-sandwich-Large.png";
const BltSandwich = "https://i.ibb.co/8X4dK8T/club-sandwich-panini-with-ham-cheese-tomato-herbs-2829-19928-Large.png";
const banhMi = "https://i.ibb.co/FmkSwM9/side-view-chicken-doner-with-tomato-greens-lettuce-bread-141793-4827-Large.png";



export const ImageSlider: React.FC = ({}) => {
  return (
    <HeroSlider
      height={"70vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
      }}
    >
      <Overlay>
        <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "white", flexDirection: "column"}}>
          <Typography variant='h2'>
            <strong>Welcome to Royal Sandwich</strong>
          </Typography>
          <Typography variant='h5'>
            By Nghi Khanh Quyen and Anh Duy Tran
          </Typography>
        </Container>
      </Overlay>

      <Slide
        label="Banh Mi - Vietnam"
        background={{
          backgroundImageSrc: banhMi
        }}
      />

      <Slide
        label="Croissant Sandwich"
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      <Slide
        label="Bacon Sandwich"
        background={{
          backgroundImageSrc: countyClare
        }}
      />

      <Slide
        label="BLT Sandwich"
        background={{
          backgroundImageSrc: BltSandwich
        }}
      />
      <MenuNav />
    </HeroSlider>
  );
}