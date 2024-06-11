import React, { useState, useEffect } from 'react';

import './Login.css';
import axios from "axios";
import swal from 'sweetalert';

import { useHistory, Link } from "react-router-dom";

const LoginScreen = () => {
    const history = useHistory();

    const [loginInput, setLogin] = useState({
        password: '',
        code_Client: '',
        error_list: [],

    });

    const handleInputLogin = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }


    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            password: loginInput.password,
            code_Client: loginInput.code_Client
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/log', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_client', JSON.stringify(res.data.client));
                    history.push('/espaceclient/dashboard');
                    window.location.reload();
                } else {
                    swal("Oops", res.data.message, "error");
                }
            }).catch(error => {
                if (error.response.status === 401) {
                    swal("Oops", "Identifiant ou mot de passe incorrect", "error");
                } 
                else if (error.response.status === 429) {
                    
                    swal("Oops", response.data.message, "error");

                } else {
                    console.error('Error logging in:', error);
                }
            });
        });
    }


    return (
        <div className='login-screen-box '>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="avatar" alt="User Avatar" />
            <h1>Connectez-vous</h1>

            <div>

                <input placeholder='Code client' required className="form-control" onChange={handleInputLogin} value={loginInput.code_Client} name="code_Client" />
                <span className="text-danger">{loginInput.error_list.code_Client}</span>

                <input type='password' placeholder='Password' required className="form-control" onChange={handleInputLogin} value={loginInput.password} name="password" />
                <span className="text-danger">{loginInput.error_list.password}</span>

                <button onClick={loginSubmit} type="submit">Se connecter </button>

                <div className="card-footer text-center pt-0 px-lg-2 px-1 mt-3">
                    <p className="mb-4 text-sm mx-auto">
                        <Link to="/forgotpassword" className="text-info text-gradient font-weight-bold">Mot de passe oublié ?</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginScreen;