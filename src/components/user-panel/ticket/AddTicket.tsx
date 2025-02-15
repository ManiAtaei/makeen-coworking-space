import React from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FieldErrors, useForm } from "react-hook-form";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { GoArrowRight } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";

interface dataType {
  title: string;
  description: string;
}

export default function AddTicket() {
  const form = useForm<dataType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onErrorHandler = (errors: FieldErrors<dataType>) => [
    console.log(errors, "errors"),
  ];
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("message", data.message);
    if (file) formData.append("attachment", file);

    console.log("Form Data:", formData);
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:pr-8 lg:pl-0 lg:bg-white h-screen rounded-lg">
      <div className="lg:flex w-full lg:mt-6 h-full">
        <div className="w-full">
          <div className="lg:flex lg:items-center w-full lg:gap-6">
            <div className="flex items-center justify-center mt-4 lg:mt-8">
              <div className="flex justify-start lg:hidden">
                <GoArrowRight size={24} />
              </div>
              <h1 className="text-[#404040] text-center text-[16px] font-xbold ml-4 lg:ml-4 lg:text-right lg:flex lg:items-center w-full">
                <FaCaretLeft className="w-6 h-6 hidden lg:block" />
                تیکت ها
              </h1>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
            <div className="flex flex-col mt-4 lg:mt-6">
              <label
                className="text-[14px] font-xbold text-[#404040] "
                htmlFor="title"
              >
                موضوع تیکت
              </label>
              <input
                className="placeholder-[#404040] text-[14px] font-xregular rounded-lg mt-[5px] py-2 px-3 border border-[#CBCBCB] shadow-sm"
                placeholder=" عنوان تیکت را وارد نمایید "
                type="text"
                id="title"
                {...register("title", {
                  required: "نام کاربری الزامی است ",
                })}
              />
              <p className="error">{errors.title?.message}</p>
            </div>

            <div className="flex flex-col mt-4 lg:mt-8">
              <label
                className="text-[14px] font-xbold text-[#404040] "
                htmlFor="description"
              >
                متن پیام
              </label>
              <input
                className="placeholder-[#ADADAD] rounded-lg text-[14px] font-xregular pb-[100px] mt-[5px] h-[148px] px-[10px] border border-[#ADADAD] shadow-sm"
                placeholder=" متن پیام خود را اینجا بنویسید "
                type="text"
                id="description"
                {...register("description", {
                  required: "توضیحات خود را وارد نمایید ",
                })}
              />
              <p className="error">{errors.description?.message}</p>
            </div>
            <div className="titleNav:flex titleNav:items-center lg:mt-8 titleNav:gap-6">
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 lg:mt-0 py-[11.5px] w-full"
              >
                <input {...getInputProps()} />
                {file ? (
                  <p className="text-green-500">{file.name}</p>
                ) : (
                  <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                    <GrAttachment /> برای افزودن فایل ضمیمه کلیک نمایید
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#253359] text-[16px] font-xmedium text-white py-[11.5px] rounded-lg mt-4 lg:mt-0"
              >
                ارسال تیکت
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 lg:mt-0 lg:w-full lg:bg-[url(/user-panel/background.svg)] lg:px-6 lg:pt-[106px] lg:mr-[25px] titleNav:w-[70%]">
          <h1 className="text-[#4073D0] font-xbold text-[14px] lg:text-[18px]">
            قبل از ارسال تیکت
          </h1>
          <p className=" text-[#3B3B3B] text-[12px] font-xregular mt-[10px] lg:mt-[25px] leading-[35.2px] lg:text-[16px] lg:font-xmedium">
            کاربر گرامی ایرانیکارت چنانچه سوالی دارید می‌توانید با جستجو در قسمت
            سوالات متداول پاسخ سوالات خود را بیابید، در صورتی که به پاسخ مورد
            نظر خود دست نیافتید می‌توانید از طریق ارسال تیکت به دپارتمان مربوطه
            با کارشناسان ایرانیکارت در ارتباط باشید
          </p>
        </div>
      </div>
    </div>
  );
}
