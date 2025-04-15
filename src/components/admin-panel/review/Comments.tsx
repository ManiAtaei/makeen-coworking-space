import React from "react";
import { useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { LuTrash2 } from "react-icons/lu";
import Table from "./Table";
import { LuCalendarFold } from "react-icons/lu";

export default function Comments() {
  interface emailType {
    search: string;
    select: string;
  }

  const search = useForm<emailType>({});

  const { handleSubmit, register } = search;

  const onSubmit = (data: emailType) => {
    console.log(data);
  };

  const info = [
    {
      id: 1,
      row: "2",
      name: " محمد ایمانی ",
      comment: " پیشنهاد می‌کنم محیط مناسبی داره ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      review:
        " تبریک میگم بابت پرسنل این بخش که در همه زمینه مشتری مدار هستند.به امید تداوم این روند ",
    },
    {
      id: 2,
      row: "2",
      name: " محمد ایمانی ",
      comment: " پیشنهاد می‌کنم محیط مناسبی داره ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      review:
        " تبریک میگم بابت پرسنل این بخش که در همه زمینه مشتری مدار هستند.به امید تداوم این روند ",
    },
    {
      id: 3,
      row: "2",
      name: " محمد ایمانی ",
      comment: " پیشنهاد می‌کنم محیط مناسبی داره ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      review:
        " تبریک میگم بابت پرسنل این بخش که در همه زمینه مشتری مدار هستند.به امید تداوم این روند ",
    },
  ];

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        نظرها
      </h1>
      <div className="flex flex-col-reverse md:flex md:flex-row md:items-center md:justify-between md:mt-6">
        <div className="flex items-center mt-4 md:mt-0">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox md:hidden"
          />
          <div className="flex items-center gap-4 w-full justify-between">
            <form className="flex items-center gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center w-full">
                <select
                  id="select"
                  {...register("select")}
                  className="text-[14px] font-xregular text-[#606060] border border-[#ADADAD] w-[125px] rounded-[8px] px-4 py-2 md:py-[9.5px] "
                >
                  <option value="option1"> جدیدترین </option>
                  <option value="option2"> همه </option>
                </select>
              </div>
              <div className="flex items-center border w-full border-[#ADADAD] rounded-lg py-2 px-4">
                <div className="flex items-center w-full">
                  <label className="border-l border-[#DFDFDF] pl-2 flex items-center gap-2 ">
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
                <div className="w-full pr-2 text-left ">
                  <select
                    id="select"
                    {...register("select")}
                    className="text-[14px] font-xregular text-[#404040] "
                  >
                    <option value="option1"> ۱۴۰۴/۱/۱ </option>
                    <option value="option2"> همه </option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-end">
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
              <div className="ml-[61.14px]">
                <img src={item.image} alt="img" />
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
                <span className="text-[#202020] font-xbold text-[12px]">
                  تاریخ ثبت :
                  <span className="text-[#202020] font-xregular text-[12px]">
                    {item.date}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#202020] font-xbold text-[12px]">
                  عنوان نظر :
                  <span className="text-[#202020] font-xregular text-[12px]">
                    {item.comment}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#202020] font-xbold text-[12px]">
                  متن نظر :
                </span>
                <img src="/admin-panel/Stars.svg" alt="img" />
              </div>
              <span className="text-[#202020] font-xregular text-[12px]">
                {item.review}
              </span>
              <div className="w-full flex justify-between items-start">
                <div className="flex items-start justify-between gap-[8px]">
                  <BsReply className="w-4 h-4 text-[#253359]" />
                  <LuTrash2 className="w-4 h-4 text-[#CBCBCB]" />
                </div>
                <div className="flex items-start justify-between gap-[13.67px]">
                  <button className="border border-[#253359] text-[10px] font-xregular px-4 py-[6.5px] text-[#253359] rounded-md">
                    انتشار در لندینگ
                  </button>
                  <button className="bg-[#253359] text-[10px] font-xregular px-[36.5px] py-[6.5px] text-white rounded-md">
                    انتشار
                  </button>
                </div>
              </div>
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
