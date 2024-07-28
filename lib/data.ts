import {prisma} from "@/lib/prisma";// Mengimpor prisma client dari file prisma

const ITEMS_PER_PAGE = 5;// Konstanta untuk menentukan jumlah item per halaman

// Fungsi untuk mendapatkan data mahasiswa berdasarkan query pencarian dan halaman saat ini
export const getDatas = async (query: string, currentPage: number) =>{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;// Menghitung offset berdasarkan halaman saat ini
    try {
        // Mengambil data mahasiswa dari database dengan filter pencarian dan paginasi
        const datas = await prisma.mahasiswa.findMany({
            skip: offset, // Melewati sejumlah item berdasarkan offset
            take: ITEMS_PER_PAGE, // Mengambil sejumlah item berdasarkan ITEMS_PER_PAGE
            where:{
            OR:[
                {
                    name:{
                        contains:query,// Pencarian berdasarkan nama yang mengandung query
                        mode: "insensitive" // Tidak case-sensitive
                    }
                },
                {
                    kelas:{
                        contains:query,
                        mode:"insensitive"
                    }
                },
                {
                    phone:{
                        contains:query,
                        mode:"insensitive"
                    }
                }
            ]
        }
    }
    ); 
    return datas;
    } catch (error) {
        throw new Error("Failed to fecth data mahasiswa");
    }
};

// Fungsi untuk mendapatkan data mahasiswa berdasarkan ID
export const getDataById = async (id: string) => {
    try {
         // Mengambil data mahasiswa dari database berdasarkan ID
      const data = await prisma.mahasiswa.findUnique({
        where: { id },
      });
      return data;
    } catch (error) {
      throw new Error("Failed to fetch data mahasiswa");
    }
  };

  // Fungsi untuk menghitung jumlah halaman berdasarkan query pencarian
  export const getDataPages = async (query: string) =>{
    try {
         // Menghitung jumlah data mahasiswa yang cocok dengan query pencarian
        const datas = await prisma.mahasiswa.count({
            where:{
            OR:[
                {
                    name:{
                        contains:query,// Pencarian berdasarkan nama yang mengandung query
                        mode: "insensitive" // Tidak case-sensitive
                    }
                },
                {
                    kelas:{
                        contains:query,
                        mode:"insensitive"
                    }
                },
                {
                    phone:{
                        contains:query, // Pencarian berdasarkan nomor telepon yang mengandung query
                        mode: "insensitive" // Tidak case-sensitive
                    }
                }
            ]
        }
    }
    ); 
    const totalPages = Math.ceil(Number(datas) / ITEMS_PER_PAGE);// Menghitung jumlah halaman
    return totalPages; // Mengembalikan jumlah halaman
    } catch (error) {
        throw new Error("Failed to fecth data mahasiswa"); // Melempar error jika gagal mengambil data
    }
};
