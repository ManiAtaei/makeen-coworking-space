import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1440px] lg:px-20 lg:bg-[#F4F5FC] mt-20 h-screen">
      <Navbar />
      <ul className="steps w-full pt-4 text-[#253359] text-[12px] font-xmedium">
        <li className="step step-neutral "> انتخاب تاریخ رزرو </li>
        <li className="step ">  اطلاعات کاربری </li>
        <li className="step"> پرداخت </li>
        <li className="step"> تایید رزرو  </li>
      </ul>
      {children}
    </div>
  );
}
