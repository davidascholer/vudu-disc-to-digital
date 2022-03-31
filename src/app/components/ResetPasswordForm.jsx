import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from "yup";

import Button from "./common/Button";
import FormInput from "./form/FormInput";

//   ErrorMessage

const Schema = Yup.object().shape({
    email: Yup.string()
        .required()
        .min(1)
        .email()
        .label("Email")
        .trim(),
    code: Yup.string()
        .required()
        .min(1)
        .label("Code")
        .trim(),
    password: Yup.string()
        .required()
        .min(5)
        .label("Password")
        .matches(/^[^\n ]*$/, 'Spaces are not permitted'),

});

export default function ResetPasswordForm({ email, handleSubmit }) {

    return (
        <>
            <Formik
                initialValues={{
                    email: email,
                    code: '',
                    password: '',
                }}
                validationSchema={Schema}
                onSubmit={values => {
                    handleSubmit(values);
                }}
            >
                {({ values, errors, touched }) => (
                    <Form style={styles.formContainer}>
                        <FormInput
                            name="email"
                            type="email"
                            value={values.email}
                            error={errors.email}
                            styleContainer={{pointerEvents:'none'}}
                        />
                        <FormInput
                            name="code"
                            type="code"
                            value={values.code}
                            placeholder="Code"
                            error={errors.code}
                        />
                        <FormInput
                            name="password"
                            type="password"
                            value={values.password}
                            placeholder="Password"
                            error={errors.password}
                        />
                        <Button style={styles.buttonConfig} title={"reset password"} />
                    </Form>
                )}
            </Formik>
        </>
    );
}

const styles = {
    formContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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
        height: '20vh'
    },
    buttonConfig: {
        margin: '20px auto',
        maxWidth: 400,
        width: '60%',
    },
}