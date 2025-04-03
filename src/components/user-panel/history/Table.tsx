import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface Receipt {
  id: string;
  title: string;
  creationTime: string;
  amount: number;
  state: 0 | 1 | 2;
}

const TableContent = React.lazy(() => Promise.resolve({ default: Table }));

function Table() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get<Receipt[]>(
          'https://109.230.200.230:7890/api/v1/Users/Receipts',
          { withCredentials: true }
        );
        setReceipts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching receipts:', error);
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const convertToIranTime = (utcDate: string): string => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 3);
    date.setMinutes(date.getMinutes() + 30);
    
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$2/$1');
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th>ردیف</th>
              <th>عنوان</th>
              <th>تاریخ ثبت</th>
              <th>مبلغ</th>
              <th>وضعیت تراکنش</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <td>{index + 1}</td>
                <td>{item.title.trim() === "" ? "-" : item.title}</td>
                <td>{convertToIranTime(item.creationTime)}</td>
                <td>{item.amount.toLocaleString()} تومان</td>
                <td>
                  {item.state === 0 ? (
                    <span className="text-[#E0A03A] px-2 py-1 flex items-center gap-1">
                      <HiOutlineExclamationCircle className="text-[#E0A03A] bg-transparent w-5 h-5 rounded-full" />
                      در حال بررسی
                    </span>
                  ) : item.state === 1 ? (
                    <span className="text-[#E9594C] px-2 py-1 flex items-center gap-1">
                      <IoCloseCircleOutline className="text-[#E9594C] bg-transparent w-5 h-5 rounded-full" />
                      رد شده
                    </span>
                  ) : (
                    <span className="text-[#3BC377] px-2 py-1 flex items-center gap-1">
                      <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-5 h-5 rounded-full" />
                      تایید شده
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060] rounded-[4px]" />
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
            <IoIosArrowBack className="w-4 h-4 text-[#606060]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TableWrapper() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <TableContent />
    </Suspense>
  );
}