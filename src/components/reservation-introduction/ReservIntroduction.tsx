import React from "react";

export default function ReservIntroduction() {
  return (
    <div className="bg-white">
      <div className="px-5 pt-4 md:px-8 lg:px-16">
        <div className="md:flex md:items-center md:gap-4">
        <h1 className="text-[16px] lg:text-[18px] font-xbold text-[#404040] "> معرفی صندلی اشتراکی مکین </h1>
        <img className="mt-4 md:mt-0" src="/imageLanding/Rate-Number.svg" alt="img" />
        </div>
        <p className="text-[14px] font-xregular text-[#404040] mt-4 leading-[25.2px] lg:font-xmedium lg:leading-[35.2px] lg:text-[15.7px]">
          در هر بار مراجعه به فضای کار اشتراکی اولویت انتخاب میز کار با کسانی
          است که زودتر در محل حاضر شوند. در نتیجه شما در طول مدت اجاره، میز
          ثابتی برای کار در اختیار ندارید. همچنین در شیوه اشتراکی یا منعطف پس از
          پایان فعالیت کاری می‌بایست وسایل خود را از محل خارج کرده یا در صورت
          امکان در یک کمد اختصاصی واقع در فضای کار اشتراکی قرار دهید.
        </p>
      </div>
    </div>
  );
}
