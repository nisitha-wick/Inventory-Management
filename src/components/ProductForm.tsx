import { ErrorMessage, Field, Form, Formik } from "formik";
import type { Category, Product } from "../types";
import * as Yup from "yup";
import { generateSKU } from "../utils/sku-gen";

interface ProductFormProps {
  categories: Category[];
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Too short")
    .max(80, "Too long")
    .required("Product name is required"),
  sku: Yup.string().trim().required("SKU is required"),
  category: Yup.string().required("Please select a category"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock quantity is required"),
});

export default function ProductForm({
  categories,
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const isEdit = Boolean(initialData);

  const inputStyles =
    "w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none";
  const labelStyles =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
  const errorStyles =
    "text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium";

  return (
    <Formik
      initialValues={{
        name: initialData?.name ?? "",
        sku: initialData?.sku ?? generateSKU(),
        category: initialData?.category ?? categories[0]?.name ?? "",
        price: initialData?.price ?? 0,
        stock: initialData?.stock ?? 0,
      }}
      validationSchema={ProductSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-2xl mx-auto space-y-5 sm:space-y-6 bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isEdit
                ? "Update the details of your inventory item below."
                : "Fill in the details below to add a new item to your inventory."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className={labelStyles}>
                Product Name
              </label>
              <Field
                name="name"
                className={inputStyles}
                placeholder="e.g. Wireless Keyboard"
              />
              <ErrorMessage name="name" component="p" className={errorStyles} />
            </div>

            <div>
              <label htmlFor="sku" className={labelStyles}>
                Product ID (SKU)
              </label>
              <Field
                name="sku"
                className={`${inputStyles} ${isEdit ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-70" : ""}`}
                readOnly={!isEdit}
              />
              <ErrorMessage name="sku" component="p" className={errorStyles} />
            </div>

            <div>
              <label htmlFor="category" className={labelStyles}>
                Category
              </label>
              <Field as="select" name="category" className={inputStyles}>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="p"
                className={errorStyles}
              />
            </div>

            <div>
              <label htmlFor="price" className={labelStyles}>
                Price ($)
              </label>
              <Field
                name="price"
                type="number"
                step="0.01"
                className={inputStyles}
                placeholder="0.00"
              />
              <ErrorMessage
                name="price"
                component="p"
                className={errorStyles}
              />
            </div>

            <div>
              <label htmlFor="stock" className={labelStyles}>
                Stock Quantity
              </label>
              <Field
                name="stock"
                type="number"
                className={inputStyles}
                placeholder="0"
              />
              <ErrorMessage
                name="stock"
                component="p"
                className={errorStyles}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
