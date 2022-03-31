import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from "yup";

import Button from "./common/Button";
import FormInput from "./form/FormInput";

const Schema = Yup.object().shape({
    email: Yup.string()
        .required()
        .min(1)
        .email()
        .label("Email")
        .trim(),
});

export default function ForgotPasswordForm({ handleSubmit }) {

 
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    message: '',
                }}
                validationSchema={Schema}
                onSubmit={values => {
                    handleSubmit(values.email);
                }}
            >
                {({ values, errors }) => (
                    <Form style={styles.formContainer}>
                        <FormInput
                            name="email"
                            type="email"
                            value={values.email}
                            placeholder="Email"
                            error={errors.email}
                            styleContainer={styles.inputContainer}
                            styleError={styles.styleError}
                            styleField={styles.input}
                        />
                        <Button style={styles.buttonConfig} title={"send"} />
                    </Form>
                )}
            </Formik>
        </>
    );
}

const styles = {
    formContainer:{
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        width:'100%',
    },
    input: {
    },
    inputContainer: {
        width: '100%',
        maxWidth: 600
    },
    inputError: {
        
    },
    inputMessageContainer: {
        height:'20vh'
    },
    buttonConfig: {
        margin: '20px auto',
        maxWidth:400,
        width: '60%',
    },
}
