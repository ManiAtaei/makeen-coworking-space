import React from "react";

export default function Features() {
  const features = [
    {
      id: 1,
      image: "/iconLanding/Vector.svg",
      title: " قیمت مناسب ",

    },
    {
      id: 2,
      image: "/iconLanding/Projector.svg",
      title: " ویدیو پروژکتور ",
   
    },
    {
      id: 3,
      image: "/iconLanding/Group.svg",
      title: " نوشیدنی گرم ",
   
    },
    {
      id: 4,
      image: "/iconLanding/Vector2.svg",
      title: " کمد شخصی ",

    },
    {
      id: 5,
      image: "/iconLanding/Group2.svg",
      title: " کافی تریا ",
   
    },
    {
      id: 6,
      image: "/iconLanding/Vector3.svg",
      title: " مبلمان اداری ",
    
    },
    {
      id: 7,
      image: "/iconLanding/wifi.svg",
      title: " اینترنت پرسرعت ",
  
    },
    {
      id: 8,
      image: "/iconLanding/Group3.svg",
      title: " امنیت ",
      
    },
  ];

  return (
    <div className="relative mt-[-10px]">
      <div className="flex flex-col items-center gap-4 ">
        <h1 className="text-2xl font-xbold mt-10"> امکانات مکین </h1>
        <div dir="rtl" className="grid-cols-2 grid-rows-2 md:grid-cols-4 grid lg:grid-cols-4  gap-4 mobileNum:gap-10 lg:gap-4">
          {features.map((item) => (
            <div
              key={item.id}
              className={`bg-[#F4F5FC] flex lg:flex-col items-center justify-center gap-2 lg:py-[30px] rounded-lg py-4 px-1`}
            >
              <img className="size-8 lg:size-11" src={item.image} alt="img" />
              <span className="text-[#253359] font-xregular text-[12px] lg:text-[20px]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <img
        className="absolute left-3 hidden containerPage:block top-3"
        src="/imageLanding/Group1.svg"
        alt="img"
      />
      <img
        className="absolute right-0 hidden containerPage:block bottom-1"
        src="/imageLanding/Dot2.svg"
        alt="img"
      />
    </div>
  );
}
