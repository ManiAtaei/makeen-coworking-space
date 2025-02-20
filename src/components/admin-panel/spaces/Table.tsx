import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { SlEye } from "react-icons/sl";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1",
      date:"۱۳۰۴/۱۰/۱3",
      title: " صندلی اشتراکی ",
      makeenStudent:" ۶۰٬۰۰۰ تومان ",
      user:" ۱۰۰٬۰۰۰ تومان ",
      Capacity:" ۶۰ ",
    },
    {
      id: 2,
      row: "2",
      date:"۱۳۰۴/۱۰/۱3",
      title: " صندلی اشتراکی ",
      makeenStudent:" ۶۰٬۰۰۰ تومان ",
      user:" ۱۰۰٬۰۰۰ تومان ",
      Capacity:" ۶۰ ",
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
              <th> تاریخ افزودن </th>
              <th> عنوان فضا </th>
              <th> قیمت دانشجو مکین </th>
              <th> قیمت کاربر عادی </th>
              <th> ظرفیت </th>
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
                <td >{item.row}</td>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td>{item.makeenStudent}</td>
                <td>{item.user}</td>
                <td>{item.Capacity}</td>
                <td className="flex items-center gap-3 w-full text-[#ADADAD]">
                  <LuTrash2 className="w-[22px] h-[22px] " />
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
