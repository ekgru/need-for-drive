import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "./Slider.scss";
import Slide from "./Slide";
import slideOne from "../resources/slider's images/slide_1.jpg";
import slideTwo from "../resources/slider's images/slide_2.jpg";
import slideThree from "../resources/slider's images/slide_3.jpg";
import slideFour from "../resources/slider's images/slide_4.jpg";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const content = [
  {
    head: "Бесплатная парковка",
    text:
      "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах",
    img: slideOne,
  },
  {
    head: "Страховка",
    text: "Полная страховка автомобиля",
    img: slideTwo,
  },
  {
    head: "Бензин",
    text: "Полный бак на любой заправке города за наш счёт",
    img: slideThree,
  },
  {
    head: "Обслуживание",
    text: "Автомобиль проходит еженедельное ТО",
    img: slideFour,
  },
];
export default function Slider() {
  const sliderContent = content.map((el, i) => (
    <SwiperSlide key={el.text.length * i}>
      <Slide head={el.head} text={el.text} img={el.img} key={i} />
    </SwiperSlide>
  ));
  return (
    <Swiper
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {sliderContent}
    </Swiper>
  );
}
