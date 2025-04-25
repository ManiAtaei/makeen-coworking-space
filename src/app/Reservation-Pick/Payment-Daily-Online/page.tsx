"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import moment from "jalali-moment";
import { useReservation } from "../(Reservation-Multi-Daily)/ReservationContext";

export default function DailyOnline() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(2); // شماره مرحله پرداخت
  
  // استفاده از context
  const {
    seatType,
    selectedDays,
    totalPrice,
    discountText,
    walletBalance,
    finalPrice,
    isStudentMakin,
    studentPrice,
    regularPrice,
    setSelectedDays,
    calculateTotalPrice,
    goToPreviousStep,
  } = useReservation();
  
  // وضعیت باز بودن هر ماه در لیست رزروها
  const [expandedMonths, setExpandedMonths] = useState({});
  
  // گروه‌بندی روزهای انتخابی بر اساس ماه
  const [groupedDays, setGroupedDays] = useState({});

  // گروه‌بندی روزهای انتخابی بر اساس ماه
  useEffect(() => {
    if (selectedDays && selectedDays.length > 0) {
      // گروه‌بندی روزها براساس ماه
      const grouped = selectedDays.reduce((result, dayItem) => {
        const { month } = dayItem;
        if (!result[month]) {
          result[month] = [];
          // به صورت پیش‌فرض هر ماه باز باشد
          setExpandedMonths(prev => ({
            ...prev,
            [month]: true
          }));
        }
        result[month].push(dayItem);
        return result;
      }, {});
      
      setGroupedDays(grouped);
    } else {
      setGroupedDays({});
    }
  }, [selectedDays]);
  
  // ایجاد آرایه جزئیات با مقادیر واقعی از context
  const details = [
    {
      id: 1,
      title: " نوع اشتراک ",
      Description: seatType || " صندلی اشتراکی ",
      res: " text-[#404040] text-[14px] font-xregular ",
    },
    {
      id: 2,
      title: " تعداد روز انتخابی ",
      Description: selectedDays.length.toString() || "0",
      res: " text-[#404040] text-[14px] font-xregular ",
    },
    {
      id: 3,
      title: " قیمت عادی ",
      Description: `${regularPrice.toLocaleString()} تومان`,
      res: "text-[#202020] text-[14px] font-xregular",
    },
    {
      id: 4,
      title: " قیمت دانشجو مکین ",
      Description: `${studentPrice.toLocaleString()} تومان`,
      res: " text-[#3BC377] text-[14px] font-xregular ",
    },
    {
      id: 5,
      title: " قیمت کل ",
      Description: `${totalPrice.toLocaleString()} تومان`,
      res: " text-[#404040] text-[14px] font-xregular ",
    },
    {
      id: 6,
      title: " تخفیف ",
      Description: discountText || " ٪۰ ",
      res: " text-[#3BC377] text-[14px] font-xbold ",
    },
    {
      id: 7,
      title: " مبلغ قابل پرداخت ",
      Description: `${finalPrice.toLocaleString()} تومان`,
      res: "text-[#404040] text-[14px] font-xbold",
    },
  ];

  // اطلاعات کیف پول
  const Inventory = [{ id: 1, total: walletBalance.toLocaleString() }];

  // بازگشت به مرحله قبل
  const handlePrevStep = () => {
    goToPreviousStep(); // تغییر وضعیت در context
    router.push("/Reservation-Pick"); // مسیر صفحه MultiDiaily
  };

  // تأیید و پرداخت
  const handlePayment = () => {
    try {
      // اینجا می‌توانید منطق پرداخت را اضافه کنید
      setActiveStep((prev) => prev + 1);
      router.push("/payment-confirmation"); // مسیر صفحه تأیید پرداخت
    } catch (error) {
      console.error("خطا در پرداخت:", error);
      alert("مشکلی در پرداخت رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  };

  // حذف یک روز از لیست روزهای انتخابی
  const handleRemoveDay = (month, day) => {
    // حذف روز از آرایه selectedDays
    const updatedDays = selectedDays.filter(
      (item) => !(item.month === month && item.day === day)
    );
    
    // به‌روزرسانی لیست روزهای انتخاب شده
    setSelectedDays(updatedDays);
    
    // به‌روزرسانی گروه‌بندی
    const updatedGrouped = { ...groupedDays };
    updatedGrouped[month] = updatedGrouped[month].filter(item => item.day !== day);
    
    // اگر ماه خالی شد، آن را حذف کنیم
    if (updatedGrouped[month].length === 0) {
      delete updatedGrouped[month];
    }
    
    setGroupedDays(updatedGrouped);
    
    // به‌روزرسانی قیمت‌ها
    setTimeout(() => {
      calculateTotalPrice();
    }, 100);
  };

  // حذف تمام روزهای یک ماه
  const clearMonthSelections = (month) => {
    // حذف همه روزهای این ماه از آرایه selectedDays
    const updatedDays = selectedDays.filter(item => item.month !== month);
    
    // به‌روزرسانی لیست روزهای انتخاب شده
    setSelectedDays(updatedDays);
    
    // به‌روزرسانی گروه‌بندی
    const updatedGrouped = { ...groupedDays };
    delete updatedGrouped[month];
    setGroupedDays(updatedGrouped);
    
    // به‌روزرسانی قیمت‌ها
    setTimeout(() => {
      calculateTotalPrice();
    }, 100);
  };

  // تغییر وضعیت باز/بسته بودن لیست رزرو یک ماه
  const toggleMonthExpansion = (month) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

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
          <div className="flex items-center mt-4 gap-1">
            <div className=" flex items-center text-[#202020] font-xregular text-[14px] gap-2">
              <input
                type="radio"
                name="radio-7"
                className="radio radio-info w-5 h-5"
              />
              پرداخت از کیف پول
            </div>
            {Inventory.map((item) => (
              <span
                key={item.id}
                className="text-[#606060] text-[12px] font-xregular"
              >
                (موجودی {item.total} تومان)
              </span>
            ))}
          </div>
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
                <span className={`text-[#404040] ${item.res}`}>
                  {item.title}
                </span>
                <span className={`${item.res}`}>{item.Description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[31.6%]">
          <h3 className="text-[#404040] text-[14px] font-xbold">
            لیست رزرو انتخابی شما
          </h3>
          
          {/* نمایش تعداد روزهای انتخابی */}
          <div className="flex items-center justify-between p-2 bg-[#F9F9F9] rounded-lg mt-2">
            <span className="text-[#404040] text-[14px] font-xregular">
              تعداد روز انتخابی
            </span>
            <span className="text-[#404040] text-[14px] font-xbold">
              {selectedDays.length}
            </span>
          </div>
          
          {/* نمایش لیست روزهای انتخاب شده به تفکیک ماه */}
          <div className="space-y-2 mt-2">
            {Object.entries(groupedDays).map(([month, days]) => (
              <div key={month} className="mt-2 px-4 pb-4 pt-2 rounded-lg border border-[#ADADAD]">
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
                        className={`transform ${expandedMonths[month] ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>
                
                {expandedMonths[month] && (
                  <ul className="mt-2">
                    {days.map((dayItem, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-[5px] rounded-md odd:bg-[#F9F9F9] even:bg-white"
                      >
                        <span className="text-[#404040] text-[12px] font-xregular">
                          {dayItem.day} {month}
                        </span>
                        <button onClick={() => handleRemoveDay(month, dayItem.day)}>
                          <img src="/admin-panel/close-circle.svg" alt="حذف" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center mt-4 gap-4">
            <button
              className="border border-[#253359] w-full text-[14px] font-xmedium py-[8.5px] text-[#253359] rounded-lg"
              onClick={handlePrevStep}
            >
              مرحله قبل
            </button>
            <button
              className="bg-[#253359] w-full text-[14px] font-xmedium py-[9.5px] text-white rounded-lg"
              onClick={handlePayment}
            >
              تایید و پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}