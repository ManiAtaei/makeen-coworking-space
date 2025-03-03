"use client";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface FormType {
  password: number;
  tryPass: string;
}

export default function ResetPasswod({ setStep }) {
  const form = useForm<FormType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  const onErrorHandler = (errors: FieldErrors<FormType>) => {
    console.log(errors, "errors");
  };

  return (
    <div className="pl-7 pr-5 max-w-[600px] mx-auto flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <img src="/login/imageLogin/logo-makeen.svg" alt="img" />
        <h1 className="font-xbold text-[18px] mt-6"> ورود به مکین </h1>
        <span className="text-[14px] font-xregular mt-2 flex items-center">
          برای حساب کاربری خود یک رمز عبور قوی انتخاب کنید
        </span>
        <div className="w-full max-w-[408px]">
          <form
            className="flex flex-col items-center"
            noValidate
            onSubmit={handleSubmit(onSubmit, onErrorHandler)}
          >
            <div className="w-full">
              <label
                className="text-[14px] font-xbold text-[#202020] "
                htmlFor="number"
              >
                رمز عبور
              </label>
              <input
                type="number"
                id="number"
                className="border border-[#CBCBCB] rounded-lg py-[12] px-3 mt-[5px] placeholder:text-[#868686] text-[14.675px] font-xregular w-full text-left required:text-[#E9594C] required:text-[12px] required:font-xregular"
                placeholder="  رمز عبور را را وارد نمایید "
                {...register("password", {
                  required: " لطفا شماره موبایل خود را وارد نمایید ",
                })}
              />
              <p className="text-[#7C7C7C] text-[12px] font-xregular mt-1"> حداقل ۸ کاراکتر شامل حروف کوچک و بزرگ </p>
            </div>
            <div className="w-full mt-4">
              <label
                className="text-[14px] font-xbold text-[#202020] "
                htmlFor="number"
              >
                تکرار رمز عبور
              </label>
              <input
                type="text"
                className="border border-[#CBCBCB] rounded-lg py-[12] px-3 mt-[5px] placeholder:text-[#868686] text-[14.675px] font-xregular w-full required:text-[#E9594C] required:text-[12px] required:font-xregular"
                placeholder=" تکرار رمز عبور را را وارد نمایید "
                {...register("tryPass", {
                  required: " عبارت امنیتی به درستی وارد نشده ",
                })}
              />
            </div>

            <button
              type="submit"
              className="bg-[#253359] text-white text-[16px] font-xmedium py-3 px-[119.5px] w-full rounded-[8px] mt-5"
            >
              تایید رمز عبور
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
