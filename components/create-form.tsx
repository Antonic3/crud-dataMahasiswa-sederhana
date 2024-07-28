"use client";

import { saveData } from "@/lib/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "@/components/buttons";

// Komponen CreateForm untuk membuat data baru
const CreateForm = () => {
    // Komponen CreateForm untuk membuat data baru
    const [state, formAction] = useFormState(saveData, null);
  
return (
    <div>{/* Form untuk memasukkan data baru */}
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
                placeholder="Full Name..."/>
                {/* Menampilkan error jika ada kesalahan pada input nama */}
                <div id="name-error" aria-live="polite" aria-atomic="true">   
                    <p className="mt-2 text -sm text-red-500">{state?.Error?.name}</p>
                </div>
            </div>
            <div className="mb-5">
                <label 
                htmlFor="Class" 
                className="block test-sm font-medium">
                Class
                </label>
                <input 
                type="text" 
                name="class" 
                id="class" 
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-sm 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder="Class..."/>
                <div id="class-error" aria-live="polite" aria-atomic="true">   
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
                placeholder="Phone Number..."/>
                <div id="phone-error" aria-live="polite" aria-atomic="true">   
                    <p className="mt-2 text -sm text-red-500">{state?.Error?.phone}</p>
                </div>
            </div>

             {/* Menampilkan pesan error umum jika ada */}
            <div id="message-error" aria-live="polite" aria-atomic="true">   
                <p className="mt-2 text -sm text-red-500">{state?.message}</p>
            </div>
            {/* Tombol submit untuk menyimpan data */}
            <SubmitButton label="save" />
        </form>
    </div>
  )
}

export default CreateForm