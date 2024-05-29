import React, { useState, useEffect } from 'react';
import Error from "../components/Error";
import Loading from "../components/Loading";
import './Login.css';
import axios from "axios";
import swal from 'sweetalert';

import { useHistory, Link } from "react-router-dom";
 
const LoginScreen = () => {
    const history = useHistory();

    const [loginInput, setLogin] = useState({
        tel: '',
        code_Client:'',
        error_list: [],

    });

    const handleInputLogin = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

 
    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            tel: loginInput.tel,
            code_Client: loginInput.code_Client
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/log', data).then(res => {
                if (res.data.status === 200) {

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_client', JSON.stringify(res.data.client));
 
                
                        history.push('/espaceclient/dashboard');
                        window.location.reload();

               
                 

                }   else if (res.data.status === 401) {
                    swal("Oops", res.data.message, "error");

                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });

                }
            });
        });



    }

  

    return (
        <div className='login-screen-box '>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="avatar" alt="User Avatar" />
            <h1>Connectez-vous</h1>
          
            <div>
                <input placeholder='Tel' required className="form-control"onChange={handleInputLogin} value={loginInput.tel} name="tel" />
                <span className="text-danger">{loginInput.error_list.tel}</span>

                <input placeholder='Code client' required className="form-control"onChange={handleInputLogin} value={loginInput.code_Client} name="code_Client" />
                <span className="text-danger">{loginInput.error_list.code_Client}</span>

                <button onClick={loginSubmit} type="submit">Se connecter </button>

            </div>
        </div>
    );
};

export default LoginScreen;