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
      user : "کاربر مکین"
    },
    {
      id: 2,
      image: "/imageLanding/Profile-Pic-Small.svg",
      name: " امیررضا امینی ",
      iconStars: "/iconLanding/5-StarsReserv.svg",
      date: "۱۴۰۳/۱۰/۱۶",
      text: "بین چندجایی که رفته بودم تقریبا از همه نظر بهترین بوده. تمام چیزی که از یک روز آروم برای رسیدگی به درس یا کار میخواید فراهمه. وقت خیلی مفید و متمرکزی رو خواهید داشت و گذر زمان رو حس نمیکنید. تا مترو ۵ دقیقه پیاده‌روی داره. ",
      user : "کاربر مکین"
    },
  ];
  const commentAdmin =[
    {
        id:1,
        image : "/imageLanding/Admin-Pic.svg",
        comment : "ممنونم از نظر و لطف شما",
    },
  ]

  return (
    <div className="bg-white pt-4 px-5">
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-xdemibold text-[#404040] ">
            ۴۰ دیدگاه
          </span>
          <img src="/iconLanding/SortBy.svg" alt="img" />
        </div>
        <div className="pt-8">
            {comment.map(item=>(
                <div key={item.id}>
                    <div  className="flex items-center">
                        <img src={item.image} alt="img" />
                        <div className="flex flex-col gap-[14px] mr-4">
                            <span className="text-[#202020] text-[14px] font-xbold "> {item.name} </span>
                            <img src={item.iconStars} alt="img" />
                        </div>
                        <div className="flex flex-col items-end mr-[38px] gap-[9px]">
                            <div className="flex items-center gap-1 bg-[#F4FFF9] px-[9px] py-[7px] border-[#00BA88] border-[1px] rounded-lg ">
                                <img src="/iconLanding/tick-circle.svg" alt="img" />
                                <span className="text-[10px] font-xregular text-[#00BA88] "> {item.user} </span>
                            </div>
                            <span className="text-[#ADADAD] text-[12px] font-xregular "> {item.date} </span>
                        </div>
                    </div>
                    <p className="text-[13.4px] font-xregular leading-[25.2px] mt-[9px] text-[#404040]">{item.text}</p>
                    {commentAdmin.map(item2=>(
                     <img src={item2.image} alt="img" />
                     
                    ))}
                </div>
                
            ))}
        </div>
      </div>
    </div>
  );
}
