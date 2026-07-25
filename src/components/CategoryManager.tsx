import { ErrorMessage, Field, Form, Formik } from "formik";
import type { Category } from "../types";
import * as Yup from "yup";

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (name: string) => void;
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Too Short")
    .required("Category name is required"),
});

export default function CategoryManager({
  categories,
  onAdd,
}: CategoryManagerProps) {
  const inputStyles =
    "w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none";
  const errorStyles =
    "text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Categories ({categories.length})
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-6">
        {categories.map((c) => (
          <span
            key={c.id}
            className="inline-flex items-center px-3.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
          >
            {c.name}
          </span>
        ))}
      </div>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={Schema}
        onSubmit={(values, { resetForm }) => {
          onAdd(values.name.trim());
          resetForm();
        }}
      >
        <Form className="flex flex-col sm:flex-row gap-3 items-start">
          <div className="flex-1 w-full">
            <Field
              name="name"
              placeholder="Enter new category name..."
              className={inputStyles}
            />
            <ErrorMessage name="name" component="p" className={errorStyles} />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-gray-900 dark:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            Add Category
          </button>
        </Form>
      </Formik>
    </div>
  );
}
