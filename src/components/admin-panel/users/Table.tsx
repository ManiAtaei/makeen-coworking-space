import React from "react";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { CiMoneyBill } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1",
      email:'Mina.Akbari@gmail.com',
      name: " محمد ایمانی ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
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
              <th> تاریخ عضویت </th>
              <th> نام کاربر </th>
              <th> ایمیل </th>
              <th> کد ملی </th>
              <th> شماره موبایل </th>
              <th> عملیات </th>
            </tr>
          </thead>
          <tbody className="">
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
                <td className="">{item.row}</td>
                <td className="">{item.date}</td>
                <td className="flex items-center mr-[-15px] gap-2">
                  <img src={item.image} alt="img" />
                  <span>{item.name}</span>
                </td>
                <td>{item.email}</td>
                <td>{item.card}</td>
                <td>{item.number}</td>
                <td className="flex items-center gap-3 w-full text-[#ADADAD]">
                  <LuUserRoundX className="w-[22px] h-[22px] " />
                  <SlEye className="h-[22px] w-[22px]" />
                  <CiMoneyBill className="h-6 w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
            <span className="text-[#868686] font-xregular text-[12px]"> نمایش <span className="text-[#202020] font-xbold">8</span> از 68 نتیجه </span>
        </div>
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
