"use client";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidLeftArrow } from "react-icons/bi";
import { FieldErrors, useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";
import { Span } from "next/dist/trace";

export default function register() {
  interface dataType {
    username: string;
    email: string;
    description: string;
  }

  const formMap = [
    {
      id: 1,
      name: " نام ",
      field: " نام خود را وارد نمایید ",
      error: " پر کردن فیلد نام کاربر اجباری است ",
    },
    {
      id: 2,
      name: " نام خانوادگی ",
      field: " نام خانوادگی خود را وارد نمایید ",
      error: " پر کردن فیلد نام خانوادگی اجباری است ",
    },
    {
      id: 3,
      name: " کد ملی ",
      field: " کد ملی خود را وارد نمایید ",
      error: " پر کردن فیلد کد ملی اجباری است ",
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
    <div className="px-6 max-w-[500px] mx-auto md:max-w-[800px] flex flex-col justify-center h-screen">
      <div className="flex justify-end pt-[27px] ">
        <IoCloseOutline className="w-7 h-7" />
      </div>
      <span className="flex items-center text-[16px] font-xbold gap-[7px] mt-[-17px]">
        <BiSolidLeftArrow />
        فرم ثبت نام مکین
      </span>
      <div className="mt-4 ">
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {formMap.map((item) => (
              <div key={item.id} className="flex flex-col pt-2 ">
                <label
                  className="text-[14px] font-xbold text-[#202020] "
                  htmlFor="username"
                >
                  {item.name}
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                  placeholder={item.field}
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "پر کردن فیلد نام کاربر اجباری است ",
                  })}
                />
                <p className="error">{errors.username?.message}</p>
              </div>
            ))}
            <div className="flex flex-col pt-2">
              <label
                className="text-[14px] font-xbold text-[#202020] "
                htmlFor="username"
              >
                تاریخ تولد
              </label>
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                placeholder=" تاریخ تولد خود را انتخاب نمایید "
                type="text"
                id="username"
                {...register("username")}
              />
              <p className="error">{errors.username?.message}</p>
            </div>
            <div className="flex flex-col pt-2">
              <label
                className="text-[14px] font-xbold text-[#202020]"
                htmlFor="email"
              >
                ایمیل شما
              </label>
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                placeholder="ایمیل خود را وارد نمایید"
                type="email"
                id="email"
                {...register("email", {
                  required: " در وارد کردن ایمیل خود دقت فرمایید ",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "invalid form",
                  },
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col pt-2">
              <label
                className="text-[14px] font-xbold text-[#202020] "
                htmlFor="username"
              >
                آپلود تصویر کارت ملی
              </label>
              <input
                className="placeholder-[#253359] bg-[#F4F5FC] font-xregular text-[14px] py-[12px] px-3 mt-[5px] rounded-lg border border-dashed border-[#44C0ED]"
                placeholder=" برای افزودن تصویر کارت ملی کلیک نمایید"
                type="text"
                id="username"
                {...register("username")}
              />
              <p className="text-[#868686] font-xregular text-[12px] mt-1 ">
                فرمت PNG یا JPG و حجم حداکثر ۵ مگابایت
              </p>
            </div>
            <div className="md:flex md:items-center ">
              <div className="flex items-center gap-4 md:flex-col md:gap-[18px] md:items-start mt-5 md:mt-[-30px]">
                <span className="text-[#202020]  text-[14px] font-xbold">
                  جنسیت
                </span>
                <div className="flex items-center gap-[6px] text-[#202020] text-[14px] font-xregular">
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                    defaultChecked
                  />
                  آقا
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                  />
                  خانم
                </div>
              </div>
              <div className="flex flex-col mt-3 md:mt-[-30px] md:mr-8 w-full">
                <label
                  className="text-[14px] font-xbold text-[#202020] "
                  htmlFor="username"
                >
                  شماره همراه
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12px] px-3 mt-[5px] md:px-1 rounded-lg border w-full border-[#CBCBCB]"
                  placeholder=" شماره همراه خود را وارد نمایید"
                  type="text"
                  id="username"
                  {...register("username")}
                />
                <p className="error">{errors.username?.message}</p>
              </div>
            </div>
            <div className="flex flex-row w-full items-center mt-2 md:mt-[-5px]">
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[9.5px] md:py-[12px] rounded-r-lg border border-[#CBCBCB] w-full "
                placeholder="  کد تایید را وارد نمایید "
                type="text"
                id="username"
                {...register("username")}
              />
              <button className="bg-[#F4FFF9] text-[#227346] text-[10px] md:text-[12px] md:font-xmedium font-xregular py-[12px] md:py-[13.5px] w-full border rounded-l-md border-[#3BC377]">
                ارسال کد تایید شماره همراه
              </button>
              <p className="error">{errors.username?.message}</p>
            </div>
          </div>
          <div className="md:max-w-[500px] md:mx-auto mt-8">
            <button className="text-white bg-[#253359] w-full mt-4  py-[8px] rounded-lg text-[14px] font-xmedium">
              ثبت مشخصات و عضویت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
