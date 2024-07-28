"use server";
// Mengimpor library dan fungsi yang diperlukan
import { z } from "zod"; // Library untuk validasi skema data
import { prisma } from "@/lib/prisma"; // Prisma client untuk interaksi dengan database
import { revalidatePath } from "next/cache"; // Fungsi untuk merevalidasi cache halaman
import { redirect } from "next/navigation"; // Fungsi untuk melakukan redirect

// Definisi skema validasi data menggunakan zod
const DataSchema = z.object({
    name: z.string().min(4),
    class: z.string().min(3),
    phone: z.string().min(10),
})
// Fungsi untuk menyimpan data mahasiswa
export const saveData = async (prevSate: any, formData: FormData) =>{
    const validateData = DataSchema.safeParse(
    Object.fromEntries(formData.entries())
    );

    if (!validateData.success) {
        return{
            Error: validateData.error.flatten().fieldErrors
        };
    }

    // Jika validasi berhasil, coba simpan data ke database
    try {
        await prisma.mahasiswa.create({
            data:{ 
                name: validateData.data.name,
                kelas: validateData.data.class,
                phone: validateData.data.phone,
            },
        });
    } catch (error) {
       return {message: "Failed to create Data Mahasiswa"} 
    }
     // Merevalidasi cache halaman utama dan melakukan redirect
    revalidatePath("/")
    redirect("/")
};

// Fungsi untuk memperbarui data mahasiswa
export const updateData = async (id:string, prevSate: any, formData: FormData) =>{
    // Validasi data yang diterima dari form
    const validateData = DataSchema.safeParse(
        Object.fromEntries(formData.entries()) // Mengubah FormData menjadi objek
    );

    if (!validateData.success) {
        return{
            Error: validateData.error.flatten().fieldErrors
        };
    }
     // Jika validasi berhasil, coba perbarui data di database
    try {
        await prisma.mahasiswa.update({
            data:{ 
                name: validateData.data.name,
                kelas: validateData.data.class,
                phone: validateData.data.phone,
            },
            where:{id},
        });
    } catch (error) {
       return {message: "Failed to Update Data Mahasiswa"} 
    }

    revalidatePath("/")
    redirect("/")
};

export const deleteData = async (
    id:string) =>{
    

    try {
        await prisma.mahasiswa.delete({
            where:{id},
        });
    } catch (error) {
       return {message: "Failed to Delete Data Mahasiswa"} 
    }

    revalidatePath("/")
};