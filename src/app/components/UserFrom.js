"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/userSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    contactNumber: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid contact number")
      .required("Contact number is required"),
  });

  const handleSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    // alert(JSON.stringify(values, null, 2));
    console.log("LLLLL", values);
    dispatch(setUser(values));
  };

  return (
    <div
      className="mx-auto mt-8 bg-slate-100 border border-gray-200 p-8 rounded-md shadow-md
   md:w-96 w-full"
    >
      <h1 className="text-2xl font-bold mb-4">User Form</h1>
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
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
