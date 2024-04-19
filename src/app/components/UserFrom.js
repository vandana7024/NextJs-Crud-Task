"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUser, updateUser } from "@/lib/userSlice";
import { useParams, useRouter } from "next/navigation";

const UserForm = ({ type }) => {
  const router = useRouter();
  const { id } = useParams();

  const currentUser = useSelector((state) =>
    state.user.users.find((user) => user.id === Number(id))
  );

  console.log("currentUser", currentUser);

  const dispatch = useDispatch();
  const initialValues = {
    name: currentUser ? currentUser.name : "",
    email: currentUser ? currentUser.email : "",
    contactNumber: currentUser ? currentUser.contactNumber : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid contact number")
      .required("Contact number is required"),
  });

  console.log("type", type);
  const handleSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    // alert(JSON.stringify(values, null, 2));
    console.log("LLLLL", values);
    if (type === "create") {
      values.id = Math.floor(Math.random() * 1000);
      dispatch(addUser(values));
      router.push("/user/view");
    } else {
      dispatch(updateUser({ id: Number(id), newData: values }));
      router.push("/user/view");
    }
  };

  return (
    <div
      className="mx-auto mt-8 bg-slate-100 border border-gray-200 p-8 rounded-md shadow-md
   md:w-96 w-full"
    >
      <h1 className="text-2xl font-bold">User Form</h1>
      <p
        className="mb-4 text-slate-700 cursor-pointer text-sm"
        onClick={() => router.push("/user/view")}
      >
        Users
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-3 rounded-md pl-2 ${
                  errors.name && touched.name ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-3 rounded-md pl-2 ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <Field
                id="contactNumber"
                name="contactNumber"
                type="tel"
                autoComplete="tel"
                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-3 rounded-md pl-2 ${
                  errors.contactNumber && touched.contactNumber
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="contactNumber"
                component="p"
                className="text-red-500  mt-1 text-xs"
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {type === "create" ? "Create" : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
