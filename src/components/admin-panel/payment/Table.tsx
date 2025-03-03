import React from "react";
import { SlEye } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


export default function Table() {
  const check = [
    { id: 1, name: " مینا اکبری ", date: "۱۳۰۴/۱۰/۱۳", price: "۴۵۰٬۰۰۰ تومان" },
  ];

  const info = [
    {
      id: 1,
      row: "1",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "محمد ایمانی",
      title: "افزایش اعتبار",
      date: "۱۳۰۴/۱۰/۱۳",
      price: "۲۰۰٬۰۰۰",
      enabled: true,
      underReview: false,
    },
    {
      id: 2,
      row: "2",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "محمد ایمانی",
      title: "افزایش اعتبار",
      date: "۱۳۰۴/۱۰/۱۳",
      price: "۲۰۰٬۰۰۰",
      enabled: false,
      underReview: false,
    },
    {
      id: 3,
      row: "3",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "محمد ایمانی",
      title: "افزایش اعتبار",
      date: "۱۳۰۴/۱۰/۱۳",
      price: "۲۰۰٬۰۰۰",
      enabled: false,
      underReview: true, // در حال بررسی
    },
    {
      id: 4,
      row: "4",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "محمد ایمانی",
      title: "افزایش اعتبار",
      date: "۱۳۰۴/۱۰/۱۳",
      price: "۲۰۰٬۰۰۰",
      enabled: true,
      underReview: false,
    },
    {
      id: 5,
      row: "3",
      method: "کارت به کارت",
      image: "/admin-panel/Profile-Pic-Small.svg",
      name: "محمد ایمانی",
      title: "افزایش اعتبار",
      date: "۱۳۰۴/۱۰/۱۳",
      price: "۲۰۰٬۰۰۰",
      enabled: false,
      underReview: true, // در حال بررسی
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
              <th> نوع پرداخت </th>
              <th> نام کاربر </th>
              <th> عنوان </th>
              <th> تاریخ ثبت </th>
              <th> مبلغ </th>
              <th> وضعیت پرداخت </th>
              <th> عملیات </th>
            </tr>
          </thead>
          <tbody>
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
                <td>{item.row}</td>
                <td>{item.method}</td>
                <td className="flex items-center gap-2">
                  <img src={item.image} alt="img" />
                  <span>{item.name}</span>
                </td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.price} تومان</td>
                <td>
                  {item.underReview ? (
                    <span className="border border-[#E0A03A] text-[#E0A03A] bg-[#FFFBF3] px-2 py-1 rounded-lg flex items-center gap-1">
                      <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
                      انتظار بررسی
                    </span>
                  ) : item.enabled ? (
                    <span className="border border-[#3BC377] text-[#227346] bg-[#F4FFF9] px-2 py-1 rounded-lg flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
                      تایید شده
                    </span>
                  ) : (
                    <span className="border border-[#E9594C] text-[#E9594C] bg-[#FEF6F5] px-2 py-1 rounded-lg flex items-center gap-1">
                      <IoCloseCircleOutline className="text-[#E9594C] bg-transparent w-5 h-5 rounded-full" />
                      رد شده
                    </span>
                  )}
                </td>
                <td>
                  {item.underReview ? (
                    <div>
                      <button
                        className="  bg-none flex flex-row items-center gap-[6px] text-[#4073D0] text-[14px] font-xregular"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        <GrAttachment className="h-[22px] w-[16px]" />
                        بررسی رسید
                      </button>

                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2">
                              ✕
                            </button>
                          </form>
                          <div className="w-full flex items-start mt-6 ">
                            {check.map((item) => (
                              <div
                                key={item.id}
                                className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4"
                              >
                                <span>
                                  پرداخت کننده:
                                  <span className="text-[#404040] text-[14px] font-xregular">
                                    {item.name}
                                  </span>
                                </span>
                                <span>
                                  تاریخ پرداخت :
                                  <span className="text-[#404040] text-[14px] font-xregular">
                                    {item.date}
                                  </span>
                                </span>
                                <span>
                                  مبلغ پرداخت :
                                  <span className="text-[#404040] text-[14px] font-xregular">
                                    {item.price}
                                  </span>
                                </span>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="radio-7"
                                      className="radio radio-info w-5 h-5"
                                      defaultChecked
                                    />
                                    <span className="font-xregular">
                                      ردکردن پرداخت
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="radio-7"
                                      className="radio radio-info w-5 h-5"
                                    />
                                    <span className="font-xregular">
                                      تایید پرداخت
                                    </span>
                                  </div>
                                </div>
                                <button className="text-white bg-[#253359] text-[14px] font-xmedium py-2 w-full rounded-lg">
                                  {" "}
                                  نهایی کردن{" "}
                                </button>
                              </div>
                            ))}
                            <div className="w-full flex justify-end">
                              <img src="/admin-panel/image 1.svg" alt="img" />
                            </div>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  ) : (
                    <SlEye className="h-[22px] w-[22px] text-[#868686]" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
