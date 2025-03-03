import React, { useState } from 'react';
import axios from 'axios';
import https from 'https';

// تنظیم axios برای نادیده گرفتن خطاهای SSL
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
  timeout: 15000
});

const VerificationCodeComponent = ({ phoneNumber, onVerificationSuccess }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sentCode, setSentCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendVerificationCode = async () => {
    if (!phoneNumber || !/^09[0-9]{9}$/.test(phoneNumber)) {
      setError('لطفا یک شماره موبایل معتبر وارد کنید');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await axiosInstance.post(
        'https://109.230.200.230:7890/api/v1/Auth/SendVerificationCode',
        { PhoneNumber: phoneNumber },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data && response.data.success) {
        setSentCode(true);
        setCountdown(120); // شروع شمارش معکوس 2 دقیقه
        
        // شمارنده معکوس
        const timer = setInterval(() => {
          setCountdown(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      } else {
        setError(response.data?.message || 'خطا در ارسال کد تایید');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code) {
      setError('لطفا کد تایید را وارد کنید');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await axiosInstance.post(
        'https://109.230.200.230:7890/api/v1/Auth/VerifyCode',
        { 
          PhoneNumber: phoneNumber,
          VerificationCode: code 
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data && response.data.success) {
        onVerificationSuccess(true);
      } else {
        setError(response.data?.message || 'کد تایید نامعتبر است');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 mb-1">
        <input
          className="placeholder-[#868686] font-xregular text-[14px] py-[9.5px] md:py-[12.5px] px-3 rounded-lg border border-[#CBCBCB] w-full"
          placeholder="کد تایید را وارد نمایید"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
        />
        <button
          type="button"
          onClick={countdown > 0 ? undefined : sendVerificationCode}
          disabled={loading || countdown > 0}
          className={`text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap ${
            countdown > 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading 
            ? 'در حال ارسال...' 
            : countdown > 0 
              ? `ارسال مجدد (${countdown})` 
              : sentCode 
                ? 'ارسال مجدد کد' 
                : 'ارسال کد تایید'}
        </button>
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      
      {sentCode && (
        <button
          type="button"
          onClick={verifyCode}
          disabled={loading || !code}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium mt-2"
        >
          {loading ? 'در حال بررسی...' : 'تایید کد'}
        </button>
      )}
    </div>
  );
};

export default VerificationCodeComponent;