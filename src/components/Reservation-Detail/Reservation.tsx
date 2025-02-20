"use client";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface dataType {
  option: string;
  radio: string;
}

export default function Reservation() {
  const price = [
    {
      id: 1,
      title: " قیمت عادی ",
      price: "۱۰۰٬۰۰۰ تومان",
    },
    {
      id: 2,
      title: " قیمت دانشجو مکین ",
      price: " ۶۰٬۰۰۰ تومان ",
    },
  ];

  const form = useForm<dataType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: dataType) => {
    console.log(data);
  };

  const onErrorHandler = (errors: FieldErrors<dataType>) => [
    console.log(errors, "errors"),
  ];

  return (
    <div className="bg-[#F4F5FC] md:pt-6 ">
      <div className="flex flex-col md:bg-white rounded-t-3xl md:px-8 md:pt-[26px] lg:px-16 py-4 px-5">
        <h1 className="text-[18px] w-full xl:text-[24px] text-center md:text-right font-xbold text-[#253359]">
          جزییات سرویس صندلی اشتراکی
        </h1>
        <div className="md:flex w-full md:gap-4 md:mt-[25px] xl:gap-6 "> 
          <img className="py-4 w-full md:hidden " src="/imageLanding/Pic.svg" alt="img" />
          <img className="py-4 md:py-0 w-[55%] lg:w-[57%] xl:w-[69%] hidden md:block" src="/imageLanding/PicBig.svg" alt="img" />
          <div className="bg-white shadow-lg md:w-[45%] lg:w-[43%] xl:w-[34%] rounded-[16px] py-5 px-6 w-full">
            <h1 className="text-[#253359] text-[16px] xl:text-[20px] font-xbold">
              جزییات رزرو
            </h1>
            <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
              
              <div className="mt-[10px] xl:mt-6">
                <select
                  id="option"
                  {...register("option")}
                  className="text-[14px] font-xregular border-[1px] border-[#ADADAD] rounded-[8px] w-full py-3 px-3 "
                >
                  <option value=""> نوع اشتراک را انتخاب نمایید </option>
                  <option value="option1"> صندلی روزانه </option>
                  <option value="option2"> اتاق جلسات </option>
                </select>
              </div>

              <div className="flex items-center mt-2 xl:mt-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="radio"
                    {...register("radio")}
                    className="radio radio-info w-5 h-5"
                    defaultChecked
                  />
                  <span className="text-[#202020] text-[14px] font-xregular pr-[6px]">
                    روزانه
                  </span>
                </div>
                <div className="flex items-center pr-[22px]">
                  <input
                    type="radio"
                    id="radio"
                    {...register("radio")}
                    className="radio radio-info w-5 h-5"
                  />
                  <span className="text-[#202020] text-[14px] font-xregular pr-[6px]">
                    چندین روز
                  </span>
                  <span className="text-white text-[12px] font-xbold bg-[#FF9568] px-[14.7px] mr-1 py-1 rounded-2xl">
                    تخفیف
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2 xl:mt-6 xl:gap-6">
                {price.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-[#F9F9F9] p-1"
                  >
                    <span className="text-[#404040] text-[14px] font-xregular ">
                      {item.title}
                    </span>
                    <span className="text-[#202020] font-xbold ">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="">
                <button className="bg-[#253359] w-full text-[16px] font-xmedium px-[88.7px] py-[14px] text-white rounded-[8px] mt-2 xl:mt-6">
                  رزرو فضا
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
