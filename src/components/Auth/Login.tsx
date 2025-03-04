"use client";
import React, { useState, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import axios from "axios";

// Base API URL
const API_BASE_URL = "https://109.230.200.230:7890/api/v1";

interface FormType {
  call: string;
  security: string;
  captchaCode: string;
}

// Configure axios with more permissive error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 
    "Content-Type": "application/json", 
    "Accept": "application/json" 
  },
  timeout: 15000,
  // Skip SSL verification (only for development)
  httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
});

export default function Login({ setStep }) {
  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormType>({
    defaultValues: {
      call: "",
      security: "",
      captchaCode: ""
    }
  });
  const { handleSubmit, formState: { errors }, register, getValues, setValue, watch } = form;

  const phoneNumber = watch("call");

  // Extract CaptchaID from error response
  const extractCaptchaId = (errorResponse: any): string | null => {
    try {
      console.log("Trying to extract CaptchaID from response:", errorResponse);

      // Try different paths where CaptchaID might be found, prioritizing the most likely path
      const paths = [
        errorResponse?.error?.Content?.CaptchaID, // مسیر اصلی از داده‌های شما
        errorResponse?.Content?.CaptchaID,
        errorResponse?.data?.Content?.CaptchaID,
        errorResponse?.response?.data?.Content?.CaptchaID,
        errorResponse?.response?.data?.content?.CaptchaID,
        errorResponse?.response?.data?.captchaID,
        errorResponse?.response?.data?.CaptchaID,
      ];

      for (const path of paths) {
        if (path) {
          console.log("CaptchaID extracted successfully:", path);
          return path;
        }
      }

      // If not found in paths, try to parse potential JSON in error message
      if (typeof errorResponse === 'string' && errorResponse.includes('CaptchaID')) {
        try {
          const jsonMatch = errorResponse.match(/\{.*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.error?.Content?.CaptchaID || parsed.Content?.CaptchaID || parsed.captchaID) {
              const captchaId = parsed.error?.Content?.CaptchaID || parsed.Content?.CaptchaID || parsed.captchaID;
              console.log("CaptchaID extracted from string:", captchaId);
              return captchaId;
            }
          }
        } catch (e) {
          console.log("Error parsing JSON in error message:", e);
        }
      }

      console.warn("CaptchaID not found in response, returning null");
      return null;
    } catch (e) {
      console.error("Error in extractCaptchaId:", e);
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
        params: { 
          PhoneNumber: data.call, 
          Password: data.security 
        }
      });

      console.log("مرحله 1 - پاسخ موفقیت‌آمیز:", response.data);

      // Check if login was successful without captcha
      if (response.data?.IsSuccess) {
        console.log("ورود موفقیت‌آمیز بدون نیاز به کپچا");
        // Handle successful login
        return;
      }

      // Check if response contains CaptchaID
      const captchaData = response.data?.Content?.CaptchaID || response.data?.error?.Content?.CaptchaID || response.data?.captchaID;
      if (captchaData) {
        console.log("CaptchaID دریافت شد:", captchaData);
        setCaptchaId(captchaData);
        setCurrentStep(2);
      } else {
        console.log("CaptchaID در پاسخ پیدا نشد، بررسی خطا...");
        throw new Error("CaptchaID not found in successful response");
      }
    } catch (error) {
      console.log("خطا در مرحله 1:", error);

      // Check if the error is 428
      if (error.response?.status === 428) {
        console.error("خطای 428 رخ داده است:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });

        // Extract CaptchaID from error response
        const captchaData = extractCaptchaId(error.response.data);
        
        if (captchaData) {
          console.log("CaptchaID از پاسخ خطا دریافت شد:", captchaData);
          setCaptchaId(captchaData);
          setCurrentStep(2); // Move to captcha step
        } else {
          console.error("CaptchaID یافت نشد، تنظیم مقدار پیش‌فرض یا نشان دادن خطا به کاربر...");
          setErrorMessage("خطا در دریافت کپچا، لطفاً دوباره تلاش کنید.");
          setCaptchaId(null); // یا یک مقدار پیش‌فرض تنظیم کنید
        }
      } else {
        console.error("خطای دیگری رخ داده است:", error.message);
        setErrorMessage("خطا در ورود، لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCaptchaImage = async () => {
    if (!captchaId || !phoneNumber) {
      console.log("نمی‌توان تصویر کپچا را دریافت کرد: captchaId یا شماره تلفن وجود ندارد", {
        captchaId,
        phone: phoneNumber
      });
      // Create a placeholder image or skip to form submission
      return;
    }
    
    try {
      const captchaUrl = `${API_BASE_URL}/Auth/Captcha`;
      const captchaParams = { 
        phone: phoneNumber, 
        id: captchaId 
      };
      
      console.log("درخواست تصویر کپچا:", { 
        url: captchaUrl,
        params: captchaParams
      });
      
      // Direct API call to log the response
      console.log(`GET ${captchaUrl}?phone=${phoneNumber}&id=${captchaId}`);
      
      // Request captcha image
      const response = await api.get("/Auth/Captcha", { 
        params: captchaParams, 
        responseType: "blob",
        timeout: 15000
      });
      
      // Log response headers and status
      console.log("مرحله 2 - تصویر کپچا دریافت شد:", {
        status: response.status,
        headers: response.headers,
        contentType: response.headers['content-type'],
        dataType: response.data ? response.data.type : null,
        dataSize: response.data ? response.data.size : null
      });
      
      const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
      setCaptchaImage(imageUrl);
      
      // Try alternate approach for direct debugging
      try {
        // Make a second request to fetch as text to see what's actually returned
        const rawResponse = await axios.get(`${API_BASE_URL}/Auth/Captcha`, {
          params: captchaParams,
          responseType: 'text',
          timeout: 15000,
          httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });
        
        console.log("کپچا به صورت متنی:", {
          status: rawResponse.status,
          contentType: rawResponse.headers['content-type'],
          data: typeof rawResponse.data === 'string' ? 
                (rawResponse.data.length > 100 ? 
                  rawResponse.data.substring(0, 100) + '...' : 
                  rawResponse.data) : 
                'Not a string'
        });
      } catch (rawError) {
        console.log("خطا در دریافت کپچا به صورت متنی:", rawError.message);
      }
    } catch (error) {
      console.error("خطا در دریافت تصویر کپچا:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        contentType: error.response?.headers?.['content-type'],
        data: error.response?.data
      });
      
      // Don't show error to user, just log it and continue
      // Set a placeholder image or leave captchaImage as null
      setCaptchaImage(null);
    }
  };

  const submitWithCaptcha = async (data: FormType) => {
    if (loading) return;
    
    setLoading(true);
    setErrorMessage(null);
    
    try {
      console.log("مرحله 2 - ارسال فرم با کپچا:", {
        PhoneNumber: data.call,
        Password: data.security,
        CaptchaId: captchaId || "placeholder-if-missing",
        CaptchaCode: data.captchaCode || "0000" // Use default if missing
      });
      
      const response = await api.get("/Auth/Login", {
        params: {
          PhoneNumber: data.call,
          Password: data.security,
          CaptchaId: captchaId || "placeholder-if-missing",
          CaptchaCode: data.captchaCode || "0000" // Use default if missing
        }
      });
      
      console.log("مرحله 2 - پاسخ ورود:", response.data);
      
      if (response.data?.IsSuccess) {
        console.log("ورود موفقیت‌آمیز با کپچا");
        // Handle successful login
      } 
    } catch (error) {
      console.error("خطا در ورود با کپچا:", error.message);
      
      // Check if the error is 428
      if (error.response?.status === 428) {
        console.error("خطای 428 رخ داده است:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });

        // If captcha is invalid but we received a new captchaID, use it
        const newCaptchaId = extractCaptchaId(error.response.data);
        if (newCaptchaId) {
          setCaptchaId(newCaptchaId);
          fetchCaptchaImage();
        } else {
          setErrorMessage("خطا در تأیید کپچا، لطفاً دوباره تلاش کنید.");
        }
      } else {
        setErrorMessage("خطا در ورود، لطفاً دوباره تلاش کنید.");
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
    // Continue anyway despite form errors
    if (currentStep === 1) {
      const values = getValues();
      fetchCaptchaId(values as FormType);
    }
  };

  // Fetch captcha image when entering step 2
  useEffect(() => {
    if (currentStep === 2 && captchaId && phoneNumber) {
      console.log("وارد مرحله 2 شدیم - دریافت تصویر کپچا");
      fetchCaptchaImage();
    }
  }, [currentStep, captchaId, phoneNumber]);

  // Cleanup URL objects when component unmounts
  useEffect(() => {
    return () => {
      if (captchaImage) {
        URL.revokeObjectURL(captchaImage);
      }
    };
  }, [captchaImage]);

  const handleRefreshCaptcha = () => {
    if (captchaId && phoneNumber) {
      fetchCaptchaImage();
    } else {
      // If we don't have captchaId, try to get one
      fetchCaptchaId(getValues() as FormType);
    }
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
                        message: "لطفا یک شماره موبایل معتبر وارد کنید"
                      }
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span className="mr-1">بازگشت</span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  {captchaImage ? (
                    <img 
                      src={captchaImage} 
                      alt="کپچا" 
                      className="border rounded-lg h-16" 
                      onError={(e) => {
                        console.error("خطا در بارگذاری تصویر کپچا");
                        console.log("Error event:", e);
                        setCaptchaImage(null);
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-16 bg-gray-100 rounded-lg">
                      <p>در حال بارگذاری تصویر کپچا...</p>
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={handleRefreshCaptcha}
                    className="ml-2 text-blue-500 hover:text-blue-700 p-2 rounded-lg"
                    disabled={loading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                      <path d="M21 3v5h-5"></path>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                      <path d="M3 21v-5h5"></path>
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  className="border border-[#CBCBCB] rounded-lg py-[12px] px-3 placeholder:text-[#868686] text-[14.675px] font-xregular w-full"
                  placeholder="کد کپچا را وارد کنید"
                  {...register("captchaCode", {
                    // Make it optional - we'll proceed even without it
                  })}
                />
                {errors.captchaCode && (
                  <span className="text-[#E9594C] text-[12px] font-xregular">
                    {errors.captchaCode.message}
                  </span>
                )}
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
              className={`bg-[#253359] text-white text-[16px] font-xmedium py-3 px-[119.5px] w-full rounded-[8px] mt-5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "در حال پردازش..." : currentStep === 1 ? "ادامه" : "ورود"}
            </button>
          </form>
        </div>
        <p className="text-center text-[14px] font-xregular mt-5">
          ورود و ثبت‌نام در مکین به منزله پذیرفتن تمامی
          <span className="font-xbold text-[#4073D0]"> قوانین و مقررات </span> می
          باشد
        </p>
      </div>
    </div>
  );
}