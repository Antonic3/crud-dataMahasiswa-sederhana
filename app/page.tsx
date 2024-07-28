// Mengimpor komponen yang diperlukan dari direktori components dan library data
import FormTable from "@/components/form-table";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { CreateButton } from "@/components/buttons";
import { getDataPages } from "@/lib/data";

// Mendefinisikan komponen Page sebagai fungsi asinkron
const Page = async ({
  searchParams
}:{
  searchParams?:{
    query?: string;
    page?: String;
  }
}) => {
    // Mendapatkan nilai query dari searchParams, jika tidak ada maka default ke string kosong
    const query = searchParams?.query || "";
    // Mendapatkan nilai halaman saat ini dari searchParams, jika tidak ada maka default ke 1
    const currentPage = Number(searchParams?.page) || 1;
    // Mengambil total halaman berdasarkan query dengan memanggil fungsi getDataPages
    const totalPages = await getDataPages(query);

  return(
    
    <div className="max-w-screen-md mx-auto mt-10 p-5 rounded-lg shadow-lg"> 
    <h1 className="text-2xl font-semibold mb-5 text-center text-gray-800">Data Mahasiswa</h1>
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton/>
      </div> 
      {/* Komponen tabel yang menerima query dan halaman saat ini sebagai props */}
      <FormTable query={query} currentPage={currentPage}/>
      <div className="flex justify-center mt-4">
        {/* Komponen pagination yang menerima total halaman sebagai prop */}
      <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
};

export default Page;
