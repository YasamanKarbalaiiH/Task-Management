import { useState, ChangeEvent, FormEvent } from "react";
import { Fields, FormData, createFormData } from "../types/taskFields";

const API_URL = "http://localhost:8000/tasks";

export function useModal(fields: Fields[]) {
  const [formData, setFormData] = useState<FormData>(createFormData(fields));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingItem, setEditingItem] = useState<
    (FormData & { id: string }) | null
  >(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // UPDATE
        const res = await fetch(`${API_URL}/${editingItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error("Failed to update task");
        }
      } else {
        // CREATE
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error("Failed to create task");
        }
      }

      setFormData(createFormData(fields));
      setEditingItem(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (item: (FormData & { id: string }) | null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(createFormData(fields));
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return {
    formData,
    setFormData,
    isModalOpen,
    editingItem,
    handleChange,
    handleSubmit,
    openModal,
    closeModal,
  };
}
