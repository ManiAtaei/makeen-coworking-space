import React, { useState, useRef, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaCaretLeft } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

interface DataType {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  nationalCode?: string;
  phoneNumber?: string;
  gender?: boolean;
}

interface UserProfileProps {
  userData: DataType | null;
  profilePhoto: string | null;
}

export default function UserProfile({ userData, profilePhoto }: UserProfileProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<DataType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      nationalCode: "",
      phoneNumber: "",
      gender: false,
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<{
    password: string;
    newPassword: string;
  }>({
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("birthDate", userData.birthDate ? userData.birthDate.split("T")[0] : "");
      setValue("email", userData.email);
      if (userData.nationalCode) {
        setValue("nationalCode", userData.nationalCode);
      }
      if (userData.phoneNumber) {
        setValue("phoneNumber", userData.phoneNumber);
      }
      if (userData.gender !== undefined) {
        setValue("gender", userData.gender);
      }
    }
    if (profilePhoto) {
      setProfileImage(profilePhoto);
    }
  }, [userData, profilePhoto, setValue]);

  const formMap = [
    {
      id: 1,
      name: "نام",
      field: "firstName",
      placeholder: "نام خود را وارد نمایید",
      error: "پر کردن فیلد نام کاربر اجباری است",
      editable: true,
    },
    {
      id: 2,
      name: "نام خانوادگی",
      field: "lastName",
      placeholder: "نام خانوادگی خود را وارد نمایید",
      error: "پر کردن فیلد نام خانوادگی اجباری است",
      editable: true,
    },
    {
      id: 3,
      name: "کد ملی",
      field: "nationalCode",
      placeholder: "کد ملی خود را وارد نمایید",
      error: "پر کردن فیلد کد ملی اجباری است",
      editable: false,
    },
    {
      id: 4,
      name: "تاریخ تولد",
      field: "birthDate",
      placeholder: "تاریخ تولد خود را وارد نمایید",
      error: "پر کردن فیلد تاریخ تولد اجباری است",
      editable: true,
    },
    {
      id: 5,
      name: "شماره موبایل",
      field: "phoneNumber",
      placeholder: "شماره موبایل خود را وارد نمایید",
      error: "پر کردن فیلد شماره موبایل اجباری است",
      editable: false,
    },
    {
      id: 6,
      name: "ایمیل",
      field: "email",
      placeholder: "ایمیل خود را وارد نمایید",
      error: "پر کردن فیلد ایمیل اجباری است",
      editable: true,
    },
  ];

  const onSubmit = async (data: DataType) => {
    try {
      setIsSubmitting(true);
      const updatedData: Partial<DataType> = {};
      
      // Type-safe way to update fields
      editableFields.forEach(field => {
        const key = field as keyof DataType;
        if (key in data) {
          updatedData[key] = data[key];
        }
      });

      // Create profile data with proper typing
      const profileData: Record<string, string> = {};
      
      if (updatedData.firstName) profileData.firstName = updatedData.firstName;
      if (updatedData.lastName) profileData.lastName = updatedData.lastName;
      if (updatedData.birthDate) profileData.birthDate = new Date(updatedData.birthDate).toISOString();
      if (updatedData.email) profileData.email = updatedData.email;

      const response = await fetch("https://109.230.200.230:7890/api/v1/Users/Profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "خطا در به‌روزرسانی پروفایل");
      }

      alert("مشخصات با موفقیت به‌روزرسانی شد");
      setIsEditing(false);
      setEditableFields([]);
    } catch (error) {
      console.log("Error updating profile:", error);
      alert(error instanceof Error ? error.message : "خطا در به‌روزرسانی پروفایل");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onErrorHandler = (errors: FieldErrors<DataType>) => {
    console.log(errors, "errors");
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "image/png") {
        alert("لطفاً فقط فایل‌های PNG را آپلود کنید.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      await uploadFile(file);
    }
  };

  const toggleEdit = () => {
    if (!isEditing) {
      const editableFieldNames = formMap
        .filter(item => item.editable)
        .map(item => item.field);
      
      setEditableFields(editableFieldNames);
      setIsEditing(true);
    } else {
      if (userData) {
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("birthDate", userData.birthDate.split("T")[0]);
        setValue("email", userData.email);
      }
      setIsEditing(false);
      setEditableFields([]);
    }
  };

  const uploadFile = async (selectedFile: File) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("https://109.230.200.230:7890/api/v1/Users/Profile-Photo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile photo");
      }

      const photoResponse = await fetch("https://109.230.200.230:7890/api/v1/Users/Profile-Photo", {
        method: "GET",
        credentials: "include",
      });
      
      if (!photoResponse.ok) {
        throw new Error("Failed to retrieve updated profile photo");
      }
      
      const photoBlob = await photoResponse.blob();
      const updatedPhotoUrl = URL.createObjectURL(photoBlob);
      setProfileImage(updatedPhotoUrl);

      console.log("Profile photo uploaded successfully");
    } catch (error) {
      console.log("Error uploading profile photo:", error);
      alert(error instanceof Error ? error.message : "خطا در آپلود عکس پروفایل");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (data: { password: string; newPassword: string }) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("https://109.230.200.230:7890/api/v1/Users/Change-Password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          newPassword: data.newPassword,
        }),
        credentials: "include",
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = responseData.errors
          ? Object.values(responseData.errors).flat().join("\n")
          : responseData.message || "خطا در تغییر رمز عبور";
        throw new Error(errorMessage);
      }

      alert("رمز عبور با موفقیت تغییر یافت");
      setIsModalOpen(false);
      resetPasswordForm();
    } catch (error) {
      console.log("Error changing password:", error);
      alert(error instanceof Error ? error.message : "خطا در تغییر رمز عبور");
    } finally {
      setIsSubmitting(false);
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
          {profileImage ? (
            <Image
              src={profileImage}
              alt="تصویر پروفایل"
              width={112}
              height={112}
              className="rounded-full object-cover border-[6px] border-[#4073D0]"
            />
          ) : (
            <Image
              src="/placeholder.png"
              alt="تصویر پروفایل"
              width={112}
              height={112}
              className="rounded-full object-cover border-[6px] border-[#4073D0]"
            />
          )}
          {isEditing && (
            <div className="absolute bottom-1 w-9 h-9 right-1 bg-[#FF9568] rounded-full p-2">
              <MdEdit className="text-white w-5 h-5" onClick={handleImageClick} />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/png"
            className="hidden"
          />
        </div>
      </div>

      <div className="mt-2 px-[72px]">
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrorHandler)}>
          <button
            type={isEditing ? "submit" : "button"}
            onClick={!isEditing ? toggleEdit : undefined}
            className="bg-[#253359] text-[14px] font-xmedium text-white w-full py-2 rounded-lg md:hidden"
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال پردازش..." : isEditing ? "تأیید" : "ویرایش مشخصات"}
          </button>

          <div className="md:grid md:grid-cols-2 md:gap-8">
            {formMap.map((item) => (
              <div key={item.id} className="flex flex-col pt-2">
                <label className="text-[14px] font-xbold text-[#202020]" htmlFor={item.field}>
                  {item.name}
                </label>
                <input
                  className={`placeholder-[#868686] font-xregular text-[14px] py-[7.5px] w-full max-w-[392px] md:py-[12.5px] px-3 mt-[5px] rounded-lg border border-[#CBCBCB] ${
                    !isEditing || !item.editable ? "text-[#868686] bg-gray-100" : "text-[#202020]"
                  }`}
                  placeholder={item.placeholder}
                  type={item.field === "birthDate" ? "date" : "text"}
                  id={item.field}
                  disabled={!isEditing || !item.editable || isSubmitting}
                  {...register(item.field as keyof DataType, {
                    required: item.error,
                  })}
                />
                {errors[item.field as keyof DataType] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[item.field as keyof DataType]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between md:justify-normal gap-8 mt-4">
              <div className="flex items-center gap-1">
                <span className="text-[#202020] text-[14px] font-xbold">آپلود مدارک:</span>
                <IoCheckmarkCircleOutline className="text-[#00BA88] bg-transparent w-5 h-5 rounded-full" />
                <button 
                  type="button" 
                  className="text-[12px] font-xregular underline underline-offset-4"
                >
                  مشاهده
                </button>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[#202020] text-[14px] font-xbold">جنسیت:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="false"
                      disabled={!isEditing || isSubmitting}
                      {...register("gender", {
                        setValueAs: (value) => value === "false" ? false : true,
                      })}
                      checked={userData?.gender === false}
                    />
                    <span className="text-[12px] font-xregular">آقا</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="true"
                      disabled={!isEditing || isSubmitting}
                      {...register("gender", {
                        setValueAs: (value) => value === "false" ? false : true,
                      })}
                      checked={userData?.gender === true}
                    />
                    <span className="text-[12px] font-xregular">خانم</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-4 col-span-2 md:col-span-1">
              <button
                type="button"
                onClick={isEditing ? toggleEdit : () => setIsModalOpen(true)}
                className="bg-white border border-[#253359] text-[16px] font-xmedium text-[#253359] w-full max-w-[188px] rounded-lg flex items-center justify-center gap-2 py-[12px]"
                disabled={isSubmitting}
              >
                {isEditing ? "کنسل" : <><GoKey /> تغییر رمز ورود</>}
              </button>
              <button
                type={isEditing ? "submit" : "button"}
                onClick={!isEditing ? toggleEdit : undefined}
                className="bg-[#253359] text-[16px] font-xmedium text-white py-[12px] w-full max-w-[188px] rounded-lg hidden md:block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال پردازش..." : isEditing ? "تأیید" : "ویرایش مشخصات"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-xbold">تغییر رمز عبور</h2>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-500"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit(handleChangePassword)} className="flex flex-col gap-4">
              <div className="relative">
                <label className="text-sm font-xbold">رمز عبور فعلی</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...registerPassword("password", {
                    required: "رمز عبور فعلی اجباری است",
                  })}
                  placeholder="رمز عبور فعلی را وارد نمایید"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg pr-10"
                  disabled={isSubmitting}
                />
                {passwordErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{passwordErrors.password.message}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-500"
                  aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                  disabled={isSubmitting}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <label className="text-sm font-xbold">رمز عبور جدید</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...registerPassword("newPassword", {
                    required: "رمز عبور جدید اجباری است",
                    minLength: {
                      value: 8,
                      message: "رمز عبور باید حداقل 8 کاراکتر باشد"
                    }
                  })}
                  placeholder="رمز عبور جدید را وارد نمایید"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg pr-10"
                  disabled={isSubmitting}
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-10 text-gray-500"
                  aria-label={showNewPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                  disabled={isSubmitting}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button 
                type="submit" 
                className="bg-[#253359] text-white py-2 rounded-lg mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال پردازش..." : "ثبت رمز عبور"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}