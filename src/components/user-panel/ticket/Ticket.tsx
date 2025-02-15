import React, { useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import Table from "./Table";
import { GoPlus } from "react-icons/go";
import AddTicket from "./AddTicket";

export default function Ticket() {

  const [activePage, setActivePage] = useState("tickets");

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
    <div className="lg:flex lg:items-center lg:justify-between w-full mt-6">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold lg:mt-4 lg:text-right lg:flex lg:items-center w-full">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        تیکت ها
      </h1>
      {activePage=== "tickets" &&(
        <button onClick={()=>setActivePage("addTicket")} className="bg-[#253359] flex items-center justify-center text-white w-full py-2 rounded-lg mt-4 lg:w-[248px] text-[14px] font-xmedium gap-2"> <GoPlus className='w-6 h-6' /> ایجاد تیکت جدید </button>
      )}
    </div>
    <div className="mt-6">
    {activePage === "tickets" && <Table />}
    {activePage === "addTicket" && <AddTicket />} 
    </div>
    </div> 
  );
}

