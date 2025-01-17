"use client";
import React, { useState } from "react";

export default function CommonQuestion() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const question = [
    {
      id: 1,
      title: "چه نوع فضاهای کاری در دنج موجود است؟",
      text: "شما می‌توانید با جستجو در وب‌سایت ما، فضای مورد نظر خود را انتخاب کرده و با استفاده از سیستم رزرو آنلاین، تاریخ و زمان دلخواه خود را مشخص کنید.",
    },
    {
      id: 2,
      title: " آیا می‌توانم رزرو خود را لغو یا تغییر دهم؟ ",
      text: "شما می‌توانید با جستجو در وب‌سایت ما، فضای مورد نظر خود را انتخاب کرده و با استفاده از سیستم رزرو آنلاین، تاریخ و زمان دلخواه خود را مشخص کنید.",
    },
    {
      id: 3,
      title: " چگونه می‌توانم یک فضای اشتراکی را رزرو کنم؟ ",
      text: "شما می‌توانید با جستجو در وب‌سایت ما، فضای مورد نظر خود را انتخاب کرده و با استفاده از سیستم رزرو آنلاین، تاریخ و زمان دلخواه خود را مشخص کنید.",
    },
    {
      id: 4,
      title: " چه امکاناتی در فضاهای کاری دنج وجود دارد؟ ",
      text: "شما می‌توانید با جستجو در وب‌سایت ما، فضای مورد نظر خود را انتخاب کرده و با استفاده از سیستم رزرو آنلاین، تاریخ و زمان دلخواه خود را مشخص کنید.",
    },
    {
      id: 5,
      title: " آیا برای رزرو فضای کار نیاز به ثبت نام دارم؟ ",
      text: "شما می‌توانید با جستجو در وب‌سایت ما، فضای مورد نظر خود را انتخاب کرده و با استفاده از سیستم رزرو آنلاین، تاریخ و زمان دلخواه خود را مشخص کنید.",
    },
  ];

  return (
    <div>
      <h1 className="text-[16px] font-xbold text-center mt-[22px] lg:mt-[31px] lg:text-[24px]">
        سوالات متداول
      </h1>
      <div className="md:flex">
        <div className="mt-4">
          <img
            className="w-screen md:hidden"
            src="/imageLanding/PictureHand.svg"
            alt="img"
          />
        </div>
       
        <div className="px-5 md:w-8/12 pt-[10px] lg:pr-0">
          {question.map((item) => (
            <div
              key={item.id}
              className={`bg-white shadow-[0_8px_15px_#63666714,0_0px_4px_#63666714] shadow-lg mt-4 `}
            >
              <div className="flex items-center">
                <button className="pr-[10px]" onClick={() => toggleAccordion(item.id)}>
                  {openAccordion === item.id ? (
                    <img src="/iconLanding/minus-square.svg" alt="img" />
                  ) : (
                    <img src="/iconLanding/add-square.svg" alt="img" />
                  )}
                </button>
                <div
                  className="collapse-title pl-0 pt-5 text-[12px] font-xbold sm:text-[14px] text-[#253359] lg::text-[16px] lg:font-xmedium"
                  onClick={() => toggleAccordion(item.id)}
                >
                  {item.title}
                </div>
              </div>
              {openAccordion === item.id && (
                <div className="pb-[20px] text-[14px] font-xregular leading-[33.5px] pr-[10px]">
                  <p>{item.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden md:block md:pt-[26px] md:pb-10 md:pl-5 lg:pl-0">
          <img src="/imageLanding/PictureHand2.svg" alt="img" />
        </div>
      </div>
    </div>
  );
}
