import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { LuCalendarFold } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import { BiMessageMinus } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { PiMoneyWavyLight } from "react-icons/pi";

import "swiper/css";
import "swiper/css/navigation";
import "./reservation.css";

import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import Table from "./Table";
import UserInfo from "./UserInfo";

export default function Reservation() {
  const date = [
    { id: 1, day: " 12 ", text: " پ " },
    { id: 2, day: " 12 ", text: " پ " },
    { id: 3, day: " 12 ", text: " پ " },
    { id: 4, day: " 12 ", text: " پ " },
    { id: 5, day: " 12 ", text: " پ " },
    { id: 6, day: " 12 ", text: " پ " },
    { id: 7, day: " 12 ", text: " پ " },
    { id: 8, day: " 12 ", text: " پ " },
    { id: 9, day: " 12 ", text: " پ " },
    { id: 10, day: " 12 ", text: " پ " },
    { id: 11, day: " 12 ", text: " پ " },
    { id: 12, day: " 12 ", text: " پ " },
    { id: 13, day: " 12 ", text: " پ " },
  ];

  const info = [
    {
      id: 1,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
    },
    {
      id: 2,
      row: "2",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
    },
    {
      id: 3,
      row: "3",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
    },
    {
      id: 4,
      row: "4",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
    },
    {
      id: 5,
      row: "5",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
    },
    {
      id: 6,
      row: "6",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
    },
  ];
  interface dataType {
    discription: string;
    search: string;
    select: string;
  }
  const check = [
    { id: 1, text: " پیامک " },
    { id: 2, text: " اعلان " },
    { id: 3, text: " ایمیل " },
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
  const onErrorHandler = (error: FieldErrors) => {
    console.log(error);
  };
  const [activePage, setActivePage] = useState("table");
  return (
    <>
      <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-full rounded-lg">
        {activePage === "table" && (
          <>
            <div className="lg:flex lg:items-center lg:mt-6 w-full lg:gap-6">
              <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:text-right lg:flex lg:items-center">
                <FaCaretLeft className="w-6 h-6 hidden lg:block" />
                رزروها
              </h1>
              <div className="text-[#CBCBCB] font-xbold text-[12px] flex items-center gap-4 md:gap-10 mt-4 md:text-[14px] lg:pb-2 lg:border-b lg:w-full lg:border-[#DFDFDF]">
                <span> صندلی اشتراکی </span>
                <span> اتاق جلسات </span>
              </div>
            </div>
            <hr className="text-[#DFDFDF] mt-[10px] lg:hidden" />

            <div className="md:flex md:items-center md:justify-between mt-4 lg:mt-6">
              <div className="flex items-center w-full justify-between ">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox md:hidden"
                />
                <div className="flex items-center gap-4">
                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center w-full">
                      <label className="border border-[#ADADAD] rounded-[8px] px-4 py-[11px] md:py-2 flex items-center gap-2 ">
                        <LuCalendarFold className="w-6 h-6 text-[#ADADAD]" />
                        <select
                          id="select"
                          {...register("select")}
                          className="text-[14px] font-xregular text-[#606060] "
                        >
                          <option value="option1"> 1403/10/12 </option>
                          <option value="option2"> همه </option>
                        </select>
                      </label>
                    </div>
                  </form>

                  <button
                    className=" border border-[#253359] bg-[#F9F9F9] px-[10px] py-[10.44px] md:py-[7px] md:px-[34.97px] rounded-[8.36px] md:flex md:items-center md:text-[14px] md:font-xregular md:gap-2"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    <BiMessageMinus className="text-[#404040] w-6 h-6" />
                    <span className="hidden md:block text-[#404040]">
                      ارسال پیام
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_6").showModal()
                    }
                    className="border border-[#253359] flex items-center gap-2 bg-[#F9F9F9] text-[#404040] px-[25.47px] py-[7px] text-[12px] font-xregular rounded-[8.36px]"
                  >
                    <PiMoneyWavyLight className="w-6 h-6" /> شارژ کیف پول
                  </button>
                  <dialog id="my_modal_2" className="modal w-full">
                    <div className="modal-box w-full rounded-none py-0 border border-[#E9594C] flex items-center justify-around px-0">
                      <IoCloseOutline className="text-white bg-[#E9594C] w-5 h-5 rounded-full" />
                      <p className="text-[10px] font-xregular text-[#404040] text-center py-[21px]">
                        برای ارسال پیام ابتدا از لیست کاربر یا کاربران را انتخاب
                        نمایید
                      </p>
                      <IoCloseOutline className="text-[#E9594C] w-5 h-5" />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col pt-3 md:pt-0">
                  <input
                    className="placeholder-[#868686] placeholder:text-[14px] font-xregular py-[12px] md:py-2 px-2 md:w-[160px] rounded-lg border-solid border-[1px] border-black"
                    placeholder=" جستجو  "
                    type="search"
                    id="search"
                    {...register("search")}
                  />
                </div>
              </form>
            </div>

            <div className="bg-[#F4F5FC] py-2 mt-4 rounded-lg w-full">
              <Swiper
                cssMode={true}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                className="swipperAdmin"
                modules={[Mousewheel, Keyboard, Navigation]}
                breakpoints={{
                  320: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1200: {
                    slidesPerView: 12,
                    spaceBetween: 16,
                  },
                }}
              >
                {date.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="w-full max-w-[56px] mx-auto">
                      <div className="flex flex-col items-center justify-center bg-white border border-[#DFDFDF] rounded-lg font-xbold w-14 h-14">
                        <span className="text-[12px]">{item.day}</span>
                        <span className="text-[10px]">{item.text}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <dialog id="my_modal_5" className="modal w-full ">
              <div className="modal-box w-full max-w-[450px] mx-auto">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
                    <IoClose className="w-6 h-6" />
                  </button>
                </form>
                <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
                  <div className="flex justify-center mt-1"></div>
                  <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onErrorHandler)}
                  >
                    <div className="flex flex-col gap-[6px] w-full">
                      <label
                        className="text-[14px] font-xbold text-[#404040] "
                        htmlFor="discription"
                      >
                        متن پیام
                      </label>
                      <input
                        className="placeholder-[#868686] font-xregular text-[14px] md:pb-[121px] md:pt-[10px] px-3 rounded-lg border border-[#CBCBCB]"
                        placeholder=" متن پیام را اینجا بنویسید "
                        type="text"
                        id="username"
                        {...register("discription", {
                          required: "پر کردن فیلد قیمت اجباری است ",
                        })}
                      />
                      <p className="error">{errors.discription?.message}</p>
                    </div>

                    <div className="form-control flex flex-row items-center gap-6">
                      {check.map((item) => (
                        <label
                          key={item.id}
                          className="cursor-pointer label flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className=" rounded-"
                          />
                          <span className="text-[#202020] font-xregular text-[14px]">
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>

                    <button className="text-white bg-[#253359] text-[14px] font-xmedium py-[9.5px] w-full rounded-lg mt-3">
                      ارسال
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <dialog id="my_modal_6" className="modal w-full ">
              <div className="modal-box w-full max-w-[450px] mx-auto">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
                    <IoClose className="w-6 h-6" />
                  </button>
                </form>
                <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
                  <div className="flex justify-center">
                    <img src="/admin-panel/money-add.svg" alt="img" />
                  </div>
                  <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onErrorHandler)}
                  >
                    <div className="flex flex-col gap-[8px] w-full">
                      <label
                        className="text-[14px] font-xbold text-[#404040] "
                        htmlFor="discription"
                      >
                        مبلغ شارژ
                      </label>
                      <input
                        className="placeholder-[#868686] font-xregular text-[14px] py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                        placeholder=" مبلغ شارژ را وارد نمایید "
                        type="text"
                        id="username"
                        {...register("discription", {
                          required: "پر کردن فیلد قیمت اجباری است ",
                        })}
                      />
                      <p className="error">{errors.discription?.message}</p>
                    </div>
                    <div className="flex items-center justify-start w-full gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="radio-7"
                          className="radio radio-info w-5 h-5"
                          defaultChecked
                        />
                        <span className="font-xregular text-[14px]"> شارژ کیف </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="radio-7"
                          className="radio radio-info w-5 h-5"
                        />
                        <span className="font-xregular text-[14px]"> هدیه مکین </span>
                      </div>
                    </div>
                    <button className="text-white bg-[#253359] text-[14px] font-xmedium py-[13.5px] w-full rounded-lg mt-4">
                      ارسال
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <div className="mt-4 md:hidden">
              {info.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#CBCBCB] pt-[14px] pb-2 px-2 rounded-[4px] mt-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox border border-[#CBCBCB]"
                      />
                      <span className="text-[14px] font-xregular">
                        {item.row}
                      </span>
                    </div>
                    <div className="flex items-start text-[#ADADAD]">
                      <img src={item.image} alt="img" />
                      <LuUserRoundX className="w-6 h-6 mr-[5px]" />
                      <SlEye className="h-6 w-6 mr-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 justify-between mt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#202020] font-xbold text-[12px]">
                        نام کاربر:
                        <span className="text-[#202020] font-xregular text-[12px]">
                          {item.name}
                        </span>
                      </span>
                      <span className="text-[#202020] font-xbold text-[12px] mr-[-10px]">
                        روش پرداخت:
                        <span className="text-[#202020] font-xregular text-[12px]">
                          {item.method}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#202020] font-xbold text-[12px]">
                        تاریخ ثبت :
                        <span className="text-[#202020] font-xregular text-[12px]">
                          {item.date}
                        </span>
                      </span>
                      <span className="text-[#202020] font-xbold text-[12px]">
                        کد ملی :
                        <span className="text-[#202020] font-xregular text-[12px]">
                          {item.card}
                        </span>
                      </span>
                    </div>
                    <span className="text-[#202020] font-xbold text-[12px]">
                      تعداد روز :
                      <span className="text-[#202020] font-xregular text-[12px]">
                        {item.day}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="hidden mt-6 md:block">
          {activePage === "table" && <Table setActivePage={setActivePage} />}
        </div>
      </div>
      {activePage === "userInfo" && <UserInfo />}
    </>
  );
}
