import React, { useContext, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
    income: '',
    creditScore: '',
    branch: ''
  });

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      };

      if (form.role === 'CUSTOMER') {
        payload.income = Number(form.income);
        payload.creditScore = Number(form.creditScore);
      }

      if (form.role === 'OFFICER') payload.branch = form.branch;
      const res = await api.post('/auth/register', payload);
      const { token, role, user } = res.data;
      register({ token, role, user });
      toast.success(res.data.message);
      if (role === "OFFICER") {
        navigate("/officer")
      } else {
        navigate("/customer");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-20">
      <form
        onSubmit={submit}
        className="shadow-lg rounded-2xl p-8 w-full max-w-md bg-gray-800 text-white space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Register
        </h2>

        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handle}
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handle}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handle}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handle}
              className="w-full bg-gray-700 border border-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="OFFICER">Officer</option>
            </select>
          </div>

          {form.role === 'CUSTOMER' && (
            <>
              <InputField
                name="income"
                type="number"
                placeholder="Income"
                value={form.income}
                onChange={handle}
              />
              <InputField
                name="creditScore"
                type="number"
                placeholder="Credit Score"
                value={form.creditScore}
                onChange={handle}
              />
            </>
          )}

          {form.role === 'OFFICER' && (
            <InputField
              name="branch"
              type="text"
              placeholder="Branch"
              value={form.branch}
              onChange={handle}
            />
          )}
        </div>
        <Button type="submit" label="Register" className="mt-6 w-full" />
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
