import { useSwiper } from "swiper/react";
import NextIcon from '../../../assets/next.png'
export const SwiperButtonNext = ({position }) => {
  const swiper = useSwiper();
  if(position === 'right')return <button className="absolute top-[50%] -translate-y-[50%] z-20 right-2" onClick={() => swiper.slideNext()}><img src={NextIcon}/></button>;
  if(position === 'left')return <button className="absolute top-[50%] -translate-y-[50%] z-20 left-2" onClick={() => swiper.slidePrev()}><img className="rotate-180" src={NextIcon}/></button>;
};