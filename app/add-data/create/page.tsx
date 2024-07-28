// Impor komponen CreateForm dari direktori components
import CreateForm from "@/components/create-form";
// Definisikan komponen CreateDataPage
const CreateDataPage = () => {
  return (
    // Wrapper utama dengan maksimal lebar (max-w-md) dan margin auto untuk penempatan di tengah layar, serta margin top (mt-5)
    <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Data Mahasiswa</h1>
        <CreateForm/> {/* Render komponen CreateForm */}
    </div>
  );
};

export default CreateDataPage