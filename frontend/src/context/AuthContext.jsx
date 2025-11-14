import React, { createContext, useState } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');
    return token ? { token, role, user: JSON.parse(storedUser) } : null;
  });
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [applications, setApplications] = useState([]);

  const login = ({ token, role, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    setUser({ token, role, user });
  };

  const register = ({ token, role, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    setUser({ token, role, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setUser(null);
  };

  async function load() {
    try {
      const resCust = await api.get(`/customer/by-user/${user?.user?.userId}`);
      setCustomer(resCust.data);
      const resApps = await api.get(`/customer/${resCust.data._id}/applications`);
      setApplications(resApps.data);
    } catch (err) {
      console.error(err);
    }
  }

  return <AuthContext.Provider value={{ user, login, register, logout, modal, setModal, customer, applications, load }}>{children}</AuthContext.Provider>;
}