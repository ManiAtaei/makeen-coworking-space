"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Services.css";

export default function Services() {
  const services = [
    {
      id: 1,
      image: "/imageLanding/Picture-Shared-chair1.svg",
      title: " صندلی اشتراکی ",
      text: " فضایی آرام مقرون به صرفه و مناسب برای فریلنسرها، استارتاپ‌ها، دانشجویان و محسوب می‌شود. ",
      res : "titleNav:pr-[85.5px] md:pr-[50px]"
    },
    {
      id: 2,
      image: "/imageLanding/Picture-Shared-chair.svg",
      title: " اتاق جلسات ",
      text: " فضایی آرام مقرون به صرفه و مناسب برای فریلنسرها، استارتاپ‌ها، دانشجویان و محسوب می‌شود. ",
      res : "titleNav:pl-[85.5px] md:pl-[50px]"
    },
  ];

  return (
    <div className="mt-7">
      <div className="bg-[#F4F5FC] pt-6 pb-10 px-3 ">
        <h1 className="text-xl text-[#00254E] font-xbold text-center">
          سرویس های مکین
        </h1>
          <Swiper
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween :20
              },
              768: {
                slidesPerView: 2, 
                spaceBetween : 30

              },
              1168: {
                slidesPerView: 2, 
                spaceBetween : 69

              },
            }}
            
          >
            {services.map((item) => (
              
              <SwiperSlide key={item.id} className={`${item.res}`}>
              <div className="bg-white rounded-lg shadow-md pt-5 pb-[17px] px-3 mt-5 ">

                  <img className="rounded-[8px] w-full" src={item.image} alt="img" />
                  <h1 className="pt-3 mobile:pr-3 text-[#0C0C0C] text-[18px] font-xbold">
                    {item.title}
                  </h1>
                  <p className="block mobile:pr-3 mobileNum:text-[16px] mt-3 text-[#606060] leading-7 text-[14px] sm:text-[16px] font-xregular">
                    {item.text}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <a className="text-[#253359] text-[15px] mobile:px-[15px] mobile:text-[16px] font-xbold underline decoration-1 underline-offset-4 pr-3 xl:px-[27px] mobileNum:pr-[27px] md:px-[12px]" href="#"> مشاهده جزییات </a>
                    <button className="bg-[#253359] text-white text-[14px] font-xbold py-[8.5px] w-2/5 lg:text-[16px] titleNav:w-[200px] ml-2 mobile:ml-4 md:mx-2 xl:mx-4 rounded-md"> رزرو فضا </button>
                  </div>

              </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </div>
  );
}
