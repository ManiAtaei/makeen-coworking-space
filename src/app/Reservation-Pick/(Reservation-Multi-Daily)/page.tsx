"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5"; // برای آیکون حذف
import moment from "jalali-moment";
import { set } from "react-hook-form";

const MultiDiaily = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [isCalendarSelected, setIsCalendarSelected] = useState(false);
  const [seatType, setSeatType] = useState("");
  const [disCount, setDisCount] = useState(false);

  // تنظیم تاریخ فعلی به صورت شمسی
  const [currentDate, setCurrentDate] = useState(() => {
    return moment().locale("fa");
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    return currentDate.format("jMMMM jYYYY");
  });

  // روزهای هفته
  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  // تخفیف ها
  const discount = [
    { id: 1, day: "5", percentage: "10%" },
    { id: 2, day: "10", percentage: "15%" },
    { id: 3, day: "15", percentage: "20%" },
  ];

  const [discountText, setDiscountText] = useState("");

  useEffect(() => {
    if (selectedDays.length < 5) {
      setDisCount(false);
      setDiscountText("");
    } else if (selectedDays.length >= 5 && selectedDays.length < 10) {
      setDisCount(true);
      setDiscountText("5% تخفیف");
    } else if (selectedDays.length >= 10 && selectedDays.length < 15) {
      setDisCount(true);
      setDiscountText("15% تخفیف");
    } else if (selectedDays.length >= 15) {
      setDisCount(true);
      setDiscountText("25% تخفیف");
    }
  }, [selectedDays]);

  // قیمت ها
  const price = [
    { id: 1, title: " قیمت عادی ", price: "100,000" },
    {
      id: 2,
      title: " قیمت دانشجو مکین ",
      price: "60,000",
      res: "text-[#3BC377]",
    },
  ];

  // محاسبه روزهای ماه و روز اول ماه
  const getMonthDays = () => {
    // کل روزهای ماه
    const daysInMonth = currentDate.jDaysInMonth();

    // پیدا کردن اولین روز ماه
    const firstDayOfMonth = moment(currentDate).startOf("jMonth");
    // شنبه = 0، یکشنبه = 1، ... جمعه = 6
    const dayOfWeek = firstDayOfMonth.day();
    // تطبیق با ایندکس‌های آرایه weekDays (شنبه = 0)
    const firstDayIndex = dayOfWeek === 6 ? 0 : dayOfWeek + 1;

    // ساخت آرایه روزهای ماه
    let days = Array(firstDayIndex).fill(null); // روزهای خالی قبل از شروع ماه
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const [calendarDays, setCalendarDays] = useState(getMonthDays);

  // تغییر ماه
  const changeMonth = (amount) => {
    const newDate = moment(currentDate).add(amount, "jMonth");
    setCurrentDate(newDate);
    setCurrentMonth(newDate.format("jMMMM jYYYY"));
    setCalendarDays(getMonthDays());
    setSelectedDays([]); // پاک کردن روزهای انتخاب شده با تغییر ماه
    if (selectedDays.length > 0) {
      setIsCalendarSelected(false);
    }
  };

  // به روز رسانی تقویم با تغییر تاریخ
  useEffect(() => {
    setCalendarDays(getMonthDays());
  }, [currentDate]);

  const handleDaySelect = (day) => {
    if (!day) return; // برای سلول های خالی

    if (!isCalendarSelected) {
      setIsCalendarSelected(true);
    }

    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      if (selectedDays.length <= 1) {
        setIsCalendarSelected(false);
      }
    } else {
      setSelectedDays([...selectedDays, day].sort((a, b) => a - b));
    }
  };

  // حذف روز از لیست روزهای انتخابی
  const removeSelectedDay = (day) => {
    const updatedDays = selectedDays.filter((d) => d !== day);
    setSelectedDays(updatedDays);

    if (updatedDays.length === 0) {
      setIsCalendarSelected(false);
    }
  };

  // بررسی آیا روز مورد نظر جمعه است
  const isHoliday = (day) => {
    if (!day) return false;

    // ساخت تاریخ برای روز مورد نظر
    const date = moment(currentDate).jDate(day);
    // جمعه = 5 (در moment.js)
    return date.day() === 5;
  };

  // فرمت تاریخ برای نمایش
  const formatDate = (day) => {
    if (!day) return "";
    return moment(currentDate).jDate(day).format("jD jMMMM");
  };

  return (
    <div className="bg-white rounded-t-2xl mt-[10px] pt-4 px-6 h-full">
      <h1 className="text-[18px] font-xbold text-[#404040]">
        انتخاب تاریخ رزرو
      </h1>
      <div className="flex items-start gap-6 mt-4 w-full">
        <div className="flex flex-col w-[47.3%]">
          <div className="border border-[#ADADAD] px-4 py-6 rounded-2xl">
            <h3 className="text-[#404040] text-[16px] font-xbold pb-6">
              انتخاب جزییات رزرو
            </h3>

            <select
              className={`px-3 text-[#404040] font-xregular text-[14px] py-[11.5px] rounded-lg border border-[#ADADAD] w-full`}
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
            >
              <option value="">انتخاب نوع صندلی</option>
              <option value="صندلی اشتراکی">صندلی اشتراکی</option>
              <option value="صندلی اختصاصی">صندلی اختصاصی</option>
            </select>

            {/* نمایش بخش تخفیف فقط اگر نوع صندلی انتخاب شده باشد */}
            {seatType && (
              <div className="bg-[#F4FFF9] flex flex-col items-center border-2 border-[#3BC377] rounded-2xl mt-4">
                <div className="flex items-center gap-2 text-[14px] font-xbold">
                  <span className="bg-[#3BC377] text-white px-[7.5px] flex items-center rounded py-[7px]">
                    تخفیف
                  </span>
                  <span className="text-[#227346]">
                    هزینه کمتر با رزرو بیشتر!
                  </span>
                </div>
                <div className="space-y-4 mt-4 mb-6">
                  {discount.map((item) => (
                    <div key={item.id}>
                      <span className="text-[14px] font-xregular text-[#868686]">
                        {item.percentage} درصد تخفیف برای رزرو {item.day} روز
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* نمایش بخش قیمت‌ها فقط اگر نوع صندلی انتخاب شده باشد */}
            {seatType && (
              <div className="mt-4">
                {price.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-[14px] py-[8.5px] px-2 odd:bg-[#F9F9F9] even:bg-white"
                  >
                    <span className="font-xregular"> {item.title} </span>
                    <span className={`text-[#202020] font-xbold ${item.res}`}>
                      {item.price} تومان
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {seatType && (
            <div className="flex items-center gap-2 mt-6 text-[#404040] text-[12px] font-xregular border border-[#4073D0] py-[15px] px-4 rounded-lg bg-[#ECF9FD]">
              <img src="/admin-panel/info.svg" alt="img" />
              <span>روزهای دلخواه خود را برای رزرو در تقویم انتخاب کنید.</span>
            </div>
          )}
        </div>

        {/* Calendar Section */}
        <div className="border-[#CBCBCB] border rounded-2xl pt-6 px-6 w-[70%]">
          <div className="flex justify-between items-center mb-6">
            <button
              className="border border-[#DFDFDF] p-[6px] rounded-[4px]"
              onClick={() => changeMonth(-1)}
            >
              <IoIosArrowForward className="w-5 h-5 text-[#ADADAD] rounded-[4px]" />
            </button>
            <h2 className="text-[16px] font-xbold">{currentMonth}</h2>
            <button
              className="border border-[#DFDFDF] p-[6px] rounded-[4px]"
              onClick={() => changeMonth(1)}
            >
              <IoIosArrowBack className="w-5 h-5 text-[#ADADAD]" />
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
          <div className="grid grid-cols-7 gap-2 px-[13px] w-full">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => day && !isHoliday(day) && handleDaySelect(day)}
                className={`h-[56px] w-[56px] flex flex-col justify-center items-center text-[#404040] text-[14px] font-xbold ${
                  day ? "cursor-pointer" : ""
                } rounded-[4px] transition-colors
                  ${
                    day && selectedDays.includes(day)
                      ? "bg-[#B4E6F8] text-[#404040]"
                      : ""
                  }
                  ${
                    day && isHoliday(day)
                      ? "bg-[#F4F5FC] text-[#CBCBCB] cursor-not-allowed"
                      : day
                      ? "hover:border hover:border-[#474747]"
                      : ""
                  }
                `}
              >
                {day}
                {day && day % 5 === 0 && (
                  <div className="text-[10px] font-xbold text-[#404040]">
                    ۳ خالی
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-5 mb-[26px] text-[#202020] text-[10px] font-xregular">
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
          <div className="space-y-2 mt-4">
            {/* نمایش تعداد روزهای انتخابی */}
            <div className="flex items-center justify-between p-2 bg-[#F9F9F9]">
              <span className="text-[#404040] text-[14px] font-xregular">
                تعداد روز انتخابی
              </span>
              <span className="text-[#404040] text-[14px] font-xbold">
                {selectedDays.length}
              </span>
            </div>

            {/* نمایش لیست روزهای انتخاب شده */}
            {selectedDays.length > 0 && (
              <div className="mt-4 px-4 pb-4 pt-2 rounded-lg border border-[#ADADAD]">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[#4073D0] text-[12px] font-xbold">
                    {selectedDays.length} روز
                  </span>
                  <h2 className="text-[#404040]  text-[12px] font-xbold">
                    {currentMonth}
                  </h2>
                  <button className="flex items-center gap-2">
                    <img src="/admin-panel/trash.svg" alt="img" />
                    <img src="/admin-panel/chevron-down.svg" alt="img" />
                  </button>
                </div>
                <ul className=" mt-2">
                  {selectedDays.map((day) => (
                    <li
                      key={day}
                      className="flex items-center justify-between p-[5px] rounded-md odd:bg-[#F9F9F9] even:bg-white"
                    >
                      <span className="text-[#404040] text-[12px] font-xregular">
                        {day} {currentDate.format("jMMMM jYYYY")}
                      </span>
                      <button onClick={() => removeSelectedDay(day)}>
                        <img src="/admin-panel/close-circle.svg" alt="img" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {selectedDays.length > 0 && (
            <div >
              <div className="flex items-center justify-between mt-4 px-2 py-[10.5px] rounded-lg">
                <span className="text-[#404040] text-[14px] font-xregular">
                  قیمت کل
                </span>
                <span className="text-[#404040] text-[14px] font-xregular">
                  {selectedDays.length * 100000} تومان
                </span>
              </div>
              {disCount && (
                <div className="flex flex-col px-2 py-[10.5px]">
                  <div className="  text-[14px] flex items-center justify-between">
                    <span className=" font-xregular text-[#404040]  ">
                      تخفیف
                    </span>
                    <span className="text-[#3BC377] font-xbold ">
                      {discountText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <img
                      className="size-5"
                      src="/admin-panel/info.svg"
                      alt="img"
                    />
                    <span className="text-[#4073D0] text-[12px] font-xregular ">
                      در صورت وجود چندین تخفیف، فقط بیشترین مقدار تخفیف برای شما
                      محاسبه می‌شود.
                    </span>
                  </div>
                </div>
              )}
              <div className="  text-[14px] flex items-center justify-between px-2 py-[10.5px]">
                <span className=" font-xregular text-[#404040]  ">
                  موجودی کیف پول
                </span>
                <span className="text-[#404040] font-xregular ">
                  ۲۰۰٬۰۰۰ تومان
                </span>
              </div>
              <div className="  text-[14px] flex items-center justify-between px-2 py-[10.5px]">
                <span className=" font-xbold text-[#404040]  ">
                  مبلغ قابل پرداخت
                </span>
                <span className="text-[#404040] font-xbold ">
                  ۲۸5٬۰۰۰ تومان
                </span>
              </div>
            </div>
          )}
          <button
            className={`w-full mt-4 text-[16px] font-xmedium py-3 text-white rounded-lg ${
              isCalendarSelected && seatType
                ? "bg-[#253359]"
                : "bg-[#A3A3A3] cursor-not-allowed"
            }`}
            onClick={() =>
              isCalendarSelected &&
              seatType &&
              setActiveStep((prev) => prev + 1)
            }
            disabled={!isCalendarSelected || !seatType}
          >
            تایید و ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiDiaily;
