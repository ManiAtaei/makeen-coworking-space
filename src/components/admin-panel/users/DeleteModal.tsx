// src/components/DeleteModal.tsx
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LuUserRoundX } from "react-icons/lu";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  userId: string; // اضافه کردن prop برای ID کاربر
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, userName,  }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] h-[337.5px] relative flex flex-col items-center justify-center">
        <button onClick={onClose} className="absolute top-3 left-3 text-gray-500 hover:text-gray-700">
          <AiOutlineClose size={20} />
        </button>
        <div className="flex flex-col items-center gap-4">
          <LuUserRoundX size={64} />
          <p className="text-lg font-medium text-gray-800 text-center">
            آیا از بن کردن کاربر <span className="font-bold">{userName}</span> اطمینان دارید؟
          </p>
          <div className="flex gap-3 mt-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              خیر
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              بله
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;