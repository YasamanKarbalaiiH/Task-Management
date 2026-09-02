import { Fields, FormData } from "./taskFields";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fields: Fields[];
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  submitText: string;
};
