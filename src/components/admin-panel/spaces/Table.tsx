"use client"; 
import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

interface ReservationSpace {
  id: string;
  name: string;
  space: number;
  pricePerReserve: number;
  pricePerReserveForStudents: number;
  fromTime: number;
  toTime: number;
}

export default function Table() {
  const [info, setInfo] = useState<ReservationSpace[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ReservationSpace[]>(
          "https://109.230.200.230:7890/api/v1/Users/Reservation-Spaces",
          {
            withCredentials: true, // اگر احراز هویت با کوکی‌ها نیازه
          }
        );

        console.log("خروجی API رزرو فضاها:", response.data);

        setInfo(response.data);
        setError(null);
      } catch (err: any) {
        console.error("خطا در دریافت داده‌ها:", err.response?.data || err.message);
        setError("خطا در بارگذاری داده‌ها");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500 text-[12px] mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th>
                <label>
                  <input type="checkbox" className="checkbox p-0" />
                </label>
              </th>
              <th>ردیف</th>
              <th>تاریخ افزودن</th>
              <th>عنوان فضا</th>
              <th>قیمت دانشجو مکین</th>
              <th>قیمت کاربر عادی</th>
              <th>ظرفیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {info.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{index + 1}</td>
                <td>ثابت (نیاز به داده)</td> {/* تاریخ توی API نیست */}
                <td>{item.name}</td>
                <td>{item.pricePerReserveForStudents.toLocaleString("fa-IR")} تومان</td>
                <td>{item.pricePerReserve.toLocaleString("fa-IR")} تومان</td>
                <td>{item.space}</td>
                <td className="flex items-center gap-3 w-full text-[#ADADAD]">
                  <LuTrash2 className="w-[22px] h-[22px]" />
                  <SlEye className="h-[22px] w-[22px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش{" "}
            <span className="text-[#202020] font-xbold">{info.length}</span> از
            68 نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060] rounded-[4px]" />
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            1
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            2
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            3
          </button>
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowBack className="w-4 h-4 text-[#606060]" />
          </button>
        </div>
      </div>
    </div>
  );
}