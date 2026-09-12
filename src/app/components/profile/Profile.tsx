"use client";

import { profileType } from "@/app/api/Profile";
import Image from "next/image";
import Modal from "../Modal";
import { useModal } from "@/app/hooks/useModal";
import { Fields } from "@/app/types/taskFields";

type DataProps = {
  data: profileType;
};

const fields: Fields[] = [
  {
    id: "1",
    title: "name",
    type: "text",
  },
  {
    id: "2",
    title: "role",
    type: "text",
  },
  {
    id: "3",
    title: "email",
    type: "text",
  },
  {
    id: "4",
    title: "phone",
    type: "text",
  },
  {
    id: "5",
    title: "location",
    type: "text",
  },
  {
    id: "6",
    title: "joined",
    type: "date",
  },
];

function Profile({ data }: DataProps) {
  const {
    formData,
    isModalOpen,
    handleChange,
    handleSubmit,
    openModal,
    closeModal,
  } = useModal(fields, "profile");

  const handleEdit = () => {
    openModal({
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
      location: data.location,
      joined: data.joined,
      avatar: data.avatar,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Image
              key={data.id}
              src={data.avatar}
              alt={data.name}
              width={110}
              height={110}
              className="h-24 w-24 shrink-0 rounded-full border-4 border-primary-light object-cover sm:h-28 sm:w-28"
            />

            <div className="flex min-w-0 flex-1 flex-col items-center sm:items-start">
              <p className="text-lg font-bold text-text sm:text-xl">
                {data.name}
              </p>

              <span className="mt-1 text-sm text-text-secondary">
                {data.role}
              </span>

              <div className="mt-5 flex w-full flex-col gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="shrink-0 fill-text-muted"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                    />
                  </svg>

                  <span className="truncate text-sm text-text-muted">
                    {data.phone}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="shrink-0 fill-text-muted"
                  >
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                  </svg>

                  <span className="truncate text-sm text-text-muted">
                    {data.email}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="shrink-0 fill-text-muted"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>

                  <span className="truncate text-sm text-text-muted">
                    {data.location}
                  </span>
                </div>
              </div>

              <button
                onClick={handleEdit}
                className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-primary/85 sm:w-auto"
              >
                Edit Information
              </button>
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
          <p className="mb-5 text-lg font-bold text-text">
            Personal Information
          </p>

          <div className="flex flex-col">
            <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-sm font-medium text-text">Full Name</span>

              <span className="break-all text-sm text-text-secondary sm:text-right">
                {data.name}
              </span>
            </div>

            <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-sm font-medium text-text">Email</span>

              <span className="break-all text-sm text-text-secondary sm:text-right">
                {data.email}
              </span>
            </div>

            <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-sm font-medium text-text">
                Phone Number
              </span>

              <span className="text-sm text-text-secondary sm:text-right">
                {data.phone}
              </span>
            </div>

            <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-sm font-medium text-text">Location</span>

              <span className="text-sm text-text-secondary sm:text-right">
                {data.location}
              </span>
            </div>

            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-sm font-medium text-text">Joined</span>

              <span className="text-sm text-text-secondary sm:text-right">
                {data.joined}
              </span>
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        fields={fields}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title="Edit Profile"
        submitText="Save"
      />
    </>
  );
}

export default Profile;
