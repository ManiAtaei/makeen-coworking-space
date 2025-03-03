"use client";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

export default function Login() {
  interface type {
    call: number;
    security: string;
  }

  const form = useForm<type>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: type) => {
    console.log(data);
  };
  const onErrorHandler = (errors: FieldErrors<type>) => {
    console.log(errors, "errors");
  };

  return (
    <div className="pl-7 pr-5 max-w-[600px] mx-auto flex flex-col justify-center h-screen">
      <div className="flex justify-end pt-6 ">
        <IoCloseOutline className="w-7 h-7" />
      </div>
      <div className="flex flex-col items-center mt-[-15px]">
        <img src="/login/imageLogin/logo-makeen.svg" alt="img" />
        <h1 className="font-xbold text-[18px] mt-5"> ورود به مکین </h1>
        <span className="text-[14px] font-xregular mt-2 flex items-center">
          برای ورود
          <span className="hidden mobileNum:block px-[5px]">به مکین</span>
          شماره همراه خود را وارد نمایید.
        </span>
        <div className="w-full max-w-[408px]">
          <form
            className="flex flex-col items-center"
            noValidate
            onSubmit={handleSubmit(onSubmit, onErrorHandler)}
          >
            <div className="w-full">
              <input
                type="number"
                className="border border-[#CBCBCB] rounded-lg py-[12] px-3 mt-5 placeholder:text-[#868686] text-[14.675px] font-xregular w-full text-left required:text-[#E9594C] required:text-[12px] required:font-xregular"
                placeholder="09xxxxxxxx"
                {...register("call", {
                  required: " لطفا شماره موبایل خود را وارد نمایید ",
                })}
              />
              <p className="text-[#E9594C] text-[12px] font-xregular mt-1">
                {errors.security?.message}
              </p>
            </div>
            <div className="w-full">
              <input
                type="text"
                className="border border-[#CBCBCB] rounded-lg py-[12] px-3 mt-2 placeholder:text-[#868686] text-[14.675px] font-xregular w-full required:text-[#E9594C] required:text-[12px] required:font-xregular"
                placeholder=" کلمه عبور خود را وارد کنید "
                {...register("security", {
                  required: " عبارت امنیتی به درستی وارد نشده ",
                })}
              />
              <p className="text-[#E9594C] text-[12px] font-xregular mt-1">
                {errors.security?.message}
              </p>
            </div>

            <span className="text-[14px] font-xregular text-[#0C0C0C] mt-6">
              پسورد خود را فراموش کرده اید
              <span className="text-[16px] font-xbold text-[#44C0ED] pr-2">
                بازیابی رمز عبور
              </span>
            </span>
            <span className="text-[14px] font-xregular text-[#0C0C0C] mt-6">
              هنوز ثبت نام نکرده اید؟
              <span className="text-[16px] font-xbold text-[#44C0ED] pr-2">
                عضویت در مکین
              </span>
            </span>
            <button className="bg-[#253359] text-white text-[16px] font-xmedium py-3 px-[119.5px] w-full rounded-[8px] mt-5">
              ادامه
            </button>
          </form>
        </div>
        <p className="text-center text-[14px] font-xregular mt-5">
          ورود و ثبت‌نام در مکین به منزله پذیرفتن تمامی
          <span className="font-xbold"> قوانین و مقررات </span> می باشد
        </p>
      </div>
    </div>
  );
}
