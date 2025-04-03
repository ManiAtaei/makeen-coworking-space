import React, { useState, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { GrAttachment } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import axios from "axios";

export default function AddSpaces() {
  const [selectedOption, setSelectedOption] = useState("");
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discounts, setDiscounts] = useState({});

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      pricePerReserve: "",
      pricePerReserveForStudents: "",
      description: "",
      details: "",
      rules: "",
      fromTime: "",
      toTime: "",
      space: "",
      reserv: "", // مقدار پیش‌فرض خالی
      discount: "",
      additionalProp1: "",
      additionalProp2: "",
      additionalProp3: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      isTeamSpace: selectedOption === "meeting-room",
      space: parseInt(data.space) || 0,
      pricePerReserve: parseInt(data.pricePerReserve) || 0,
      pricePerReserveForStudents: parseInt(data.pricePerReserveForStudents) || 0,
      details: data.details,
      description: data.description,
      rules: data.rules,
      fromTime: parseInt(data.fromTime) || 0,
      toTime: parseInt(data.toTime) || 0,
      discounts: discounts,
      features: selectedFeatures,
      additionalProp1: parseInt(data.additionalProp1) || 0,
      additionalProp2: parseInt(data.additionalProp2) || 0,
      additionalProp3: parseInt(data.additionalProp3) || 0,
    };

    try {
      const response = await axios.post(
        "https://109.230.200.230:7890/api/v1/Admins/Reservation-Spaces",
        payload,
        { withCredentials: true }
      );
      console.log("فضا با موفقیت اضافه شد:", response.data);
    } catch (err) {
      console.error("خطا در ارسال دیتا:", err);
    }
  };

  const onErrorHandler = (errors: FieldErrors) => {
    console.log(errors, "errors");
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://109.230.200.230:7890/api/v1/Admins/Reservation-Spaces/Features",
          { withCredentials: true }
        );
        const transformedFeatures = response.data.map((item, index) => ({
          id: index + 1,
          title: item.Feature,
        }));
        setFeatures(transformedFeatures);
      } catch (err) {
        setError(err.message || "خطا در دریافت امکانات");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const handleFeatureChange = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const addDiscount = (data) => {
    // اگر کاربر مقدار reserv را وارد نکرده باشد، مقدار پیش‌فرض 0 در نظر گرفته می‌شود
    const reservValue = data.reserv ? parseInt(data.reserv) : 0;
    if (reservValue === 0) return; // اگر مقدار 0 باشد، تخفیف اضافه نشود
    setDiscounts((prev) => ({
      ...prev,
      [reservValue]: parseInt(data.discount) || 0,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0]);
    },
  });

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

      <form className="w-full" noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
        <div className="flex items-center justify-between mt-3 w-full gap-8">
          <div className="flex flex-col w-full max-w-[299px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#404040]" htmlFor="name">
              عنوان فضا
            </label>
            <select
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] font-xregular text-[14px] text-[#868686]"
              id="name"
              onChange={handleChange}
              value={selectedOption}
            >
              <option value="" disabled hidden>
                انتخاب دسته‌بندی
              </option>
              <option value="shared-seat">صندلی اشتراکی</option>
              <option value="meeting-room">اتاق جلسات</option>
            </select>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-[6px] w-full max-w-[298px]">
              <label className="text-[14px] font-xbold text-[#202020]" htmlFor="pricePerReserve">
                قیمت کاربر عادی
              </label>
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                placeholder="قیمت به تومان وارد نمایید"
                type="text"
                id="pricePerReserve"
                {...register("pricePerReserve", { required: "پر کردن فیلد قیمت اجباری است" })}
              />
              <p className="error">{errors.pricePerReserve?.message}</p>
            </div>
            <div className="flex flex-col gap-[6px] w-full max-w-[298px]">
              <label className="text-[14px] font-xbold text-[#202020]" htmlFor="pricePerReserveForStudents">
                قیمت دانشجو مکین
              </label>
              <input
                className="placeholder-[#868686] font-xregular text-[14px] py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                placeholder="قیمت به تومان وارد نمایید"
                type="text"
                id="pricePerReserveForStudents"
                {...register("pricePerReserveForStudents", { required: "پر کردن فیلد قیمت اجباری است" })}
              />
              <p className="error">{errors.pricePerReserveForStudents?.message}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[6px] w-full mt-3">
          <label className="text-[14px] font-xbold text-[#404040]" htmlFor="description">
            توضیحات مختصر
          </label>
          <input
            className="placeholder-[#868686] font-xregular text-[14px] py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
            placeholder="توضیحات مختصر فضا را اینجا بنویسید (۳۰۰ کاراکتر)"
            type="text"
            id="description"
            {...register("description", { required: "پر کردن فیلد توضیحات اجباری است" })}
          />
          <p className="error">{errors.description?.message}</p>
        </div>

        <div className="mt-2">
          <span className="text-[#404040] text-[14px] font-xbold">امکانات</span>
          {loading ? (
            <p>در حال بارگذاری امکانات...</p>
          ) : error ? (
            <p className="text-red-500">خطا: {error}</p>
          ) : (
            <div className="grid grid-cols-5 gap-x-6 gap-y-2 mt-2">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F9F9F9] border border-[#000000] border-dashed rounded-xl flex items-center justify-between py-[5px] px-2"
                >
                  <span className="text-[#0C0C0C] font-xregular text-[12px]">{item.title}</span>
                  <input
                    type="checkbox"
                    className="toggle border-none bg-white [--tglbg:#CBCBCB] hover:[--tglbg:#44C0ED]"
                    onChange={() => handleFeatureChange(item.title)}
                    checked={selectedFeatures.includes(item.title)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-[#404040] text-[14px] font-xbold mt-8">تخفیف‌ها</h1>
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="flex items-center bg-[#253359] text-white font-xmedium text-[14px] py-[9.5px] px-4 rounded-lg mt-2"
          >
            <IoAddCircleOutline /> افزودن تخفیف جدید
          </button>
          <div className="flex items-center w-full gap-6 mt-4">
            {Object.entries(discounts).map(([day, percentage], index) => (
              <div
                key={index}
                className="flex items-center justify-between text-[12px] text-[#0C0C0C] font-xregular px-2 py-[4px] w-full max-w-[131px] rounded-lg border border-[#000000]"
              >
                <span>{day} رزرو</span>
                <span>{percentage}%</span>
                <LuTrash2 className="h-[22px] w-[22px] text-[#E9594C]" />
              </div>
            ))}
          </div>
        </div>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box py-8 w-full max-w-[400px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute left-3 top-3">✕</button>
            </form>
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(addDiscount)}
            >
              <div className="w-full">
                <label className="text-[14px] font-xbold text-[#202020]" htmlFor="reserv">
                  تعداد رزرو
                </label>
                <input
                  type="text"
                  className="border border-[#CBCBCB] rounded-lg py-[12px] px-3 mt-2 w-full"
                  placeholder="تعداد رزرو را وارد نمایید"
                  {...register("reserv")} // حذف شرط required
                />
                <p className="error">{errors.reserv?.message}</p>
              </div>
              <div className="w-full mt-4">
                <label className="text-[14px] font-xbold text-[#202020]" htmlFor="discount">
                  درصد تخفیف
                </label>
                <input
                  type="text"
                  className="border border-[#CBCBCB] rounded-lg py-[12px] px-3 mt-2 w-full"
                  placeholder="درصد تخفیف را وارد نمایید"
                  {...register("discount")} // بدون شرط required
                />
              </div>
              <button
                type="submit"
                className="bg-[#253359] text-white text-[16px] font-xmedium py-3 px-[119.5px] w-full rounded-[8px] mt-4"
              >
                افزودن تخفیف
              </button>
            </form>
          </div>
        </dialog>

        <div className="flex flex-col gap-[6px] w-full mt-3">
          <label className="text-[14px] font-xbold text-[#404040]" htmlFor="rules">
            قوانین و مقررات
          </label>
          <input
            className="placeholder-[#868686] font-xregular text-[14px] py-[10px] px-3 rounded-lg border border-[#CBCBCB]"
            placeholder="قوانین و مقررات فضا را اینجا بنویسید"
            type="text"
            id="rules"
            {...register("rules", { required: "پر کردن فیلد قوانین اجباری است" })}
          />
          <p className="error">{errors.rules?.message}</p>
        </div>

        <div className="flex items-center justify-between mt-1 w-full gap-8">
          <div className="flex flex-col w-full max-w-[216px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#404040]" htmlFor="fromTime">
              از ساعت
            </label>
            <input
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] font-xregular text-[14px] text-[#868686]"
              placeholder="ساعت شروع"
              type="text"
              id="fromTime"
              {...register("fromTime", { required: "پر کردن ساعت شروع اجباری است" })}
            />
            <p className="error">{errors.fromTime?.message}</p>
          </div>
          <div className="flex flex-col w-full max-w-[216px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#404040]" htmlFor="toTime">
              تا ساعت
            </label>
            <input
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] font-xregular text-[14px] text-[#868686]"
              placeholder="ساعت پایان"
              type="text"
              id="toTime"
              {...register("toTime", { required: "پر کردن ساعت پایان اجباری است" })}
            />
            <p className="error">{errors.toTime?.message}</p>
          </div>
          <div className="flex flex-col w-full max-w-[216px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#202020]" htmlFor="space">
              ظرفیت
            </label>
            <input
              className="placeholder-[#868686] font-xregular text-[14px] py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
              placeholder="ظرفیت وارد نمایید"
              type="text"
              id="space"
              {...register("space", { required: "پر کردن فیلد ظرفیت اجباری است" })}
            />
            <p className="error">{errors.space?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-[6px] w-full mt-3">
          <label className="text-[14px] font-xbold text-[#404040]" htmlFor="details">
            توضیحات کامل با جزییات
          </label>
          <input
            className="placeholder-[#868686] font-xregular text-[14px] py-[10px] px-3 rounded-lg border border-[#CBCBCB]"
            placeholder="توضیحات فضا را اینجا بنویسید"
            type="text"
            id="details"
            {...register("details", { required: "پر کردن فیلد توضیحات اجباری است" })}
          />
          <p className="error">{errors.details?.message}</p>
        </div>

        <div className="flex items-center justify-between mt-3 w-full gap-8">
          <div className="flex flex-col w-full max-w-[216px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#404040]" htmlFor="additionalProp1">
              ویژگی اضافی ۱
            </label>
            <input
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] font-xregular text-[14px] text-[#868686]"
              placeholder="ویژگی اضافی ۱"
              type="text"
              id="additionalProp1"
              {...register("additionalProp1")}
            />
          </div>
          <div className="flex flex-col w-full max-w-[216px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#404040]" htmlFor="additionalProp2">
              ویژگی اضافی ۲
            </label>
            <input
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] font-xregular text-[14px] text-[#868686]"
              placeholder="ویژگی اضافی ۲"
              type="text"
              id="additionalProp2"
              {...register("additionalProp2")}
            />
          </div>
          <div className="flex flex-col w-full max-w-[216px] gap-[6px]">
            <label className="text-[14px] font-xbold text-[#404040]" htmlFor="additionalProp3">
              ویژگی اضافی ۳
            </label>
            <input
              className="border border-[#CBCBCB] rounded-[8px] px-3 py-[11.5px] font-xregular text-[14px] text-[#868686]"
              placeholder="ویژگی اضافی ۳"
              type="text"
              id="additionalProp3"
              {...register("additionalProp3")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 w-full gap-16">
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center py-[11.5px] w-full"
          >
            <input {...getInputProps()} />
            <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
              <GrAttachment /> برای افزودن عکس فضا کلیک نمایید
            </p>
          </div>
          <button
            type="submit"
            className="bg-[#253359] text-white w-full py-[12px] rounded-lg font-xmedium text-[16px]"
          >
            تایید و افزودن فضا
          </button>
        </div>
      </form>
    </div>
  );
}