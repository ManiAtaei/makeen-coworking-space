import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { BsReply } from "react-icons/bs";

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
                <td >
                  <div className="flex items-center gap-2 mr-[-15px]">
                    <img src={item.image} alt="img" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.date}</td>
                <td className="text-[12px] w-[140px]">{item.titleReview}</td>
                <td >
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
                    <BsReply className="w-4 h-4 text-[#253359]" />
                    <LuTrash2 className="w-4 h-4 text-[#CBCBCB]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            {" "}
            نمایش <span className="text-[#202020] font-xbold">8</span> از 68
            نتیجه{" "}
          </span>
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
