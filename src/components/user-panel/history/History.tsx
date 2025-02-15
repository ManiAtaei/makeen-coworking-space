import React, { useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import Table from "./Table";


export default function History() {

     const item = [
        { id: 1, text: " کارت به کارت " },
        { id: 2, text: " آنلاین " },
      ];
    const [select, setSelect] = useState(1);

  return (
       <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
         <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
           <FaCaretLeft className="w-6 h-6 hidden lg:block" />
           مدیریت رزروها
         </h1>
         <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2 mt-6 text-[#CBCBCB] text-[12px] md:text-[14px] font-xbold flex items-center gap-[12.5px] ">
           {item.map((item) => (
             <li key={item.id}>
               <a
                 href="#"
                 className={`${
                   select === item.id ? "text-[#44C0ED] underline underline-offset-[15px] decoration-2" : "text-[#CBCBCB]"
                 }`}
                 onClick={() => setSelect(item.id)}
               >
                 {item.text}
               </a>
             </li>
           ))}
         </ul>
         <div className="mt-6">
            <Table/>
         </div>
        </div>
  )
}
