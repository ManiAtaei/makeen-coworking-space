"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { FieldErrors, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Pagination from "./Pagination";

interface FeatureData {
  Feature: string;
  Icon: string;
  enabled?: boolean;
}

interface dataType {
  feature: string;
}

const Features = () => {
  const [loginError, setLoginError] = useState("");
  const [features, setFeatures] = useState<FeatureData[]>([]);
  const fileRef = useRef<File | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // تعداد کاربران در هر صفحه
  const [totalUsers, setTotalUsers] = useState<number>(0); // تعداد کل کاربران

  const form = useForm<dataType>({});
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = form;

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get<FeatureData[]>(
          "https://109.230.200.230:7890/api/v1/Admins/Reservation-Spaces/Features",
          {
            withCredentials: true,
          }
        );

        console.log("خروجی API امکانات:", response.data);

        const formattedFeatures = response.data.map((item) => ({
          Feature: item.Feature,
          Icon: item.Icon,
          enabled: true,
        }));

        setFeatures(formattedFeatures);
        setTotalUsers(formattedFeatures.length); // تنظیم تعداد کل آیتم‌ها
      } catch (error) {
        console.error(
          "خطا در دریافت امکانات:",
          error.response?.data || error.message
        );
        setLoginError("خطا در دریافت امکانات از سرور");
      }
    };

    fetchFeatures();
  }, []);

  const onSubmit = async (data: dataType) => {
    try {
      if (!fileRef.current) {
        setLoginError("لطفاً یک فایل آیکون انتخاب کنید");
        return;
      }

      const formData = new FormData();
      formData.append("icon", fileRef.current);

      const response = await axios.post(
        `https://109.230.200.230:7890/api/v1/Admins/Reservation-Spaces/Features?feature=${encodeURIComponent(
          data.feature
        )}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200 || response.status === 201) {
        setLoginError("ویژگی با موفقیت اضافه شد");

        const reader = new FileReader();
        reader.readAsDataURL(fileRef.current);
        reader.onloadend = () => {
          const newFeatures = [
            ...features,
            {
              Feature: data.feature,
              Icon: reader.result as string,
              enabled: true,
            },
          ];
          setFeatures(newFeatures);
          setTotalUsers(newFeatures.length); // بروزرسانی تعداد کل آیتم‌ها
        };

        document.getElementById("my_modal_10")?.close();
        reset(); // پاک کردن فرم
        fileRef.current = null; // پاک کردن فایل انتخاب شده
      }
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      setLoginError(
        error.response?.data?.message ||
          (error.response?.status === 401
            ? "احراز هویت ناموفق. لطفاً با بک‌اند هماهنگ کنید."
            : error.response?.status === 400
            ? "درخواست نامعتبر است. لطفاً ورودی‌ها را بررسی کنید."
            : "خطا در ارسال درخواست")
      );
    }
  };

  // حذف یک ویژگی
  const handleDeleteFeature = async (featureIndex: number) => {
    try {
      const featureToDelete = features[featureIndex];
      
      // فرض می‌کنیم API حذف امکان وجود دارد
      // در صورت نبود این API، این بخش را کامنت کنید
      /*
      await axios.delete(
        `https://109.230.200.230:7890/api/v1/Admins/Reservation-Spaces/Features/${encodeURIComponent(
          featureToDelete.Feature
        )}`,
        {
          withCredentials: true,
        }
      );
      */
      
      // حذف از لیست محلی
      const updatedFeatures = [...features];
      updatedFeatures.splice(featureIndex, 1);
      setFeatures(updatedFeatures);
      setTotalUsers(updatedFeatures.length);
      
      setLoginError("ویژگی با موفقیت حذف شد");
    } catch (error) {
      console.error("خطا در حذف ویژگی:", error.response?.data || error.message);
      setLoginError("خطا در حذف ویژگی");
    }
  };

  // تغییر وضعیت فعال/غیرفعال یک ویژگی
  const handleToggleFeature = (featureIndex: number) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].enabled = !updatedFeatures[featureIndex].enabled;
    setFeatures(updatedFeatures);
    
    // در صورت نیاز به ارسال به API
    /*
    const feature = updatedFeatures[featureIndex];
    axios.put(
      `https://109.230.200.230:7890/api/v1/Admins/Reservation-Spaces/Features/${encodeURIComponent(
        feature.Feature
      )}/toggle`,
      { enabled: feature.enabled },
      {
        withCredentials: true,
      }
    );
    */
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onErrorHandler = (error: FieldErrors<dataType>) => {
    console.log(error);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles) => {
      fileRef.current = acceptedFiles[0];
    },
  });

  // محاسبه امکانات مربوط به صفحه فعلی
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, features.length);
  const currentFeatures = features.slice(startIndex, endIndex);

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen lg:rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        امکانات
      </h1>
      <div className="flex justify-end">
        <button
          onClick={() => document.getElementById("my_modal_10")?.showModal()}
          className="bg-[#253359] text-[16px] font-xmedium flex items-center justify-center gap-2 text-white w-[300px] py-3 rounded-lg mt-6"
        >
          <GoPlusCircle className="w-6 h-6" />
          افزودن امکان جدید
        </button>
      </div>

      {loginError && (
        <p className="text-red-500 text-[12px] mt-4">{loginError}</p>
      )}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {currentFeatures.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-[19px] pr-8 pl-4 bg-[#F4F5FC] rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 text-[#253359]">
              <img
                src={item.Icon}
                alt={item.Feature}
                className="w-6 h-6 object-cover"
                loading="lazy"
              />
              <span className="text-right text-[#202020] font-xregular text-[14px]">
                {item.Feature}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="toggle border-none bg-white [--tglbg:#CBCBCB] hover:[--tglbg:#44C0ED] hover:bg-white"
                checked={item.enabled}
                onChange={() => handleToggleFeature(startIndex + index)}
              />
              <button 
                className="text-gray-400"
                onClick={() => handleDeleteFeature(startIndex + index)}
              >
                <LuTrash2 className="w-[22px] h-[22px] text-[#ADADAD]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <dialog id="my_modal_10" className="modal w-full max-w-[400px] mx-auto">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2"
              onClick={() => {
                document.getElementById("my_modal_10")?.close();
                reset();
                fileRef.current = null;
              }}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
            <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
              <div className="flex flex-col gap-[6px] w-full mt-3">
                <label
                  className="text-[14px] font-xbold text-[#404040]"
                  htmlFor="feature"
                >
                  عنوان امکان
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] mt-1 md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB]"
                  placeholder="نام امکان را وارد نمایید"
                  type="text"
                  id="feature"
                  {...register("feature", {
                    required: "پر کردن فیلد عنوان اجباری است",
                  })}
                />
                <p className="error text-red-500">{errors.feature?.message}</p>
              </div>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#44C0ED] bg-[#ECF9FD] rounded-lg cursor-pointer flex justify-center mt-4 lg:mt-6 py-[11.5px] w-full"
              >
                <input {...getInputProps()} />
                {fileRef.current ? (
                  <p className="text-green-500">{fileRef.current.name}</p>
                ) : (
                  <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                    <GrAttachment /> برای افزودن آیکون امکان جدید کلیک نمایید
                  </p>
                )}
              </div>
              {loginError && (
                <p className="text-red-500 text-[12px]">{loginError}</p>
              )}
              <button
                type="submit"
                className="text-white bg-[#253359] text-[14px] font-xmedium py-[9.5px] w-full rounded-lg mt-6"
              >
                افزودن امکان
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex items-center mt-[35px] w-full">
        <Pagination
          currentPage={currentPage}
          totalItems={totalUsers}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Features;