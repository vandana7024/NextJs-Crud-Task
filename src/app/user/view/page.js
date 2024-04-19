"use client";
import { deleteUser } from "@/lib/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state) => state.user.users);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (userId) => {
    router.push(`/user/edit/${userId}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-black">
      {" "}
      <div className="flex items-end justify-end w-full my-6 gap-3">
        <button
          className="text-indigo-600 
         px-4 py-2 border border-indigo-600 hover:bg-indigo-600 
          hover:text-white 
         rounded-md shadow-sm text-sm font-medium"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          className="text-indigo-600 
         px-4 py-2 border border-indigo-600 hover:bg-indigo-600 
          hover:text-white 
         rounded-md shadow-sm text-sm font-medium"
          onClick={() => router.push("/user/create")}
        >
          Create User
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.contactNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    handleEdit(user.id);
                  }}
                >
                  Edit
                </button>
                <span className="mx-2">|</span>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-900 mr-2"
                >
                  Delete
                </button>

                {/* Add edit functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
