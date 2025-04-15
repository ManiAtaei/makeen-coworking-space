import React, { useState, useEffect } from "react";
import { SlEye } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FieldErrors, useForm } from "react-hook-form";
import axios from "axios";

export default function Table() {
  const check = [
    { id: 1, name: " مینا اکبری ", date: "۱۳۰۴/۱۰/۱۳", price: "۴۵۰٬۰۰۰ تومان" },
  ];

  const [selectedReason, setSelectedReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [reasonText, setReasonText] = useState("");
  const [paymentAction, setPaymentAction] = useState(""); // reject, approve
  const [currentItemId, setCurrentItemId] = useState(null);
  // اضافه کردن استیت برای وضعیت فعلی آیتم در مودال
  const [currentModalStatus, setCurrentModalStatus] = useState("");
  // اضافه کردن استیت برای دلیل رد
  const [rejectionReason, setRejectionReason] = useState("");
  // اضافه کردن استیت برای مبلغ شارژ
  const [chargeAmount, setChargeAmount] = useState("");
  // اضافه کردن استیت برای نمایش فیلد افزایش شارژ
  const [showChargeInput, setShowChargeInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;

  const rejectReasons = [
    { id: 1, title: "عدم صحت فیش واریزی" },
    { id: 2, title: "مغایرت اطلاعات پرداخت کننده" },
    { id: 3, title: "مبلغ واریزی اشتباه است" },
    { id: 4, title: "سایر" },
  ];

  const openModal = async (itemId) => {
    setCurrentItemId(itemId);
  
    try {
      // دریافت اطلاعات جزئی رسید از API (اگر چنین API موجود باشد)
      const response = await axios.get(
        `https://109.230.200.230:7890/api/v1/Admins/Receipts/${itemId}`,
        {
          withCredentials: true,
        }
      );
  
      if (response.data) {
        const receipt = response.data;
        
        // تنظیم وضعیت اولیه مودال بر اساس وضعیت آیتم
        setCurrentModalStatus(
          receipt.state === 1
            ? "underReview"
            : receipt.state === 2
            ? "approved"
            : "rejected"
        );
        
        // تنظیم دلیل رد (اگر موجود باشد)
        setRejectionReason(receipt.rejectionReason || "");
        
        // تنظیم مبلغ فعلی (اگر موجود باشد)
        setChargeAmount(receipt.amount?.toString() || "");
        
        // تنظیم اطلاعات پرداخت برای نمایش در مودال
        check[0].name = `${receipt.user?.firstName || ""} ${receipt.user?.lastName || ""}`;
        check[0].date = new Date(receipt.creationTime).toLocaleDateString("fa-IR");
        check[0].price = `${receipt.amount?.toLocaleString("fa-IR")} تومان`;
      }
    } catch (error) {
      console.error("Error fetching receipt details:", error);
      
      // در صورت خطا، از اطلاعات موجود در لیست استفاده می‌کنیم
      const currentItem = comments.find((item) => item.id === itemId);
      if (currentItem) {
        setCurrentModalStatus(
          currentItem.underReview
            ? "underReview"
            : currentItem.enabled
            ? "approved"
            : "rejected"
        );
        setRejectionReason(currentItem.rejectionReason || "");
      }
    }
  
    // تنظیم مجدد فرم
    setSelectedReason("");
    setReasonText("");
    setShowReasonInput(false);
    setPaymentAction("");
    setShowChargeInput(false);
    
    // نمایش مودال
    document.getElementById("my_modal_3").showModal();
  };

  const handlePaymentActionChange = (e) => {
    setPaymentAction(e.target.value);
    if (e.target.value === "reject") {
      setShowReasonInput(true);
      setShowChargeInput(false);
    } else if (e.target.value === "approve") {
      setShowReasonInput(false);
      setShowChargeInput(true);
      setSelectedReason("");
      setReasonText("");
    } else {
      setShowReasonInput(false);
      setShowChargeInput(false);
      setSelectedReason("");
      setReasonText("");
    }
  };

  const handleReasonSelect = (e) => {
    setSelectedReason(e.target.value);
    if (e.target.value === "سایر") {
      // فقط برای سایر نیازی به فیلد توضیحات اضافی نیست
      // چون برای همه دلایل رد باید توضیح وارد شود
    }
  };

  const handleTextChange = (e) => {
    setReasonText(e.target.value);
  };

  const handleChargeAmountChange = (e) => {
    setChargeAmount(e.target.value);
  };

  // اصلاح تابع handleFinalize برای استفاده از API
  const handleFinalize = async () => {
    if (paymentAction === "reject" && !selectedReason) {
      // اگر رد کردن انتخاب شده اما دلیلی انتخاب نشده است
      return;
    }

    if (paymentAction === "approve" && !chargeAmount) {
      // اگر تایید انتخاب شده اما مبلغ شارژ وارد نشده است
      return;
    }

    // آپدیت وضعیت مودال قبل از آپدیت اصلی
    if (paymentAction === "reject") {
      setCurrentModalStatus("rejected");
      setRejectionReason(selectedReason);

      // فراخوانی API برای رد کردن رسید
      const success = await updateReceiptState(currentItemId, 3); // فرض می‌کنیم 3 برای وضعیت رد است

      if (success) {
        // ذخیره دلیل رد در سیستم (می‌توانید API جداگانه‌ای برای این کار بنویسید)
        console.log("Receipt rejected with reason:", selectedReason);
      }
    } else if (paymentAction === "approve") {
      setCurrentModalStatus("approved");
      setRejectionReason("");

      // فراخوانی API برای تایید رسید
      const success = await updateReceiptState(currentItemId, 2); // عدد 2 برای وضعیت تایید شده

      if (success) {
        // اعمال مبلغ شارژ (می‌توانید API جداگانه‌ای برای این کار بنویسید)
        console.log("Receipt approved with charge amount:", chargeAmount);
      }
    }

    // به جای تغییر مستقیم داده‌ها، داده‌ها را دوباره از سرور دریافت می‌کنیم
    // زیرا وضعیت در سرور به‌روز شده است
    fetchComments(currentPage);
  };

  // اضافه کردن تابع جدید برای ارسال درخواست تغییر وضعیت
  const updateReceiptState = async (receiptId, state) => {
    try {
      const response = await axios.patch(
        `https://109.230.200.230:7890/api/v1/Admins/Receipts/${receiptId}/State`,
        {
          state: state, // مقدار state می‌تواند 2 برای تایید و مقدار دیگری برای رد باشد
        },
        {
          withCredentials: true,
        }
      );

      // اگر درخواست موفقیت‌آمیز بود
      if (response.status === 200) {
        console.log("Receipt state changed successfully");
        // به‌روزرسانی لیست بعد از تغییر وضعیت
        fetchComments(currentPage);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating receipt state:", error);
      return false;
    }
  };

  // تابع بستن مودال با کلیک روی ضربدر
  const handleCloseModal = () => {
    document.getElementById("my_modal_3").close();
  };

  interface dataType {
    discription: string;
  }
  const form = useForm<dataType>({});
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = form;

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const fetchComments = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://109.230.200.230:7890/api/v1/Admins/Receipts",
        {
          params: {
            page: page,
            pageSize: pageSize,
            orderBy: "CreationTime",
            sortOrder: "DESC",
            userId: "",
          },
          withCredentials: true,
        }
      );

      // بررسی وجود داده‌ها
      if (response.data && Array.isArray(response.data)) {
        // تبدیل داده‌های API به فرمت مورد نیاز کامپوننت
        const formattedComments = response.data.map((comment, index) => ({
          id: comment.id,
          row: ((page - 1) * pageSize + index + 1).toString(),
          name: `${comment.user.firstName || ""} ${
            comment.user.lastName || ""
          }`,
          date: new Date(comment.creationTime).toLocaleDateString("fa-IR"),
          image: comment.user.hasProfilePhoto
            ? `/api/users/${comment.user.id}/profile-photo` // مسیر فرضی برای عکس پروفایل
            : "/admin-panel/Profile-Pic-Small.svg",
          amount: comment.amount.toLocaleString("fa-IR"),
          // وضعیت رسید از API
          paymentStatus: comment.state, // فرض می‌کنیم فیلد state وضعیت را نشان می‌دهد
          // تبدیل وضعیت عددی به متغیرهای قابل فهم برای کامپوننت
          underReview: comment.state === 1, // فرض می‌کنیم 1 یعنی در انتظار بررسی
          enabled: comment.state === 2, // فرض می‌کنیم 2 یعنی تایید شده
          rejected: comment.state === 3, // فرض می‌کنیم 3 یعنی رد شده
          // دلیل رد (اگر در API موجود باشد)
          rejectionReason: comment.rejectionReason || "",
          // نوع پرداخت (اگر در API موجود باشد)
          method: comment.method || "کارت به کارت",
          // عنوان (اگر در API موجود باشد)
          title: comment.title || "شارژ حساب",
        }));

        setComments(formattedComments);

        // تعداد کل نتایج از هدر پاسخ (اگر موجود باشد)
        const totalCount = response.headers["x-total-count"] || 68;
        setTotalResults(parseInt(totalCount));
      }
    } catch (error) {
      console.error("خطا در دریافت نظرات:", error);
    } finally {
      setLoading(false);
    }
  };

  // اصلاح تابع onSubmit برای استفاده از API
  const onSubmit = async (data) => {
    console.log("Form data:", data);

    // ذخیره متن توضیحات
    setReasonText(data.discription);

    // فراخوانی تابع نهایی کردن
    await handleFinalize();
  };

  // برای نمایش وضعیت در مودال
  const renderStatusInModal = () => {
    if (currentModalStatus === "underReview") {
      return (
        <span className="border border-[#E0A03A] text-[#E0A03A] bg-[#FFFBF3] px-2 py-1 rounded-lg flex items-center gap-1">
          <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
          انتظار بررسی
        </span>
      );
    } else if (currentModalStatus === "approved") {
      return (
        <span className="border border-[#3BC377] text-[#227346] bg-[#F4FFF9] px-2 py-1 rounded-lg flex items-center gap-1">
          <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
          تایید شده
        </span>
      );
    } else if (currentModalStatus === "rejected") {
      return (
        <span className="border border-[#E9594C] text-[#E9594C] bg-[#FEF6F5] px-2 py-1 rounded-lg flex items-center gap-1">
          <IoCloseCircleOutline className="text-[#E9594C] bg-transparent w-5 h-5 rounded-full" />
          رد شده
        </span>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th>
                <label>
                  <input type="checkbox" className="checkbox p-0" />
                </label>
              </th>
              <th> ردیف </th>
              <th> نوع پرداخت </th>
              <th> نام کاربر </th>
              <th> عنوان </th>
              <th> تاریخ ثبت </th>
              <th> مبلغ </th>
              <th> وضعیت پرداخت </th>
              <th> عملیات </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{item.row}</td>
                <td>{item.method}</td>
                <td className="flex items-center gap-2">
                  <img src={item.image} alt="img" />
                  <span>{item.name}</span>
                </td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.amount} تومان</td>
                {/* بخش مربوط به نمایش وضعیت در جدول */}
                <td>
                  {item.underReview ? (
                    <span className="border border-[#E0A03A] text-[#E0A03A] bg-[#FFFBF3] px-2 py-1 rounded-lg flex items-center gap-1">
                      <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
                      انتظار بررسی
                    </span>
                  ) : item.enabled ? (
                    <span className="border border-[#3BC377] text-[#227346] bg-[#F4FFF9] px-2 py-1 rounded-lg flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
                      تایید شده
                    </span>
                  ) : (
                    <span className="border border-[#E9594C] text-[#E9594C] bg-[#FEF6F5] px-2 py-1 rounded-lg flex items-center gap-1">
                      <IoCloseCircleOutline className="text-[#E9594C] bg-transparent w-5 h-5 rounded-full" />
                      رد شده
                    </span>
                  )}
                </td>
                <td>
                  {item.underReview ? (
                    <div>
                      <button
                        className="bg-none flex flex-row items-center gap-[6px] text-[#4073D0] text-[14px] font-xregular"
                        onClick={() => openModal(item.id)}
                      >
                        <GrAttachment className="h-[22px] w-[16px]" />
                        بررسی رسید
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-none flex flex-row items-center gap-[6px] text-[#4073D0] text-[14px] font-xregular"
                      onClick={() => openModal(item.id)}
                    >
                      <SlEye className="h-[22px] w-[22px] text-[#868686]" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال بررسی رسید */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-[509px] h-full max-h-[512px]">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute left-3 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </form>
          <div className="w-full flex items-start mt-6">
            <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
              {check.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4"
                >
                  <span>
                    پرداخت کننده:
                    <span className="text-[#404040] mr-1 text-[14px] font-xregular">
                      {item.name}
                    </span>
                  </span>
                  <span>
                    تاریخ پرداخت :
                    <span className="text-[#404040] mr-2 text-[14px] font-xregular">
                      {item.date}
                    </span>
                  </span>
                  <span>
                    مبلغ پرداخت :
                    <span className="text-[#404040] mr-2 text-[14px] font-xregular">
                      {item.price}
                    </span>
                  </span>

                  {/* نمایش دلیل رد در صورت رد شدن */}
                  {currentModalStatus === "rejected" && rejectionReason && (
                    <div>
                      <span>
                        دلیل :
                        <span className="text-[#868686] mr-2 text-[14px] font-xregular">
                          {rejectionReason}
                        </span>
                      </span>
                      <div className="flex items-center justify-center border border-[#E9594C] rounded-lg bg-[#FEF6F5] py-[2.5px] gap-1 max-w-[237px] mt-4">
                        <img src="/admin-panel/close-circle.svg" alt="img" />
                        <span className="text-[#E9594C] text-[12px] font-xregular ">
                          رد شده
                        </span>
                      </div>
                    </div>
                  )}

                  {/* نمایش فرم فقط اگر در حالت بررسی باشد */}
                  {currentModalStatus === "underReview" && (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="payment-status"
                            value="reject"
                            className="radio radio-info w-5 h-5"
                            checked={paymentAction === "reject"}
                            onChange={handlePaymentActionChange}
                          />
                          <span className="font-xregular">ردکردن پرداخت</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="payment-status"
                            value="approve"
                            className="radio radio-info w-5 h-5"
                            checked={paymentAction === "approve"}
                            onChange={handlePaymentActionChange}
                          />
                          <span className="font-xregular">تایید پرداخت</span>
                        </div>
                      </div>

                      {/* فیلد افزایش شارژ */}
                      {showChargeInput && (
                        <div>
                          <input
                            type="text"
                            className="placeholder-[#404040] w-full max-w-[237px] font-xregular text-[14px] px-3 py-[8.5px] rounded-lg border border-[#CBCBCB]"
                            placeholder="مبلغ شارژ را وارد نمایید"
                            value={chargeAmount}
                            onChange={handleChargeAmountChange}
                          />
                          <p className="text-[#E9594C] text-[12px] font-xregular mt-1">
                            پر کردن این فیلد اجباری است
                          </p>

                          <button
                            className="text-white bg-[#253359] text-[14px] font-xmedium max-w-[237px] py-[10px] w-full rounded-lg mt-4"
                            onClick={handleFinalize}
                            disabled={!chargeAmount}
                          >
                            نهایی کردن
                          </button>
                        </div>
                      )}

                      {/* سلکتور دلایل رد کردن */}
                      {showReasonInput && (
                        <form
                          noValidate
                          onSubmit={handleSubmit(onSubmit, onErrorHandler)}
                        >
                          <div>
                            <select
                              className="select select-bordered w-full max-w-[237px] text-[14px] font-xregular max-h-10 h-full px-4"
                              value={selectedReason}
                              onChange={handleReasonSelect}
                            >
                              <option className="" value="" disabled>
                                دلیل رد پرداخت را انتخاب نمایید
                              </option>
                              {rejectReasons.map((reason) => (
                                <option key={reason.id} value={reason.title}>
                                  {reason.title}
                                </option>
                              ))}
                            </select>

                            {/* فیلد توضیحات - برای همه دلایل رد نمایش داده می‌شود */}
                            {selectedReason && (
                              <div>
                                <label className="block text-[#202020] text-[14px] font-xbold mb-1 mt-4">
                                  لطفا دلیل را ذکر نمایید
                                </label>
                                <textarea
                                  className="placeholder-[#ADADAD] w-full max-w-[237px] h-[100px] font-xregular text-[14px] px-3 py-2 rounded-lg border border-[#CBCBCB]"
                                  placeholder=" متن پیام را اینجا بنویسید "
                                  {...register("discription", {
                                    required: "پر کردن این فیلد اجباری است",
                                  })}
                                  onChange={handleTextChange}
                                />
                                <p className="error text-[#F75A5A] text-[12px] font-xregular mt-1">
                                  {errors.discription?.message}
                                </p>
                              </div>
                            )}

                            <button
                              className="text-white bg-[#253359] text-[14px] font-xmedium max-w-[237px] py-[10px] w-full rounded-lg mt-4"
                              type="submit"
                              disabled={showReasonInput && !selectedReason}
                            >
                              نهایی کردن
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full max-w-[200px] flex justify-end">
              <img src="/admin-panel/image 1.svg" alt="رسید پرداخت" />
            </div>
          </div>
        </div>
      </dialog>

      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش <span className="text-[#202020] font-xbold">8</span> از 68
            نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060]  rounded-[4px]" />
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            1
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            2
          </button>
          <button className="bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px]">
            3
          </button>
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowBack className="w-4 h-4 text-[#606060] " />
          </button>
        </div>
      </div>
    </div>
  );
}
