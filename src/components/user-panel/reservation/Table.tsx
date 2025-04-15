import React from "react";
import { SlEye } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCaretLeft } from "react-icons/fa";
import ReservationModal from "./calender";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1",
      shared: " صندلی اشتراکی ",
      method: "کارت به کارت",
      date: "۱۳۰۴/۱۰/۱۳",
      enabled: true,
      underReview: false,
      day: " 7 ",
    },
    {
      id: 2,
      row: "1",
      shared: " صندلی اشتراکی ",
      method: "کارت به کارت",
      date: "۱۳۰۴/۱۰/۱۳",
      enabled: false,
      underReview: true,
      day: " 7 ",
    },
    {
      id: 3,
      row: "1",
      shared: " صندلی اشتراکی ",
      method: "کارت به کارت",
      date: "۱۳۰۴/۱۰/۱۳",
      enabled: false,
      underReview: false,
      day: " 7 ",
    },
    {
      id: 3,
      row: "1",
      shared: " صندلی اشتراکی ",
      method: "کارت به کارت",
      date: "۱۳۰۴/۱۰/۱۳",
      enabled: false,
      underReview: false,
      day: " 7 ",
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th> ردیف </th>
              <th> نوع اشتراک </th>
              <th> روش پرداخت </th>
              <th> تاریخ ثبت </th>
              <th> وضعیت رزرو </th>
              <th> تعداد روز </th>
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
                <td>{item.shared}</td>
                <td>{item.method}</td>
                <td>{item.date}</td>
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
                <td>{item.day} </td>
                <td>
                  <SlEye
                    onClick={() =>
                      document.getElementById("my_modal_51").showModal()
                    }
                    className="h-[22px] w-[22px] text-[#868686] cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>

          <dialog id="my_modal_51" className="modal">
            <div className=" modal-box w-11/12 max-w-[817px] h-[440px]">
              <form className="lg:flex lg:items-center" method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2">
                  ✕
                </button>
                <div>
                  <span className="text-[#404040] text-center text-[16px] font-xbold lg:mt-[-10px] lg:text-right lg:flex lg:items-center">
                    <FaCaretLeft className="w-6 h-6 hidden lg:block" />
                    جزییات رزرو
                  </span>
                </div>
              </form>
              <div className="">
                <ReservationModal />
              </div>
            </div>
          </dialog>
        
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
