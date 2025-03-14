"use client";
import React, { useState, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE_URL = "https://109.230.200.230:7890/api/v1";

interface FormType {
  call: string;
  security: string;
  captchaCode: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
  httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
});

export default function Login({ setStep }) {
  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<FormType>({
    defaultValues: {
      call: "",
      security: "",
      captchaCode: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setValue,
    watch,
  } = form;

  const phoneNumber = watch("call");

  const extractCaptchaId = (errorResponse: any): string | null => {
    try {
      console.log("استخراج CaptchaID از پاسخ:", errorResponse);
      const paths = [
        errorResponse?.error?.Content?.CaptchaID,
        errorResponse?.Content?.CaptchaID,
        errorResponse?.data?.Content?.CaptchaID,
        errorResponse?.response?.data?.Content?.CaptchaID,
        errorResponse?.response?.data?.content?.CaptchaID,
        errorResponse?.response?.data?.captchaID,
        errorResponse?.response?.data?.CaptchaID,
      ];

      for (const path of paths) {
        if (path) {
          console.log("CaptchaID پیدا شد:", path);
          return path;
        }
      }
      console.warn("CaptchaID پیدا نشد");
      return null;
    } catch (e) {
      console.error("خطا در استخراج CaptchaID:", e);
      return null;
    }
  };

  const fetchCaptchaId = async (data: FormType) => {
    if (loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      console.log("مرحله 1 - درخواست ورود با شماره:", data.call);
      const response = await api.get("/Auth/Login", {
        params: { PhoneNumber: data.call, Password: data.security },
      });
      console.log("مرحله 1 - پاسخ API کامل:", JSON.stringify(response.data, null, 2));

      // بررسی پیام موفقیت از API
      if (response.data?.message === "You are now logged in.") {
        console.log("ورود موفقیت‌آمیز بدون کپچا");
        const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
        if (modal) modal.close();
        router.push("/");
        return;
      }

      const captchaData = extractCaptchaId(response.data);
      if (captchaData) {
        setCaptchaId(captchaData);
        setCurrentStep(2);
      } else {
        throw new Error("CaptchaID در پاسخ پیدا نشد");
      }
    } catch (error) {
      console.error("خطا در مرحله 1:", error);
      if (error.response?.status === 428) {
        const captchaData = extractCaptchaId(error.response.data);
        if (captchaData) {
          setCaptchaId(captchaData);
          setCurrentStep(2);
        } else {
          setErrorMessage("خطا در دریافت کپچا، لطفاً دوباره تلاش کنید.");
        }
      } else {
        setErrorMessage(
          error.response?.data?.message || "خطا در ورود، لطفاً دوباره تلاش کنید."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCaptchaImage = async () => {
    if (!captchaId || !phoneNumber) {
      console.log("captchaId یا phoneNumber موجود نیست:", { captchaId, phoneNumber });
      return;
    }

    try {
      const response = await api.get("/Auth/Captcha", {
        params: { phone: phoneNumber, id: captchaId },
        responseType: "blob",
        timeout: 15000,
      });
      const imageUrl = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
      setCaptchaImage(imageUrl);
      console.log("تصویر کپچا با موفقیت دریافت شد");
    } catch (error) {
      console.error("خطا در دریافت تصویر کپچا:", error);
      setCaptchaImage(null);
    }
  };

  const submitWithCaptcha = async (data: FormType) => {
    if (loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      console.log("مرحله 2 - ارسال با کپچا:", {
        PhoneNumber: data.call,
        Password: data.security,
        CaptchaId: captchaId,
        CaptchaCode: data.captchaCode,
      });

      const response = await api.get("/Auth/Login", {
        params: {
          PhoneNumber: data.call,
          Password: data.security,
          CaptchaId: captchaId || "placeholder-if-missing",
          CaptchaCode: data.captchaCode || "0000",
        },
      });

      console.log("مرحله 2 - پاسخ API کامل:", JSON.stringify(response.data, null, 2));

      // بررسی پیام موفقیت از API
      if (response.data?.message === "You are now logged in.") {
        console.log("ورود موفقیت‌آمیز با کپچا");
        const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
        if (modal) modal.close();
        router.push("/admin-panel");
      } else {
        throw new Error("ورود ناموفق - پاسخ API موفقیت‌آمیز نبود");
      }
    } catch (error) {
      console.error("خطا در ورود با کپچا:", error);
      if (error.response?.status === 428) {
        const newCaptchaId = extractCaptchaId(error.response.data);
        if (newCaptchaId) {
          setCaptchaId(newCaptchaId);
          fetchCaptchaImage();
          setErrorMessage("کپچا اشتباه است، لطفاً دوباره تلاش کنید.");
        } else {
          setErrorMessage("خطا در تأیید کپچا، لطفاً دوباره تلاش کنید.");
        }
      } else {
        setErrorMessage(
          error.response?.data?.message || "خطا در ورود، لطفاً دوباره تلاش کنید."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: FormType) => {
    console.log("فرم سابمیت شد - مرحله فعلی:", currentStep);
    if (currentStep === 1) {
      fetchCaptchaId(data);
    } else if (currentStep === 2) {
      submitWithCaptcha(data);
    }
  };

  const onErrorHandler = (errors: FieldErrors<FormType>) => {
    console.log("خطاهای فرم:", errors);
    if (currentStep === 1) {
      fetchCaptchaId(getValues() as FormType);
    }
  };

  useEffect(() => {
    if (currentStep === 2 && captchaId && phoneNumber) {
      console.log("مرحله 2 - دریافت تصویر کپچا");
      fetchCaptchaImage();
    }
  }, [currentStep, captchaId, phoneNumber]);

  useEffect(() => {
    return () => {
      if (captchaImage) URL.revokeObjectURL(captchaImage);
    };
  }, [captchaImage]);

  const handleRefreshCaptcha = () => {
    if (captchaId && phoneNumber) fetchCaptchaImage();
    else fetchCaptchaId(getValues() as FormType);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setCaptchaId(null);
    setCaptchaImage(null);
    setValue("captchaCode", "");
  };

  return (
    <div className="pl-7 pr-5 max-w-[600px] mx-auto flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <img src="/login/imageLogin/logo-makeen.svg" alt="logo makeen" />
        <h1 className="font-xbold text-[18px] mt-5"> ورود به مکین </h1>
        <span className="text-[14px] font-xregular mt-2 flex items-center">
          برای ورود
          <span className="hidden mobileNum:block px-[5px]">به مکین</span>
          شماره همراه خود را وارد نمایید.
        </span>
        <div className="w-full max-w-[408px]">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-3 text-[14px]">
              {errorMessage}
            </div>
          )}

          <form
            className="flex flex-col items-center"
            noValidate
            onSubmit={handleSubmit(onSubmit, onErrorHandler)}
          >
            {currentStep === 1 && (
              <>
                <div className="w-full">
                  <input
                    type="tel"
                    className="border border-[#CBCBCB] rounded-lg py-[12px] px-3 mt-5 placeholder:text-[#868686] text-[14.675px] font-xregular w-full text-left"
                    placeholder="09xxxxxxxx"
                    {...register("call", {
                      required: " لطفا شماره موبایل خود را وارد نمایید ",
                      pattern: {
                        value: /^09\d{9}$/,
                        message: "لطفا یک شماره موبایل معتبر وارد کنید",
                      },
                    })}
                  />
                  {errors.call && (
                    <span className="text-[#E9594C] text-[12px] font-xregular">
                      {errors.call.message}
                    </span>
                  )}
                </div>
                <div className="w-full mt-9">
                  <input
                    type="password"
                    className="border border-[#CBCBCB] rounded-lg py-[12px] px-3 placeholder:text-[#868686] text-[14.675px] font-xregular w-full"
                    placeholder=" کلمه عبور خود را وارد کنید "
                    {...register("security", {
                      required: " کلمه عبور به درستی وارد نشده ",
                    })}
                  />
                  {errors.security && (
                    <span className="text-[#E9594C] text-[12px] font-xregular">
                      {errors.security.message}
                    </span>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="w-full mt-5">
                <div className="flex items-center mb-4">
                  <button
                    type="button"
                    onClick={handleBackToStep1}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span className="mr-1">بازگشت</span>
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  {captchaImage ? (
                    <img
                      src={captchaImage}
                      alt="کپچا"
                      className="border rounded-lg h-16 w-full"
                      onError={() => setCaptchaImage(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-16 bg-gray-100 rounded-lg">
                      <p>در حال بارگذاری تصویر کپچا...</p>
                    </div>
                  )}
                  
                </div>
                <input
                  type="text"
                  className="border border-[#CBCBCB] rounded-lg py-[12px] px-3 placeholder:text-[#868686] text-[14.675px] font-xregular w-full"
                  placeholder="کد کپچا را وارد کنید"
                  {...register("captchaCode")}
                />
              </div>
            )}

            <span className="text-[14px] font-xregular text-[#0C0C0C] mt-12">
              پسورد خود را فراموش کرده اید؟
              <button
                onClick={() => setStep(3)}
                type="button"
                className="text-[16px] font-xbold text-[#44C0ED] pr-2"
              >
                بازیابی رمز عبور
              </button>
            </span>
            <span className="text-[14px] font-xregular text-[#0C0C0C] mt-5">
              هنوز ثبت نام نکرده اید؟
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-[16px] font-xbold text-[#44C0ED] pr-2"
              >
                عضویت در مکین
              </button>
            </span>
            <button
              type="submit"
              className={`bg-[#253359] text-white text-[16px] font-xmedium py-3 px-[119.5px] w-full rounded-[8px] mt-5 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "در حال پردازش..." : currentStep === 1 ? "ادامه" : "ورود"}
            </button>
          </form>
        </div>
        <p className="text-center text-[14px] font-xregular mt-5">
          ورود و ثبت‌نام در مکین به منزله پذیرفتن تمامی
          <span className="font-xbold text-[#4073D0]"> قوانین و مقررات </span> می‌باشد
        </p>
      </div>
    </div>
  );
}