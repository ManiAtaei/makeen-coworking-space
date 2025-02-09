import React from "react";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 2,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 3,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 4,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 5,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 6,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 7,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      number: "۰۹۱۲۹۸۷۶۵۴۳",
    },
    {
      id: 8,
      row: "1",
      name: " محمد ایمانی ",
      method: " کارت به کارت ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      card: " ۰۸۲۰۱۲۰۱۲۳۴ ",
      day: " 10 ",
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
              <th> نام کاربر </th>
              <th> تاریخ ثبت </th>
              <th> کد ملی </th>
              <th> شماره موبایل </th>
              <th> تعداد رزرو </th>
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
                <td className="flex items-center mr-[-15px] gap-2">
                  <img src={item.image} alt="img" />
                  <span>{item.name}</span>
                </td>
                <td>{item.date}</td>
                <td>{item.card}</td>
                <td>{item.number}</td>
                <td>{item.day}</td>
                <td className="flex items-center gap-3 w-full text-[#ADADAD]">
                  <LuUserRoundX className="w-[22px] h-[22px] " />
                  <SlEye className="h-[22px] w-[22px]" />
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
