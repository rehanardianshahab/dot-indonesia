import { createFileRoute } from '@tanstack/react-router';
import Button from '../components/button';
import Input from '../components/input';
import React, { useState } from 'react';
import { z } from 'zod';
import { Bounce, toast } from 'react-toastify';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  const handleChange = (key: string, e: string) => {
    setForm((prev) => ({ ...prev, [key]: e }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      loginSchema.parse(form);
      if (form.username === 'admin' && form.password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        notifySuccess('Login successful!');
        setForm({ username: '', password: '' });
        window.location.reload();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || 'Validation error');
      }
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <div className="card card-body w-1-3 max-w-md">
        <h2 className="text-primary font-bold mb-10">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <Input
              type="text"
              name="username"
              value={form.username}
              onValueChange={(val) => handleChange('username', val)}
              customClass="input input-bordered w-full"
            />
          </div>
          <div className="mb-10">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onValueChange={(val) => handleChange('password', val)}
              customClass="input input-bordered w-full"
            />
          </div>
          <Button customClass="primary w-full mb-10" label="Login" />
          {error && <p className="text-danger text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
