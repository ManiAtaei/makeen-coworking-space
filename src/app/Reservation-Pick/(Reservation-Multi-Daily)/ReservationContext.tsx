"use client";
import React, { createContext, useState, useContext } from "react";

const ReservationContext = createContext({
  seatType: "",
  selectedDays: [],
  totalPrice: 0,
  discountText: "",
  discountApplied: false,
  walletBalance: 200000, // مقدار پیش‌فرض موجودی کیف پول
  finalPrice: 0,
  isStudentMakin: false,
  studentPrice: 60000,
  regularPrice: 100000,

  // متدهای تغییر state
  setSeatType: () => {},
  setSelectedDays: () => {},
  setDiscountText: () => {},
  setDiscountApplied: () => {},
  setIsStudentMakin: () => {},
  calculateTotalPrice: () => {},
  calculateFinalPrice: () => {},
  resetReservation: () => {},
});

export const ReservationProvider = ({ children }) => {
  const [seatType, setSeatType] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [discountText, setDiscountText] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isStudentMakin, setIsStudentMakin] = useState(false);
  const [walletBalance] = useState(200000); // این مقدار در آینده از API می‌آید
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const studentPrice = 60000;
  const regularPrice = 100000;

  // محاسبه قیمت کل بدون تخفیف
  const calculateTotalPrice = () => {
    const basePrice = isStudentMakin ? studentPrice : regularPrice;

    // فقط تعداد روزها را بشمارید
    const totalDays = selectedDays.length;

    const total = totalDays * basePrice;
    setTotalPrice(total);

    // قیمت نهایی را هم محاسبه کنید
    calculateFinalPrice(total);
    return total;
  };

  // محاسبه قیمت نهایی با احتساب تخفیف
  const calculateFinalPrice = (total = totalPrice) => {
    let discount = 0;
    const totalDays = selectedDays.length;

    if (totalDays >= 15) {
      discount = 0.25; // 25% تخفیف
    } else if (totalDays >= 10) {
      discount = 0.15; // 15% تخفیف
    } else if (totalDays >= 5) {
      discount = 0.05; // 5% تخفیف
    }

    const finalPrice = total - total * discount;
    setFinalPrice(finalPrice);
    return finalPrice;
  };

  // ریست کردن همه مقادیر
  const resetReservation = () => {
    setSeatType("");
    setSelectedDays([]);
    setDiscountText("");
    setDiscountApplied(false);
    setIsStudentMakin(false);
    setTotalPrice(0);
    setFinalPrice(0);
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        seatType,
        selectedDays,
        totalPrice,
        discountText,
        discountApplied,
        walletBalance,
        finalPrice,
        isStudentMakin,
        studentPrice,
        regularPrice,
        currentStep,

        goToNextStep,
        goToPreviousStep,
        goToStep,
        setSeatType,
        setSelectedDays,
        setDiscountText,
        setDiscountApplied,
        setIsStudentMakin,
        calculateTotalPrice,
        calculateFinalPrice,
        resetReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

// Hook برای استفاده آسان‌تر از کانتکست
export const useReservation = () => useContext(ReservationContext);

export default ReservationContext;
