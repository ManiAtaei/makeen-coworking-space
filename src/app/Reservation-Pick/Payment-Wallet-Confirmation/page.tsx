"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { GrAttachment } from "react-icons/gr";
import { PiMoneyLight } from "react-icons/pi";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export default function Confirmation() {
  const [check, setCheck] = useState(false);

  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const card = [
    { id: 1, title: " شماره کارت ", number: " ۶۲۱۹۸۶۱۰۲۹۴۷۸۶۴۰ " },
    { id: 2, title: " شماره شبا ", number: " IR - 56۶۲۱۹۸۶۱۰۲۹۴۷۸۶۴۰00000 " },
  ];

  const inventory = [{ id: 1, total: "250,000" }];
  useEffect(() => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  }, []);

  const followUp = [{ id: 1, number: " 1732599713919849 " }];
  return (
    <div className="px-5" >
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2 w-5 h-5">
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center w-full text-[#202020] text-[14px] font-xbold">
            <div className="bg-[#F4F5FC] pl-2 pr-3 py-[11.5px] rounded-lg mt-2">
              {inventory.map((item) => (
                <div className="flex items-center justify-center gap-2">
                  <PiMoneyLight className="w-7 h-7 text-[#868686]" />
                  <span className="text-[#404040] font-xregular text-[12px]">
                    موجودی فعلی شما:
                  </span>
                  <span className="text-[14px] font-xbold text-[#606060]">
                    {item.total} تومان
                  </span>
                </div>
              ))}
            </div>
            <span className="text-[#404040] font-xbold text-[16px] mt-4">
              مبلغ افزایش مورد نیاز
            </span>
            <div className="border border-[#CBCBCB] text-[28px] font-xregular text-[#606060] rounded-lg w-full text-center py-[6px] mt-2">
              ۴/۵۰۰/۰۰۰ ریال
            </div>
            <div className="flex items-center justify-start w-full gap-4 mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-7"
                  className="radio radio-info w-5 h-5"
                  defaultChecked
                />
                <span className="font-xregular"> کارت به کارت </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-7"
                  className="radio radio-info w-5 h-5"
                />
                <span className="font-xregular"> پرداخت آنلاین </span>
              </div>
            </div>
            <div className="mt-4 w-full">
              {card.map((item) => (
                <div
                  key={item.id}
                  className="even:bg-[#F9F9F9] odd:bg-white w-full"
                >
                  <div className="flex flex-col md:flex md:flex-row md:items-center md:justify-between px-2 py-[10px] text-[14px] font-xregular text-[#404040]">
                    <span>{item.title}</span>
                    <span className="flex justify-end">{item.number}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              {...getRootProps()}
              className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 py-[11.5px] w-full"
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-green-500">{file.name}</p>
              ) : (
                <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                  <GrAttachment /> تصویر فیش واریزی را بارگذاری نمایید
                </p>
              )}
            </div>
            <button
              onClick={() => setCheck(true)}
              className="text-white bg-[#253359] text-[14px] font-xmedium py-[13.5px] w-full rounded-lg mt-4"
            >
              افزایش موجودی و رزرو
            </button>
          </div>
        </div>
      </dialog>
      {check && (
        <div className="bg-white shadow-xl lg:shadow-sm max-w-[450px] mx-auto rounded-2xl mt-[72px] py-[53px] ">
          {followUp.map((item) => (
            <div className="flex flex-col items-center">
              <HiOutlineExclamationCircle className="text-[#FF9568] w-20 h-20" />
              <span className="mt-3 text-[#404040] font-xbold text-[17px] max-w-[300px] text-center leading-[28.8px]">
                پس از بررسی صحت تصویر فیش واریزی، رزرو شما تایید می‌گردد
              </span>
              <span className="text-[#0C0C0C] font-xregular text-[14px] mt-4"> کد پیگیری: {item.number} </span>
              <button className="bg-[#253359] text-[12px] font-xmedium px-4 py-[7px] rounded-md text-white mt-4"> برو به رزروهای من </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
