// Fungsi untuk memformat tanggal menjadi format yang lebih mudah dibaca
export const formatDate = (datestr: string) =>{
    const date = new Date(datestr);// Membuat objek Date dari string tanggal
    // Membuat formatter untuk tanggal dan waktu dengan format lokal Indonesia
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium", // Gaya format tanggal (contoh: 27 Jul 2024)
        timeStyle: "short",  // Gaya format waktu (contoh: 08.30)
    });
    return formatter.format(date);
};
// Fungsi untuk menghasilkan daftar nomor halaman untuk paginasi
export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  // Jika halaman saat ini berada di awal
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }
  
    if (currentPage >= totalPages - 2) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }
  
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };