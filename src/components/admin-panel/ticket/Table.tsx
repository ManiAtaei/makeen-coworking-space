import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1001",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "محمد ایمانی",
      date: "۱۳۰۴/۱۰/۱۳",
      status: "answered", 
    },
    {
      id: 2,
      row: "1002",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "مینا رحیمی",
      date: "۱۳۰۴/۱۰/۱۴",
      status: "pending", 
    },
    {
      id: 3,
      row: "1003",
      method: "انتقال وجه",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "علی محمدی",
      date: "۱۳۰۴/۱۰/۱۵",
      status: "closed", 
    },
    {
      id: 4,
      row: "1004",
      method: "درخواست وام",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "زهرا حسینی",
      date: "۱۳۰۴/۱۰/۱۶",
      status: "open",
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th>
                <label>
                  <input type="checkbox" className="checkbox p-0" />
                </label>
              </th>
              <th> ردیف </th>
              <th> نام کاربر </th>
              <th> تاریخ ثبت </th>
              <th> عنوان تیکت </th>
              <th> وضعیت تیکت </th>
              <th> عملیات </th>
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
                    <input type="checkbox" className="checkbox p-0" />
                  </label>
                </th>
                <td>{item.row}</td>
                <td className="flex items-center gap-2">
                  <img src={item.image} alt="img" />
                  <span>{item.name}</span>
                </td>
                <td>{item.date}</td>
                <td>{item.method}</td>
                <td className="w-fit">
                  {item.status === "pending" ? (
                    <span className="border border-[#E0A03A] text-[#E0A03A] bg-[#FFFBF3] px-2 py-1 rounded-lg w-fit flex items-center gap-1">
                      <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
                      در انتظار پاسخ
                    </span>
                  ) : item.status === "answered" ? (
                    <span className="border border-[#3BC377] text-[#227346] bg-[#F4FFF9] px-1 py-1 rounded-lg w-fit flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
                      پاسخ داده شده
                    </span>
                  ) : item.status === "closed" ? (
                    <span className="border border-[#606060] text-[#606060] bg-[#F4F5FC] px-2 py-1 rounded-lg w-fit flex items-center gap-1">
                      <IoCloseCircleOutline className="text-[#606060] bg-transparent w-5 h-5 rounded-full" />
                      بسته شده
                    </span>
                  ) : (
                    <span className="border border-[#44C0ED] text-[#44C0ED] bg-[#ECF9FD] px-2 py-1 rounded-lg w-[100px] flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#44C0ED] bg-transparent w-5 h-5 rounded-full" />
                      باز
                    </span>
                  )}
                </td>
                <td>            
                    <SlEye className="h-[22px] w-[22px] text-[#868686]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش <span className="text-[#202020] font-xbold">8</span> از 68
            نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px]">
          <button className="join-item btn btn-xs">1</button>
          <button className="join-item btn btn-xs btn-active">2</button>
          <button className="join-item btn btn-xs">3</button>
          <button className="join-item btn btn-xs">4</button>
        </div>
      </div>
    </div>
  );
}
