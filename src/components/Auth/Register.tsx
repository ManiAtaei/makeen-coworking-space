"use client";
import React, { useState, useEffect } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { FieldErrors, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { GrAttachment } from "react-icons/gr";
import axios from "axios";
import https from "https";

// تنظیم axios برای نادیده گرفتن خطاهای SSL
const axiosInstance = axios.create({
  baseURL: "https://109.230.200.230:7890/api/v1",
  timeout: 15000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export default function Register() {
  interface FormData {
    FirstName: string;
    LastName: string;
    Password: string;
    tryPass: string;
    NationalCode: string;
    Email: string;
    BirthDate?: string;
    PhoneNumber: string;
    CaptchaCode: string;
    code?: string;
    Gender: boolean;
    NationalCardPhoto: File | null;
  }

  const form = useForm<FormData>();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    getValues,
    setValue,
  } = form;

  const [file, setFile] = useState<File | null>(null);
  const [captchaId, setCaptchaId] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const phoneNumber = watch("PhoneNumber");

  const validateNationalCode = (value: string) => {
    if (!/^\d{10}$/.test(value)) return "کد ملی باید ۱۰ رقم باشد";
    return true;
  };

  const validateIranianMobile = (value: string) => {
    if (!/^09[0-9]{9}$/.test(value)) return "شماره موبایل معتبر نیست";
    return true;
  };

  const validatePasswordsMatch = (value: string) => {
    const password = watch("Password");
    if (value !== password) return "رمز عبور و تکرار آن باید یکسان باشند";
    return true;
  };

  const onErrorHandler = (errors: FieldErrors<FormData>) => {
    console.log(errors, "errors");
    setErrorMessage("لطفاً تمام فیلدهای اجباری را به درستی پر کنید.");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setValue("NationalCardPhoto", acceptedFiles[0]);
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]?.message;
      console.error("File upload rejected:", error);
      setErrorMessage(`آپلود فایل رد شد: ${error || "فایل نامعتبر است (فرمت یا حجم نامناسب)"}`);
    },
  });

  // دریافت captchaId با پر کردن فیلدهای اجباری
  const fetchCaptchaId = async () => {
    const requiredFields = {
      FirstName: watch("FirstName"),
      LastName: watch("LastName"),
      Password: watch("Password"),
      PhoneNumber: watch("PhoneNumber"),
      NationalCode: watch("NationalCode"),
      NationalCardPhoto: watch("NationalCardPhoto"),
    };

    if (!requiredFields.FirstName || !requiredFields.LastName || !requiredFields.Password ||
        !requiredFields.PhoneNumber || !requiredFields.NationalCode || !requiredFields.NationalCardPhoto) {
      setErrorMessage("لطفاً تمام فیلدهای اجباری را پر کنید.");
      return;
    }

    if (validateIranianMobile(requiredFields.PhoneNumber) !== true) {
      setErrorMessage("شماره تلفن معتبر نیست.");
      return;
    }

    if (validateNationalCode(requiredFields.NationalCode) !== true) {
      setErrorMessage("کد ملی معتبر نیست.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("FirstName", requiredFields.FirstName);
      formData.append("LastName", requiredFields.LastName);
      formData.append("Password", requiredFields.Password);
      formData.append("PhoneNumber", requiredFields.PhoneNumber);
      formData.append("NationalCode", requiredFields.NationalCode);
      formData.append("NationalCardPhoto", requiredFields.NationalCardPhoto!);

      const response = await axiosInstance.post("Auth/Register", formData);
      const newCaptchaId = response.data.captchaId || response.data.id;
      if (!newCaptchaId) {
        throw new Error("شناسه کپچا از سرور دریافت نشد.");
      }
      setCaptchaId(newCaptchaId);
      fetchCaptchaImage(newCaptchaId, requiredFields.PhoneNumber);
      setErrorMessage("");
    } catch (error) {
      console.error("خطا در دریافت captchaId:", error);
      setErrorMessage("خطا در دریافت کپچا: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // دریافت تصویر کپچا
  const fetchCaptchaImage = async (captchaId: string, phone: string) => {
    try {
      setLoading(true);
      const response = await  axios.get(`https://109.230.200.230:7890/api/v1/Auth/Captcha?phone=09937101060&id=92fc9e3f-4660-43a2-97be-4e1e3e568def`);
  
    console.log(response)
    } catch (error) {
      console.error("خطا در دریافت تصویر کپچا:", error);
      setErrorMessage("خطا در بارگذاری تصویر کپچا: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // رفرش کپچا
  const refreshCaptcha = () => {
    if (phoneNumber && captchaId) {
      fetchCaptchaImage(captchaId, phoneNumber);
    } else {
      fetchCaptchaId();
    }
  };

  // ارسال کد تأیید
  const sendVerificationCode = async () => {
    const phone = getValues("PhoneNumber");
    if (!phone || !validateIranianMobile(phone)) {
      setErrorMessage("لطفاً یک شماره موبایل معتبر وارد کنید.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/Auth/Captcha", {
        PhoneNumber: phone
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data && response.data.success) {
        setErrorMessage("");
        alert("کد تأیید به شماره موبایل شما ارسال شد.");
      } else {
        setErrorMessage(response.data?.message || "خطا در ارسال کد تأیید.");
      }
    } catch (error) {
      console.error("خطا در ارسال کد تأیید:", error);
      setErrorMessage("خطا در ارتباط با سرور: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // ارسال فرم
  const onSubmit = async (data: FormData) => {
    if (data.Password !== data.tryPass) {
      setErrorMessage("رمز عبور و تکرار آن باید یکسان باشند.");
      return;
    }

    if (!captchaId || !data.CaptchaCode) {
      setErrorMessage("لطفاً کد کپچا را وارد کنید و کپچا را دریافت کنید.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("FirstName", data.FirstName);
      formData.append("LastName", data.LastName);
      formData.append("Password", data.Password);
      formData.append("PhoneNumber", data.PhoneNumber);
      formData.append("NationalCode", data.NationalCode);
      formData.append("Email", data.Email || "");
      formData.append("BirthDate", data.BirthDate || "");
      formData.append("Gender", data.Gender.toString());
      formData.append("CaptchaId", captchaId);
      formData.append("CaptchaCode", data.CaptchaCode);
      formData.append("NationalCardPhoto", data.NationalCardPhoto!);

      const response = await axiosInstance.post("/Auth/Register", formData);
      if (response.data && response.data.success) {
        setRegistrationSuccess(true);
        setErrorMessage("");
        alert("ثبت‌نام با موفقیت انجام شد!");
      } else {
        setErrorMessage(response.data?.message || "خطا در ثبت‌نام.");
        refreshCaptcha(); // در صورت خطا، کپچا رو رفرش کن
      }
    } catch (error) {
      console.error("خطا در ثبت‌نام:", error);
      setErrorMessage("خطا در ثبت‌نام: " + (error.response?.data?.message || error.message));
      refreshCaptcha(); // در صورت خطا، کپچا رو رفرش کن
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 max-w-[500px] mx-auto md:max-w-[800px] flex flex-col justify-center">
      <span className="flex items-center text-[16px] font-xbold gap-[7px] mt-[-17px]">
        <BiSolidLeftArrow />
        فرم ثبت نام مکین
      </span>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {registrationSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">ثبت نام با موفقیت انجام شد!</span>
        </div>
      ) : (
        <div className="mt-4">
          <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {[
                { id: "FirstName", name: " نام ", field: " نام خود را وارد نمایید ", error: " پر کردن فیلد نام کاربر اجباری است " },
                { id: "LastName", name: " نام خانوادگی ", field: " نام خانوادگی خود را وارد نمایید ", error: " پر کردن فیلد نام خانوادگی اجباری است " },
                { id: "Password", name: " رمز عبور ", field: " پسورد خود را وارد نمایید ", error: " پر کردن فیلد رمز عبور اجباری است " },
                { id: "tryPass", name: " تکرار رمز عبور ", field: " تکرار رمز عبور را وارد نمایید ", error: " پر کردن فیلد تکرار رمز عبور اجباری است " },
                { id: "NationalCode", name: " کد ملی ", field: " کد ملی خود را وارد نمایید ", error: " پر کردن فیلد کد ملی اجباری است " },
              ].map((item) => (
                <div key={item.id} className="flex flex-col pt-2">
                  <label className="text-[14px] font-xbold text-[#202020]" htmlFor={item.id}>
                    {item.name}
                  </label>
                  <input
                    className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                    placeholder={item.field}
                    id={item.id}
                    type={item.id === "Password" || item.id === "tryPass" ? "password" : "text"}
                    {...register(item.id as keyof FormData, {
                      required: item.error,
                      validate: item.id === "NationalCode" 
                        ? validateNationalCode 
                        : item.id === "tryPass" 
                          ? validatePasswordsMatch 
                          : undefined,
                    })}
                  />
                  <p className="error text-red-500 text-sm mt-1">{errors[item.id as keyof FormData]?.message}</p>
                </div>
              ))}
              <div className="flex flex-col pt-2">
                <label className="text-[14px] font-xbold text-[#202020]" htmlFor="BirthDate">
                  تاریخ تولد
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                  placeholder=" تاریخ تولد خود را انتخاب نمایید "
                  type="date"
                  id="BirthDate"
                  {...register("BirthDate")}
                />
                <p className="error text-red-500 text-sm mt-1">{errors.BirthDate?.message}</p>
              </div>
              <div className="flex flex-col pt-2">
                <label className="text-[14px] font-xbold text-[#202020]" htmlFor="Email">
                  ایمیل شما
                </label>
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB]"
                  placeholder="ایمیل خود را وارد نمایید"
                  type="email"
                  id="Email"
                  {...register("Email", {
                    required: " در وارد کردن ایمیل خود دقت فرمایید ",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "فرمت ایمیل نامعتبر است",
                    },
                  })}
                />
                <p className="error text-red-500 text-sm mt-1">{errors.Email?.message}</p>
              </div>
              <div className="mt-4 md:mt-[4px]">
                <span className="text-[14px] font-xbold text-[#202020]">
                  آپلود تصویر کارت ملی
                </span>
                <div
                  {...getRootProps()}
                  className="border-dashed border-2 border-[#69CDF1] bg-[#F4F5FC] rounded-lg cursor-pointer flex justify-center mt-[5px] lg:mt-1 py-[11.5px] w-full"
                >
                  <input id="NationalCardPhoto" {...getInputProps()} />
                  {file ? (
                    <p className="text-green-500">{file.name}</p>
                  ) : (
                    <p className="text-[#253359] flex items-center text-[14px] font-xregular gap-[6px]">
                      <GrAttachment /> برای افزودن تصویر کارت ملی کلیک نمایید
                    </p>
                  )}
                </div>
                <p className="text-[12px] font-xregular text-red-500 mt-1">
                  {errors.NationalCardPhoto?.message || ""}
                </p>
                <span className="text-[12px] font-xregular text-[#868686]">
                  فرمت PNG یا JPG و حجم حداکثر ۵ مگابایت
                </span>
              </div>
              <div className="md:flex md:items-start mt-[-32px]">
                <div className="flex items-center gap-4 md:flex-col md:gap-[18px] md:items-start mt-10 md:mt-3">
                  <span className="text-[#202020] text-[14px] font-xbold">
                    جنسیت
                  </span>
                  <div className="flex items-center gap-[6px] text-[#202020] text-[14px] font-xregular">
                    <input
                      type="radio"
                      className="radio radio-info"
                      value="true"
                      defaultChecked
                      {...register("Gender", {
                        required: "انتخاب جنسیت الزامی است",
                      })}
                    />
                    آقا
                    <input
                      type="radio"
                      className="radio radio-info"
                      value="false"
                      {...register("Gender", {
                        required: "انتخاب جنسیت الزامی است",
                      })}
                    />
                    خانم
                  </div>
                  <p className="error text-red-500 text-sm mt-1">{errors.Gender?.message}</p>
                </div>
                <div className="flex flex-col mt-3 md:mr-8 w-full">
                  <label className="text-[14px] font-xbold text-[#202020]" htmlFor="PhoneNumber">
                    شماره همراه
                  </label>
                  <input
                    className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 mt-[5px] md:px-1 rounded-lg border w-full border-[#CBCBCB]"
                    placeholder=" شماره همراه خود را وارد نمایید"
                    type="text"
                    id="PhoneNumber"
                    {...register("PhoneNumber", {
                      required: "شماره همراه اجباری است",
                      validate: validateIranianMobile,
                    })}
                  />
                  <p className="error text-red-500 text-sm mt-1">{errors.PhoneNumber?.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-[10px] md:mt-[10px]">
                <div className="flex flex-col">
                  <label className="text-[14px] font-xbold text-[#202020] mb-2" htmlFor="CaptchaCode">
                    کد امنیتی
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB] w-full max-w-[121px]"
                      placeholder=" عبارت امنیتی "
                      type="text"
                      id="CaptchaCode"
                      {...register("CaptchaCode", {
                        required: "وارد کردن کپچا الزامی است",
                      })}
                    />
                    {captchaImage ? (
                      <div className="border border-gray-300 rounded-md overflow-hidden">
                        <img src={captchaImage} alt="کد امنیتی" className="h-10" />
                      </div>
                    ) : (
                      <div className="bg-gray-200 rounded-md h-10 w-20 flex items-center justify-center">
                        <span className="text-xs">{loading ? "در حال بارگیری..." : "خطا در بارگیری"}</span>
                      </div>
                    )}
                    <button 
                      type="button" 
                      className="text-blue-500 text-sm hover:text-blue-700"
                      onClick={refreshCaptcha}
                      disabled={loading}
                    >
                      {loading ? "..." : "بارگیری مجدد"}
                    </button>
                  </div>
                  <p className="error text-red-500 text-sm mt-1">{errors.CaptchaCode?.message}</p>
                </div>
              </div>
              <div className="flex flex-row w-full items-center mt-4 md:mt-0">
                <input
                  className="placeholder-[#868686] font-xregular text-[14px] py-[9.5px] md:py-[12.5px] rounded-r-lg border border-[#CBCBCB] w-full"
                  placeholder="  کد تأیید را وارد نمایید "
                  type="text"
                  id="code"
                  {...register("code")}
                />
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={loading}
                  className="bg-[#F4FFF9] text-[#227346] text-[10px] md:text-[12px] md:font-xmedium font-xregular py-[12px] md:py-[14px] w-full border rounded-l-md border-[#3BC377]"
                >
                  {loading ? "در حال ارسال..." : "ارسال کد تأیید شماره همراه"}
                </button>
                <p className="error text-red-500 text-sm mt-1">{errors.code?.message}</p>
              </div>
              <div className="md:max-w-[500px] md:w-full md:mx-auto mt-8 md:mt-0">
                <button
                //@ts-ignore
                onClick={fetchCaptchaImage}
                  // type="submit"
                  disabled={loading}
                  className="text-white bg-[#253359] w-full mt-4 md:mt-0 py-[13.5px] rounded-lg text-[14px] font-xmedium"
                >
                  {loading ? "در حال ثبت..." : "ثبت مشخصات و عضویت"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
// const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  // const [captchaId, setCaptchaId] = useState<string>("");
  // const phoneNumber = watch("phoneNumber");

  // const fetchCaptchaId = async () => {
  //   if (!phoneNumber || validateIranianMobile(phoneNumber) !== true) {
  //     alert("لطفاً یک شماره همراه معتبر وارد کنید.");
  //     return;
  //   }

  //   try {
  //     const formValues = getValues();
  //     const formData = new FormData();

  //     if (!formValues.firstName || formValues.firstName.trim() === "") {
  //       throw new Error("وارد کردن نام (FirstName) اجباری است و باید به انگلیسی باشد.");
  //     }
  //     formData.append("FirstName", formValues.firstName.trim());

  //     if (!formValues.lastName || formValues.lastName.trim() === "") {
  //       throw new Error("وارد کردن نام خانوادگی (LastName) اجباری است و باید به انگلیسی باشد.");
  //     }
  //     formData.append("LastName", formValues.lastName.trim());

  //     if (!formValues.password || formValues.password.trim() === "") {
  //       throw new Error("وارد کردن رمز عبور (Password) اجباری است.");
  //     }
  //     formData.append("Password", formValues.password.trim());

  //     if (!formValues.phoneNumber || formValues.phoneNumber.trim() === "") {
  //       throw new Error("وارد کردن شماره همراه (PhoneNumber) اجباری است.");
  //     }
  //     formData.append("PhoneNumber", formValues.phoneNumber.trim());

  //     if (!formValues.nationalCode || formValues.nationalCode.trim() === "") {
  //       throw new Error("وارد کردن کد ملی (NationalCode) اجباری است.");
  //     }
  //     formData.append("NationalCode", formValues.nationalCode.trim());

  //     formData.append("Email", formValues.email || "default@example.com");
  //     formData.append("BirthDate", formValues.birthDate || "1970-01-01");
  //     formData.append("CaptchaId", "");
  //     formData.append("CaptchaCode", formValues.captchaCode || "");
  //     formData.append("Gender", formValues.gender !== undefined ? formValues.gender.toString() : "false");

  //     if (!formValues.nationalCardPhoto) {
  //       throw new Error("آپلود تصویر کارت ملی (NationalCardPhoto) اجباری است.");
  //     }
  //     formData.append("NationalCardPhoto", formValues.nationalCardPhoto);

  //     console.log("FormData being sent:", {
  //       FirstName: formValues.firstName,
  //       LastName: formValues.lastName,
  //       Password: formValues.password,
  //       PhoneNumber: formValues.phoneNumber,
  //       NationalCode: formValues.nationalCode,
  //       Email: formValues.email,
  //       BirthDate: formValues.birthDate,
  //       CaptchaId: "",
  //       CaptchaCode: formValues.captchaCode,
  //       Gender: formValues.gender,
  //       NationalCardPhoto: formValues.nationalCardPhoto ? "File uploaded" : "No file",
  //     });

  //     const response = await axios.post(
  //       "https://109.230.200.230:7890/api/v1/Auth/Register",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //         timeout: 5000,
  //       }
  //     );
  //     const newCaptchaId = response.data.captchaId || response.data.id;
  //     if (!newCaptchaId) {
  //       throw new Error("No captchaId found in response");
  //     }
  //     setCaptchaId(newCaptchaId);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Axios Error fetching captchaId:", {
  //         message: error.message,
  //         status: error.response?.status,
  //         data: error.response?.data,
  //         config: error.config,
  //       });
  //       alert(`خطا در دریافت شناسه کپچا: ${error.message || "اتصال به سرور یا آپلود فایل برقرار نیست"}`);
  //     } else {
  //       console.error("Unexpected error fetching captchaId:", error);
  //       alert("خطای غیرمنتظره در دریافت شناسه کپچا یا آپلود فایل: " + error.message);
  //     }
  //   }
  // };

  // const fetchCaptcha = async () => {
  //   if (!captchaId || !phoneNumber) {
  //     alert("شناسه کپچا یا شماره همراه موجود نیست، لطفاً دوباره تلاش کنید.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://109.230.200.230:7890/api/v1/Auth/Captcha?phone=${phoneNumber}&id=${captchaId}`,
  //       { responseType: "blob" }
  //     );
  //     const imageUrl = URL.createObjectURL(response.data);
  //     setCaptchaImage(imageUrl);
  //   } catch (error) {
  //     console.error("Error fetching captcha:", {
  //       message: error.message,
  //       response: error.response?.data,
  //       status: error.response?.status,
  //     });
  //     alert("خطا در بارگذاری کپچا، لطفاً دوباره تلاش کنید.");
  //   }
  // };

  // useEffect(() => {
  //   if (phoneNumber && validateIranianMobile(phoneNumber) === true) {
  //     fetchCaptchaId();
  //   }
  // }, [phoneNumber]);

  // useEffect(() => {
  //   if (captchaId) {
  //     fetchCaptcha();
  //   }
  // }, [captchaId]);

  // const refreshCaptcha = async () => {
  //   setCaptchaImage(null);
  //   await fetchCaptchaId();
  //   fetchCaptcha();
  // };

  // const onSubmit = async (data: dataType) => {
  //   try {
  //     // چاپ تمام مقادیر فرم در کنسول قبل از ارسال
  //     console.log("تمام مقادیر فرم در زمان سابمیت:", getValues());

  //     const formData = new FormData();

  //     if (!data.firstName || data.firstName.trim() === "") {
  //       throw new Error("وارد کردن نام (FirstName) اجباری است و باید به انگلیسی باشد.");
  //     }
  //     formData.append("FirstName", data.firstName.trim());

  //     if (!data.lastName || data.lastName.trim() === "") {
  //       throw new Error("وارد کردن نام خانوادگی (LastName) اجباری است و باید به انگلیسی باشد.");
  //     }
  //     formData.append("LastName", data.lastName.trim());

  //     if (!data.password || data.password.trim() === "") {
  //       throw new Error("وارد کردن رمز عبور (Password) اجباری است.");
  //     }
  //     formData.append("Password", data.password.trim());

  //     if (!data.phoneNumber || data.phoneNumber.trim() === "") {
  //       throw new Error("وارد کردن شماره همراه (PhoneNumber) اجباری است.");
  //     }
  //     formData.append("PhoneNumber", data.phoneNumber.trim());

  //     if (!data.nationalCode || data.nationalCode.trim() === "") {
  //       throw new Error("وارد کردن کد ملی (NationalCode) اجباری است.");
  //     }
  //     formData.append("NationalCode", data.nationalCode.trim());

  //     formData.append("Email", data.email || "");
  //     formData.append("BirthDate", data.birthDate || "");
  //     formData.append("CaptchaCode", data.captchaCode);
  //     formData.append("CaptchaId", captchaId);
  //     formData.append("Gender", data.gender.toString());

  //     if (!data.nationalCardPhoto) {
  //       throw new Error("آپلود تصویر کارت ملی (NationalCardPhoto) اجباری است.");
  //     }
  //     formData.append("NationalCardPhoto", data.nationalCardPhoto);

  //     console.log("FormData being sent on submit:", {
  //       FirstName: data.firstName,
  //       LastName: data.lastName,
  //       Password: data.password,
  //       PhoneNumber: data.phoneNumber,
  //       NationalCode: data.nationalCode,
  //       Email: data.email,
  //       BirthDate: data.birthDate,
  //       CaptchaCode: data.captchaCode,
  //       CaptchaId: captchaId,
  //       Gender: data.gender,
  //       NationalCardPhoto: data.nationalCardPhoto ? "File uploaded" : "No file",
  //     });

  //     const response = await axios.post(
  //       "https://109.230.200.230:7890/api/v1/Auth/Register",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log("Response:", response.data);
  //     alert("ثبت‌نام با موفقیت انجام شد!");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     if (axios.isAxiosError(error)) {
  //       alert("خطا در ثبت‌نام: " + (error.response?.data?.message || "لطفاً دوباره تلاش کنید یا فایل را چک کنید"));
  //     } else {
  //       alert("خطای غیرمنتظره‌ای رخ داد یا فایل آپلود نشده است: " + error.message);
  //     }
  //   }
  // };