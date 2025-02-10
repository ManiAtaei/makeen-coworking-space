import React from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FaSquare } from "react-icons/fa";
import LineChartReport from "./LineChartReport";
import { useForm } from "react-hook-form";
import { LuCalendarFold } from "react-icons/lu";

export default function Reporting() {
  interface dataType {
    select: string;
  }
  const form = useForm<dataType>({});

  const { handleSubmit, register } = form;

  const onSubmit = (data: dataType) => {
    console.log(data);
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen lg:rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        گزارش گیری
      </h1>

      <div className="flex items-center justify-center w-full px-[221px] mt-12">
        <form
          className="flex items-center justify-center gap-4 w-full"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <select
              id="select"
              {...register("select")}
              className="text-[14px] font-xregular border border-[#ADADAD] text-[#404040] rounded-[8px] w-full py-2 px-4"
            >
              <option value="option1"> گزارش درآمدها </option>
              <option value="option2"> همه </option>
            </select>
          </div>

          <div className="flex items-center border w-full border-[#ADADAD] rounded-lg py-2 px-4">
            <div className="flex items-center w-full">
              <label className="border-l border-[#DFDFDF] pl-2 flex items-center gap-2 ">
                <LuCalendarFold className="w-6 h-6 text-[#ADADAD]" />
                <select
                  id="select"
                  {...register("select")}
                  className="text-[14px] font-xregular text-[#606060] "
                >
                  <option value="option1"> 1403/10/12 </option>
                  <option value="option2"> همه </option>
                </select>
              </label>
            </div>
            <div className="w-full pr-2 text-left ">
              <select
                id="select"
                {...register("select")}
                className="text-[14px] font-xregular text-[#404040] "
              >
                <option value="option1"> ۱۴۰۴/۱/۱ </option>
                <option value="option2"> همه </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="md:max-w-[751px] mx-auto mt-[90px]">
        <LineChartReport />
        <div className="flex items-center gap-3 mr-2 mt-12">
          <div className="flex items-center gap-2">
            <FaSquare className="text-[#4073D0] md:w-7 md:h-7" />
            <span className="text-[#868686] font-xregular text-[10px] md:text-[17.45px]">
              صندلی اشتراکی
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaSquare className="text-[#69CDF1] md:w-7 md:h-7" />
            <span className="text-[#868686] font-xregular text-[10px] lg:text-[17.45px]">
              اتاق جلسات
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
