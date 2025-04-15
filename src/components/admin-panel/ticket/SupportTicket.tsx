import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

type TicketStatus = "pending" | "answered" | "closed" | "open";

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "user" | "support";
  attachment?: string;
}

interface TicketProps {
  ticketId: string;
  ticketSubject: string;
  ticketDate: string;
  ticketStatus: TicketStatus;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onCloseTicket: () => void;
  onClose: () => void; // پراپ جدید برای بستن مودال
}

const SupportTicket: React.FC<TicketProps> = ({
  ticketId,
  ticketSubject,
  ticketDate,
  ticketStatus,
  messages,
  onSendMessage,
  onCloseTicket,
  onClose,
}) => {
  const form = useForm<{ message: string }>();
  const [attachment, setAttachment] = useState<string | null>(null);
  const { register, handleSubmit, reset } = form;
  const onSubmit = async (data: { message: string }) => {
    try {
      if (data.message.trim()) {
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        } else {
          console.warn("No file selected");
        }
        const response = await axios.post(
          `https://109.230.200.230:7890/api/v1/Admins/Tickets/${ticketId}/Messages?text=${encodeURIComponent(
            data.message
          )}`,
          formData ,{
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // افزودن پیام جدید به لیست پیام‌ها
          onSendMessage(data.message);
          reset();
        }
      }
    } catch (error) {
      console.error("خطا در ارسال پیام:", error);
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "pending":
        return "border-[#E0A03A] text-[#E0A03A] bg-[#FFFBF3]";
      case "answered":
        return "border-[#00BA88] text-[#227346] bg-[#F4FFF9]";
      case "closed":
        return "border-[#606060] text-[#606060] bg-[#F4F5FC]";
      case "open":
        return "border-[#44C0ED] text-[#44C0ED] bg-[#ECF9FD]";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusText = (status: TicketStatus) => {
    switch (status) {
      case "pending":
        return "در انتظار پاسخ";
      case "answered":
        return "پاسخ داده شده";
      case "closed":
        return "بسته شده";
      case "open":
        return "باز";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case "pending":
        return (
          <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
        );
      case "answered":
        return (
          <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
        );
      case "closed":
        return (
          <IoCloseCircleOutline className="text-[#606060] bg-transparent w-5 h-5 rounded-full" />
        );
      case "open":
        return (
          <IoCheckmarkCircleOutline className="text-[#44C0ED] bg-transparent w-5 h-5 rounded-full" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-[16px] w-full max-w-[780px] mx-auto overflow-hidden "
      dir="rtl"
    >
      <div className="bg-[#F4F5FC] px-6 pt-6 pb-4">
        <div className="flex items-start justify-between  ">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="text-[#202020] text-[14px] font-xbold">
                موضوع تیکت :
              </span>
              <span className="font-xregular text-[14px] text-[#404040] ">
                {ticketSubject}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#202020] text-[14px] font-xbold">
                شماره تیکت :
              </span>
              <span className="font-xregular text-[14px] text-[#404040] ">
                {ticketDate}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#202020] text-[14px] font-xbold">
                تاریخ ثبت :
              </span>
              <span className="font-xregular text-[14px] text-[#404040] ">
                {ticketId}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500">
            <img src="/admin-panel/Close.svg" alt="img" />
          </button>
        </div>

        {/* Ticket Status */}

        <div className="flex items-center gap-2 mt-6">
          <div className="text-[#202020] text-[14px] font-xbold">
            وضعیت تیکت :
          </div>
          <button
            onClick={onCloseTicket}
            className="max-w-[106px] w-full py-[5px] bg-[#E9594C] text-white rounded-lg text-[12px] font-xmedium"
          >
            بستن تیکت
          </button>
          <div
            className={`max-w-[106px] w-full py-[5px] border rounded-lg text-[12px] font-xregular flex items-center gap-1 ${getStatusColor(
              ticketStatus
            )}`}
          >
            {getStatusIcon(ticketStatus)}
            {getStatusText(ticketStatus)}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="pt-2 px-8">
        <div className="text-center text-[#868686] text-[14px] font-xregular px-56">
          <div className="divider"> {ticketDate} </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`flex items-end gap-4  ${
                message.sender === "user"
                  ? "flex-row-reverse"
                  : "flex-row w-full"
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={
                    message.sender === "user"
                      ? "/imageLanding/Pic.svg"
                      : "/imageLanding/Pic.svg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div
                  className={`relative rounded-t-2xl ${
                    message.sender === "user"
                      ? "bg-[#ECF9FD] text-right border border-[#44C0ED] max-w-[382px] p-4 rounded-br-2xl"
                      : "bg-[#F4F5FC] border border-[#4073D0] rounded-bl-2xl rounded-br-none w-full max-w-[232px] px-4 py-[7px]"
                  }`}
                >
                  <p className="whitespace-pre-line text-[14px] font-xregular">
                    {message.text}
                  </p>
                  {message.attachment && (
                    <div className="py-[10px] w-full max-w-[286px] mr-[64px] mt-6 border-2 border-dashed border-[#44C0ED] rounded-md bg-[#EDEDED] flex items-center justify-center gap-1">
                      <span className="text-[#253359] text-[14px] font-xregular">
                        نام فایل آپلود شده.پسوند
                      </span>
                      <img src="/admin-panel/eye.svg" alt="img" />
                    </div>
                  )}
                  <div
                    className={`text-[14px] font-xregular text-black absolute  ${
                      message.sender === "user"
                        ? "right-4 bottom-4"
                        : "left-2 bottom-1"
                    }`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="pb-[29px] pt-4 px-8 border-t">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row-reverse items-center gap-2"
        >
          <button
            type="submit"
            className="bg-[#253359] text-white w-full max-w-[90px] p-[9.5px] rounded-lg text-[14px] font-xmedium"
          >
            ارسال پیام
          </button>
          <button type="button">
            <img src="/admin-panel/Attachment.svg" alt="img" />
          </button>
          <input
            {...register("message")}
            placeholder="پیام خود را بنویسید"
            className="flex-1 text-right placeholder:text-[#ADADAD] text-[14px] font-xregular"
          />
        </form>
      </div>
    </div>
  );
};

export default SupportTicket;
