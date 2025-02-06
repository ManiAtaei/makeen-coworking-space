"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

export default function Otp() {
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timer, setTimer] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, timer]);

  interface type {
    password: string;
  }

  const form = useForm<type>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<type> = (data) => {
    setIsTimerRunning(true);
  };
  const onErrorHandler = (errors: FieldErrors<type>) => {
    console.log(errors, "errors");
  };

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...verificationCode];
    newCode[index] = e.target.value;
    setVerificationCode(newCode);

    if (e.target.value && index < 3) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleResendCode = () => {
    setTimer(120);
    setIsTimerRunning(true);
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
          کد تایید ارسال شده را وارد نمایید
        </span>
        <div className="bg-[#F9F9F9] flex items-center justify-between border border-[#DFDFDF] rounded-lg w-full p-3 mt-5 max-w-[408px]">
          <Link href="login">
            <button className="text-[#606060] text-[14px] font-xregular border-l border-[#CBCBCB] pl-2 ">
              ویرایش شماره
            </button>
          </Link>
          <span className="text-[#404040] text-[14px] font-xbold">
            09129876543
          </span>
        </div>
        <div className="w-full max-w-[408px]">
          <form
            className="flex flex-col items-center"
            noValidate
            onSubmit={handleSubmit(onSubmit, onErrorHandler)}
          >
            <div className="flex flex-col items-center">
              <div className="flex flex-row mt-5 gap-[9px] mobileNum:gap-[16px]">
                {verificationCode.map((item, index) => (
                  <input
                    type="text"
                    key={index}
                    maxLength={1}
                    className="border border-[#ADADAD] rounded-[8.23px] w-[46px] h-[46px] mobileNum:w-[56px] mobileNum:h-[56px] text-center text-[20px]"
                    {...register("password", {
                      required: " کد تایید نمی تواند کمتر از 5 رقم باشد ",
                    })}
                  />
                ))}
              </div>
              <p className="text-[#E9594C] text-[12px] font-xregular mt-[15px]">
                {errors.password?.message}
              </p>
            </div>

            <p className="text-[#606060] font-xregular mt-[21px] text-[14px]">
              <span className="text-[16px] pl-1">
                {Math.floor(timer / 60)}:{timer % 60}
              </span>
              تا دریافت مجدد کد
            </p>
            {timer === 0 && (
              <div className="flex items-center gap-1 mt-[15px]">
                <img
                  src="/login/iconLogin/ArrowCounterClockwise.svg"
                  alt="img"
                />
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[14px] font-xregular"
                >
                  ارسال مجدد کد
                </button>
              </div>
            )}
            <span className="text-[14px] font-xregular text-[#0C0C0C] mt-5">
              هنوز ثبت نام نکرده اید؟
              <span className="text-[16px] font-xbold text-[#44C0ED] mr-2">
                عضویت در مکین
              </span>
            </span>
            <button className="bg-[#253359] text-white text-[16px] font-xmedium py-2 px-[119.5px] w-full rounded-[8px] mt-5">
              ادامه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
