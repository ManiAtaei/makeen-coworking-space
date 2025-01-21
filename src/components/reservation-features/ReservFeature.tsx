import React from "react";

export default function ReservFeature() {
  const featuresReserv = [
    {
      id: 1,
      image: "/iconLanding/CheapReserv.svg",
      title: " قیمت مناسب ",
      res: "block",
    },
    {
      id: 2,
      image: "/iconLanding/ProjectorReserv.svg",
      title: " ویدیو پروژکتور ",
      res: "hidden lg:block lg:flex lg:item-center lg:justify-center",
    },
    {
      id: 3,
      image: "/iconLanding/Coffe-iconReserv.svg",
      title: " نوشیدنی گرم ",
      res: "hidden md:block md:flex md:item-center md:justify-center",
    },
    {
      id: 4,
      image: "/iconLanding/LockerReserv.svg",
      title: " کمد شخصی ",
      res: "block",
    },
    {
      id: 5,
      image: "/iconLanding/CafetriaReserv.svg",
      title: " کافی تریا ",
      res: "block",
    },
    {
      id: 6,
      image: "/iconLanding/ChairReserv.svg",
      title: " مبلمان اداری ",
      res: "hidden md:block md:flex md:item-center md:justify-center",
    },
    {
      id: 7,
      image: "/iconLanding/wifiReserv.svg",
      title: " اینترنت پرسرعت ",
      res: "block",
    },
    {
      id: 8,
      image: "/iconLanding/GroupReserv.svg",
      title: " امنیت ",
      res: "hidden lg:block lg:flex lg:item-center lg:justify-center",
    },
  ];

  return (
    <div className="bg-white">
      <div className="px-5 pt-4 md:px-8 lg:px-16">
        <h1 className="text-[#404040] text-[16px] font-xbold">
          امکانات و ویژگی‌ها
        </h1>
        <div className="grid grid-cols-2 grid-rows-4 gap-2 pt-4 header:grid-cols-4 header:grid-rows-2 xl:grid-cols-8 xl:grid-rows-1 xl:pt-6">
          {featuresReserv.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4F5FC] flex items-center justify-center py-4 px-[10px] mobile:px-[17px] header:px-1 sm:px-[10px] xl:px-0 rounded-lg"
            >
              <img className=" " src={item.image} alt="img" />
              <span className="text-[#253359] text-[11.5px] font-xregular mobile:text-[14px] mobile:font-xmedium pr-2 header:text-[11px] sm:text-[13px] header:font-xregular xl:text-[11px]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <div className="block">
          <div className="pt-5 xl:pt-12">
            <h1 className="text-[18px] font-xbold text-[#404040]  "> قوانین و توضیحات </h1>
            <p className="text-[#404040] text-[16px] font-xmedium pt-[16px]">
              اینترنت نا محدود و کمد رایگان جزو امکانات این فضاست. در اشتراک
              روزانه شما هر صندلی که در آن روز رزرو نشده باشد می توانید انتخاب
              کنید. در صندلی اشتراکی شما هر صندلی که در آن روز رزرو نشده باشد می
              توانید انتخاب کنید.
            </p>
          </div>
        </div>
        <div className="pt-[18px]">
            <h1 className="text-[#404040] text-[16px] font-xbold xl:text-[18px]  "> ساعت  دسترسی </h1>
            <div className="flex items-center text-[#202020] pt-3 gap-[10px]">
                <span className="text-[14px] font-xmedium xl:text-[16px] xl:font-xmedium"> شنبه تا پنج‌شنبه </span>
                <img src="/iconLanding/clockReserv.svg" alt="iimg" />
                <span className="text-[16px] font-xmedium xl:text-[18px] xl:font-xdemibold "> ۸:۰۰ تا ۲۰:۰۰ </span>
            </div>
        </div>
      </div>
    </div>
  );
}
