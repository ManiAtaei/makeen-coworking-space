import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1001",
      title: " عدم تایید پرداخت ",
      number: "۱۲۳۴۵۶۷۸۹۰",
      date: "۱۳۰۴/۱۰/۱۳",
      status: "answered",
    },
    {
      id: 2,
      row: "1001",
      title: " عدم تایید پرداخت ",
      number: "۱۲۳۴۵۶۷۸۹۰",
      date: "۱۳۰۴/۱۰/۱۳",
      status: "pending",
    },
    {
      id: 3,
      row: "1001",
      title: " عدم تایید پرداخت ",
      number: "۱۲۳۴۵۶۷۸۹۰",
      date: "۱۳۰۴/۱۰/۱۳",
      status: "closed",
    },
    {
      id: 4,
      row: "1001",
      title: " عدم تایید پرداخت ",
      number: "۱۲۳۴۵۶۷۸۹۰",
      date: "۱۳۰۴/۱۰/۱۳",
      status: "open",
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th> ردیف </th>
              <th> موضوع تیکت </th>
              <th> شماره تیکت </th>
              <th> تاریخ ثبت </th>
              <th> وضعیت تیکت </th>
              <th> مشاهده جزییات </th>
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
                <td>{item.number}</td>
                <td>{item.date}</td>
                <td>
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
        <div className="join flex items-center justify-center w-full">
          <button className="join-item btn btn-xs">1</button>
          <button className="join-item btn btn-xs btn-active">2</button>
          <button className="join-item btn btn-xs">3</button>
          <button className="join-item btn btn-xs">4</button>
        </div>
      </div>
    </div>
  );
}
