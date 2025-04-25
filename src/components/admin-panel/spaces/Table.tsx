"use client";
import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import axios from "axios";
import Pagination from "../Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // تعداد آیتم‌ها در هر صفحه

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ReservationSpace[]>(
          "https://109.230.200.230:7890/api/v1/Users/Reservation-Spaces",
          {
            withCredentials: true,
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
  }, []); // فقط یک بار هنگام لود صفحه اجرا می‌شه

  // تعداد کل نتایج
  const totalResults = info.length;

  // فیلتر کردن داده‌ها برای صفحه فعلی (صفحه‌بندی سمت کلاینت)
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInfo = info.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
            {paginatedInfo.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{startIndex + index + 1}</td>
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
      
      {/* استفاده از کامپوننت پگینیشن */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalResults}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}