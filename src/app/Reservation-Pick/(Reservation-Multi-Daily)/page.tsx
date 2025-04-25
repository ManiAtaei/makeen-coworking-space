"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";
import { useReservation } from "./ReservationContext";

const MultiDiaily = () => {
  const router = useRouter();

  // استفاده از context
  const {
    seatType,
    setSeatType,
    selectedDays,
    setSelectedDays,
    discountText,
    setDiscountText,
    setDiscountApplied,
    calculateTotalPrice,
    calculateFinalPrice,
    walletBalance,
    totalPrice,
    finalPrice,
    goToNextStep,
  } = useReservation();

  const [isCalendarSelected, setIsCalendarSelected] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // تنظیم تاریخ فعلی به صورت شمسی
  const [currentDate, setCurrentDate] = useState(() => {
    return moment().locale("fa");
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    return currentDate.format("jMMMM jYYYY");
  });

  // ذخیره انتخاب‌ها برای هر ماه
  const [monthlySelections, setMonthlySelections] = useState({});

  // وضعیت باز بودن هر ماه در لیست رزروها
  const [expandedMonths, setExpandedMonths] = useState({});

  // اضافه کردن useEffect جدید برای مقداردهی اولیه state‌های داخلی بر اساس context
  useEffect(() => {
    // اگر از قبل مقداردهی نشده و context دارای داده است
    if (!initialized && selectedDays.length > 0) {
      // گروه‌بندی روزها براساس ماه
      const groupedByMonth = {};

      selectedDays.forEach((dayItem) => {
        const { month, day } = dayItem;
        if (!groupedByMonth[month]) {
          groupedByMonth[month] = [];
        }
        groupedByMonth[month].push(Number(day));
      });

      // به‌روزرسانی monthlySelections
      setMonthlySelections(groupedByMonth);

      // به‌روزرسانی expandedMonths (باز کردن همه ماه‌ها)
      const expandStates = {};
      Object.keys(groupedByMonth).forEach((month) => {
        expandStates[month] = true;
      });
      setExpandedMonths(expandStates);

      // به‌روزرسانی وضعیت انتخاب تقویم
      setIsCalendarSelected(true);
      calculateTotalPrice();
      // علامت‌گذاری که مقداردهی اولیه انجام شده
      setInitialized(true);
    }
  }, [selectedDays, initialized]);

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
    { id: 1, day: "5", percentage: "5%" },
    { id: 2, day: "10", percentage: "15%" },
    { id: 3, day: "15", percentage: "25%" },
  ];

  // محاسبه تعداد کل روزهای انتخاب شده در همه ماه‌ها
  const getTotalSelectedDays = () => {
    let total = 0;
    Object.values(monthlySelections).forEach((days) => {
      total += days.length;
    });
    return total;
  };

  // این useEffect را اصلاح کنید:
  useEffect(() => {
    if (selectedDays.length > 0 && seatType) {
      calculateTotalPrice();
    }
  }, [selectedDays, seatType]);

  // اصلاح useEffect مربوط به به‌روزرسانی selectedDays
  useEffect(() => {
    const totalDays = getTotalSelectedDays();

    // به‌روزرسانی وضعیت تخفیف
    if (totalDays < 5) {
      setDiscountApplied(false);
      setDiscountText("");
    } else if (totalDays >= 5 && totalDays < 10) {
      setDiscountApplied(true);
      setDiscountText("5% تخفیف");
    } else if (totalDays >= 10 && totalDays < 15) {
      setDiscountApplied(true);
      setDiscountText("15% تخفیف");
    } else if (totalDays >= 15) {
      setDiscountApplied(true);
      setDiscountText("25% تخفیف");
    }

    // به‌روزرسانی selectedDays در context برای استفاده در صفحات بعدی
    const allSelectedDays = [];
    Object.entries(monthlySelections).forEach(([month, days]) => {
      days.forEach((day) => {
        allSelectedDays.push({ month, day });
      });
    });

    setSelectedDays(allSelectedDays);
    setIsCalendarSelected(totalDays > 0);

    // فراخوانی صریح calculateTotalPrice
    if (allSelectedDays.length > 0 && seatType) {
      calculateTotalPrice();
    }
  }, [monthlySelections, seatType]);

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
    const newMonth = newDate.format("jMMMM jYYYY");
    setCurrentMonth(newMonth);
    setCalendarDays(getMonthDays());

    // اطمینان از اینکه وضعیت باز/بسته برای ماه جدید تنظیم شده است
    if (expandedMonths[newMonth] === undefined) {
      setExpandedMonths((prev) => ({
        ...prev,
        [newMonth]: true, // ماه جدید به صورت پیش‌فرض باز باشد
      }));
    }

    // ایجاد آرایه خالی برای ماه جدید اگر وجود ندارد
    if (!monthlySelections[newMonth]) {
      setMonthlySelections((prev) => ({
        ...prev,
        [newMonth]: [],
      }));
    }
  };

  // به روز رسانی تقویم با تغییر تاریخ
  useEffect(() => {
    setCalendarDays(getMonthDays());
  }, [currentDate]);

  // اضافه کردن یا حذف روز از انتخاب‌های ماه فعلی
  const handleDaySelect = (day) => {
    if (!day) return; // برای سلول های خالی

    const month = currentMonth;

    // اطمینان از اینکه ماه فعلی در monthlySelections وجود دارد
    if (!monthlySelections[month]) {
      setMonthlySelections((prev) => ({
        ...prev,
        [month]: [],
      }));
    }

    // افزودن یا حذف روز از انتخاب‌های ماه فعلی
    setMonthlySelections((prev) => {
      const currentMonthSelections = prev[month] || [];

      if (currentMonthSelections.includes(day)) {
        // حذف روز اگر قبلاً انتخاب شده است
        return {
          ...prev,
          [month]: currentMonthSelections.filter((d) => d !== day),
        };
      } else {
        // افزودن روز اگر قبلاً انتخاب نشده است
        return {
          ...prev,
          [month]: [...currentMonthSelections, day].sort((a, b) => a - b),
        };
      }
    });

    // اطمینان از اینکه ماه در لیست باز است
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: true,
    }));
  };

  // حذف روز از لیست روزهای انتخابی
  const removeSelectedDay = (month, day) => {
    setMonthlySelections((prev) => ({
      ...prev,
      [month]: prev[month].filter((d) => d !== day),
    }));

    // این محاسبه در useEffect انجام خواهد شد
  };

  // حذف تمام روزهای انتخابی یک ماه
  const clearMonthSelections = (month) => {
    setMonthlySelections((prev) => ({
      ...prev,
      [month]: [],
    }));

    // این محاسبه در useEffect انجام خواهد شد
  };

  // تغییر وضعیت باز/بسته بودن لیست رزرو یک ماه
  const toggleMonthExpansion = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
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

  // هدایت به صفحه بعدی - اصلاح شده
  const handleContinue = () => {
    if (getTotalSelectedDays() > 0 && seatType) {
      // اول وضعیت مرحله را در کانتکست تغییر می‌دهیم
      goToNextStep();

      // برای اطمینان از اینکه داده‌ها در کانتکست ذخیره شده‌اند
      setTimeout(() => {
        // سپس به صفحه پرداخت هدایت می‌کنیم
        router.push("/Reservation-Pick/Payment-Daily-Online");
      }, 100);
    }
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
                    day && monthlySelections[currentMonth]?.includes(day)
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
                {getTotalSelectedDays()}
              </span>
            </div>

            {/* نمایش لیست روزهای انتخاب شده به تفکیک ماه */}
            {Object.entries(monthlySelections)
              .filter(([month, days]) => days.length > 0)
              .map(
                ([month, days]) =>
                  days.length > 0 && (
                    <div
                      key={month}
                      className="mt-4 px-4 pb-4 pt-2 rounded-lg border border-[#ADADAD]"
                    >
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[#4073D0] text-[12px] font-xbold">
                          {days.length} روز
                        </span>
                        <h2 className="text-[#404040] text-[12px] font-xbold">
                          {month}
                        </h2>
                        <div className="flex items-center">
                          <button
                            onClick={() => clearMonthSelections(month)}
                            className="mr-2"
                          >
                            <img src="/admin-panel/trash.svg" alt="حذف همه" />
                          </button>
                          <button onClick={() => toggleMonthExpansion(month)}>
                            <img
                              src="/admin-panel/chevron-down.svg"
                              alt="باز/بسته"
                              className={`transform ${
                                expandedMonths[month] ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {expandedMonths[month] && (
                        <ul className="mt-2">
                          {days.map((day) => (
                            <li
                              key={day}
                              className="flex items-center justify-between p-[5px] rounded-md odd:bg-[#F9F9F9] even:bg-white"
                            >
                              <span className="text-[#404040] text-[12px] font-xregular">
                                {day} {month}
                              </span>
                              <button
                                onClick={() => removeSelectedDay(month, day)}
                              >
                                <img
                                  src="/admin-panel/close-circle.svg"
                                  alt="حذف"
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
              )}
          </div>

          {getTotalSelectedDays() > 0 && (
            <div>
              <div className="flex items-center justify-between mt-4 px-2 py-[10.5px] rounded-lg">
                <span className="text-[#404040] text-[14px] font-xregular">
                  قیمت کل
                </span>
                <span className="text-[#404040] text-[14px] font-xregular">
                  {totalPrice.toLocaleString()} تومان
                </span>
              </div>
              {discountText && (
                <div className="flex flex-col px-2 py-[10.5px]">
                  <div className="text-[14px] flex items-center justify-between">
                    <span className="font-xregular text-[#404040]">تخفیف</span>
                    <span className="text-[#3BC377] font-xbold">
                      {discountText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <img
                      className="size-5"
                      src="/admin-panel/info.svg"
                      alt="img"
                    />
                    <span className="text-[#4073D0] text-[12px] font-xregular">
                      در صورت وجود چندین تخفیف، فقط بیشترین مقدار تخفیف برای شما
                      محاسبه می‌شود.
                    </span>
                  </div>
                </div>
              )}
              <div className="text-[14px] flex items-center justify-between px-2 py-[10.5px]">
                <span className="font-xregular text-[#404040]">
                  موجودی کیف پول
                </span>
                <span className="text-[#404040] font-xregular">
                  {walletBalance.toLocaleString()} تومان
                </span>
              </div>
              <div className="text-[14px] flex items-center justify-between px-2 py-[10.5px]">
                <span className="font-xbold text-[#404040]">
                  مبلغ قابل پرداخت
                </span>
                <span className="text-[#404040] font-xbold">
                  {finalPrice.toLocaleString()} تومان
                </span>
              </div>
            </div>
          )}
          <button
            className={`w-full mt-4 text-[16px] font-xmedium py-3 text-white rounded-lg ${
              getTotalSelectedDays() > 0 && seatType
                ? "bg-[#253359]"
                : "bg-[#A3A3A3] cursor-not-allowed"
            }`}
            onClick={handleContinue}
            disabled={getTotalSelectedDays() === 0 || !seatType}
          >
            تایید و ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiDiaily;
