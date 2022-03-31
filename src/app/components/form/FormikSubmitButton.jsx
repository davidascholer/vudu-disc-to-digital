import React from "react";
import { useFormikContext, Field } from "formik";

export default function FormikSubmitButton({ style, type, title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Field type={type} value={title} style={style}></Field>
    // <input type={type} value={title} style={style} onClick={handleSubmit}></input>
//   <Button title={title} onClick={handleSubmit}/>
    )
}

