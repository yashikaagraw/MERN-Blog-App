import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';

const Signup = () => {

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
    
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };


  return (
    <div  style={containerStyle}>
      <h1 style={headingStyle}>Signup</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {};

          // Perform validation logic here, for example:
          if (!values.name) {
            errors.name = 'Name is required';
          }

          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          };

          fetch('http://localhost:8000/signup', requestOptions)
            .then((response) => {
              console.log("----",response)
              if(response.status===409){
                alert ('email is already registerd')
              }
              alert()
              if (!response.ok) {
                return response.json().then((errorData) => {
                  if (errorData.field) {
                    setFieldError(errorData.field, errorData.message);
                  } else {
                    throw new Error(errorData.message);
                  }
                });
              }
              return response.json();
            })
            .then((data) => {
              console.log(data)
              console.log(data.msg);
              alert(data.msg)
              setSubmitting(false);
              setStatus('Posted successfully');
            })
            .catch((error) => {
              setSubmitting(false);
              setStatus(error.message);
            });
        }}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <div style={formStyle}>
          <Form>
            <Field type="text" name="name" placeholder="Name" style={inputStyle} />
            <ErrorMessage name="name" component="div" />
            <Field type="email" name="email" placeholder="Email" style={inputStyle}/>
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Password" style={inputStyle} />
            <ErrorMessage name="password" component="div" />
            {isSubmitting && <div>Submitting...</div>}
            <button type="submit" disabled={isSubmitting} style={buttonStyle}>
              Submit
            </button>
          </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
