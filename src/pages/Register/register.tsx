import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

type FormData = {
  username: string;
  password: string;
};

const Register = () => {
    const { register, handleSubmit, reset } = useForm<FormData>(); 
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await registerUser(data);
            alert(response);
            navigate('/login');
            reset();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
                <h1>Register</h1>
                <input type="text" {...register('username', { required: 'Username is required' })} placeholder="Username" />
                <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
