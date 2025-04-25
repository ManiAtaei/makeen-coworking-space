"use client"
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import DeleteModal from "./DeleteModal";

interface UserData {
  id: string;
  row: string;
  email: string;
  name: string;
  date: string;
  card: string;
  number: string;
  image: string;
}

interface ApiResponse {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  creationTime: string;
  nationalCode: string;
  phoneNumber: string;
  hasProfilePhoto: boolean;
}

interface TableProps {
  onSelectUsers: (selectedIds: string[]) => void;
  userTypeFilter: number; // نوع کاربر (0: Newest, 1: Banned, 2: MakeenStudent, 3: ForcedCoWorks)
}

export default function Table({ onSelectUsers, userTypeFilter }: TableProps) {
  const [info, setInfo] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // تعداد کاربران در هر صفحه
  const [totalUsers, setTotalUsers] = useState<number>(0); // تعداد کل کاربران

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse[]>(
          `https://109.230.200.230:7890/api/v1/Admins/Users?page=${currentPage}&pageSize=${pageSize}&userType=${userTypeFilter}&orderBy=CreationTime&sortOrder=DESC`,
          { withCredentials: true }
        );

        const formattedData: UserData[] = await Promise.all(
          response.data.map(async (item, index) => {
            let profileImage = "/admin-panel/Profile-Pic-Small.svg";

            if (item.hasProfilePhoto) {
              try {
                const imageResponse = await axios.get(
                  `https://109.230.200.230:7890/api/v1/Admins/Users/${item.id}/Profile-Photo`,
                  {
                    withCredentials: true,
                    responseType: "blob",
                  }
                );

                console.log(`پاسخ API عکس برای کاربر ${item.id}:`, imageResponse.data);

                const reader = new FileReader();
                reader.readAsDataURL(imageResponse.data);
                reader.onloadend = () => {
                  console.log(`Base64 عکس برای کاربر ${item.id}:`, reader.result);
                };

                profileImage = URL.createObjectURL(imageResponse.data);
              } catch (imgError: AxiosError | Error) {
                console.error(`خطا در دریافت عکس پروفایل کاربر ${item.id}: ${imgError.message}`);
              }
            }

            return {
              id: item.id,
              row: ((currentPage - 1) * pageSize + index + 1).toString(), // محاسبه شماره ردیف با توجه به صفحه
              email: item.email || "نامشخص",
              name: `${item.firstName} ${item.lastName}`,
              date: new Date(item.creationTime).toLocaleDateString("fa-IR"),
              card: item.nationalCode,
              number: item.phoneNumber,
              image: profileImage,
            };
          })
        );

        setInfo(formattedData);
        setError(null);
        // فرض می‌کنیم API تعداد کل کاربران را در هدر یا بدنه پاسخ برمی‌گرداند
        // اگر API تعداد کل را برمی‌گرداند، باید آن را اینجا تنظیم کنیم
        setTotalUsers(68); // این مقدار باید از API گرفته شود (برای مثال از هدر یا بدنه پاسخ)
      } catch (error: AxiosError | Error | unknown) {
        const errorMessage = error instanceof Error ? error.message : 'خطای ناشناخته';
        setError(`خطا در بارگذاری داده‌ها: ${errorMessage}`);
      }
    };

    fetchData();

    // Clean up function
    return () => {
      // Clean up blob URLs
      info.forEach((item) => {
        if (item.image.startsWith("blob:")) {
          URL.revokeObjectURL(item.image);
        }
      });
    };
  }, [currentPage, userTypeFilter, pageSize]); // Added pageSize to dependency array

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) => {
      const newSelectedIds = prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id];
      onSelectUsers(newSelectedIds);
      return newSelectedIds;
    });
  };

  const handleDeleteClick = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.patch(
        `https://109.230.200.230:7890/api/v1/Admins/${selectedUser.id}/Ban`,
        {},
        { withCredentials: true }
      );
      setInfo((prevInfo) => prevInfo.filter((item) => item.id !== selectedUser.id));
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error: AxiosError | Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'خطای ناشناخته';
      setError(`خطا در بن کردن کاربر: ${errorMessage}`);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#ECF9FD]">
            <tr className="text-[#606060] text-[14px] font-xregular">
              <th>
                <label>
                  <input type="checkbox" className="checkbox p-0" />
                </label>
              </th>
              <th>ردیف</th>
              <th>تاریخ عضویت</th>
              <th>نام کاربر</th>
              <th>ایمیل</th>
              <th>کد ملی</th>
              <th>شماره موبایل</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {info.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-[#F9F9F9] even:bg-[#FFFFFF] text-[14px] font-xregular text-[#202020]"
              >
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </label>
                </th>
                <td>{item.row}</td>
                <td>{item.date}</td>
                <td className="flex items-center gap-2">
                  <Image 
                    src={item.image} 
                    alt="profile" 
                    width={24} 
                    height={24} 
                    className="object-cover rounded-full" 
                  />
                  <span>{item.name}</span>
                </td>
                <td>{item.email}</td>
                <td>{item.card}</td>
                <td>{item.number}</td>
                <td className="flex items-center gap-3 text-[#ADADAD]">
                  <button onClick={() => handleDeleteClick(item)}>
                    <LuUserRoundX className="w-[22px] h-[22px] hover:text-red-500" />
                  </button>
                  <SlEye className="w-[22px] h-[22px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-[35px] w-full">
        <div className="w-3/12">
          <span className="text-[#868686] font-xregular text-[12px]">
            نمایش <span className="text-[#202020] font-xbold">{info.length}</span> از {totalUsers} نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button
            className="bg-[#EDEDED] p-[6px] rounded-[6.67px]"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowForward className="w-4 h-4 text-[#606060]" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-[10.8px] py-[2.8px] rounded-[6.67px] ${
                currentPage === index + 1 ? "bg-[#253359] text-white" : "bg-[#F1F8FF]"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="bg-[#EDEDED] p-[6px] rounded-[6.67px]"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowBack className="w-4 h-4 text-[#606060]" />
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        userName={selectedUser?.name || ""}
        userId={selectedUser?.id || ""}
      />
    </div>
  );
}