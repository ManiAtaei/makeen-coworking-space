import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function UserProfile() {
  interface dataType {
    username: string;
    email: string;
    description: string;
  }

  const formMap = [
    {
      id: 1,
      name: " نام خانوادگی ",
      info: " علی پور ",
      field: " نام خانوادگی خود را وارد نمایید ",
      error: " پر کردن فیلد نام خانوادگی اجباری است ",
    },
    {
      id: 2,
      name: " نام ",
      info: " مریم ",
      field: " نام خود را وارد نمایید ",
      error: " پر کردن فیلد نام کاربر اجباری است ",
    },
    {
      id: 3,
      name: " تاریخ تولد ",
      info: " ۱۳۸۰/۸/۱۸ ",
      field: " نام خود را وارد نمایید ",
      error: " پر کردن فیلد نام کاربر اجباری است ",
    },
    {
      id: 4,
      name: " کد ملی ",
      info: " ۰۸۲۰۱۲۳۰۱۲۳ ",
      field: " کد ملی خود را وارد نمایید ",
      error: " پر کردن فیلد کد ملی اجباری است ",
    },
    {
      id: 5,
      name: " ایمیل ",
      info: " maryam.alipour@gmail.com ",
      field: " کد ملی خود را وارد نمایید ",
      error: " پر کردن فیلد کد ملی اجباری است ",
    },
    {
      id: 6,
      name: " شماره موبایل ",
      info: " ۰۹۱۲۸۷۶۵۴۳ ",
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
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <div className="lg:flex lg:items-center lg:mt-6 w-full lg:gap-6">
        <div className="flex items-center justify-center mt-4">
          <div className="flex justify-start lg:hidden">
            <GoArrowRight size={24} />
          </div>
          <h1 className="text-[#404040] text-center text-[16px] font-xbold ml-4 lg:ml-4 lg:text-right lg:flex lg:items-center w-full">
            <FaCaretLeft className="w-6 h-6 hidden lg:block" />
            مشخصات کاربری
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-[17px]">
        <img src="/user-panel/Ellipse 120.svg" alt="img" />
      </div>
      <div className="mt-2 ">
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
          <button className="bg-[#253359] text-[14px] font-xmedium text-white w-full py-2 rounded-lg md:hidden">
            ویرایش مشخصات
          </button>
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
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB] disabled"
                  placeholder={item.info}
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "پر کردن فیلد نام کاربر اجباری است ",
                  })}
                />
                <p className="error">{errors.username?.message}</p>
              </div>
            ))}
            <div className="flex items-center justify-between md:justify-normal gap-8 mt-4 ">
              <div className="flex items-center gap-1">
                <span className="text-[#202020] text-[14px] font-xbold">
                  آپلود مدارک :
                </span>
                <IoCheckmarkCircleOutline className="text-[#00BA88] bg-transparent w-5 h-5 rounded-full" />
                <button className="text-[12px] font-xregular underline underline-offset-4 ">
                  مشاهده
                </button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#202020] text-[14px] font-xbold">
                  جنسیت :
                </span>
                <span className="text-[12px] font-xregular"> خانم </span>
              </div>
            </div>
            <button className="bg-[#253359] text-[16px] font-xmedium text-white w-full py-2 rounded-lg hidden md:block">
              ویرایش مشخصات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
