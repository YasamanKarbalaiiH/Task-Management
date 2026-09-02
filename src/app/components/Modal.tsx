import { ModalProps } from "../types/modal";

export default function Modal({
  isOpen,
  onClose,
  fields,
  formData,
  handleChange,
  handleSubmit,
  title,
  submitText,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white  rounded-xl p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-5">{title}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block mb-1">{field.title}</label>

              {field.type === "select" ? (
                <select
                  name={field.title}
                  value={formData[field.title] ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 outline-none"
                >
                  <option value="" disabled>
                    Select status
                  </option>

                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.title}
                  value={formData[field.title] ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1 outline-none"
                />
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue  rounded-lg p-2 text-black">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}
