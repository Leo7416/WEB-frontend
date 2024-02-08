import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import NavBar from "./NavBar";
import Breadcrumbs from './Breadcrumbs';

const Register = () => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(clearMessage());

    }, [dispatch]);

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({

        username: Yup.string()
            .test(
              "len",
              "Имя должно быть от 3 до 20 символов.",
              (val) =>
                val && val.toString().length >= 3 && val.toString().length <= 20
            )

            .required("Это поля обязательное!"),

        email: Yup.string()
            .email("Это некоректный email.")

            .required("Это поля обязательное!"),

        password: Yup.string()
            .test(
              "len",
              "Пароль должен быть от 6 до 40 символов.",
              (val) =>
                val && val.toString().length >= 6 && val.toString().length <= 40
            )

            .required("Это поля обязательное!"),
    });

    const handleRegister = (formValue) => {
        const { username, email, password } = formValue;

        setSuccessful(false);

        dispatch(register({ username, email, password }))
            .unwrap()

            .then(() => {
                setSuccessful(true);
            })

            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            <div className="col-md-6 signup-form">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                        style={{ width: "400px", height: "400px" }} 
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >

                    {({ errors, touched }) => (
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Имя</label>
                                        <Field
                                            name="username"
                                            type="text"
                                            className={
                                                "form-control" +
                                                (errors.username && touched.username
                                                ? " is-invalid"
                                                : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                <div className="form-group">
                                    <label htmlFor="email">Почта</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={
                                            "form-control" +
                                            (errors.email && touched.email ? " is-invalid" : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Пароль</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={
                                            "form-control" +
                                            (errors.password && touched.password
                                            ? " is-invalid"
                                            : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Зарегистрироваться
                                    </button>
                                </div>
                                <div className="form-group">
                                        <p>
                                            Уже есть аккаунт?{" "}
                                            <Link to="/login">Войти</Link>
                                        </p>
                                </div>
                            </div>
                            )}
                        </Form>
                    )}
                </Formik>
                </div>

                {message && (
                    <div className="form-group">
                        <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;