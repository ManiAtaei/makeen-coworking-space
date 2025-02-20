"use client";
import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function DailyOnline() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);

  const Inventory = [{ id: 1, total: " 250,000 " }];
  const details = [
    {
      id: 1,
      title: " نوع اشتراک ",
      Description: " صندلی اشتراکی ",
      res: " text-[#404040] text-[14px] font-xregular ",
    },
    {
      id: 2,
      title: " تعداد روز انتخابی ",
      Description: "7",
      res: " text-[#404040] text-[14px] font-xregular ",
    },
    {
      id: 3,
      title: " قیمت عادی ",
      Description: "100,000 تومان ",
      res: "text-[#202020] text-[14px] font-xbold",
    },
    {
      id: 4,
      title: " قیمت دانشجو مکین ",
      Description: "60,000 تومان",
      res: " text-[#3BC377] text-[14px] font-xbold ",
    },
    {
      id: 5,
      title: " قیمت کل ",
      Description: "300,000 تومان",
      res: " text-[#404040] text-[14px] font-xregular ",
    },
    {
      id: 6,
      title: " تخفیف ",
      Description: " ۵٪ رزرو بلند مدت ",
      res: " text-[#00BA88] text-[14px] font-xregular ",
    },
    {
      id: 7,
      title: " اعتبار کیف پول ",
      Description: "0 تومان ",
      res: " text-[#00BA88] text-[14px] font-xregular ",
    },
    {
      id: 8,
      title: " مبلغ قابل پرداخت ",
      Description: "270,000 تومان",
      res: "text-[#202020] text-[14px] font-xbold",
    },
  ];

  return (
    <div className="bg-white rounded-t-2xl mt-[13px] pt-4 px-6 h-full ">
      <h1 className="text-[18px] font-xbold text-[#404040]">پرداخت</h1>
      <div className="mt-8 w-full flex items-start gap-6">
        <div className="border border-[#ADADAD] px-6 pt-6 pb-8 rounded-2xl w-[28%]">
          <h1 className="text-[#404040] font-xbold text-[16px]">
            انتخاب روش پرداخت
          </h1>
          <div className="mt-3 flex items-center text-[#202020] font-xregular text-[14px] gap-2">
            <input
              type="radio"
              name="radio-7"
              className="radio radio-info w-5 h-5"
              defaultChecked
            />
            پرداخت آنلاین
          </div>
          <div className="mt-4 flex items-center text-[#202020] font-xregular text-[14px] gap-2">
            <input
              type="radio"
              name="radio-7"
              className="radio radio-info w-5 h-5"
              defaultChecked
            />
            پرداخت از کیف پول
          </div>
          {Inventory.map((item) => (
            <span
              key={item.id}
              className="text-[#606060] text-[12px] font-xregular mr-[30px]"
            >
              موجودی {item.total} تومان
            </span>
          ))}
        </div>
        <div className="border border-[#ADADAD] px-6 pt-6 pb-8 rounded-2xl w-[37%]">
          <h1 className="text-[#404040] font-xbold text-[16px]">
            جزییات پرداخت
          </h1>
          <div className="mt-4">
            {details.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between even:bg-[#F9F9F9] odd:bg-white py-[8.5px] px-2 ${
                  item.id === 4 ? "bg-[#F4FFF9]" : ""
                }`}
              >
                <span
                  className={`text-[#404040] text-[14px] font-xregular ${item.res}`}
                >
                  {item.title}
                </span>
                <span className={`${item.res}`}>{item.Description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[31.6%]">
          <h3 className="text-[#404040] text-[14px] font-xbold mt-4">
            لیست رزرو انتخابی شما
          </h3>
          {selectedDays.length > 0 && (
            <div className="space-y-2">
              {selectedDays.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-2 odd:bg-[#F9F9F9] even:bg-white rounded-lg"
                >
                  <span className="text-[#404040] text-[12px] font-xregular">{`۱۴۰۳/۱۱/${day}`}</span>
                  <button className="text-[#ADADAD] rounded">
                    <IoCloseCircleOutline className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center mt-4 gap-4">
            <button
              className="border border-[#253359] w-full text-[14px] font-xmedium py-[8.5px] text-[#253359] rounded-lg"
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              مرحله قبل
            </button>
            <button
              className="bg-[#253359] w-full text-[14px] font-xmedium py-[9.5px] text-white rounded-lg"
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              تایید و پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
