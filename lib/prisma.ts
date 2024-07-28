import { PrismaClient } from "@prisma/client";
// Mendeklarasikan variabel global untuk prisma agar dapat digunakan di seluruh aplikasi
declare global {
     // Menggunakan tipe PrismaClient atau undefined untuk variabel prisma
    var prisma: PrismaClient | undefined;
}

// Membuat instance PrismaClient baru atau menggunakan instance yang sudah ada di globalThis
export const prisma = globalThis.prisma || new PrismaClient();
// Jika lingkungan tidak dalam mode produksi, maka menyimpan instance PrismaClient ke globalThis
if(process.env.NODE_ENV !== "production") globalThis.prisma = prisma;