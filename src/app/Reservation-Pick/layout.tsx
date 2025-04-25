// layout.js
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { ReservationProvider } from "./(Reservation-Multi-Daily)/ReservationContext";
import StepsComponent from "./StepComponent";

export default function Layout({ children }) {
  return (
    <ReservationProvider>
      <div className="mx-auto max-w-[1440px] lg:px-20 lg:bg-[#F4F5FC] mt-20 h-screen min-h-min">
        <Navbar />
        <StepsComponent />
        {children}
      </div>
    </ReservationProvider>
  );
}