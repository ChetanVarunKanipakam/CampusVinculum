import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import DepartmentsPage from './DepartmentsPage';
import UsersPage from './UsersPage';
import AnnouncementsPage from './AnnouncementsPage';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="departments" replace />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
      </Route>
    </Routes>
  );
}
