import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { SlEye } from "react-icons/sl";
import { LuTrash2 } from "react-icons/lu";
import { useDropzone } from "react-dropzone";

export default function Banner() {
  interface dataType {
    titr1: string;
    titr2: string;
  }
  const form = useForm<dataType>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("firstTitle", form.getValues("titr1"));
      formData.append("secondTitle", form.getValues("titr2"));
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        "https://109.230.200.230:7890/api/v1/Admins/Web-Site-Setting",
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

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

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen lg:rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        افزودن بنر
      </h1>
      <div className="mt-6 max-w-[905px]">
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
          <div className="flex flex-col text-[#404040] font-xbold text-[14px]">
            <label htmlFor="titr1"> تیتر اول(بزرگ) </label>
            <input
              className="placeholder-[#868686] py-[10px] px-1 mt-1 rounded-lg border border-[#CBCBCB] hover:border-blue-500"
              type="text"
              id="titr1"
              {...register("titr1")}
            />
            <p className="error">{errors.titr1?.message}</p>
          </div>
          <div className="flex flex-col text-[#404040] font-xbold text-[14px] mt-6">
            <label htmlFor="titr1"> تیتر دوم(کوچک) </label>
            <input
              className="placeholder-[#868686] py-[10px] px-1 mt-1 rounded-lg border border-[#CBCBCB]"
              type="text"
              id="titr1"
              {...register("titr1")}
            />
            <p className="error">{errors.titr1?.message}</p>
          </div>
          <div className="flex justify-between items-center w-full mt-6 gap-16 max-w-[905px]">
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 lg:mt-0 py-[11.5px] w-full"
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-green-500">{file.name}</p>
              ) : (
                <p className="text-[#253359] flex items-center justify-between w-full text-[14px] font-xregular px-6">
                  <SlEye className="h-[22px] w-[22px]" />
                  نام فایل آپلود شده.پسوند{" "}
                  <LuTrash2 className="h-[22px] w-[22px]" />
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#253359] text-[16px] font-xmedium flex items-center justify-center text-white py-3 rounded-lg w-full"
            >
              <span className=""> ثبت ویرایش </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
