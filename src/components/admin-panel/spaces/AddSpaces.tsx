import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import AddSpaces2 from "./AddSpaces2";

export default function AddSpaces() {
  const options = [
    { value: "shared-seat", label: "صندلی اشتراکی" },
    { value: "meeting-room", label: "اتاق جلسات" },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };
  const formMap = [
    { id: 1, lable: " قیمت کاربر عادی ", info: " قیمت به تومان وارد نمایید " },
    { id: 2, lable: " قیمت دانشجو مکین ", info: " قیمت به تومان وارد نمایید " },
  ];
  interface dataType {
    username: string;
    discription: string;
  }
  const form = useForm<dataType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: dataType) => {
    console.log(data);
  };

  const onErrorHandler = (errors: FieldErrors<dataType>) => [
    console.log(errors, "errors"),
  ];

  const features = [
    {
      id: 1,
      image: "/iconLanding/CheapReserv.svg",
      title: " قیمت اقتصادی ",
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
    <div>
      <div className="flex items-center mt-6">
        <h1 className="text-[#ADADAD] text-center text-[16px] font-xbold lg:pt-4 lg:text-right lg:flex lg:items-center">
          <FaCaretLeft className="w-6 h-6 hidden lg:block" />
          فضاها
        </h1>
        <h1 className="text-[#404040] text-center text-[16px] font-xbold lg:pt-4 lg:text-right lg:flex lg:items-center">
          <FaCaretLeft className="w-6 h-6 hidden lg:block" />
          افزودن فضا جدید
        </h1>
      </div>
      <div className="flex items-center justify-between mt-3 w-full gap-8">
        <div className="flex flex-col w-full max-w-[299px] gap-[6px]">
          <label
            className="text-[14px] font-xbold text-[#404040]"
            htmlFor="title"
          >
            عنوان فضا{" "}
          </label>
          <select
            className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] flex items-center font-xregular text-[14px] text-[#868686]"
            id="title"
            onChange={handleChange}
            value={selectedOption}
          >
            <option value="" disabled hidden>
              انتخاب دسته بندی
            </option>
            <option value="option1"> صندلی اشتراکی </option>
            <option value="option2"> اتاق جلسات </option>
          </select>
        </div>
        <form
          className="w-full"
          noValidate
          onSubmit={handleSubmit(onSubmit, onErrorHandler)}
        >
          <div className="flex items-center gap-8 mt-[6px]">
            {formMap.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-[6px] w-full max-w-[298px]"
              >
                <label
                  className="text-[14px] font-xbold text-[#202020] "
                  htmlFor="username"
                >
                  {item.lable}
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                  placeholder={item.info}
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "پر کردن فیلد قیمت اجباری است ",
                  })}
                />
                <p className="error">{errors.username?.message}</p>
              </div>
            ))}
          </div>
        </form>
      </div>
      <form
        className="w-full"
        noValidate
        onSubmit={handleSubmit(onSubmit, onErrorHandler)}
      >
        <div className="flex flex-col gap-[6px] w-full mt-3">
          <label
            className="text-[14px] font-xbold text-[#404040] "
            htmlFor="discription"
          >
            توضیحات مختصر
          </label>
          <input
            className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
            placeholder=" توضیحات مختصر فضا را اینجا بنویسید (۳۰۰ کاراکتر) "
            type="text"
            id="username"
            {...register("username", {
              required: "پر کردن فیلد قیمت اجباری است ",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
      </form>
      <div className="mt-2">
        <span className="text-[#404040] text-[14px] font-xbold"> امکانات </span>
      </div>
      <div className="grid grid-cols-5 gap-x-6 gap-y-2 mt-2">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-[#F9F9F9] border border-[#000000] border-dashed rounded-xl flex items-center justify-between py-[5px] px-2 "
          >
            <div className="flex items-center gap-1">
              <img
                className="w-6 h-6 text-[#253359]"
                src={item.image}
                alt="img"
              />
              <span className="text-[#0C0C0C] font-xregular text-[12px]">
                {item.title}
              </span>
            </div>
            <input
              type="checkbox"
              className="toggle border-none bg-white [--tglbg:#CBCBCB] hover:[--tglbg:#44C0ED] hover:bg-white"
              defaultChecked
            />
          </div>
        ))}
      </div>
      <AddSpaces2/>
    </div>
  );
}
