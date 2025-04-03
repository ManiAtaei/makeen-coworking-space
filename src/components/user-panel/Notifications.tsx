import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCaretLeft } from "react-icons/fa";
import { PiChecks } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

interface Notification {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  isRead: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [select, setSelect] = useState<number>(1);

  const item = [
    { id: 1, text: "همه" },
    { id: 2, text: "کیف پول" },
    { id: 3, text: "اطلاعیه" },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<Notification[]>(
          "https://109.230.200.230:7890/api/v1/Users/Notifications",
          { withCredentials: true }
        );
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const convertToPersianDateTime = (utcDate: string) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 3);
    date.setMinutes(date.getMinutes() + 30);
    
    const dateStr = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$2/$1');
    
    const timeStr = new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
    
    return { date: dateStr, time: timeStr };
  };

  if (loading) {
    return <div className="text-center p-4">در حال بارگذاری...</div>;
  }

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        اعلان ها
      </h1>
      <div className="flex items-start mt-4 lg:mt-6 justify-between md:px-10">
        <ul className="[&>li>a]:flex [&>li>a]:items-center text-[#CBCBCB] text-[14px] font-xbold flex items-center gap-[12.5px] md:gap-10">
          {item.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={`${
                  select === item.id
                    ? "text-[#44C0ED] underline underline-offset-[15px] decoration-2"
                    : "text-[#CBCBCB]"
                }`}
                onClick={() => setSelect(item.id)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
        <button className="flex items-center border border-[#253359] rounded-md py-1 px-2 gap-2 text-[12px] font-xmedium">
          <PiChecks className="w-6 h-6" />
          خواندن همه
        </button>
      </div>

      <div className="mt-4 border border-[#DFDFDF] rounded-lg md:mx-10">
        {notifications.map((item) => {
          const { date, time } = convertToPersianDateTime(new Date().toISOString()); // Using current time as placeholder
          return (
            <div
              key={item.id}
              className="border-b border-[#CBCBCB] odd:bg-[#F9F9F9] even:bg-white py-4 pr-4 gap-4 pl-6 flex items-center"
            >
              <div
                className={`w-[10px] h-[10px] rounded-full ${
                  item.isRead ? "bg-[#CBCBCB]" : "bg-[#E9594C]"
                }`}
              ></div>
              <div className="w-full">
                <div className="md:flex md:items-center justify-between">
                  <h1 className="text-[#253359] text-[16px] font-xbold md:pb-2">
                    {item.title}
                  </h1>
                  <div className="flex items-center text-[#ADADAD] text-[12px] font-xbold gap-2 pt-2 md:pt-0">
                    <span>{time}</span>
                    <span>{date}</span>
                  </div>
                </div>
                <span className="text-[#404040] font-xregular text-[14px]">
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <span className="flex items-center justify-center text-[#253359] text-[14px] font-xbold mt-4">
          <IoIosArrowDown className="w-5 h-5" />
          مشاهده بیشتر
        </span>
      </div>
    </div>
  );
}