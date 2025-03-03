import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Table({ setActivePage }) {
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
  const check = [
    { id: 1, text: " پیامک " },
    { id: 2, text: " اعلان " },
    { id: 3, text: " ایمیل " },
  ];
  interface dataType {
    username: string;
    discription: string;
  }
  const form = useForm<dataType>({});
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: dataType) => {
    console.log(data);
  };
  const onErrorHandler = (error: FieldErrors) => {
    console.log(error);
  };
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
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <LuUserRoundX className="w-[22px] h-[22px] " />
                  </button>
                  <button onClick={() => setActivePage("userInfo")}>
                    <SlEye className="h-[22px] w-[22px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_3" className="modal w-full ">
        <div className="modal-box w-full max-w-[450px] mx-auto pb-[66px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
              <IoClose className="w-6 h-6 text-[#606060]" />
            </button>
          </form>
          <div className="flex flex-col items-center w-full text-[#202020] text-[14px] font-xbold gap-10">
            <div className=" mt-1">
              <LuUserRoundX className="w-[96px] h-[96px] text-[#CBCBCB] " />
            </div>
            <span className="text-[#404040] font-xbold text-[16px] ">
              آیا از بن کردن این کاربر اطمینان دارید؟
            </span>
            <div className="flex items-center gap-6 justify-center w-full">
              <button className=" text-[#253359] font-xmedium text-[12px] rounded-md py-[6px] px-[51px] border border-[#253359]">
                خیر
              </button>
              <button className="rounded-md bg-[#E9594C] text-white font-xmedium px-[51px] text-[12px] py-[6px]">
                بله
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش <span className="text-[#202020] font-xbold">8</span> از 68
            نتیجه
          </span>
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
