import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { CiMoneyBill } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Table() {
  const [info, setInfo] = useState([
    {
      id: 1,
      row: "1",
      email: "Mina.Akbari@gmail.com",
      name: "محمد ایمانی",
      date: "۱۳۰۴/۱۰/۱۳",
      card: "۰۸۲۰۱۲۰۱۲۳۴",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get("token");
        console.log("Auth Token from Cookies:", authToken); // دیباگ توکن

        if (!authToken) {
          throw new Error("توکن Authorization یافت نشد. لطفاً وارد شوید.");
        }

        const response = await axios.get(
          "https://109.230.200.230:7890/api/v1/Admins/Users?page=1&pageSize=8&orderBy=CreationTime&sortOrder=DESC",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
          }
        );

        console.log("API Response:", response.data);
        setInfo(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", {
          message: error.message,
          response: error.response?.data || "No response",
          status: error.response?.status || "Unknown",
          headers: error.config?.headers, // چک کردن هدرهای ارسالی
        });
        setError(
          `خطا در بارگذاری داده‌ها: ${error.message} (وضعیت: ${error.response?.status || "نامشخص"})`
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
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
              <th>تاریخ عضویت</th>
              <th>نام کاربر</th>
              <th>ایمیل</th>
              <th>کد ملی</th>
              <th>شماره موبایل</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {info.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{item.row}</td>
                <td>{item.date}</td>
                <td className="flex items-center gap-2">
                  <img src={item.image} alt="profile" className="w-6 h-6" />
                  <span>{item.name}</span>
                </td>
                <td>{item.email}</td>
                <td>{item.card}</td>
                <td>{item.number}</td>
                <td className="flex items-center gap-3 text-[#ADADAD]">
                  <LuUserRoundX className="w-[22px] h-[22px]" />
                  <SlEye className="w-[22px] h-[22px]" />
                  <CiMoneyBill className="w-6 h-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش <span className="text-[#202020] font-xbold">8</span> از 68 نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060]" />
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