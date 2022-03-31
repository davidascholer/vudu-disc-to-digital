import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";

import Button from "../common/Button";
import FormInput from "./FormInput";

//   ErrorMessage

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required()
        .min(1)
        .email()
        .label("Email")
        .trim(),
    password: Yup.string()
        .required()
        .min(5)
        .label("Password")
        .matches(/^[^\n ]*$/, 'Spaces are not permitted'),

});

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required()
        .min(1)
        .label("Name"),
    email: Yup.string()
        .required()
        .min(1)
        .email()
        .label("Email")
        .trim(),
    password: Yup.string()
        .required()
        .min(5)
        .label("Password")
        .matches(/^[^\n ]*$/, 'Spaces are not permitted'),

});


export default function FormSection({ buttonConfig, type, handleSubmit }) {

    const schema = (type === "signUp") ? SignupSchema : LoginSchema;

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                validationSchema={schema}
                onSubmit={values => {
                    // same shape as initial values
                    handleSubmit(values.email, values.password, values.name);
                }}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        {type === "signUp" &&
                            <FormInput
                                name="name"
                                type="name"
                                value={values.name}
                                placeholder="Name"
                                error={errors.name}
                            />
                        }
                        <FormInput
                            name="email"
                            type="email"
                            value={values.email}
                            placeholder="Email"
                            error={errors.email}
                        />
                        <FormInput
                            name="password"
                            type="password"
                            value={values.password}
                            placeholder="Password"
                            error={errors.password}
                        />
                        <Button buttonStyles={buttonConfig.styles} title={buttonConfig.title} />
                    </Form>
                )}
            </Formik>
        </>
    );
}

