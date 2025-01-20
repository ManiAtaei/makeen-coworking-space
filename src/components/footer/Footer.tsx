"use client"
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

interface emailType {
  email: string;
}

export default function Footer() {
  const email = useForm<emailType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = email;

  const onSubmit = (data: emailType) => {
    console.log(data);
  };

  const onErrorHandler = (errors: FieldErrors<emailType>) => [
    console.log(errors, "errors"),
  ];

  return (
    <>
      <div className="bg-[#F4F5FC] px-5 py-8 mt-[-24px]  ">
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-between xl:px-[120px] max-w-[1440px] mx-auto">
          <div className="flex pt-[25px] items-center lg:flex-col lg:items-start  mt-[-10px]">
            <img
              className="w-[47px] h-[48px] lg:hidden"
              src="/imageLanding/logo-makeen (1) 1.svg"
              alt="img"
            />
            <img
              className="hidden w-[157px] lg:block"
              src="/imageLanding/logo-makeen.svg"
              alt="img"
            />
            <p className="text-[12px] font-xregular w-11/12 lg:w-[240px] text-[#404040] pr-2 leading-[28.8px]">
              مکین یک پلتفرم اینترنتی برای پیدا کردن و رزرو فضاهای مناسب برای
              کار کردن و مطالعه است.
            </p>
          </div>
          <div className="flex flex-col pt-[21px] lg:pt-[25px]  gap-[10px] lg:pr-5 lg:gap-4">
            <div className="flex items-center">
              <FiPhoneCall className="w-6 h-6 text-[#253359]" />
              <span className="text-[12px] font-xregular pr-3 text-[#404040]">
                021-77188185-6
              </span>
            </div>
            <div className="flex items-center">
              <img
                className="w-6 h-6 "
                src="/iconLanding/location.svg"
                alt="img"
              />
              <span className="w-[184px] pr-2 text-[12px] font-xregular text-[#404040] leading-[21.6px]">
                تهران، مترو علم صنعت، خیابان سلیمانی مدائن پلاک 520
              </span>
            </div>
            <div className="flex items-center">
              <MdOutlineMail className="w-6 h-6" />
              <span className="text-[12px] pr-3 font-xregular text-[#404040] ">
                Makeen@gmail.com
              </span>
            </div>
          </div>
          <div className="flex flex-col  pt-[22px] lg:pt-[25px]  gap-3 lg:pr-5 ">
            <h1 className="text-[#404040] text-[14px] font-xbold">
              دسترسی آسان
            </h1>
            <div className="text-[12px] font-xregular flex gap-3 lg:flex-col lg:gap-[14px]">
              <span className="order-3"> صفحه اصلی </span>
              <span className="order-2"> رزرو آنلاین فضا </span>
              <span className="order-1"> قوانین و سیاست‌ها </span>
            </div>
          </div>
          <div className="pt-6 lg:pr-9 xl:w-[29%] text-[14px] font-xbold">
            <h1> عضویت خبرنامه </h1>
            <div>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit, onErrorHandler)}
              >
                <div className="flex flex-col pt-3">
                  <input
                    className="placeholder-[#868686] placeholder:text-[10px] py-[12px] px-4 rounded-lg border-solid border-[1px] border-black"
                    placeholder="ایمیل خود را وارد نمایید"
                    type="email"
                    id="email"
                    {...register("email", {
                      required: " در وارد کردن ایمیل خود دقت فرمایید ",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "invalid form",
                      },
                    })}
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>
              </form>
            </div>
            <div className="flex gap-10  lg:gap-2 pr-4 mt-[16px]">
              <img src="/iconLanding/instagram.svg" alt="img" />
              <img src="/iconLanding/send-2.svg" alt="img" />
              <img src="/iconLanding/Linkdin.svg" alt="img" />
              <img src="/iconLanding/youtube.svg" alt="img" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#253359]">
        <div className="flex items-center justify-center py-5">
          <img src="/iconLanding/creative-commons.svg" alt="img" />
          <span className="text-[12px] font-xregular text-white pr-2">
            {" "}
            تمامی حقوق این وبسایت متعلق به مکین می‌باشد{" "}
          </span>
        </div>
      </div>
    </>
  );
}
