import React from "react";
import { Formik, Form } from "formik";

export default function FormikForm({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        {() => <>{children}</>}
      </Form>
    </Formik>
  );
}
