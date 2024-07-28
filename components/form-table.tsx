// Mengimpor fungsi dan komponen yang diperlukan dari beberapa library dan file
import { getDatas } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { EditButton, DeleteButton } from "@/components/buttons"

// Komponen FormTable untuk menampilkan data mahasiswa dalam bentuk tabel
const FormTable = async ({
    query, 
    currentPage,
}: {
    query: string; 
    currentPage: number;
}) => {
     // Mendapatkan data mahasiswa berdasarkan query dan halaman saat ini
    const datas = await getDatas(query, currentPage)

    return(
         // Membuat tabel dengan gaya tailwindcss
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm bg-gray-400 text-white uppercase">
             <tr>
              <th className="py-3 px-6">Id</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Class</th>
              <th className="py-3 px-6">Phone Number</th>
              <th className="py-3 px-6">Createad At</th>
              <th className="py-3 px-6 text-center">Action</th>
             </tr>
            </thead>
            <tbody>
            {/* Mengiterasi data mahasiswa dan menampilkan setiap baris data */}
            {datas.map((data, index) =>(
                <tr key={data.id} className="bg-white border-b">                                    
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{data.name}</td>
                <td className="py-3 px-6">{data.kelas}</td>
                <td className="py-3 px-6">{data.phone}</td>
                <td className="py-3 px-6">
                    {formatDate(data.createdAt.toString())}</td>
                <td className="flex justify-center gap-1 py-3">
                    <EditButton id={data.id} />
                    <DeleteButton id={data.id} />
                </td>
           </tr>
            ))}
            
            </tbody>
        </table>
    )
}

export default FormTable;