'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';
import { motion } from 'framer-motion';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'settings' | 'features'>('settings');
  const [settings, setSettings] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, [activeTab]);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      if (activeTab === 'settings') {
        const res = await api.get('/admin/config/settings');
        setSettings(res.data?.data || []);
      } else {
        const res = await api.get('/admin/config/features');
        setFeatures(res.data?.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch config', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSetting = async (key: string, dataType: string, description: string) => {
    setIsSaving(true);
    try {
      await api.put(`/admin/config/settings/${key}`, {
        value: editValue,
        dataType,
        description
      });
      setEditingKey(null);
      fetchConfig();
    } catch (err) {
      console.error('Failed to update setting', err);
      alert('Failed to update setting.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFeature = async (feature: any) => {
    try {
      await api.put(`/admin/config/features/${feature.name}/toggle`, {
        isEnabled: !feature.isEnabled,
        description: feature.description
      });
      fetchConfig();
    } catch (err) {
      console.error('Failed to toggle feature', err);
      alert('Failed to toggle feature.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">System Configuration</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'settings' ? 'border-[#163A5F] text-[#163A5F]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Global Settings
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'features' ? 'border-[#163A5F] text-[#163A5F]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Feature Flags
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
          </div>
        ) : activeTab === 'settings' ? (
          <div className="space-y-6">
            {settings.length === 0 ? (
              <p className="text-slate-500 text-center">No system settings found.</p>
            ) : (
              settings.map(s => (
                <div key={s.key} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{s.key}</h3>
                    <p className="text-sm text-slate-500 mb-2">{s.description}</p>
                    
                    {editingKey === s.key ? (
                      <div className="flex items-center space-x-2 mt-2">
                        <input 
                          type="text" 
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)} 
                          className="px-3 py-1.5 border rounded-md text-sm w-full max-w-sm focus:ring-1 focus:ring-[#163A5F]"
                        />
                        <button 
                          onClick={() => handleUpdateSetting(s.key, s.dataType, s.description)}
                          disabled={isSaving}
                          className="px-3 py-1.5 bg-[#163A5F] text-white text-sm font-semibold rounded-md hover:bg-opacity-90"
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button 
                          onClick={() => setEditingKey(null)}
                          className="px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="font-mono text-sm font-semibold text-[#197C7A]">{s.value}</p>
                    )}
                  </div>
                  
                  {editingKey !== s.key && (
                    <button 
                      onClick={() => {
                        setEditingKey(s.key);
                        setEditValue(s.value);
                      }}
                      className="text-sm font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.length === 0 ? (
              <p className="text-slate-500 col-span-2 text-center">No feature flags found.</p>
            ) : (
              features.map(f => (
                <div key={f.name} className={`p-5 rounded-lg border transition-colors ${f.isEnabled ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className={`font-bold ${f.isEnabled ? 'text-green-900' : 'text-slate-700'}`}>{f.name}</h3>
                      <p className={`text-sm ${f.isEnabled ? 'text-green-700' : 'text-slate-500'}`}>{f.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggleFeature(f)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${f.isEnabled ? 'bg-green-600' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${f.isEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${f.isEnabled ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-800'}`}>
                      {f.isEnabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
