import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { LuCalendarFold } from "react-icons/lu";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import Table from "./Table";
import { GoPlus } from "react-icons/go";
import AddSpaces from "./AddSpaces";

export default function Spaces() {
  const [activePage, setActivePage] = useState("spaces");
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
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen lg:rounded-lg">
      {activePage === "spaces" && (
        <div>
          <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
            <FaCaretLeft className="w-6 h-6 hidden lg:block" />
            فضاها
          </h1>
          <button onClick={()=>setActivePage("addSpaces")} className="bg-[#253359] text-[16px] font-xmedium flex items-center justify-center gap-2 text-white w-[300px] py-3 rounded-lg mt-6">
            افزودن فضا جدید <GoPlus className="w-6 h-6" />
          </button>
          <div className="md:flex md:items-center md:justify-between mt-4 lg:mt-6">
            <div className="flex items-center w-full justify-between ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox md:hidden"
              />
              <div className="flex items-center w-full">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center justify-between w-full">
                    <label className="border border-[#ADADAD] w-[160px]  rounded-[8px] px-4 py-[11px] md:py-2 flex items-center justify-between gap-2 ">
                      <select
                        id="select"
                        {...register("select")}
                        className="text-[14px] font-xregular w-full text-[#606060] "
                      >
                        <option value="option1"> جدیدترین </option>
                        <option value="option2"> همه </option>
                      </select>
                    </label>
                  </div>
                </form>
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
        </div>
      )}

      <div className="hidden mt-6 md:block">
        {activePage === "spaces" && <Table />}
        {activePage === "addSpaces" && <AddSpaces />}
      </div>
    </div>
  );
}
 