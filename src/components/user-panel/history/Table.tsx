import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1",
      title: " رزرو صندلی اشتراکی ",
      date: "۱۳۰۴/۱۰/۱۳",
      price: " 200,000 ",
      enabled: false,
      underReview: false,
    },
    {
      id: 2,
      row: "1",
      title: " رزرو صندلی اشتراکی ",
      date: "۱۳۰۴/۱۰/۱۳",
      price: " 200,000 ",
      enabled: true,
      underReview: true,
    },
    {
      id: 3,
      row: "1",
      title: " رزرو صندلی اشتراکی ",
      date: "۱۳۰۴/۱۰/۱۳",
      price: " 200,000 ",
      enabled: true,
      underReview: false,
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th> ردیف </th>
              <th> عنوان </th>
              <th> تاریخ ثبت </th>
              <th> مبلغ </th>
              <th> وضعیت تراکنش </th>
            </tr>
          </thead>
          <tbody>
            {info.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <td>{item.row}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.price} تومان </td>
                <td>
                  {item.underReview ? (
                    <span className="text-[#E0A03A] px-2 py-1 flex items-center gap-1">
                      <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
                      انتظار بررسی
                    </span>
                  ) : item.enabled ? (
                    <span className="text-[#3BC377] px-2 py-1 flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
                      تایید شده
                    </span>
                  ) : (
                    <span className="text-[#E9594C] px-2 py-1 flex items-center gap-1">
                      <IoCloseCircleOutline className="text-[#E9594C] bg-transparent w-5 h-5 rounded-full" />
                      رد شده
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
      <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060]  rounded-[4px]" />
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
            <IoIosArrowBack className="w-4 h-4 text-[#606060] " />
          </button>
        </div>
      </div>
    </div>
  );
}
