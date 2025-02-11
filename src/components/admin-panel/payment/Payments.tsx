import React from "react";
import { FaCaretLeft } from "react-icons/fa";
import Table from "./Table";

export default function Payments() {
  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        کاربرها
      </h1>
      <div className="mt-6">
        <Table/>
      </div>
    </div>
  );
}
