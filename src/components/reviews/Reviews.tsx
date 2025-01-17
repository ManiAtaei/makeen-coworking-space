"use client";
import React from "react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Reviews.css"

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      text: "این فضای کار اشتراکی یک تجربه فوق‌العاده رو برای من فراهم کرد. محیطش بسیار آرام و حرفه‌ایه.",
      image: "/imageLanding/Ellipse 114.svg",
      date: " 1403/03/12",
      name: "فرزانه حیدری",
      rate: "4.5",
      rates : "/iconLanding/5-Stars.svg"
    },
    {
      id: 2,
      text: "این فضای کار اشتراکی یک تجربه فوق‌العاده رو برای من فراهم کرد. محیطش بسیار آرام و حرفه‌ایه.",
      image: "/imageLanding/Ellipse 114.svg",
      date: " 1403/03/12",
      name: "فرزانه حیدری",
      rate: "4.5",
      rates : "/iconLanding/5-Stars.svg"
    },
    {
      id: 3,
      text: "این فضای کار اشتراکی یک تجربه فوق‌العاده رو برای من فراهم کرد. محیطش بسیار آرام و حرفه‌ایه.",
      image: "/imageLanding/Ellipse 114.svg",
      date: " 1403/03/12",
      name: "فرزانه حیدری",
      rate: "4.5",
      rates : "/iconLanding/5-Stars.svg"
    },
    {
      id: 4,
      text: "این فضای کار اشتراکی یک تجربه فوق‌العاده رو برای من فراهم کرد. محیطش بسیار آرام و حرفه‌ایه.",
      image: "/imageLanding/Ellipse 114.svg",
      date: " 1403/03/12",
      name: "فرزانه حیدری",
      rate: "4.5",
      rates : "/iconLanding/5-Stars.svg"
    },
  ];

  return (
    <div className="bg-[#F4F5FC]">
      <div className="mr-5 ml-5 mt-8 xl:mx-[87px] ">
        <h1 className="text-[15px] text-[#253359] font-xbold lg:text-[20px] pb-5 lg:text-center">
          نظر کاربران مکین
        </h1>
        <h3 className="text-[#404040] text-3 lg:text-[16px] font-xregular lg:font-xmedium mt-1 lg:text-center">
          مکین مکان مورد اطمینان خیلی هاست!
        </h3>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          className="swipper2"
          modules={[Pagination , Mousewheel , Keyboard , Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 17,
            },
            360: {
              slidesPerView: 1.4,
              spaceBetween: 17,
            },
            435: {
              slidesPerView: 1.4,
              spaceBetween: 17,
            },
            500: {
              slidesPerView: 1.6,
              spaceBetween: 17,
            },
            600: {
              slidesPerView: 1.8,
              spaceBetween: 17,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 17,
            },
            820: {
              slidesPerView: 2.3,
              spaceBetween: 17,
            },
            910: {
              slidesPerView: 2.5,
              spaceBetween: 17,
            },
            1280: {
              slidesPerView: 2.6,
              spaceBetween: 17,
            },
            1350: {
              slidesPerView: 3,
              spaceBetween: 17,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 31,
            },
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white mt-[13px] pr-4 pt-3 lg:pt-5 rounded-[16px] mb-[28px] xl:mb-[67px] lg:mt-[16.67px] ">
                <img src="/iconLanding/Comma.svg" alt="img" />
                <p className="text-[#404040] leading-5 text-[10px] w-11/12 mobileNum:w-11/12 mobile:text-[12px] xl:mt-[31px] font-xregular mt-3 md:text-[14px]">
                  {item.text}
                </p>
                <div className="flex items-center mt-4">
                  <img src={item.image} alt="img" />
                  <div className="flex flex-col mr-2 py-[2px] gap-1">
                    <span className="text-[#404040] text-3 font-xbold pt-[2px]">
                      {item.name}
                    </span>
                    <span className="text-[#868686] text-3 font-xregular pb-[2px]">
                      {item.date}
                    </span>
                  </div>
                  <span className="text-[#404040] xl:hidden mr-[25px] text-[14px] font-xregular">
                    {item.rate}
                  </span>
                  <img className="mr-11 xl:block hidden" src={item.rates} alt="img" />
                  <img
                    className="mr-[5.33px] xl:hidden"
                    src="/iconLanding/Star.svg"
                    alt="img"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
