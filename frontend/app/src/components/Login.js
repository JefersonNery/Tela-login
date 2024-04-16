import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password)


        try {
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({ email, password }), {
                headers: { 'Content-type': 'application/json' }
            });

            setUser(response.data);


        } catch (error) {
            if (error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                setError('Usuario ou Senha invalidos');
            }
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
    };

    return (
        <div className='login-form-wrap'>
            {user == null ? (
                <div>
                    <h2>Login</h2>
                    <form className='login-form'>
                        <input
                            type='email'
                            name='email'
                            placeholder='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            required
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        <button
                            type='submit'
                            className='btn-login'
                            onClick={(e) => handleLogin(e)}
                            >Login
                        </button>
                    </form>
                    <p className='error-Color'>{error}</p>
                </div>
            ) : (
                <div>
                    <h2>Olá , {user.name}</h2>
                    <button type='button' className='btn-login' onClick={(e) => handleLogout(e)}>Sair</button>
                </div>
            )}
        </div>
    );
}

export default Login;
