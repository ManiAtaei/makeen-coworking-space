import React, { useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { TbCircleDashedCheck } from "react-icons/tb";
import { TbCircleDashedX } from "react-icons/tb";
import { FaCaretLeft } from "react-icons/fa";
import Table from "./Table";

export default function ReservationManagement() {
  const item = [
    { id: 1, text: " جاری ", icon: <TbCircleDashed size={24} /> },
    { id: 2, text: " پایان یافته  ", icon: <TbCircleDashedCheck size={24} /> },
    { id: 3, text: " لغو شده  ", icon: <TbCircleDashedX size={24} /> },
  ];
  const [select, setSelect] = useState(1);

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        اعلان ها
      </h1>
      <div className="flex items-start mt-4 lg:mt-6 justify-between ">
        <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2  text-[#CBCBCB] text-[14px]  font-xbold flex items-center gap-[12.5px] md:gap-10 ">
          {item.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={`${
                  select === item.id
                    ? "text-[#44C0ED] underline underline-offset-[10px] decoration-2"
                    : "text-[#CBCBCB]"
                }`}
                onClick={() => setSelect(item.id)}
              >
                {item.icon}
                <div className="md:flex md:items-center ">
                  <span className="hidden md:block">
                    رزروهای
                  </span>
                  <span>{item.text}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="hidden text-[#DFDFDF] md:block md:mt-1" />
      <div className="mt-4 md:mt-6">
        <Table />
      </div>
    </div>
  );
}

// import { useState } from "react";

// const ReservationManagement = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const reservations = {
//     1: true, 6: true, 10: true, 14: true, 20: true, 25: true, 29: true,
//   };
//   const holidays = [5, 9, 13, 19, 23, 26];
//   const daysInMonth = 30;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-center mb-4">سال ۱۴۰۳</h2>
//       <div className="grid grid-cols-7 gap-2 text-center">
//         {["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"].map((day) => (
//           <div key={day} className="font-semibold text-gray-700">{day}</div>
//         ))}
//         {[...Array(daysInMonth)].map((_, i) => {
//           const day = i + 1;
//           return (
//             <div
//               key={day}
//               className={`p-3 cursor-pointer rounded-lg border flex items-center justify-center
//                 ${selectedDate === day ? "border-black" : "border-transparent"}
//                 ${reservations[day] ? "bg-blue-200" : ""}
//                 ${holidays.includes(day) ? "bg-gray-200" : "hover:bg-gray-100"}`}
//               onClick={() => setSelectedDate(day)}
//             >
//               {day}
//             </div>
//           );
//         })}
//       </div>
//       <div className="mt-4 flex flex-wrap gap-2">
//         <span className="px-3 py-1 bg-blue-200 rounded">روزهای رزرو شده</span>
//         <span className="px-3 py-1 bg-gray-200 rounded">تعطیل</span>
//       </div>
//     </div>
//   );
// };

// export default ReservationManagement;
