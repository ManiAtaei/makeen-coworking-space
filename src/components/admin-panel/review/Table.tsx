import React, { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { BsReply } from "react-icons/bs";
import { FieldErrors, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Table() {
  const info = [
    {
      id: 1,
      row: "1",
      name: " محمد ایمانی ",
      date: " ۱۳۰۴/۱۰/۱۳ ",
      titleReview: " پیشنهاد می‌کنم محیط مناسبی داره ",
      review:
        " تبریک میگم بابت پرسنل این بخش که در همه زمینه مشتری مدار هستند.به امید تداوم این روند ",
      image: "/admin-panel/Profile-Pic-Small.svg",
      imageStar: "/admin-panel/Stars.svg",
    },
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
              <th> عنوان نظر </th>
              <th> متن نظر </th>
              <th> عملیات </th>
            </tr>
          </thead>
          <tbody>
            {info.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020] "
              >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{item.row}</td>
                <td>
                  <div className="flex items-center gap-2 mr-[-15px]">
                    <img src={item.image} alt="img" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.date}</td>
                <td className="text-[12px] w-[140px]">{item.titleReview}</td>
                <td>
                  <div className="flex flex-col items-start gap-2">
                    <img className="w-20" src={item.imageStar} alt="img" />
                    <span className="text-[12px] w-[280px] ">
                      {item.review}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-start justify-between gap-[13.67px] w-full">
                    <button className="bg-[#253359] text-[10px] font-xregular px-[36.5px] py-[6.5px] text-white rounded-md w-full">
                      انتشار
                    </button>
                    <button className="border border-[#253359] text-[10px] font-xregular px-4 py-[6.5px] text-[#253359] rounded-md w-full">
                      انتشار در لندینگ
                    </button>
                  </div>
                  <div className="flex items-start gap-[8px] mt-4">
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      <BsReply className="w-4 h-4 text-[#253359]" />
                    </button>
                    <LuTrash2 className="w-4 h-4 text-[#CBCBCB]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal w-full ">
        <div className="modal-box w-full max-w-[450px] mx-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
              <IoClose className="w-6 h-6"/>
            </button>
          </form>
          <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
            <div className="flex justify-center ">
              <img
                className="w-[100px] h-[100px]"
                src="/admin-panel/Reply-2.svg"
                alt="img"
              />
            </div>
            <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  className="text-[14px] font-xbold text-[#404040] "
                  htmlFor="discription"
                >
                  پاسخ به نظر کاربر
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] md:pb-[121px] md:pt-[10px] px-3 rounded-lg border border-[#CBCBCB]"
                  placeholder=" متن پاسخ به کاربر اینجا نوشته شود "
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "پر کردن فیلد قیمت اجباری است ",
                  })}
                />
                <p className="error">{errors.username?.message}</p>
              </div>
              <button className="text-white bg-[#253359] text-[14px] font-xmedium py-[9.5px] w-full rounded-lg mt-3">
                افزودن امکان
              </button>
            </form>
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
