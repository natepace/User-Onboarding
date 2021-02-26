import * as yup from 'yup';

const Schema = yup.object().shape({
   username: yup.string()
        .trim()
        .required('Username is required, please fill out')
        .min(3, 'Username must be at least 3 characters long'),
        
    email: yup.string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    ToS: yup.boolean(),

})

export default Schema