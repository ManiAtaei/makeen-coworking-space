
import React, { useState, useEffect } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import { LuUserRoundX } from "react-icons/lu";
import { SlEye } from "react-icons/sl";
import { CiMoneyBill } from "react-icons/ci";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
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

export default function Table() {
  const [info, setInfo] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse[]>(
          "https://109.230.200.230:7890/api/v1/Admins/Users?page=1&pageSize=10&orderBy=CreationTime&sortOrder=DESC",
          { withCredentials: true }
        );

        const formattedData: UserData[] = response.data.map((item, index) => ({
          id: item.id,
          row: (index + 1).toString(),
          email: item.email || "نامشخص",
          name: `${item.firstName} ${item.lastName}`,
          date: new Date(item.creationTime).toLocaleDateString("fa-IR"),
          card: item.nationalCode,
          number: item.phoneNumber,
          image: item.hasProfilePhoto ? "/path/to/profile-pic" : "/admin-panel/Profile-Pic-Small.svg",
        }));

        setInfo(formattedData);
        setError(null);
      } catch (error: any) {
        setError(
          `خطا در بارگذاری داده‌ها: ${error.message} (وضعیت: ${error.response?.status || "نامشخص"})`
        );
      }
    };

    fetchData();
  }, []);


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
    } catch (error: any) {
      setError(`خطا در بن کردن کاربر: ${error.message}`);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const dataUser = async () => {
    try {
      const response = await fetch("https://109.230.200.230:7890/api/v1/Admins/Users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // تبدیل response به JSON
      console.log(data); // نمایش دیتا در کنسول
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  useEffect(() => {
    dataUser();
  }, [])


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
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{item.row}</td>
                <td>{item.date}</td>
                <td className="flex items-center gap-2">
                  <img src={item.image} alt="profile" className="w-6 h-6" />
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
            نمایش <span className="text-[#202020] font-xbold">{info.length}</span> از 68 نتیجه
          </span>
        </div>
        <div className="join flex items-center justify-center w-full mr-[-190px] text-[14px] font-xregular gap-[9px]">
          <button className="bg-[#EDEDED] p-[6px] rounded-[6.67px]">
            <IoIosArrowForward className="w-4 h-4 text-[#606060]" />
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

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        userName={selectedUser?.name || ""}
        userId={selectedUser?.id || ""} // ارسال ID به مودال
      />
    </div>
  );
}