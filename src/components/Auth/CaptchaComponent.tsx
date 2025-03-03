// ابتدا ایمپورت‌های لازم را اضافه کنید
import React, { useState, useEffect } from "react";
import axios from "axios";
import https from "https";

// تنظیم axios برای نادیده گرفتن خطاهای SSL
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
  timeout: 15000
});

// کامپوننت کپچا
const CaptchaComponent = ({ phoneNumber, onCaptchaIdChange }) => {
  const [captchaId, setCaptchaId] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCaptcha = async () => {
    try {
      setLoading(true);
      setError("");
      
      // درخواست اولیه برای دریافت ID کپچا
      const response = await axiosInstance.get(
        `https://109.230.200.230:7890/api/v1/Auth/Captcha?phone=${phoneNumber || ""}&id=`
      );

      if (response.data && response.data.id) {
        const newCaptchaId = response.data.id;
        setCaptchaId(newCaptchaId);
        onCaptchaIdChange(newCaptchaId);
        
        // درخواست برای دریافت تصویر کپچا
        const imageResponse = await axiosInstance.get(
          `https://109.230.200.230:7890/api/v1/Auth/Captcha?phone=${phoneNumber || ""}&id=${newCaptchaId}`,
          { responseType: "blob" }
        );
        
        const imageUrl = URL.createObjectURL(imageResponse.data);
        setCaptchaImage(imageUrl);
      } else {
        setError("خطا در دریافت کپچا");
      }
    } catch (error) {
      console.error("Error fetching captcha:", error);
      setError("خطا در ارتباط با سرور کپچا");
    } finally {
      setLoading(false);
    }
  };

  // دریافت کپچا در بارگذاری اولیه
  useEffect(() => {
    fetchCaptcha();
    
    // پاکسازی URL های ایجاد شده هنگام unmount
    return () => {
      if (captchaImage) {
        URL.revokeObjectURL(captchaImage);
      }
    };
  }, [phoneNumber]);

  return (
    <div className="flex items-center gap-3">
      <input
        className="placeholder-[#868686] font-xregular text-[14px] py-[7.5px] md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB] w-full max-w-[121px]"
        placeholder="عبارت امنیتی"
        type="text"
        id="CaptchaCode"
        name="CaptchaCode"
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
        onClick={fetchCaptcha}
        disabled={loading}
      >
        {loading ? "..." : "بارگیری مجدد"}
      </button>
      
      {error && <p className="text-red-500 text-xs absolute -bottom-5">{error}</p>}
    </div>
  );
};

export default CaptchaComponent;