import React, { useState } from "react";
import { CiWifiOn } from "react-icons/ci";
import { PiCoffeeLight } from "react-icons/pi";
import { PiOfficeChair } from "react-icons/pi";
import { GrCafeteria } from "react-icons/gr";
import { LuProjector } from "react-icons/lu";
import { PiLockers } from "react-icons/pi";
import { TiArrowDownOutline } from "react-icons/ti";
import { AiOutlineSafety } from "react-icons/ai";
import { TbArmchair } from "react-icons/tb";
import { LuTreePine } from "react-icons/lu";
import { FaCaretLeft } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { FieldErrors, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Features = () => {
  const features = [
    { icon: <CiWifiOn size={24} />, label: " اینترنت وافای", enabled: true },
    { icon: <PiCoffeeLight size={24} />, label: "چای قهوه", enabled: true },
    {
      icon: <PiOfficeChair size={24} />,
      label: " مبلمان اداری ",
      enabled: true,
    },
    { icon: <GrCafeteria size={24} />, label: " کافتریا ", enabled: true },
    {
      icon: <LuProjector size={24} />,
      label: " ویدیو پروژکتور ",
      enabled: false,
    },
    { icon: <PiLockers size={24} />, label: "  کمد شخصی ", enabled: false },
    {
      icon: <TiArrowDownOutline size={24} />,
      label: " قیمت اقتصادی ",
      enabled: true,
    },
    { icon: <AiOutlineSafety size={24} />, label: " امنیت ", enabled: false },
    { icon: <TbArmchair size={24} />, label: "صندلی اختصاصی ", enabled: true },
    { icon: <LuTreePine size={24} />, label: " فضای سبز ", enabled: true },
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
  const onErrorHandler = (error: FieldErrors) => {
    console.log(error);
  };
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen lg:rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        امکانات
      </h1>
      <div className="flex justify-end">
        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="bg-[#253359] text-[16px] font-xmedium flex items-center justify-center gap-2 text-white w-[300px] py-3 rounded-lg mt-6"
        >
          <GoPlusCircle className="w-6 h-6" />
          افزودن امکان جدید
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-[19px] pr-8 pl-4 bg-[#F4F5FC] rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 text-[#253359]">
              {item.icon}
              <span className="text-right text-[#202020] font-xregular text-[14px]">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="toggle border-none bg-white [--tglbg:#CBCBCB] hover:[--tglbg:#44C0ED] hover:bg-white"
                defaultChecked
              />
              <button className="text-gray-400">
                <LuTrash2 className="w-[22px] h-[22px] text-[#ADADAD]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <dialog id="my_modal_3" className="modal w-full max-w-[400px] mx-auto">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
            <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
              <div className="flex flex-col gap-[6px] w-full mt-3">
                <label
                  className="text-[14px] font-xbold text-[#404040] "
                  htmlFor="discription"
                >
                  عنوان امکان
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] mt-1 md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                  placeholder=" نام امکان را وارد نمایید "
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "پر کردن فیلد قیمت اجباری است ",
                  })}
                />
                <p className="error">{errors.username?.message}</p>
              </div>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 lg:mt-6 py-[11.5px] w-full"
              >
                <input {...getInputProps()} />
                {file ? (
                  <p className="text-green-500">{file.name}</p>
                ) : (
                  <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                    <GrAttachment /> برای افزودن آیکون امکان جدید کلیک نمایید
                  </p>
                )}
              </div>
              <button className="text-white bg-[#253359] text-[14px] font-xmedium py-[9.5px] w-full rounded-lg mt-6">
                افزودن امکان
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش <span className="text-[#202020] font-xbold">8</span> از 68
            نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060]  rounded-[4px]" />
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            1
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            2
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            3
          </button>
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowBack className="w-4 h-4 text-[#606060] " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
