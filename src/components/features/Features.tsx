import React from "react";

export default function Features() {
  const features = [
    {
      id: 1,
      image: "/iconLanding/Cheap.svg",
      title: " قیمت مناسب ",
      res : "block"
    },
    {
      id: 2,
      image: "/iconLanding/Projector.svg",
      title: " ویدیو پروژکتور ",
      res : "hidden lg:block lg:flex lg:item-center lg:justify-center"
    },
    {
      id: 3,
      image: "/iconLanding/Group.svg",
      title: " نوشیدنی گرم ",
      res : "hidden md:block md:flex md:item-center md:justify-center"
    },
    {
      id: 4,
      image: "/iconLanding/Vector2.svg",
      title: " کمد شخصی ",
      res : "block"
    },
    {
      id: 5,
      image: "/iconLanding/Group2.svg",
      title: " کافی تریا ",
      res : "block"
    },
    {
      id: 6,
      image: "/iconLanding/Vector3.svg",
      title: " مبلمان اداری ",
      res : "hidden md:block md:flex md:item-center md:justify-center"
    },
    {
      id: 7,
      image: "/iconLanding/wifi.svg",
      title: " اینترنت پرسرعت ",
        res : "block"
    },
    {
      id: 8,
      image: "/iconLanding/Group3.svg",
      title: " امنیت ",
      res : "hidden lg:block lg:flex lg:item-center lg:justify-center"
    },
  ];

  return (
    <div className="relative h-[466px]">
      <div className="flex flex-col items-center gap-4 ">
        <h1 className="text-2xl font-xbold mt-20"> امکانات مکین </h1>
        <div dir="ltr" className="grid-cols-2 grid-rows-2 md:grid-cols-3  grid lg:grid-cols-4  gap-4 mobileNum:gap-10 lg:gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-[#F4F5FC] flex flex-col items-center justify-center gap-2 py-[30px] ${feature.res}`}
            >
              <img className="px-[56px] " src={feature.image} alt="img" />
              <span className="text-[#253359] mt-4 font-xregular text-xl">
                {feature.title}
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
