'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/store/authStore';

export default function AdminUsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>('All');
  
  const [editingUser, setEditingUser] = useState<any>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsers(roleFilter);
  }, [roleFilter]);

  const fetchUsers = async (role: string) => {
    try {
      setLoading(true);
      const url = role === 'All' ? '/admin/users' : `/admin/users?role=${role}`;
      const res = await api.get(url);
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (user: any) => {
    try {
      const endpoint = user.isActive ? 'deactivate' : 'activate';
      await api.post(`/admin/users/${user.id}/${endpoint}`);
      fetchUsers(roleFilter);
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleOpenRoleModal = (user: any) => {
    setEditingUser(user);
    setSelectedRoles(user.roles || []);
  };

  const handleUpdateRoles = async () => {
    if (!editingUser) return;
    setIsUpdating(true);
    try {
      await api.put(`/admin/users/${editingUser.id}/roles`, { roles: selectedRoles });
      setEditingUser(null);
      fetchUsers(roleFilter);
    } catch (err) {
      console.error('Failed to update roles', err);
      alert('Failed to update roles.');
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">User Management</h1>
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
          {['All', 'Teacher', 'Learner', 'Admin'].map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${roleFilter === role ? 'bg-white shadow-sm text-phronesis-blue' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Roles</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{u.firstName} {u.lastName}</td>
                    <td className="px-6 py-4 text-slate-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {u.roles?.map((r: string) => (
                          <span key={r} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenRoleModal(u)}
                        className="text-xs font-semibold px-3 py-1.5 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Edit Roles
                      </button>
                      {u.email !== 'admin@phronesis.com' && (
                        <button 
                          onClick={() => toggleStatus(u)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${
                            u.isActive 
                              ? 'border-red-200 text-red-600 hover:bg-red-50' 
                              : 'border-green-200 text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Role Management Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-xl font-bold mb-4 text-[#163A5F]">Edit Roles</h3>
            <p className="text-sm text-slate-500 mb-4">Editing roles for {editingUser.firstName} {editingUser.lastName}</p>
            
            <div className="space-y-3 mb-6">
              {['Admin', 'Teacher', 'Learner', 'Guardian'].map(role => (
                <label key={role} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                    className="w-4 h-4 text-phronesis-blue rounded border-gray-300 focus:ring-phronesis-blue"
                  />
                  <span className="font-medium text-slate-700">{role}</span>
                </label>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setEditingUser(null)} 
                className="px-4 py-2 font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateRoles} 
                disabled={isUpdating}
                className="px-4 py-2 font-semibold text-white bg-phronesis-blue hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Save Roles'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
