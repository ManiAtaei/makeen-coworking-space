"use client";
import Link from "next/link";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

export default function Captcha({setStep}) {
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
    <div className="pl-7 pr-5 max-w-[600px] mx-auto flex flex-col justify-center mt-4">
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
            <div className="bg-[#F9F9F9] flex items-center justify-between border border-[#DFDFDF] rounded-lg w-full p-3 mt-6 max-w-[408px]">
              <Link href="login">
                <button className="text-[#606060] text-[14px] font-xregular border-l border-[#CBCBCB] pl-2 ">
                  ویرایش شماره
                </button>
              </Link>
              <span className="text-[#404040] text-[14px] font-xbold">
                09129876543
              </span>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <img src="/login/imageLogin/Captcha.svg" alt="img" />
              <FiRefreshCcw className="w-6 h-6" />
            </div>

            <div className="w-full">
              <input
                type="text"
                className="border border-[#CBCBCB] rounded-lg py-[12] px-3 mt-2 placeholder:text-[#868686] text-[14.675px] font-xregular w-full text-right required:text-[#E9594C] required:text-[12px] required:font-xregular"
                placeholder=" عبارت امنیتی را وارد نمایید "
                {...register("call", {
                  required: " لطفا شماره موبایل خود را وارد نمایید ",
                })}
              />
              <p className="text-[#E9594C] text-[12px] font-xregular mt-1">
                {errors.security?.message}
              </p>
            </div>
            <button onClick={()=>setStep(4)} className="bg-[#253359] text-white text-[16px] font-xmedium py-3 px-[119.5px] w-full rounded-[8px] mt-6">
            بازیابی رمز عبور
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
