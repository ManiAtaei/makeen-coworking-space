import React from "react";

export default function Comment() {
  const comment = [
    {
      id: 1,
      image: "/imageLanding/Profile-Pic-Small.svg",
      name: " امیررضا امینی ",
      iconStars: "/iconLanding/5-StarsReserv.svg",
      date: "۱۴۰۳/۱۰/۱۶",
      text: "بین چندجایی که رفته بودم تقریبا از همه نظر بهترین بوده. تمام چیزی که از یک روز آروم برای رسیدگی به درس یا کار میخواید فراهمه. وقت خیلی مفید و متمرکزی رو خواهید داشت و گذر زمان رو حس نمیکنید. تا مترو ۵ دقیقه پیاده‌روی داره. ",
      user: "کاربر مکین",
    },
    {
      id: 2,
      image: "/imageLanding/Profile-Pic-Small.svg",
      name: " امیررضا امینی ",
      iconStars: "/iconLanding/5-StarsReserv.svg",
      date: "۱۴۰۳/۱۰/۱۶",
      text: "بین چندجایی که رفته بودم تقریبا از همه نظر بهترین بوده. تمام چیزی که از یک روز آروم برای رسیدگی به درس یا کار میخواید فراهمه. وقت خیلی مفید و متمرکزی رو خواهید داشت و گذر زمان رو حس نمیکنید. تا مترو ۵ دقیقه پیاده‌روی داره. ",
      user: "کاربر مکین",
    },
  ];
  const commentAdmin = [
    {
      id: 1,
      image: "/imageLanding/Admin-Pic.svg",
      comment: "ممنونم از نظر و لطف شما",
    },
  ];

  return (
    <div className="bg-white pt-4">
      <div className="py-4 px-5 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[18px] font-xdemibold text-[#404040] ">
            ۴۰ دیدگاه
          </span>
          <img src="/iconLanding/SortBy.svg" alt="img" />
        </div>
        <div className="divide-y-[1px] md:divide-y-0">
          {comment.map((item) => (
            <div key={item.id} className="pt-4">
              <div className="flex items-center ">
                <img src={item.image} alt="img" />
                <div className="flex flex-col gap-[14px] mr-4">
                  <span className="text-[#202020] text-[14px] font-xbold ">
                    {item.name}
                  </span>
                  <img src={item.iconStars} alt="img" />
                </div>
                <div className="flex flex-col items-end mr-[38px] gap-[9px] mobileNum:mr-[16px] mobileNum:items-start  ">
                  <div className="flex items-center gap-1 bg-[#F4FFF9] px-[9px] py-[7px] border-[#00BA88] border-[1px] rounded-lg ">
                    <img src="/iconLanding/tick-circle.svg" alt="img" />
                    <span className="text-[10px] font-xregular text-[#00BA88] ">
                        {item.user}
                    </span>
                  </div>
                  <span className="text-[#ADADAD] text-[12px] font-xregular ">
                    {item.date}
                  </span>
                </div>
              </div>
              <p className="text-[13.4px] md:text-[14.5px] xl:text-[16px] xl:font-xmedium font-xregular leading-[25.2px] mt-[9px] xl:leading-[35.2px] text-[#404040]">
                {item.text}
              </p>
              <div className="flex item-center justify-end pt-[9px] gap-4">
                <img src="/iconLanding/Like.svg" alt="img" />
                <img src="/iconLanding/Dislike.svg" alt="img" />
              </div>
              {commentAdmin.map((item2) => (
                <div key={item2.id} className="flex items-center py-4">
                  <img src={item2.image} alt="img" />
                  <div className="flex flex-col gap-[10px] bg-[#F4F5FC] pr-4 py-2 mr-[17px] w-full rounded-lg">
                    <h1 className="text-[#202020] text-[14px] font-xbold ">
                        پشتیبانی سایت
                    </h1>
                    <span className="text-[#404040] text-[14px] font-xregular ">
                      {item2.comment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div className="flex items-center justify-center py-4">
          <img src="/iconLanding/arrow-down.svg" alt="img" />
          <span className="text-[14px] font-xbold text-[#FF7B42] "> مشاهده همه نظرات </span>
        </div>
        </div>
      </div>
    </div>
  );
}
