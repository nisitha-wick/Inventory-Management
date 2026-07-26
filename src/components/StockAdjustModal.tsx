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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="font-semibold mb-1">Adjust Stock — {product.name}</h3>
        <p className="text-sm text-gray-500 mb-4">Current stock: {product.stock}</p>

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
          <Form className="space-y-3">
            <Field as="select" name="type" className="w-full border rounded px-3 py-2">
              <option value="restock">Restock (increase)</option>
              <option value="sale">Sale (decrease)</option>
            </Field>
            <div>
              <Field name="amount" type="number" className="w-full border rounded px-3 py-2" />
              <ErrorMessage name="amount" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">
                Confirm
              </button>
              <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}