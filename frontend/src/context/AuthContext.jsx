import React, { createContext, useState } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    return token ? { token, role, userId } : null;
  });
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [officer, setOfficer] = useState(null);
  const [applications, setApplications] = useState([]);

  const login = ({ token, role, userId }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    setUser({ token, role, userId });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setUser(null);
  };

  async function loadOfficer() {
    try {
      const resCust = await api.get(`/officer/by-officer/${user?.userId}`);
      setOfficer(resCust.data);
    } catch (err) {
      console.error(err);
    }
  }
  async function load() {
    try {
      const resCust = await api.get(`/customer/by-user/${user?.userId}`);
      setCustomer(resCust.data);
      const resApps = await api.get(`/customer/${resCust.data._id}/applications`);
      setApplications(resApps.data);
    } catch (err) {
      console.error(err);
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, modal, setModal, customer, officer, applications, load, loadOfficer }}>{children}</AuthContext.Provider>;
}