import {useForm} from 'react-hook-form';
import {loginUser} from '../../services/authService';
import {useNavigate} from 'react-router-dom';

type FormData = {
    username: string;
    password: string;
};

const Login = () => {
    const {register, handleSubmit} = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await loginUser(data);
            localStorage.setItem('token', response.token);
            alert('Login successful');
            navigate('/dashboard');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Invalid credentials';
            alert(errorMessage);
        }
    };
    

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
                <h1>Login</h1>
                <input type="text" {...register('username', {required: 'Username is required'})} placeholder="Username"/>
                <input type="password" {...register('password', {required: 'Password is required'})} placeholder="Password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;