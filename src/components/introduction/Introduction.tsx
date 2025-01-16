import React from "react";

export default function Introduction() {
  return (
    <div className="relative">
      <div className="flex">
        <div className="w-1/2 flex">
        <div className="flex flex-col gap-[23.5px]">
            <img src="/imageLanding/Desk.svg" alt="img" />
             <img src="/imageLanding/VectorChair.svg" alt="img" />
        </div>
            <img className="absolute right-[252px] top-[-9px]" src="/iconLanding/Icon-Idea1.svg" alt="img" />
            <img className="absolute right-[211px] top-[285px]" src="/iconLanding/Rectangle2.svg" alt="img" />
            <img className="absolute right-[265.68px] top-[301px]" src="/iconLanding/Icon-Growth.svg" alt="img" />
        <div className="mt-[103.5px] mr-[22px]">
            <img src="/imageLanding/VectorSpace.svg" alt="img" />
        </div>

            <img className="absolute right-[406px] top-[427.27px]" src="/iconLanding/VectorStar.svg" alt="img" />
            <img className="absolute right-[498.75px] top-[497.87px]" src="/iconLanding/Ellipse 5.svg" alt="img" />
           
        </div>
        <div className="w-1/2 pr-3">
          <h1 className="text-[24px] font-xbold text-[#404040] pt-24"> معرفی فضای کار اشتراکی مکین </h1>
          <p className="text-[#606060] text-[16px] font-xmedium w-[604px] mt-10 leading-[35.2px]">
            فضای کار اشتراکی مکین بر شکل‌گیری روابط کاری و تعاملات سازنده در یک
            محیط کاری متفاوت و پویا متمرکز شده است تا کارآفرینان، صاحبان
            کسب‌وکار و تیم‌های خلاق به دور از دغدغه‌های بر روی اولویت‌های اصلی و
            راهکارهای خلاقانه خود متمرکز شوند.
          </p>
          <button className="bg-[#253359] text-[16px] font-xbold px-[25.5px] py-[9.5px] text-white rounded-lg mt-10"> همین الان مکینی شو ! </button>
          <img className="absolute bottom-0 left-0" src="/iconLanding/Dot4.svg" alt="img" />
        </div>
      </div>
    </div>
  );
}
