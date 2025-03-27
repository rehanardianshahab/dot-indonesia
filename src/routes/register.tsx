import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createFileRoute } from '@tanstack/react-router';
import Input from '../components/input';
import Button from '../components/button';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (key: string, e: string) => {
    setFormData((prev) => ({ ...prev, [key]: e }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    toast.success('Registration successful!');
    setFormData({ username: '', password: '' });
  };

  return (
    <div className="container max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md">
      <h1 className="text-primary mb-10">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-1-3">
        <div className="mb-10">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onValueChange={(val) => handleChange('username', val)}
            customClass="w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onValueChange={(val) => handleChange('password', val)}
            customClass="w-full"
          />
        </div>
        <Button label="Submit" customClass="w-full primary mt-10" />
      </form>
    </div>
  );
}
