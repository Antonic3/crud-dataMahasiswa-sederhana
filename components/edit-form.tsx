"use client";

import { updateData } from "@/lib/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "@/components/buttons";
import type { Mahasiswa } from "@prisma/client";

// Komponen UpdateForm untuk memperbarui data mahasiswa
const UpdateForm = ({data}: {data:Mahasiswa}) => {
    // Mengikat fungsi updateData dengan ID mahasiswa
    const UpdateDataWithId = updateData.bind(null, data.id);
     // Menggunakan hook useFormState untuk mengelola state form dan aksi form
    const [state, formAction] = useFormState(UpdateDataWithId, null);
  
return (
    <div>
        <form action={formAction}>
            <div className="mb-5">
                <label 
                htmlFor="name" 
                className="block test-sm font-medium">
                Full Name
                </label>
                <input 
                type="text" 
                name="name" 
                id="name" 
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder="Full Name..."
                defaultValue={data.name}/>
                <div id="name-error" aria-live="polite" aria-atomic="true">   
                    <p className="mt-2 text -sm text-red-500">{state?.Error?.name}</p>
                </div>
            </div>
            <div className="mb-5">
                <label 
                htmlFor="class" 
                className="block test-sm font-medium">
                Class
                </label>
                <input 
                type="text" 
                name="class" 
                id="class" 
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder="Class..."
                defaultValue={data.kelas}/>
                <div id="kelas-error" aria-live="polite" aria-atomic="true">   
                    <p className="mt-2 text -sm text-red-500">{state?.Error?.class}</p>
                </div>
            </div>
            <div className="mb-5">
                <label 
                htmlFor="phone" 
                className="block test-sm font-medium">
                Phone Number
                </label>
                <input 
                type="text" 
                name="phone" 
                id="phone" 
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder="Phone Number..."
                defaultValue={data.phone}/>
                <div id="phone-error" aria-live="polite" aria-atomic="true">   
                    <p className="mt-2 text -sm text-red-500">{state?.Error?.phone}</p>
                </div>
            </div>
            <div id="message-error" aria-live="polite" aria-atomic="true">   
                <p className="mt-2 text -sm text-red-500">{state?.message}</p>
            </div>
            <SubmitButton label="Update" />
        </form>
    </div>
  )
}

export default UpdateForm;