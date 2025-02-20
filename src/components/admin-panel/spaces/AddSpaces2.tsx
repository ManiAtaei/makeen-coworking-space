import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldErrors, useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";

export default function AddSpaces2() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

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
  const reserv = [
    {
      id: 1,
      lable: " نوع رزرو ",
      text: " ساعتی یا روزانه ",
      drop1: " ساعتی ",
      drop2: " روزانه ",
    },
    {
      id: 2,
      lable: " از ساعت ",
      text: " ساعت شروع انتخاب کنید ",
      drop1: " ساعتی ",
      drop2: " روزانه ",
    },
    {
      id: 3,
      lable: " تا ساعت ",
      text: " ساعت پایان انتخاب کنید ",
      drop1: " ساعتی ",
      drop2: " روزانه ",
    },
  ];
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });
  return (
    <div>
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
            قوانین و مقررات
          </label>
          <input
            className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:pt-[10px] md:pb-[38px] px-3 rounded-lg border border-[#CBCBCB]"
            placeholder=" قوانین و مقررات فضا را اینجا بنویسید "
            type="text"
            id="username"
            {...register("username", {
              required: "پر کردن فیلد قیمت اجباری است ",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
      </form>
      <div className="flex items-center justify-between mt-1 w-full gap-8">
        {reserv.map((item) => (
          <div
            key={item.id}
            className="flex flex-col w-full max-w-[216px] gap-[6px]"
          >
            <label
              className="text-[14px] font-xbold text-[#404040]"
              htmlFor="title"
            >
              {item.lable}
            </label>
            <select
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] flex items-center font-xregular text-[14px] text-[#868686]"
              id="title"
              onChange={handleChange}
              value={selectedOption}
            >
              <option value="" disabled hidden>
                {item.text}
              </option>
              <option value="option1"> {item.drop1} </option>
              <option value="option2"> {item.drop2} </option>
            </select>
          </div>
        ))}
        <form
          className="w-full"
          noValidate
          onSubmit={handleSubmit(onSubmit, onErrorHandler)}
        >
          <div className="flex flex-col gap-[6px] w-full max-w-[216px]">
            <label
              className="text-[14px] font-xbold text-[#202020] "
              htmlFor="username"
            >
              ظرفیت
            </label>
            <input
              className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
              placeholder=" ظرفیت وارد نمایید "
              type="text"
              id="username"
              {...register("username", {
                required: "پر کردن فیلد قیمت اجباری است ",
              })}
            />
            <p className="error">{errors.username?.message}</p>
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
            توضیحات کامل با جزییات
          </label>
          <input
            className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:pt-[10px] md:pb-[59px] px-3 rounded-lg border border-[#CBCBCB]"
            placeholder=" توضیحات فضا را اینجا بنویسید "
            type="text"
            id="username"
            {...register("username", {
              required: "پر کردن فیلد قیمت اجباری است ",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
      </form>
      <div className="flex items-center justify-between mt-3 w-full gap-16">
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 lg:mt-0 py-[11.5px] w-full"
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-green-500">{file.name}</p>
          ) : (
            <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
              <GrAttachment /> برای افزودن عکس فضا کلیک نمایید
            </p>
          )}
        </div>
        <button className="bg-[#253359] text-white w-full py-[12px] rounded-lg font-xmedium text-[16px]"> تایید و افزودن فضا </button>
      </div>
    </div>
  );
}
