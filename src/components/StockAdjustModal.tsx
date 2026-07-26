import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Product } from "../types";

interface StockAdjustModalProps {
  product: Product;
  onAdjust: (change: number, reason: "restock" | "sale") => void;
  onClose: () => void;
}

export default function StockAdjustModal({ product, onAdjust, onClose }: StockAdjustModalProps) {
  const Schema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Must be a number")
      .integer("Must be a whole number")
      .positive("Must be greater than 0")
      .required("Required"),
    type: Yup.string().oneOf(["restock", "sale"]).required(),
  }).test("sale-limit", "Not enough stock for this sale", (values) => {
    if (!values) return true;
    if (values.type === "sale" && values.amount > product.stock) return false;
    return true;
  });

  const inputStyles = "w-full bg-(--bg) dark:bg-gray-900 border border-(--border) dark:border-gray-600 rounded-lg px-4 py-2.5 text-(--text-h) dark:text-gray-100 focus:ring-2 focus:ring-(--accent) focus:border-(--accent) transition-colors duration-200 outline-none";
  const labelStyles = "block text-sm font-semibold text-(--text) dark:text-gray-300 mb-1.5";
  const errorStyles = "text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-(--surface) dark:bg-gray-800 rounded-xl shadow-(--shadow) dark:shadow-xl border border-(--border) dark:border-gray-700 p-5 sm:p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-(--text) hover:text-(--text-h) dark:hover:text-gray-200 transition-colors bg-(--bg) dark:bg-gray-700 rounded-full p-1.5 shadow-sm"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-5 sm:mb-6 pr-8">
          <h3 className="text-base sm:text-lg font-bold text-(--text-h) dark:text-white mb-2 leading-tight">
            Adjust Stock
          </h3>
          <p className="text-sm text-(--text) dark:text-gray-400">
            For <span className="font-semibold text-(--text-h) dark:text-gray-300">{product.name}</span>
          </p>
        </div>

        {/* Current Stock Badge */}
        <div className="flex items-center justify-between bg-(--accent-bg) dark:bg-blue-900/20 border border-(--accent-border) dark:border-blue-800/30 rounded-lg p-3 mb-5 sm:mb-6">
          <span className="text-sm font-medium text-(--text-h) dark:text-blue-300">Current Stock</span>
          <span className="text-lg font-bold text-(--accent) dark:text-blue-200">{product.stock}</span>
        </div>

        <Formik
          initialValues={{ amount: 1, type: "restock" as "restock" | "sale" }}
          validationSchema={Schema}
          onSubmit={(values, { setFieldError }) => {
            if (values.type === "sale" && values.amount > product.stock) {
              setFieldError("amount", "Not enough stock for this sale");
              return;
            }
            const change = values.type === "restock" ? values.amount : -values.amount;
            onAdjust(change, values.type);
            onClose();
          }}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="type" className={labelStyles}>Adjustment Type</label>
              <Field as="select" id="type" name="type" className={inputStyles}>
                <option value="restock">Restock (Increase)</option>
                <option value="sale">Sale (Decrease)</option>
              </Field>
            </div>
            
            <div>
              <label htmlFor="amount" className={labelStyles}>Quantity</label>
              <Field id="amount" name="amount" type="number" min="1" className={inputStyles} />
              <ErrorMessage name="amount" component="p" className={errorStyles} />
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-(--border) dark:border-gray-700 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium text-(--text) dark:text-gray-300 bg-(--surface) dark:bg-gray-800 border border-(--border) dark:border-gray-600 hover:bg-(--bg) dark:hover:bg-gray-700 focus:ring-4 focus:ring-(--accent-bg) dark:focus:ring-gray-700 active:scale-95 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-(--accent) text-white px-4 py-2.5 rounded-lg font-medium hover:opacity-90 focus:ring-4 focus:ring-(--accent-bg) active:scale-95 transition-all duration-200"
              >
                Confirm
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}