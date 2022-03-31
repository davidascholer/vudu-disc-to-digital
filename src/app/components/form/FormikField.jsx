import React from "react";
import { useFormikContext, Field } from "formik";

import TextInput from "../TextInput";
// import ErrorMessage from "./ErrorMessage";


function FormikField({ name, onFocus, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <Field name={name}>
    {/* <span style={styles.container}>FormField</span> */}
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        onFocus={onFocus}
        {...otherProps}
      />
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
      </Field>
  );
}

const styles = {
    container:{
        display: 'block',
    }
}

export default FormikField;
