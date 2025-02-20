"use client";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";

const MultiDiaily = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("بهمن ۱۴۰۳");
  const [seatType, setSeatType] = useState("صندلی اشتراکی");

  const discount = [
    { id: 1, day: "5", percentage: "10%" },
    { id: 2, day: "5", percentage: "10%" },
    { id: 3, day: "5", percentage: "10%" },
  ];
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
  ];
  const price = [{ id: 1, title: " مبلغ پرداخت شده ", price: " 270,000 " }];
  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else if (selectedDays.length < 5) {
      setSelectedDays([...selectedDays, day].sort((a, b) => a - b));
    }
  };

  return (
    <div className="bg-white rounded-t-2xl mt-[10px] pt-4 px-6 h-full ">
      <h1 className="text-[18px] font-xbold text-[#404040]">جزییات رزرو</h1>
      <div className="flex items-center gap-2 pr-4 py-4 pl-6 bg-[#FFFBF3] border-2 rounded-lg border-[#F1E0BC] mt-4 justify-between">
        <div className="flex items-center gap-2">
          <AiOutlineExclamationCircle className="h-8 w-8 text-[#E0A03A] " />
          <p className="text-[#404040] text-[12px] font-xregular">
            با کلیک روی روز مورد نظر در تقویم می‌توانید بصورت تک روز یا چند روزه
            فضا مورد نظر خود را رزرو نمائید
          </p>
        </div>
        <span className="text-[#E0A03A] text-[20px]">×</span>
      </div>
      <div className="flex items-start gap-6 mt-4 w-full">
        <div className=" border border-[#ADADAD] px-4 py-6 rounded-2xl w-[47.3%]">
          <h3 className="text-[#404040] text-[16px] font-xbold">جزییات رزرو</h3>

          <div>
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

          <div className="space-y-4 mt-2">
            {discount.map((item) => (
              <div key={item.id} className=" flex flex-col items-start">
                <span className="text-[12px] font-xregular text-[#868686]">
                  {item.percentage} درصد تخفیف برای رزرو {item.day} روز
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            {price.map((item) => (
              <div
                key={item.id}
                className="flex justify-between font-xbold text-[14px] py-[8.5px] px-2 "
              >
                <span className="text-[#404040]"> {item.title} </span>
                <span className="text-[#202020] ">{item.price} تومان</span>
              </div>
            ))}
          </div>
        </div>
        {/* Calendar Section - با سایزهای دقیق درخواستی */}
        <div className="border-[#CBCBCB] border rounded-2xl pt-6 px-6 w-[70%]">
          <div className="flex justify-between items-center mb-6">
            <button className="border border-[#DFDFDF] p-[6px] rounded-[4px]">
              <IoIosArrowForward className="w-5 h-5 text-[#ADADAD]  rounded-[4px]" />
            </button>
            <h2 className="text-[16px] font-xbold">{currentMonth}</h2>
            <button className="border border-[#DFDFDF] p-[6px] rounded-[4px]">
              <IoIosArrowBack className="w-5 h-5 text-[#ADADAD] " />
            </button>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 mb-4 px-[13px] gap-[7px]">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-[12px] font-xregular">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2 px-[13px] w-full ">
            {daysInMonth.map((day) => (
              <div
                key={day}
                onClick={() => handleDaySelect(day)}
                className={` h-[56px] w-[56px] text-center place-content-center text-[#404040] text-[14px] font-xbold cursor-pointer rounded-[4px] transition-colors hover:border hover:border-[#474747]
                  ${
                    selectedDays.includes(day)
                      ? "bg-[#B4E6F8] text-[#404040]"
                      : ""
                  }
                  ${
                    day === 5 || day === 12 || day === 19 || day === 26
                      ? "bg-[#F4F5FC] text-[#CBCBCB]"
                      : ""
                  }`}
              >
                {day}
                {day === 15 && (
                  <div className="text-[10px] font-xbold text-[#404040]">
                    ۳ خالی
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6 mb-[26px] text-[#202020] text-[10px] font-xregular">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#69CDF1] rounded"></div>
              <span>انتخاب شده</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#DFDFDF] rounded"></div>
              <span>پر شده یا تعطیل</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-[14px] bg-[#FFD7C6] rounded-full"></div>
              <span>ظرفیت باقی مانده</span>
            </div>
          </div>
        </div>

        <div className="w-[49.5%]">
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
          <button
            className="bg-[#253359] w-full mt-4 text-[16px] font-xmedium py-3 text-white rounded-lg"
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            تایید و ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiDiaily;
