"use client";

import Header from "./Header";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { Fields } from "../types/taskFields";

const fields: Fields[] = [
  {
    id: "1",
    title: "title",
    type: "text",
  },
  {
    id: "2",
    title: "project",
    type: "text",
  },
  {
    id: "3",
    title: "status",
    type: "select",
    options: ["ongoing", "process", "complete", "cancel"],
  },
  {
    id: "4",
    title: "progress",
    type: "number",
  },
  {
    id: "5",
    title: "dueDate",
    type: "date",
  },
  {
    id: "6",
    title: "assignees",
    type: "text",
  },
];
export default function CreateTask() {
  const {
    formData,
    isModalOpen,
    handleChange,
    handleSubmit,
    openModal,
    closeModal,
  } = useModal(fields);

  return (
    <>
      <Header
        title="Dashboard"
        showDate={true}
        onCreateTask={() => openModal(null)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        fields={fields}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title="Create Task"
        submitText="Create"
      />
    </>
  );
}
