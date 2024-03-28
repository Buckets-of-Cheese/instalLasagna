import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../graphql/mutations';
import '../styles/auth.scss'


export default function Auth() {
    const navigate = useNavigate();
    const { state, setState } = useStore();
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [formData, setFormData] = useState({
        errorMessages: [],
        username: '',
        email: '',
        password: '',
        isLogin: true
    });

    const [authenticateUser] = useMutation(formData.isLogin ? LOGIN_USER : REGISTER_USER);

    const location = useLocation();
    const message = location.state && location.state.message;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resolverName = formData.isLogin ? 'loginUser' : 'registerUser';

            const { data: userData } = await authenticateUser({
                variables: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            });

            setState({
                ...state,
                user: userData[resolverName]
            });

            setFormData({
                ...formData,
                username: '',
                email: '',
                password: '',
                errorMessages: []
            });

            navigate('/');
        } catch (err) {
            setFormData({
                ...formData,
                errorMessages: err.message.split(',')
            });
        }
    };


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    useEffect(() => {
        console.log(formData, isValidEmail)
    }, [formData, isValidEmail])

    useEffect(() => {
        validateEmail(formData.email)
    }, [formData.email])

    // Arrow function to validate an email and update state accordingly
    const validateEmail = (email) => {
        // Regex for validating email
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        // Check if the email matches the regex
        const isValid = regex.test(email);
        // Set the email validation result
        setIsValidEmail(isValid);
    };


    return (
        <div className="authform-wrapper flex flex-column justify-end items-end">
            {/* <span className='tab'>Login | SignUp</span> */}
            <div className="authform justify-center pa3">
                {/* {message && <p>{message}</p>} */}
                <div className="flex flex-column tl">
                    <h2 className="ma0 pa0">Enter Email</h2>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Email"
                        className="pa1 mv1"
                    />
                    <p className="f7 pa0 ma0 tr pointer gray hover-black underline-hover">Continue {`>>>`} </p>
                </div>

                {/* <form onSubmit={handleSubmit} className="flex flex-column items-end">
                    {formData.errorMessages.length > 0 && (
                        <div className="error-container">
                            {formData.errorMessages.map((error, index) => (
                                <p key={index} className="error text-center">{error}</p>
                            ))}
                        </div>
                    )}
                    {!formData.isLogin && (
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Username" />
                    )}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Email" />
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        type="password"
                        placeholder="Password" />
                    <button className="btn">Continue</button>
                </form> */}
            </div>
        </div>
    )
}