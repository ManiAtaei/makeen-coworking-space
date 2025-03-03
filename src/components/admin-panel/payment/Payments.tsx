import React from "react";
import { FaCaretLeft } from "react-icons/fa";
import Table from "./Table";
import { useForm } from "react-hook-form";
import { LuCalendarFold } from "react-icons/lu";

export default function Payments() {
  interface emailType {
    search: string;
    select: string;
  }

  const search = useForm<emailType>({});

  const { handleSubmit, register } = search;

  const onSubmit = (data: emailType) => {
    console.log(data);
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        مدیریت پرداخت‌ها
      </h1>
      <div className="flex flex-col-reverse md:flex md:flex-row md:items-center md:justify-between md:mt-6 ">
        <div className="flex items-center mt-4 md:mt-0 gap-4">
          <div className="flex items-center gap-[7px] font-xregular text-[14px] text-[#000000] w-full">
            <span> پرداخت آنلاین </span>
            <input
              type="checkbox"
              className="toggle border-none bg-white [--tglbg:#CBCBCB] hover:[--tglbg:#44C0ED] hover:bg-white"
              defaultChecked
            />
          </div>
          <div className="flex items-center gap-4 w-full justify-between">
            <form
              className="flex items-center gap-4"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex items-center w-full">
                <select
                  id="select"
                  {...register("select")}
                  className="text-[14px] font-xregular text-[#404040] border border-[#ADADAD] w-[160px] rounded-[8px] px-4 py-2 md:py-[7.5px] "
                >
                  <option value="option1"> وضعیت پرداخت </option>
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
                      <option value="option1"> از تاریخ </option>
                      <option value="option2"> همه </option>
                    </select>
                  </label>
                </div>
                <div className="w-full pr-2 text-left ">
                  <select
                    id="select"
                    {...register("select")}
                    className="text-[14px] font-xregular text-[#606060] "
                  >
                    <option value="option1"> تا (اختیاری) </option>
                    <option value="option2"> همه </option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-end">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col pt-3 md:pt-0">
              <input
                className="placeholder-[#868686] placeholder:text-[14px] font-xregular py-[12px] md:py-2 px-2 md:w-[160px] rounded-lg border-solid border-[1px] border-[#868686]"
                placeholder=" جستجو  "
                type="search"
                id="search"
                {...register("search")}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-6">
        <Table />
      </div>
    </div>
  );
}
