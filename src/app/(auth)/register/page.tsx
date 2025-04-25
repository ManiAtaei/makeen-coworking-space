"use client";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidLeftArrow } from "react-icons/bi";
import { FieldErrors, useForm } from "react-hook-form";
import { FiRefreshCcw } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { GrAttachment } from "react-icons/gr";
import Image from "next/image"; // Import Image from next/image

export default function Register() { // Renamed to uppercase Register
  interface DataType {
    username: string;
    lastName: string; // Added for last name
    password: string; // Added for password
    confirmPassword: string; // Added for confirm password
    nationalId: string; // Added for national ID
    email: string;
    phone: string; // Added for phone
    birthDate: string; // Added for birth date
    gender: string; // Added for gender
    captcha: string; // Added for CAPTCHA
    verificationCode: string; // Added for verification code
  }

  const formMap = [
    {
      id: 1,
      name: "نام",
      field: "نام خود را وارد نمایید",
      error: "پر کردن فیلد نام کاربر اجباری است",
      registerKey: "username",
    },
    {
      id: 2,
      name: "نام خانوادگی",
      field: "نام خانوادگی خود را وارد نمایید",
      error: "پر کردن فیلد نام خانوادگی اجباری است",
      registerKey: "lastName",
    },
    {
      id: 3,
      name: "پسورد",
      field: "پسورد خود را وارد نمایید",
      error: "پر کردن فیلد پسورد اجباری است",
      registerKey: "password",
    },
    {
      id: 4,
      name: "تکرار پسورد",
      field: "پسورد خود را تکرار نمایید",
      error: "پر کردن فیلد تکرار پسورد اجباری است",
      registerKey: "confirmPassword",
    },
    {
      id: 5,
      name: "کد ملی",
      field: "کد ملی خود را وارد نمایید",
      error: "پر کردن فیلد کد ملی اجباری است",
      registerKey: "nationalId",
    },
  ];

  const form = useForm<DataType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: DataType) => {
    console.log(data);
    // Add API submission logic here
  };

  const onErrorHandler = (errors: FieldErrors<DataType>) => {
    console.log(errors, "errors");
  };

  const [file, setFile] = useState<File | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const [captchaKey, setCaptchaKey] = useState(Date.now()); // For CAPTCHA refresh

  const handleCaptchaRefresh = () => {
    setCaptchaKey(Date.now()); // Update key to refresh CAPTCHA
  };

  return (
    <div className="px-6 max-w-[500px] mx-auto md:max-w-[800px] flex flex-col justify-center h-screen">
      <div className="flex justify-end pt-[27px]">
        <IoCloseOutline className="w-7 h-7" />
      </div>
      <span className="flex items-center text-[16px] font-xbold gap-[7px] mt-[-17px]">
        <BiSolidLeftArrow />
        فرم ثبت نام مکین
      </span>
      <div className="mt-4">
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {formMap.map((item) => (
              <div key={item.id} className="flex flex-col pt-2">
                <label
                  className="text-[14px] font-xbold text-[#202020]"
                  htmlFor={item.registerKey}
                >
                  {item.name}
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                  placeholder={item.field}
                  type={item.registerKey.includes("password") ? "password" : "text"}
                  id={item.registerKey}
                  {...register(item.registerKey as keyof DataType, {
                    required: item.error,
                  })}
                />
                <p className="error">{errors[item.registerKey as keyof DataType]?.message}</p>
              </div>
            ))}
            <div className="flex flex-col pt-2">
              <label
                className="text-[14px] font-xbold text-[#202020]"
                htmlFor="birthDate"
              >
                تاریخ تولد
              </label>
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                placeholder="تاریخ تولد خود را انتخاب نمایید"
                type="date" // Changed to date for better UX
                id="birthDate"
                {...register("birthDate")}
              />
              <p className="error">{errors.birthDate?.message}</p>
            </div>
            <div className="flex flex-col pt-2">
              <label
                className="text-[14px] font-xbold text-[#202020]"
                htmlFor="email"
              >
                ایمیل شما
              </label>
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                placeholder="ایمیل خود را وارد نمایید"
                type="email"
                id="email"
                {...register("email", {
                  required: "در وارد کردن ایمیل خود دقت فرمایید",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "ایمیل نامعتبر است",
                  },
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="mt-4 md:mt-1">
              <span className="text-[14px] font-xbold text-[#202020]">
                آپلود تصویر کارت ملی
              </span>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#69CDF1] bg-[#F4F5FC] rounded-lg cursor-pointer flex justify-center mt-[5px] lg:mt-0 py-[11.5px] w-full"
              >
                <input {...getInputProps()} />
                {file ? (
                  <p className="text-green-500">{file.name}</p>
                ) : (
                  <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                    <GrAttachment /> برای افزودن رسید پرداخت کلیک نمایید
                  </p>
                )}
              </div>
              <span className="text-[12px] font-xregular text-[#868686]">
                فرمت PNG یا JPG و حجم حداکثر ۵ مگابایت
              </span>
            </div>
            <div className="md:flex md:items-start mt-[-32px]">
              <div className="flex items-center gap-4 md:flex-col md:gap-[18px] md:items-start mt-5 md:mt-3">
                <span className="text-[#202020] text-[14px] font-xbold">
                  جنسیت
                </span>
                <div className="flex items-center gap-[6px] text-[#202020] text-[14px] font-xregular">
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    {...register("gender", { required: "انتخاب جنسیت اجباری است" })}
                    className="radio radio-info"
                    defaultChecked
                  />
                  <label htmlFor="male">آقا</label>
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    {...register("gender", { required: "انتخاب جنسیت اجباری است" })}
                    className="radio radio-info"
                  />
                  <label htmlFor="female">خانم</label>
                </div>
              </div>
              <div className="flex flex-col mt-3 md:mr-8 w-full">
                <label
                  className="text-[14px] font-xbold text-[#202020]"
                  htmlFor="phone"
                >
                  شماره همراه
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] md:px-1 rounded-lg border w-full border-[#CBCBCB]"
                  placeholder="شماره همراه خود را وارد نمایید"
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "پر کردن فیلد شماره همراه اجباری است",
                    pattern: {
                      value: /^09[0-9]{9}$/,
                      message: "شماره همراه نامعتبر است",
                    },
                  })}
                />
                <p className="error">{errors.phone?.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-[10px] md:mt-[10px]">
              <div>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[-5px] md:px-1 rounded-lg border border-[#CBCBCB] w-full max-w-[121px]"
                  placeholder="عبارت امنیتی"
                  type="text"
                  id="captcha"
                  {...register("captcha", {
                    required: "پر کردن فیلد عبارت امنیتی اجباری است",
                  })}
                />
                <p className="error">{errors.captcha?.message}</p>
              </div>
              <div className="flex items-center gap-2 mt-[-5px]">
                <Image
                  src={`/login/imageLogin/Captcha.svg?${captchaKey}`} // Append key to force refresh
                  alt="CAPTCHA"
                  width={100} // Adjust based on actual size
                  height={40} // Adjust based on actual size
                />
                <FiRefreshCcw
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleCaptchaRefresh}
                />
              </div>
            </div>
            <div className="flex flex-row w-full items-center mt-4 md:mt-0">
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[9.5px] md:py-[12.5px] rounded-r-lg border border-[#CBCBCB] w-full"
                placeholder="کد تایید را وارد نمایید"
                type="text"
                id="verificationCode"
                {...register("verificationCode", {
                  required: "پر کردن فیلد کد تایید اجباری است",
                })}
              />
              <button
                type="button" // Prevent form submission
                className="bg-[#F4FFF9] text-[#227346] text-[10px] md:text-[12px] md:font-xmedium font-xregular py-[12px] md:py-[14px] w-full border rounded-l-md border-[#3BC377]"
              >
                ارسال کد تایید شماره همراه
              </button>
              <p className="error">{errors.verificationCode?.message}</p>
            </div>
            <div className="md:max-w-[500px] md:w-full md:mx-auto mt-8 md:mt-0">
              <button
                type="submit"
                className="text-white bg-[#253359] w-full mt-4 md:mt-0 py-[13.5px] rounded-lg text-[14px] font-xmedium"
              >
                ثبت مشخصات و عضویت
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}