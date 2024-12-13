import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import ResidentList from './ResidentList';
import useProperties from './hooks/useProperties';
import { PuffLoader } from 'react-spinners';

const sliderSettings = {
  spaceBetween: 20,
  slidesPerView: 4,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: { clickable: true },
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2, 
    },
    576: {
      slidesPerView: 2,  
    },
    0: {
      slidesPerView: 2,  
    },
  },
};

const Residency = () => {
  const { data, isError, isLoading } = useProperties();
  if (isError) {
    return (
      <Typography variant='h2' sx={{ color: 'black' }}>Error While Fetching Data</Typography>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ width: '100vw', ml: 80, mb: 20 }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label='puff-loading'
        />
      </Box>
    );
  }
  return (
    <Box id="residencies" sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h5" sx={{ color: "#e86130", fontFamily: "Poppins", fontWeight: 400, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Best Choices
        </Typography>
        <Typography variant="h4" sx={{ color: "#25204b", fontFamily: "Poppins", fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Popular Residencies
        </Typography>
      </Box>
      <Swiper modules={[Navigation, Pagination, Autoplay]} {...sliderSettings}>
        {data.slice(0,6).map((card, i) => (
          <SwiperSlide key={i}>
            <ResidentList card={card}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Residency;
