import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BiMessageMinus } from "react-icons/bi";
import { PiFileXls, PiMoneyWavyLight } from "react-icons/pi";
import Table from "./Table";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Users() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]); // ذخیره id کاربران انتخاب‌شده
  const [error, setError] = useState<string | null>(null);

  const search = useForm<dataType>({});
  const { handleSubmit, register, formState: { errors } } = search;

  interface dataType {
    discription: string;
    search: string;
    select: string;
  }

  const check = [
    { id: 1, text: " پیامک " },
    { id: 2, text: " اعلان " },
    { id: 3, text: " ایمیل " },
  ];

  const onSubmit = (data: dataType) => {
    console.log(data);
  };

  const onErrorHandler = (error: FieldErrors) => {
    console.log(error);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]?.message;
      console.log(error);
    },
  });

  // تابع دریافت id کاربران انتخاب‌شده از Table
  const handleSelectUsers = (ids: string[]) => {
    setSelectedUserIds(ids);
  };

  // تابع ارسال درخواست افزایش موجودی کیف پول
  const handleIncreaseWallet = async (data: { discription: string }) => {
    if (selectedUserIds.length === 0) {
      setError("لطفاً حداقل یک کاربر انتخاب کنید.");
      return;
    }

    const amount = parseInt(data.discription);
    if (isNaN(amount) || amount <= 0) {
      setError("مبلغ واردشده معتبر نیست.");
      return;
    }

    try {
      for (const userId of selectedUserIds) {
        await axios.patch(
          `https://109.230.200.230:7890/api/v1/Admins/Users/${userId}/Wallet/Increase?amount=${amount}`,
          {},
          { withCredentials: true }
        );
      }
      setError(null);
      alert("موجودی کیف پول با موفقیت افزایش یافت.");
    } catch (err: any) {
      setError(`خطا در افزایش موجودی: ${err.message}`);
    }
  };

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen rounded-lg">
      <div className="flex items-center justify-between mt-4 lg:pt-4">
        <div className="w-full">
          <h1 className="text-[#404040] text-center text-[16px] font-xbold lg:text-right lg:flex lg:items-center">
            <FaCaretLeft className="w-6 h-6 hidden lg:block" />
            کاربرها
          </h1>
        </div>
        <div className="flex items-center justify-end gap-2 w-full">
          <div
            {...getRootProps()}
            className="border-2 border-[#227346] bg-[#F4FFF9] rounded-lg cursor-pointer flex justify-center px-[11px] py-[6px] w-full max-w-[189px]"
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-green-500">{file.name}</p>
            ) : (
              <p className="text-[#227346] flex items-center text-[14px] font-xregular gap-[6px]">
                <PiFileXls className="w-6 h-6" /> آپلود فایل کاربران مکین
              </p>
            )}
          </div>
          <div
            {...getRootProps()}
            className="border-2 border-[#4073D0] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center px-[11px] py-[6px] w-full max-w-[189px]"
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-green-500">{file.name}</p>
            ) : (
              <p className="text-[#4073D0] flex items-center text-[14px] font-xregular gap-[6px]">
                <PiFileXls className="w-6 h-6" /> آپلود فایل کوورک اجبار
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="md:flex md:items-center md:justify-between mt-4 lg:mt-6 w-full">
        <div className="flex items-center w-full justify-between">
          <input type="checkbox" defaultChecked className="checkbox md:hidden" />
          <div className="flex items-center gap-4">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center w-full">
                <label className="border border-[#ADADAD] rounded-[8px] md:w-[160px] py-[11px] md:py-2 flex items-center justify-between gap-2">
                  <select
                    id="select"
                    {...register("select")}
                    className="text-[14px] font-xregular text-[#606060]"
                  >
                    <option value="option1"> نوع کاربر </option>
                    <option value="option2"> همه </option>
                  </select>
                </label>
              </div>
            </form>

            <button
              className="border border-[#253359] bg-[#F9F9F9] px-[10px] py-[10.44px] md:py-[7px] md:px-[34.97px] rounded-[8.36px] md:flex md:items-center md:text-[14px] md:font-xregular md:gap-2"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <BiMessageMinus className="text-[#404040] w-6 h-6" />
              <span className="hidden md:block text-[#404040]">ارسال پیام</span>
            </button>
            <dialog id="my_modal_5" className="modal w-full">
              <div className="modal-box w-full max-w-[450px] mx-auto">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
                    <IoClose className="w-6 h-6" />
                  </button>
                </form>
                <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
                  <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
                    <div className="flex flex-col gap-[6px] w-full">
                      <label className="text-[14px] font-xbold text-[#404040]" htmlFor="discription">
                        متن پیام
                      </label>
                      <input
                        className="placeholder-[#868686] font-xregular text-[14px] md:pb-[121px] md:pt-[10px] px-3 rounded-lg border border-[#CBCBCB]"
                        placeholder="متن پیام را اینجا بنویسید"
                        type="text"
                        id="discription"
                        {...register("discription", {
                          required: "پر کردن فیلد پیام اجباری است",
                        })}
                      />
                      <p className="error">{errors.discription?.message}</p>
                    </div>
                    <div className="form-control flex flex-row items-center gap-6">
                      {check.map((item) => (
                        <label key={item.id} className="cursor-pointer label flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded-" />
                          <span className="text-[#202020] font-xregular text-[14px]">
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                    <button className="text-white bg-[#253359] text-[14px] font-xmedium py-[9.5px] w-full rounded-lg mt-3">
                      ارسال
                    </button>
                  </form>
                </div>
              </div>
            </dialog>

            <button
              onClick={() => document.getElementById("my_modal_6").showModal()}
              className="border border-[#253359] flex items-center gap-2 bg-[#F9F9F9] text-[#404040] px-[25.47px] py-[7px] text-[12px] font-xregular rounded-[8.36px]"
            >
              <PiMoneyWavyLight className="w-6 h-6" /> شارژ کیف پول
            </button>
            <dialog id="my_modal_6" className="modal w-full">
              <div className="modal-box w-full max-w-[450px] mx-auto">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
                    <IoClose className="w-6 h-6" />
                  </button>
                </form>
                <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
                  <div className="flex justify-center">
                    <img src="/admin-panel/money-add.svg" alt="img" />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <form noValidate onSubmit={handleSubmit(handleIncreaseWallet, onErrorHandler)}>
                    <div className="flex flex-col gap-[8px] w-full">
                      <label className="text-[14px] font-xbold text-[#404040]" htmlFor="discription">
                        مبلغ شارژ
                      </label>
                      <input
                        className="placeholder-[#868686] font-xregular text-[14px] py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                        placeholder="مبلغ شارژ را وارد نمایید"
                        type="text"
                        id="discription"
                        {...register("discription", {
                          required: "پر کردن فیلد مبلغ اجباری است",
                        })}
                      />
                      <p className="error">{errors.discription?.message}</p>
                    </div>
                    <div className="flex items-center justify-start w-full gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="radio-7"
                          className="radio radio-info w-5 h-5"
                          defaultChecked
                        />
                        <span className="font-xregular text-[14px]">شارژ کیف</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="radio-7"
                          className="radio radio-info w-5 h-5"
                        />
                        <span className="font-xregular text-[14px]">هدیه مکین</span>
                      </div>
                    </div>
                    <button className="text-white bg-[#253359] text-[14px] font-xmedium py-[13.5px] w-full rounded-lg mt-4">
                      ارسال
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div>
          <form
            className="flex items-center w-full justify-end gap-2"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col pt-3 md:pt-0">
              <input
                className="placeholder-[#868686] placeholder:text-[14px] font-xregular py-[12px] md:py-[7px] px-2 md:w-[160px] rounded-lg border-solid border-[1px] border-black"
                placeholder="جستجو"
                type="search"
                id="search"
                {...register("search")}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 md:block">
        <Table onSelectUsers={handleSelectUsers} />
      </div>
    </div>
  );
}