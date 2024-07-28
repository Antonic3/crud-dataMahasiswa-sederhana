// Impor komponen UpdateForm dari direktori components
import UpdateForm from "@/components/edit-form";
// Impor fungsi getDataById dari library data
import { getDataById } from "@/lib/data";
// Impor fungsi notFound dari next/navigation untuk menangani kasus data tidak ditemukan
import { notFound } from "next/navigation";

// Definisikan komponen UpdateDataPage sebagai fungsi asinkron
const UpdateDataPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    // Ambil data berdasarkan ID
    const data = await getDataById(id);
  
    if (!data) {
      notFound();
    }
  
  return (
    <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Update Data Mahasiswa</h1>
        <UpdateForm data={data}/>
    </div>
  );
};

export default UpdateDataPage;