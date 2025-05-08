import { useSingleUserQuery } from "@/hooks/useSingleUser";
import { User } from "@/types/userType";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

type detailuserProp ={
 user: User;
 handleDelete:  (id: number) => void
} 

export default function DetailUserCard({user, handleDelete}: detailuserProp) {
    const city = user.address.city;
    const router = useRouter();
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-xl overflow-hidden">
    <div className="p-6">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">{user.name}</h1>
        <p className="text-lg text-gray-600 font-medium mb-2">Username: <span className="font-semibold text-gray-800">{user.username}</span></p>
        <p className="text-lg text-gray-600 font-medium mb-2">Phone: <span className="font-semibold text-gray-800">{user.phone}</span></p>
        <p className="text-lg text-gray-600 font-medium mb-4">City: <span className="font-semibold text-gray-800">{city}</span></p>
    </div>
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-lg">
        <button
            onClick={() => router.push(`/users/${user.id}/edit`)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
        >
            <FaEdit className="mr-2" /> Edit
        </button>
        <button
            onClick={() => handleDelete(user.id)}
            className="flex items-center text-red-600 hover:text-red-800 transition duration-200 ease-in-out cursor-pointer"
        >
            <FaTrashAlt className="mr-2" /> Delete
        </button>
    </div>
</div>
  )
}
