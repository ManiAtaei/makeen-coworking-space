import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

const ReservationModal = () => {
  // state برای ماه و سال جاری
  const [currentMonth, setCurrentMonth] = useState(10); // شروع از بهمن
  const [currentYear, setCurrentYear] = useState(1403);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isListOpen, setIsListOpen] = useState(true);

  // آرایه ماه‌های فارسی
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  // تعداد روزهای هر ماه
  const getMonthDays = (month) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return 29; // اسفند
  };

  // تغییر به ماه بعد
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // تغییر به ماه قبل
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // محاسبه روز اول ماه (مثال)
  const getFirstDayOfMonth = () => {
    return (currentMonth + 2) % 7; // این یک مثال ساده است
  };

  // آماده‌سازی روزهای ماه
  const prepareDays = () => {
    const totalDays = getMonthDays(currentMonth);
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // روزهای خالی قبل از شروع ماه
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: "", disabled: true });
    }

    // روزهای ماه
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        disabled: false,
        selected: selectedDates.includes(i),
        isToday: i === 3, // فقط برای نمونه
      });
    }

    return days;
  };

  // انتخاب تاریخ
  const handleDateSelect = (day) => {
    if (selectedDates.includes(day)) {
      setSelectedDates(selectedDates.filter((d) => d !== day));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  const Details = [
    { id: 1, title: " نوع اشتراک ", Description: " صندلی اشتراکی بلند مدت " },
    { id: 2, title: " تاریخ ثبت ", Description: " ۱۴۰۳/۱۰/۰۶ " },
    { id: 3, title: " تاریخ های انتخابی ", Description: " ۷ روز " },
    { id: 4, title: " روش پرداخت ", Description: " آنلاین " },
    { id: 5, title: " تخفیف ", Description: " ٪۳ تخفیف بلند مدت " },
    { id: 6, total: " مبلغ قابل پرداخت ", price: " ۴۷۵٬۰۰۰ تومان " },
    {
      id: 7,
      locaion: " آدرس ",
      address:
        " تهران،اتوبان رسالت،بین خیابان مدائن و میدان23،پلاک 520، طبقه۱  ",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-row-reverse gap-6 mt-6 w-full ">
        {/* لیست رزروهای انتخابی */}
        <div className="w-[64%]">
          <div className="text-[#606060] text-[12px] font-xbold">
            لیست رزرو انتخابی شما
          </div>
          <div className="collapse border border-[#ADADAD] rounded-lg mt-2">
            <input
              type="checkbox"
              checked={isListOpen}
              onChange={() => setIsListOpen(!isListOpen)}
            />
            <div className="collapse-title px-2 flex items-center justify-between text-[12px] font-xbold ">
              <span className="text-[#4073D0]"> 5 روز </span>
              <span> بهمن 1403 </span> 
              <IoIosArrowDown className="w-5 h-5" />
            </div>
            <div className="collapse-content p-0 ">
              {selectedDates.map((day) => (
                <div key={day} className="p-2 odd:bg-[#F9F9F9] even:bg-white">
                  {day} {persianMonths[currentMonth]} {currentYear}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* تقویم */}
        <div className="border border-[#253359] shadow-2xl rounded-2xl py-4 px-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <button
              className="border-[1.25px] border-[#DFDFDF] py-2 px-3 shadow-sm rounded-[4px]"
              onClick={prevMonth}
            >
              <IoIosArrowForward className="text-[#ADADAD] w-5 h-5" />
            </button>
            <span className="text-[14px] font-xbold text-[#253359]">
              {persianMonths[currentMonth]} {currentYear}
            </span>
            <button
              className="border-[1.25px] border-[#DFDFDF] py-2 px-3 shadow-sm rounded-[4px]"
              onClick={nextMonth}
            >
              <IoIosArrowBack className="text-[#ADADAD] w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-[#606060] font-xbold text-[12px] px-4 ">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
              <div key={index} className="text-center py-[7px] px-[13px] ">
                {day}
              </div>
            ))}

            {prepareDays().map((day, index) => (
              <button
                key={index}
                className={` text-[#404040] focus:bg-[#B4E6F8] rounded-[3.6px] font-xbold text-[12px] px-[13px] py-[7px] ${
                  !day.day
                    ? "btn-disabled opacity-0"
                    : day.selected
                    ? "btn-primary"
                    : day.isToday
                    ? "btn-accent"
                    : "btn-ghost"
                }`}
                onClick={() => day.day && handleDateSelect(day.day)}
                disabled={day.disabled}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* جزئیات پرداخت */}
        <div className="w-[76%]">
          <div className="flex items-center ">
            <button className="flex items-center border border-[#44C0ED] text-[#44C0ED] text-[12px] font-xregular rounded-[6.66px] px-4 py-[6px] gap-[6.61px]">
              <LuRefreshCcw className="w-5 h-5" /> جابجایی رزرو
            </button>
            <button className="text-[#E9594C] text-[12px] font-xregular mr-[33px]">
              لغو رزرو
            </button>
          </div>
          <h3 className="font-xbold text-[12px] text-[#202020] mt-[13px]">
            جزئیات پرداخت
          </h3>
          <div className="mt-[13px]">
            {Details.map((item) => (
              <div
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-white py-[5px] px-2"
              >
                <div className="flex justify-between text-[10px] font-xregular text-[#404040]">
                  <span>{item.title}</span>
                  <span>{item.Description}</span>
                </div>
                <div className="flex justify-between text-[10px] font-xbold text-[#404040]">
                  <span>{item.total}</span>
                  <span>{item.price}</span>
                </div>
                <div className="flex flex-col text-[#606060] text-[10px] py-0">
                  <span className="font-xbold">{item.locaion}</span>
                  <span className="font-xregular">{item.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
