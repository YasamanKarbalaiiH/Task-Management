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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <div className="mb-6 pr-8">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Fill in the information below to create a task.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.title}
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {field.title}
              </label>

              {field.type === "select" ? (
                <select
                  id={field.title}
                  name={field.title}
                  value={formData[field.title] ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                  id={field.title}
                  type={field.type}
                  name={field.title}
                  value={formData[field.title] ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              )}
            </div>
          ))}

          {/* Actions */}
          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-md sm:w-auto"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
