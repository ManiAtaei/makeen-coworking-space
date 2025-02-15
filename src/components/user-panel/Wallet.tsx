import React, { useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { LuGift } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { GrAttachment } from "react-icons/gr";
import { useDropzone } from "react-dropzone";

export default function Wallet() {
  const Inventory = [
    { id: 1, total: "250,000", shopping: "150,000", gift: "100,000" },
  ];

  const card = [
    { id: 1, title: " شماره کارت ", number: " ۶۲۱۹۸۶۱۰۲۹۴۷۸۶۴۰ " },
    { id: 2, title: " شماره شبا ", number: " IR - 56۶۲۱۹۸۶۱۰۲۹۴۷۸۶۴۰00000 " },
  ];
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });
  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        مدیریت کیف پول
      </h1>
      <div className="mt-8 md:mt-6">
        {Inventory.map((item) => (
          <div className="flex flex-col items-center">
            <span className="text-[#202020] text-[14px] md:text-[16px] md:font-xmedium font-xregular bg-[#ECF9FD] py-[7.5px] px-[6px] rounded-lg w-full md:w-[358px] text-center">
              مجموع موجودی فعلی شما
              <span className="text-black text-[18px] font-xbold md:text-[24px] mr-2">
                {item.total} تومان
              </span>
            </span>
            <div className="mt-6 w-full flex flex-col items-center md:flex md:flex-row md:items-center md:justify-center md:mt-11 lg:flex lg:flex-col lg:items-center xl:flex xl:flex-row xl:items-center xl:justify-center ">
              <div className="flex flex-col items-start ">
                <span className="flex items-center text-[#404040] text-[14px] font-xbold gap-2">
                  <LuGift className="w-6 h-6 text-[#3BC377]" /> موجودی هدیه مکین
                  :
                  <span className="text-[14px] font-xbold text-[#227346]">
                    {item.gift} تومان
                  </span>
                </span>
                <span className="flex items-center text-[#404040] text-[14px] font-xbold mt-4 gap-2">
                  <PiMoneyWavy className="w-[24px] h-[24px]" /> اعتبار شما :
                  <span className="text-[#606060]">{item.shopping} تومان</span>
                </span>
              </div>
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="md:mx-2 tablet:mx-8 flex items-center text-white text-[14px] font-xmedium bg-[#253359] w-full md:w-[272px] justify-center py-2 md:py-4 rounded-lg mt-10 gap-2 md:mt-0 lg:mt-10 xl:mt-0"
              >
                <GoPlus className="w-6 h-6" /> افزایش موجودی
              </button>
              <button className="flex items-center justify-center text-[#253359] text-[14px] font-xbold mt-9 gap-2 md:mt-0 lg:mt-9 xl:mt-0">
                <LiaExchangeAltSolid className="w-6 h-6" /> مشاهده تاریخچه
                تراکنش ها
              </button>
            </div>
          </div>
        ))}
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
            <div className="flex items-center gap-4">
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
            {card.map((item) => (
              <div key={item.id} className="even:bg-[#F9F9F9] odd:bg-white ">
                <div className="flex flex-col md:flex md:flex-row md:items-center md:justify-between px-2 py-[10px] text-[14px] font-xregular text-[#404040]">
                  <span>{item.title}</span>
                  <span className="flex justify-end">{item.number}</span>
                </div>
              </div>
            ))}
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 lg:mt-0 py-[11.5px] w-full"
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-green-500">{file.name}</p>
              ) : (
                <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                  <GrAttachment /> برای افزودن رسید پرداخت کلیک نمایید
                </p>
              )}
            </div>
            <button className="text-white bg-[#253359] text-[14px] font-xmedium py-2 w-full rounded-lg">
              نهایی کردن
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
