import UserForm from "@/app/components/UserFrom";
import React from "react";

function Page() {
  return (
    <div className="bg-white flex justify-center items-center text-black h-[100vh]">
      <UserForm type="edit" />
    </div>
  );
}

export default Page;
