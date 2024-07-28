"use client"

import {IoSearch} from "react-icons/io5"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// Komponen search untuk menangani pencarian
const search = () => {
    const searchParams = useSearchParams(); // Mendapatkan parameter query saat ini
    const pathname = usePathname(); // Mendapatkan path saat ini
    const { replace } = useRouter(); // Mengambil fungsi replace dari useRouter untuk mengganti URL

    // Fungsi handleSearch untuk menangani perubahan input dengan debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    // Membuat salinan dari searchParams
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Mengatur halaman ke 1 setiap kali pencarian dilakukan
        if (term) {
            params.set('query', term); // Mengatur parameter query jika ada term pencarian
        } else {
            params.delete('query'); // Menghapus parameter query jika term kosong
        }
        // Mengganti URL dengan parameter yang diperbarui
        replace(`${pathname}?${params.toString()}`);
    }, 300); // Debounce dengan delay 300ms

  return (
    <div className="relative flex flex-1">
        {/* Input untuk pencarian */}
        <input 
            type="text"
            className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)} // Memanggil handleSearch setiap kali nilai input berubah
            defaultValue={searchParams.get("query")?.toString()} // Mengatur nilai default dari parameter query
        />
        {/* Ikon pencarian */}
            <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
            </div>
  )
}

export default search