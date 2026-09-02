export type TaskStatus = "ongoing" | "cancel" | "process" | "complete";

export type Task = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  progress: number;
  dueDate: string;
  assignees: string[];
};

export type Fields = {
  id: string;
  title: string;
  type: "text" | "number" | "date" | "select";
  options?: string[];
};

export type FormData = Record<string, string>;

export const createFormData = (fields: Fields[]): FormData => {
  return fields.reduce<FormData>((obj, field) => {
    obj[field.title] = "";
    return obj;
  }, {});
};
