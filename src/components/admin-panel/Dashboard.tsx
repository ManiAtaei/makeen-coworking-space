"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { RiMore2Fill } from "react-icons/ri";
import { FaCaretLeft } from "react-icons/fa";
import ChartBar from "./chartBar";
import { FaSquare } from "react-icons/fa";
import LineChart from "./LineChart";

export default function Dashboard() {
  interface dataType {
    select: string;
  }

  const Statistics = [
    {
      id: 1,
      imageUrl: "/admin-panel/Cowork1.svg",
      title: " صندلی اشتراکی ",
      chair: " 20 صندلی خالی ",
      reserve: " ۲۰ رزرو شده ",
    },
    {
      id: 2,
      imageUrl: "/admin-panel/Cowork3.svg",
      title: " اتاق جلسات ",
      chair: " 6 نوبت خالی  ",
      reserve: " 6 نوبت رزرو شده ",
    },
  ];

  const PendingReceipt = [
    {
      id: 1,
      name: " مینا رجب زاده ",
      price: " ۲۰۰٬۰۰۰ تومان ",
      text: " بررسی رسید ",
    },
    {
      id: 2,
      name: " حمید رضایی ",
      price: " ۴۰۰٬۰۰۰ تومان ",
      text: " بررسی رسید ",
    },
    {
      id: 3,
      name: " امیر رضا اکبری مقدم ",
      price: " ۲۰۰٬۰۰۰ تومان ",
      text: " بررسی رسید ",
    },
  ];

  const form = useForm<dataType>({});

  const { handleSubmit, register } = form;

  const onSubmit = (data: dataType) => {
    console.log(data);
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-0">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:my-6 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        داشبورد
      </h1>
      <div className=" lg:bg-white lg:w-full lg:px-8 lg:py-6 lg:rounded-[16px]">
        <div className="flex items-center justify-between mt-6 w-full">
          <span className="text-[#253359] text-[14px] font-xbold ">
            آمار رزرو روزانه
          </span>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <select
                id="select"
                {...register("select")}
                className="text-[14px] font-xregular border border-[#ADADAD] text-[#404040] rounded-[8px] w-[160px] py-[7.5px] px-4"
              >
                <option value="option1"> جدیدترین </option>
                <option value="option2"> همه </option>
              </select>
            </div>
          </form>
        </div>
        <div className="w-full mt-4 md:flex md:item-center md:gap-4 md:mt-6 lg:grid lg:grid-cols-1 lg:justify-center xl:flex xl:item-center containerPage:gap-[37.5px]">
          <div className="flex items-center gap-4  containerPage:gap-[37.5px] justify-center w-full">
            {Statistics.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center bg-[#F4F5FC] px-6 pt-2 md:pt-4 pb-4 md:pb-7 rounded-r-3xl rounded-l-2xl w-full border-r-4 border-[#4073D0]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center w-full">
                    <img
                      className="md:w-10 md:h-10"
                      src={item.imageUrl}
                      alt="img"
                    />
                    <span className="text-[12px] md:text-[14px] font-xbold hidden md:block md:mr-2 lg:mr-4">
                      {item.title}
                    </span>
                  </div>
                  <RiMore2Fill className="w-6 h-6 md:w-[29.21px] md:h-[29.21px]" />
                </div>
                <span className="text-[12px] md:text-[14px] font-xbold mt-2 md:hidden">
                  {item.title}
                </span>

                <div className="md:flex md:items-center md:justify-between md:flex-row-reverse md:w-full tablet:px-4">
                  <div
                    className="rounded-full flex items-center justify-center border-[6px] border-[#44C0ED] text-black text-[12px] md:text-[14px] font-xbold w-12 h-12 mt-2 md:mt-4 md:w-16 md:h-16"
                    style={{ "--value": 50 }}
                    role="progressbar"
                  >
                    50%
                  </div>
                  <div className="flex flex-col gap-[6px] mt-2">
                    <span className="text-[#404040] text-[10px] tablet:text-[12px] font-xdemibold">
                      {item.chair}
                    </span>
                    <span className="text-[10px] tablet:text-[12px] font-xregular text-[#868686]">
                      {item.reserve}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 md:mt-0 rounded-r-3xl bg-[#F4F5FC] rounded-l-2xl md:w-7/12 w-full border-r-4 border-[#4073D0] py-4 pr-6 pl-4 lg:justify-self-center">
            <div className="flex items-center justify-between">
              <img src="/admin-panel/money-tick.svg" alt="img" />
              <span className="text-[#404040] text-[12px] md:text-[14px] font-xbold">
                رسیدهای در انتظار بررسی
              </span>
              <RiMore2Fill className="w-[29.21px] h-[29.21px]" />
            </div>
            <div className="flex flex-col mt-6 gap-[15px]">
              {PendingReceipt.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center text-[10px] tablet:text-[12px] justify-between"
                >
                  <span className="font-xregular text-[#253359]">
                    {item.name}
                  </span>
                  <span className="font-xbold text-[#253359]">
                    {item.price}
                  </span>
                  <span className="text-[#44C0ED] font-xregular underline underline-offset-2 decoration-[0.5px]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col item-center lg:flex lg:flex-row lg:items-center w-full lg:gap-3 xl:gap-[22px]">
        <div className="border-[#4073D0] border rounded-[16px] mt-4 pt-4 pb-2 px-[18.18px] lg:border-0 lg:bg-white w-full">
          <div className="flex items-center justify-between  w-full">
            <span className="text-[#253359] text-[12px] lg:text-[14px] font-xbold ">
              نمودار رزروها
            </span>
            <div className="flex items-center gap1">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <select
                    id="select"
                    {...register("select")}
                    className="text-[14px] font-xregular border border-[#ADADAD] text-[#404040] rounded-[8px] w-3/3 py-[4px] px-4"
                  >
                    <option value="option1"> سالانه </option>
                    <option value="option2"> همه </option>
                  </select>
                </div>
              </form>
              <RiMore2Fill className="w-[19px] h-[19px]" />
            </div>
          </div>
          <div className="w-full">
            <ChartBar />
          </div>
          <div className="flex items-center gap-3 mt-[-30px]">
            <div className="flex items-center gap-2">
              <FaSquare className="text-[#668FD9]" />
              <span className="text-[#868686] font-xregular text-[10px]">
                صندلی اشتراکی
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaSquare className="text-[#69CDF1]" />
              <span className="text-[#868686] font-xregular text-[10px]">
                اتاق جلسات
              </span>
            </div>
          </div>
        </div>
        <div className="border-[#4073D0] border rounded-[16px] mt-4 pt-4 pb-2 px-[18.18px] lg:border-0 lg:bg-white w-11/12">
          <div className="flex items-center justify-between  w-full">
            <span className="text-[#253359] text-[12px] lg:text-[14px] font-xbold ">
              نمودار رزروها
            </span>
            <div className="flex items-center gap-1">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <select
                    id="select"
                    {...register("select")}
                    className="text-[14px] font-xregular border border-[#ADADAD] text-[#404040] rounded-[8px] w-3/3 py-[4px] px-4"
                  >
                    <option value="option1"> سالانه </option>
                    <option value="option2"> همه </option>
                  </select>
                </div>
              </form>
              <RiMore2Fill className="w-[19px] h-[19px]" />
            </div>
          </div>
          <div className="w-full">
            <LineChart />
          </div>
          <div className="flex items-center gap-3 mt-[-60px]">
            <div className="flex items-center gap-2">
              <FaSquare className="text-[#668FD9]" />
              <span className="text-[#868686] font-xregular text-[10px]">
                صندلی اشتراکی
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaSquare className="text-[#69CDF1]" />
              <span className="text-[#868686] font-xregular text-[10px]">
                اتاق جلسات
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
