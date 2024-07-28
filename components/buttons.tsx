"use client";
// Mengimpor komponen dan fungsi yang diperlukan dari beberapa library dan file
import Link from "next/link"
import { IoAddSharp , IoPencil, IoTrashOutline } from "react-icons/io5"
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteData } from "@/lib/actions";

// Komponen CreateButton untuk membuat data baru
export const CreateButton = () =>{
    return(
        <Link href="/add-data/create" 
        className="inline-flex items-center space-x-1 text-white
        bg-blue-700 hover:bg-blue-800 px-5 py-[9px] round-sm text-sm">
        <IoAddSharp size={20}/>   
        Create
        </Link>  
    );
};

// Komponen EditButton untuk mengedit data berdasarkan id
export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link 
        href={`/add-data/edit/${id}`}
        className="rounded-sm border p-2 bg-green-200 hover:bg-green-500 text-gray-800 hover:text-white shadow-md flex items-center justify-center">
        <IoPencil size={20}/>   
        </Link>  
    );
};

// Komponen DeleteButton untuk menghapus data berdasarkan id
export const DeleteButton = ({ id }: { id: string }) =>{
    // Mengikat fungsi deleteData dengan id
    const DeleteDataWithId = deleteData.bind(null, id);
    return(
        <form action={DeleteDataWithId}>
        <button 
        className="rounded-sm border p-2 bg-red-500 hover:bg-red-800 text-white shadow-md flex items-center justify-center">
        <IoTrashOutline size={20}/>   
        </button>  
        </form>
    );
};

// Komponen SubmitButton untuk tombol submit yang dinamis (menyimpan atau memperbarui)
export const SubmitButton = ({ label }: { label: string }) => {
    // Menggunakan hook useFormStatus untuk mengetahui status form saat ini (pending atau tidak)
    const { pending } = useFormStatus();
    // Menggunakan clsx untuk menggabungkan kelas CSS secara kondisional
    const className = clsx(
        "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
        {
          "opacity-50 cursor-progress": pending,
        }
      );

    return (
        <button type="submit" className={className} disabled={pending}>
          {label === "save" ? (
            <span>{pending ? "Saving..." : "Save"}</span>
          ) : (
            <span>{pending ? "Updating..." : "Update"}</span>
          )}
        </button>
    )
}