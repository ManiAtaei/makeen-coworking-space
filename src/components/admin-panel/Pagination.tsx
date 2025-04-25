"use client";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  // محاسبه تعداد کل صفحات
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // محاسبه تعداد آیتم‌های نمایش داده شده در صفحه فعلی
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const itemsOnCurrentPage = totalItems > 0 ? endItem - startItem + 1 : 0;
  
  // ساخت آرایه صفحات برای نمایش دکمه‌ها
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center mt-[35px] w-full">
      <div className="w-3/12">
        <span className="text-[#868686] font-xregular text-[12px]">
          نمایش{" "}
          <span className="text-[#202020] font-xbold">{itemsOnCurrentPage}</span> از{" "}
          {totalItems} نتیجه
        </span>
      </div>
      
      {totalPages > 0 && (
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button
            className="bg-[#EDEDED] p-[6px] rounded-[6.67px]"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowForward className="w-4 h-4 text-[#CBCBCB] rounded-[4px]" />
          </button>

          {/* فقط اگر تعداد صفحات بیشتر از صفر باشد، دکمه‌ها را نمایش بده */}
          {pages.map((page) => (
            <button
              key={page}
              className={`px-[10.8px] py-[2.8px] rounded-[6.67px] ${
                currentPage === page 
                  ? "bg-[#44C0ED] text-white" 
                  : "bg-[#F1F8FF] text-[#202020]"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="bg-[#EDEDED] p-[6px] rounded-[6.67px]"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowBack className="w-4 h-4 text-[#CBCBCB]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;