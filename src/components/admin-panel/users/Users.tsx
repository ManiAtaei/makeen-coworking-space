
import React from "react";
import { useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BiMessageMinus } from "react-icons/bi";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";

import Table from "./Table";

export default function Users() {
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

  interface emailType {
    search: string;
    select: string;
  }

  const search = useForm<emailType>({});

  const { handleSubmit, register } = search;

  const onSubmit = (data: emailType) => {
    console.log(data);
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        کاربرها
      </h1>

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
                <label className="border border-[#ADADAD] rounded-[8px] md:w-[160px] py-[11px] md:py-2 flex items-center justify-between gap-2 ">
                  <select
                    id="select"
                    {...register("select")}
                    className="text-[14px] font-xregular text-[#606060] "
                  >
                    <option value="option1"> نوع کاربر </option>
                    <option value="option2"> همه </option>
                  </select>
                </label>
              </div>
            </form>

            <button
              className="border border-[#253359] bg-[#B4E6F8] px-[10px] py-[10.44px] md:py-2 md:px-[34.97px] rounded-[8.36px] md:flex md:items-center md:text-[14px] md:font-xregular md:gap-2"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <BiMessageMinus className="text-[#253359] w-6 h-6" />
              <span className="hidden md:block"> ارسال پیام </span>
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
        <div>
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
      </div>

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
                <span className="text-[14px] font-xregular">{item.row}</span>
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
      <div className="hidden mt-6 md:block">
        <Table />
      </div>
    </div>
  );

}
