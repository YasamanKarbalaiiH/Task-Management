import { useState, ChangeEvent, FormEvent } from "react";
import { Fields, FormData, createFormData } from "../types/taskFields";

type User = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

const TASKS_API = "http://localhost:8000/tasks";
const USERS_API = "http://localhost:8000/users";

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const usersRes = await fetch(USERS_API);

      if (!usersRes.ok) {
        throw new Error("Failed to fetch users");
      }

      const usersData: { users: User[] } = await usersRes.json();

      const users = usersData.users;

      const assignedNames = formData.assignees
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

      const assigneeIds = assignedNames
        .map((name) => {
          const user = users.find(
            (user) => user.name.toLowerCase() === name.toLowerCase(),
          );

          return user?.id;
        })
        .filter((id): id is string => id !== undefined);

      const taskData = {
        title: formData.title,
        project: formData.project,
        status: formData.status,
        progress: Number(formData.progress),
        dueDate: formData.dueDate,
        assignees: assigneeIds,
      };

      if (editingItem) {
        const res = await fetch(`${TASKS_API}/${editingItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });

        if (!res.ok) {
          throw new Error("Failed to update task");
        }
      } else {
        const res = await fetch(TASKS_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
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
    handleSelectChange,
    handleSubmit,
    openModal,
    closeModal,
  };
}
