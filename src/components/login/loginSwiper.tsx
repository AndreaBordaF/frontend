import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Box } from "@mui/material";
import loginImg01 from "../../assets/images/login_img01.png";
import loginImg02 from "../../assets/images/login_img02.png";
import loginImg03 from "../../assets/images/login_img03.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./pagination.css";

const SwiperComponent: React.FC = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      allowTouchMove={false}
      simulateTouch={false}
      effect="fade"
      style={{ height: "100%" }}
      speed={1800}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
      }}
      autoplay={{
        delay: 4000,
      }}
      modules={[Autoplay, Pagination, EffectFade]}
    >
      <SwiperSlide>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${loginImg01})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(150deg, rgba(15,38,52,0.75) 16%, rgba(47,175,126,0.75) 100%)",
            },
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${loginImg02})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(150deg, rgba(15,38,52,0.75) 16%, rgba(47,175,126,0.75) 100%)",
            },
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${loginImg03})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(150deg, rgba(15,38,52,0.75) 16%, rgba(47,175,126,0.75) 100%)",
            },
          }}
        />
      </SwiperSlide>
      <div className="swiper-pagination" />
    </Swiper>
  );
};

export default SwiperComponent;
