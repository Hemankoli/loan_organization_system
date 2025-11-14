import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      const { token, role, user } = res.data;
      login({ token, role, user });
      toast.success('Logged in');
      if (role === "OFFICER") {
        navigate("/officer")
      } else {
        navigate("/customer");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-20">
      <form
        onSubmit={submit}
        className="shadow-lg rounded-2xl p-8 w-full max-w-sm bg-gray-800 text-white space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h2>

        <div className="space-y-4">
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <Button type="submit" label="Login" className="mt-6 w-full" />

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}