// components/StepsComponent.js
"use client";
import React, { use } from "react";
import { useReservation } from "./(Reservation-Multi-Daily)/ReservationContext";

export default function StepsComponent() {
  const { currentStep } = useReservation();
  
  return (
    <ul className="steps w-full pt-4 text-[#253359] text-[12px] font-xmedium">
      <li className={`step ${currentStep >= 1 ? "step-neutral" : ""}`}> انتخاب تاریخ رزرو </li>
      <li className={`step ${currentStep >= 2 ? "step-neutral" : ""}`}> اطلاعات کاربری </li>
      <li className={`step ${currentStep >= 3 ? "step-neutral" : ""}`}> پرداخت </li>
      <li className={`step ${currentStep >= 4 ? "step-neutral" : ""}`}> تایید رزرو </li>
    </ul>
  );
}