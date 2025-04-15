import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";

export default function Table() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://109.230.200.230:7890/api/v1/Users/Ticket', {
          withCredentials: true
        });
        setTickets(Array.isArray(response.data) ? response.data : [response.data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const convertToIranTime = (utcDate) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 3);
    date.setMinutes(date.getMinutes() + 30);
    
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$2/$1');
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th> ردیف </th>
              <th> موضوع تیکت </th>
              <th> شماره تیکت </th>
              <th> تاریخ ثبت </th>
              <th> وضعیت تیکت </th>
              <th> مشاهده جزییات </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.id.split('-')[0]}</td> {/* Using first part of UUID as ticket number */}
                <td>{convertToIranTime(item.creationTime)}</td>
                <td>
                  {item.isActive ? (
                    <span className="border border-[#44C0ED] text-[#44C0ED] bg-[#ECF9FD] px-2 py-1 rounded-lg w-[100px] flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#44C0ED] bg-transparent w-5 h-5 rounded-full" />
                      باز
                    </span>
                  ) : (
                    <span className="border border-[#606060] text-[#606060] bg-[#F4F5FC] px-2 py-1 rounded-lg w-fit flex items-center gap-1">
                      <IoCloseCircleOutline className="text-[#606060] bg-transparent w-5 h-5 rounded-full" />
                      بسته شده
                    </span>
                  )}
                </td>
                <td>
                  <SlEye className="h-[22px] w-[22px] text-[#868686]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="join flex items-center justify-center w-full">
          <button className="join-item btn btn-xs">1</button>
          <button className="join-item btn btn-xs btn-active">2</button>
          <button className="join-item btn btn-xs">3</button>
          <button className="join-item btn btn-xs">4</button>
        </div>
      </div>
    </div>
  );
}