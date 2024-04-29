import { Button, Card, Input, Label } from '../components/ui';
import { useForm } from 'react-hook-form';
import { Container } from '../components/ui/Container';
import { ChangeAuth } from '../components/ChangeAuth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

export const Register = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signup, errors: registerErrors } = useAuth();
  const navigate = useNavigate();


  const onSubmit = handleSubmit(async (data) => {

    const user = await signup(data);

    if (user) {
      toast.success('Register Successful')
      navigate('/profile');
    }

  });

  return (
    <Container className="h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card>
        {
          registerErrors && (
            registerErrors.map(err => (
              <p key={err} className="text-red-500 text-center">{err}</p>
            ))
          )
        }
        <h4 className="text-2xl font-bold text-center mb-4">Register</h4>

        <form onSubmit={onSubmit}>
          <Label htmlFor="user_name">Username</Label>
          <Input
            type="text"
            placeholder="Enter your username"
            {...register('user_name', { required: true })}
          />
          {errors.user_name && <p className="text-red-500">Username is required</p>}

          <Label htmlFor="user_email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register('user_email', { required: true })}
          />
          {errors.user_email && <p className="text-red-500">Email is required</p>}

          <Label htmlFor="user_password">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register('user_password', { required: true })}
          />
          {errors.user_password && <p className="text-red-500">Password is required</p>}

          <Button className="px-4 py-1 bg-green-600 w-full hover:bg-green-900">Register</Button>

          <ChangeAuth text="Already have an account?" redirectTo="/login" textLink="Login" />

        </form>
      </Card>
    </Container>
  )

}
