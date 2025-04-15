import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { BsReply } from "react-icons/bs";
import { FieldErrors, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

export default function CommentsTable() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;

  // تعریف فرم برای پاسخ به نظر کاربر
  interface ReplyFormData {
    replyText: string;
  }

  const form = useForm<ReplyFormData>({});
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = form;

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const fetchComments = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://109.230.200.230:7890/api/v1/Admins/Comments",
        {
          params: {
            page: page,
            pageSize: pageSize,
            orderBy: "CreationTime",
            sortOrder: "DESC",
            spaceId: "a6374b89-e7ea-4938-981a-a4b7552285e3", // ایدی اسپیس مورد نظر
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
          titleReview: comment.reservationSpace?.name || "", // استفاده از نام فضا به عنوان عنوان
          review: comment.text || "",
          image: comment.user.hasProfilePhoto
            ? `/api/users/${comment.user.id}/profile-photo` // مسیر فرضی برای عکس پروفایل
            : "/admin-panel/Profile-Pic-Small.svg",
          imageStar: "/admin-panel/Stars.svg",
          rating: comment.stars || 0,
          state: comment.state || 0, // وضعیت کامنت (منتشر شده یا نشده)
          hasReply: comment.reply ? true : false, // آیا پاسخی دارد یا خیر
        }));

        setComments(formattedComments);
        // تعداد کل نتایج را می‌توان از سرور دریافت کرد یا اینجا تخمین زد
        setTotalResults(68); // این مقدار باید از سرور دریافت شود
      }
    } catch (error) {
      console.error("خطا در دریافت نظرات:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (data, commentId) => {
    try {
      // ارسال پاسخ به API
      await axios.post(
        `https://109.230.200.230:7890/api/v1/Admins/Comments/${commentId}/reply`,
        { text: data.replyText },
        { withCredentials: true }
      );

      // پس از موفقیت، کامنت‌ها را دوباره بارگذاری کنید
      fetchComments(currentPage);

      // بستن مودال و پاک کردن فرم
      reset();
      document.getElementById("reply_modal").close();

      // نمایش پیام موفقیت (اختیاری)
      // toast.success("پاسخ با موفقیت ثبت شد");
    } catch (error) {
      console.error("خطا در ارسال پاسخ:", error);
      // نمایش پیام خطا (اختیاری)
      // toast.error("خطا در ارسال پاسخ");
    }
  };
  const handlePublishComment = async (commentId, newState) => {
    try {
      // ارسال درخواست تغییر وضعیت به API
      await axios.put(
        `https://109.230.200.230:7890/api/v1/Admins/Comments/${commentId}/state`,
        { state: newState },
        { withCredentials: true }
      );

      // پس از موفقیت، کامنت‌ها را دوباره بارگذاری کنید
      fetchComments(currentPage);

      // نمایش پیام موفقیت (اختیاری)
      // toast.success("وضعیت کامنت با موفقیت تغییر کرد");
    } catch (error) {
      console.error("خطا در تغییر وضعیت کامنت:", error);
      // نمایش پیام خطا (اختیاری)
      // toast.error("خطا در تغییر وضعیت کامنت");
    }
  };

  const handlePublishInLanding = async (commentId) => {
    try {
      // ارسال درخواست انتشار در لندینگ به API
      await axios.put(
        `https://109.230.200.230:7890/api/v1/Admins/Comments/${commentId}/landing`,
        { isInLanding: true },
        { withCredentials: true }
      );

      // پس از موفقیت، کامنت‌ها را دوباره بارگذاری کنید
      fetchComments(currentPage);

      // نمایش پیام موفقیت (اختیاری)
      // toast.success("کامنت در لندینگ منتشر شد");
    } catch (error) {
      console.error("خطا در انتشار کامنت در لندینگ:", error);
      // نمایش پیام خطا (اختیاری)
      // toast.error("خطا در انتشار کامنت در لندینگ");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("آیا از حذف این کامنت اطمینان دارید؟")) {
      try {
        // ارسال درخواست حذف به API
        await axios.delete(
          `https://109.230.200.230:7890/api/v1/Admins/Comments/${commentId}`,
          { withCredentials: true }
        );
        
        // پس از موفقیت، کامنت‌ها را دوباره بارگذاری کنید
        fetchComments(currentPage);
        
        // نمایش پیام موفقیت (اختیاری)
        // toast.success("کامنت با موفقیت حذف شد");
      } catch (error) {
        console.error("خطا در حذف کامنت:", error);
        // نمایش پیام خطا (اختیاری)
        // toast.error("خطا در حذف کامنت");
      }
    }
  };

  const onErrorHandler = (error: FieldErrors) => {
    console.log(error);
  };

  const [selectedComment, setSelectedComment] = useState(null);

  const openReplyModal = (comment) => {
    setSelectedComment(comment);
    document.getElementById("reply_modal").showModal();
  };

  // تابع برای نمایش ستاره‌ها بر اساس امتیاز
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-2xl ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div>
      {loading ? (
        <div className="text-center py-4">در حال بارگذاری...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#ECF9FD]">
              <tr className="text-[#606060] text-[14px] font-xregular">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox p-0" />
                  </label>
                </th>
                <th> ردیف </th>
                <th> نام کاربر </th>
                <th> تاریخ ثبت </th>
                <th> عنوان نظر </th>
                <th> متن نظر </th>
                <th> عملیات </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((item) => (
                <tr
                  key={item.id}
                  className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020] "
                >
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>{item.row}</td>
                  <td>
                    <div className="flex items-center gap-2 mr-[-15px]">
                      <img
                        src={item.image}
                        alt="تصویر کاربر"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td className="text-[12px] w-[140px]">{item.titleReview}</td>
                  <td>
                    <div className="flex flex-col items-start gap-2">
                      {renderStars(item.rating)}
                      <span className="text-[12px] w-[280px] ">
                        {item.review}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-start justify-between gap-[13.67px] w-full">
                      <button
                        className={`${
                          item.state === 0
                            ? "bg-[#253359] text-white"
                            : "bg-[#4CAF50] text-white"
                        } text-[10px] font-xregular px-[36.5px] py-[6.5px] rounded-md w-full`}
                        onClick={() =>
                          handlePublishComment(
                            item.id,
                            item.state === 0 ? 1 : 0
                          )
                        }
                      >
                        {item.state === 0 ? "انتشار" : "منتشر شده"}
                      </button>
                      <button
                        className="border border-[#253359] text-[10px] font-xregular px-4 py-[6.5px] text-[#253359] rounded-md w-full"
                        onClick={() => handlePublishInLanding(item.id)}
                      >
                        انتشار در لندینگ
                      </button>
                    </div>
                    <div className="flex items-start gap-[8px] mt-4">
                      <button
                        onClick={() => openReplyModal(item)}
                        className={item.hasReply ? "opacity-50" : ""}
                        title={
                          item.hasReply
                            ? "این کامنت قبلا پاسخ داده شده است"
                            : "پاسخ به کامنت"
                        }
                      >
                        <BsReply className="w-4 h-4 text-[#253359]" />
                      </button>
                      <button onClick={() => handleDeleteComment(item.id)}>
                        <LuTrash2 className="w-4 h-4 text-[#CBCBCB]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="reply_modal" className="modal w-full">
        <div className="modal-box w-full max-w-[450px] mx-auto">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute left-3 top-4"
              onClick={() => document.getElementById("reply_modal").close()}
            >
              <IoClose className="w-6 h-6" />
            </button>
          </form>
          <div className="flex flex-col w-full text-[#202020] text-[14px] font-xbold gap-4">
            <div className="flex justify-center">
              <img
                className="w-[100px] h-[100px]"
                src="/admin-panel/Reply-2.svg"
                alt="پاسخ"
              />
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(
                (data) => handleReplySubmit(data, selectedComment?.id),
                onErrorHandler
              )}
            >
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  className="text-[14px] font-xbold text-[#404040]"
                  htmlFor="replyText"
                >
                  پاسخ به نظر کاربر
                </label>
                <textarea
                  className="placeholder-[#868686] font-xregular text-[14px] pb-[121px] pt-[10px] px-3 rounded-lg border border-[#CBCBCB] w-full min-h-[150px]"
                  placeholder=" متن پاسخ به کاربر اینجا نوشته شود "
                  id="replyText"
                  {...register("replyText", {
                    required: "پر کردن فیلد پاسخ اجباری است",
                  })}
                />
                <p className="text-red-500 text-xs">
                  {errors.replyText?.message}
                </p>
              </div>
              <button
                type="submit"
                className="text-white bg-[#253359] text-[14px] font-xmedium py-[9.5px] w-full rounded-lg mt-3"
              >
                ثبت پاسخ
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش{" "}
            <span className="text-[#202020] font-xbold">{comments.length}</span>{" "}
            از {totalResults} نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button
            className="bg-[#EDEDED] p-[6px] rounded-[6.67px]"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowForward className="w-4 h-4 text-[#606060] rounded-[4px]" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`bg-[#F1F8FF] px-[10.8px] py-[2.8px] rounded-[6.67px] ${
                currentPage === page ? "bg-[#253359] text-white" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="bg-[#EDEDED] p-[6px] rounded-[6.67px]"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * pageSize >= totalResults}
          >
            <IoIosArrowBack className="w-4 h-4 text-[#606060]" />
          </button>
        </div>
      </div>
    </div>
  );
}
