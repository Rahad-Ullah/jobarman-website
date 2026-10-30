import AddNewResumeForm2 from "@/components/addNewResumeForm/AddResume";
import React from "react";

export const metadata = {
  title: "Build Resume | Jobarman",
  description:
    "Create and customize your professional resume with Jobarman's resume builder.",
};

const AddNewResume = () => {
  return (
    <main className="bg-[#F8FAFC] min-h-screen py-6 px-3 sm:px-6">
      <AddNewResumeForm2 />
    </main>
  );
};

export default AddNewResume;

