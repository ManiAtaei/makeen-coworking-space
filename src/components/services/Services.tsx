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
    },
    {
      id: 2,
      image: "/imageLanding/Picture-Shared-chair.svg",
      title: " اتاق جلسات ",
      text: " فضایی آرام مقرون به صرفه و مناسب برای فریلنسرها، استارتاپ‌ها، دانشجویان و محسوب می‌شود. ",
    },
  ];

  return (
    <div className="mt-[-30px]">
      <div className="bg-[#F4F5FC] flex flex-col pt-6 pb-10 px-3">
        <h1 className="text-xl text-[#00254E] font-xbold text-center">
          {" "}
          سرویس های مکین{" "}
        </h1>
        <div className="bg-white rounded-lg shadow-md flex pt-5 px-3 mt-5 ">
          <Swiper
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination]}
            className="mySwiper"
            spaceBetween={20}
          >
            {services.map((item) => (
              <div key={item.id} className="flex flex-col items-center ">
                <SwiperSlide>
                  <img className="rounded-[8px]" src={item.image} alt="img" />
                  <h1 className="pt-3 text-[#0C0C0C] text-[18px] font-xbold">
                    {item.title}
                  </h1>
                  <p className="hidden text-[#606060] text-[14px] font-xregular">
                    {item.text}
                  </p>
                  <div>
                    <button> رزرو فضا </button>
                    <a href="#"> مشاهده جزییات </a>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
