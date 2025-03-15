import React, { useState, useRef } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { GoKey } from "react-icons/go";

export default function UserProfile() {
  interface dataType {
    username: string;
    email: string;
    description: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    nationalId: string;
    phoneNumber: string;
    gender: string;
  }

  const [profileImage, setProfileImage] = useState(
    "/user-panel/Ellipse 120.svg"
  );
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formMap = [
    {
      id: 1,
      name: "نام",
      info: "مریم",
      field: "firstName",
      placeholder: "نام خود را وارد نمایید",
      error: "پر کردن فیلد نام کاربر اجباری است",
    },
    {
      id: 2,
      name: "نام خانوادگی",
      info: "علی پور",
      field: "lastName",
      placeholder: "نام خانوادگی خود را وارد نمایید",
      error: "پر کردن فیلد نام خانوادگی اجباری است",
    },

    {
      id: 3,
      name: "کد ملی",
      info: "۰۸۲۰۱۲۳۰۱۲۳",
      field: "nationalId",
      placeholder: "کد ملی خود را وارد نمایید",
      error: "پر کردن فیلد کد ملی اجباری است",
    },
    {
      id: 4,
      name: "تاریخ تولد",
      info: "۱۳۸۰/۸/۱۸",
      field: "birthDate",
      placeholder: "تاریخ تولد خود را وارد نمایید",
      error: "پر کردن فیلد تاریخ تولد اجباری است",
    },

    {
      id: 5,
      name: "شماره موبایل",
      info: "۰۹۱۲۸۷۶۵۴۳",
      field: "phoneNumber",
      placeholder: "شماره موبایل خود را وارد نمایید",
      error: "پر کردن فیلد شماره موبایل اجباری است",
    },
    {
      id: 6,
      name: "ایمیل",
      info: "maryam.alipour@gmail.com",
      field: "email",
      placeholder: "ایمیل خود را وارد نمایید",
      error: "پر کردن فیلد ایمیل اجباری است",
    },
  ];

  const form = useForm<dataType>({
    defaultValues: {
      firstName: "مریم",
      lastName: "علی پور",
      birthDate: "۱۳۸۰/۸/۱۸",
      nationalId: "۰۸۲۰۱۲۳۰۱۲۳",
      email: "maryam.alipour@gmail.com",
      phoneNumber: "۰۹۱۲۸۷۶۵۴۳",
      gender: "خانم",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = form;

  const onSubmit = (data: dataType) => {
    console.log(data);
    setIsEditing(false);
  };

  const onErrorHandler = (errors: FieldErrors<dataType>) => {
    console.log(errors, "errors");
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      uploadFile(file)
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const uploadFile = async (selectedFile:File) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch(
        "https://109.230.200.230:7890/api/v1/Users",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <div className="lg:flex lg:items-center lg:mt-6 w-full lg:gap-6">
        <div className="flex items-center justify-center mt-4">
          <div className="flex justify-start lg:hidden">
            <GoArrowRight size={24} />
          </div>
          <h1 className="text-[#404040] text-center text-[16px] font-xbold lg:text-right lg:flex lg:items-center w-full">
            <FaCaretLeft className="w-6 h-6 hidden lg:block" />
            مشخصات کاربری
          </h1>
        </div>
      </div>

      <div className="flex justify-center mt-[17px] relative">
        <div className="relative cursor-pointer" onClick={handleImageClick}>
          <img
            src={profileImage}
            alt="تصویر پروفایل"
            className="w-28 h-28 rounded-full object-cover border-[6px] border-[#4073D0]"
          />
          <div className="absolute bottom-1 w-9 h-9 right-1 bg-[#FF9568] rounded-full p-2">
            <MdEdit className="text-white w-5 h-5" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="mt-2 px-[72px]">
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
          <button
            type="button"
            onClick={toggleEdit}
            className="bg-[#253359] text-[14px] font-xmedium text-white w-full py-2 rounded-lg md:hidden"
          >
            {isEditing ? "ثبت تغییرات" : "ویرایش مشخصات"}
          </button>

          <div className="md:grid md:grid-cols-2 md:gap-8">
            {formMap.map((item) => (
              <div key={item.id} className="flex flex-col pt-2">
                <label
                  className="text-[14px] font-xbold text-[#202020]"
                  htmlFor={item.field}
                >
                  {item.name}
                </label>
                <input
                  className={`placeholder-[#868686] font-xregular text-[14px] py-[7.5px] w-full max-w-[392px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB] ${
                    !isEditing ? "text-[#868686]" : "text-[#202020]"
                  }`}
                  placeholder={item.placeholder}
                  type="text"
                  id={item.field}
                  disabled={!isEditing}
                  {...register(item.field as keyof dataType, {
                    required: item.error,
                  })}
                />
                {errors[item.field as keyof dataType] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[item.field as keyof dataType]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between md:justify-normal gap-8 mt-4">
              <div className="flex items-center gap-1">
                <span className="text-[#202020] text-[14px] font-xbold">
                  آپلود مدارک:
                </span>
                <IoCheckmarkCircleOutline className="text-[#00BA88] bg-transparent w-5 h-5 rounded-full" />
                <button
                  type="button"
                  className="text-[12px] font-xregular underline underline-offset-4"
                >
                  مشاهده
                </button>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[#202020] text-[14px] font-xbold">
                  جنسیت:
                </span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="آقا"
                      disabled={!isEditing}
                      {...register("gender")}
                    />
                    <span className="text-[12px] font-xregular">آقا</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="خانم"
                      disabled={!isEditing}
                      {...register("gender")}
                    />
                    <span className="text-[12px] font-xregular">خانم</span>
                  </label>
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-4 flex gap-4 col-span-2 md:col-span-1">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="bg-white border border-[#253359] text-[16px] font-xmedium text-[#253359] w-full max-w-[188px] py-[11px] rounded-lg"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#253359] text-[16px] font-xmedium text-white w-full max-w-[188px] py-[11px] rounded-lg"
                >
                  ثبت تغییرات
                </button>
              </div>
            ) : (
              <div className="mt-4 flex gap-4 col-span-2 md:col-span-1">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="bg-white border border-[#253359] text-[16px] font-xmedium text-[#253359] w-full max-w-[188px] rounded-lg flex items-center justify-center gap-2"
                >
                  <GoKey /> تغییر رمز ورود
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="bg-[#253359] text-[16px] font-xmedium text-white py-[12px] w-full max-w-[188px] rounded-lg hidden md:block"
                >
                  ویرایش مشخصات
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
