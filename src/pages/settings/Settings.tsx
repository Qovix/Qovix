import React, { useState } from 'react';
import { User, Key, Palette, Save, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface ProfileSettings {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AISettings {
  geminiApiKey: string;
  modelVersion: string;
  temperature: number;
}

interface ThemeSettings {
  theme: 'light' | 'dark';
  accentColor: string;
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'ai' | 'theme'>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: 'John Doe',
    email: 'john@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [aiSettings, setAISettings] = useState<AISettings>({
    geminiApiKey: '',
    modelVersion: 'gemini-pro',
    temperature: 0.7
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    theme: 'light',
    accentColor: '#bc3a08'
  });

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'ai', name: 'AI Configuration', icon: Key },
    { id: 'theme', name: 'Theme Settings', icon: Palette }
  ];

  const handleProfileChange = (field: keyof ProfileSettings, value: string) => {
    setProfileSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAIChange = (field: keyof AISettings, value: string | number) => {
    setAISettings(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (field: keyof ThemeSettings, value: string) => {
    setThemeSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profileSettings.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profileSettings.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={profileSettings.currentPassword}
                onChange={(e) => handleProfileChange('currentPassword', e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={profileSettings.newPassword}
                  onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={profileSettings.confirmPassword}
                  onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Google Gemini Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gemini API Key
              <span className="ml-2 text-xs text-gray-500">(Required for AI-powered SQL generation)</span>
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={aiSettings.geminiApiKey}
                onChange={(e) => handleAIChange('geminiApiKey', e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Get your API key from the{' '}
              <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model Version</label>
              <select
                value={aiSettings.modelVersion}
                onChange={(e) => handleAIChange('modelVersion', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              >
                <option value="gemini-pro">Gemini Pro</option>
                <option value="gemini-pro-vision">Gemini Pro Vision</option>
                <option value="gemini-ultra">Gemini Ultra (Preview)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature: {aiSettings.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={aiSettings.temperature}
                onChange={(e) => handleAIChange('temperature', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 AI Configuration Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Lower temperature (0.0-0.3) for more consistent, predictable SQL generation</li>
          <li>• Higher temperature (0.7-1.0) for more creative and varied query approaches</li>
          <li>• Gemini Pro is recommended for most SQL generation tasks</li>
        </ul>
      </div>
    </div>
  );

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={themeSettings.theme === 'light'}
                  onChange={(e) => handleThemeChange('theme', e.target.value)}
                  className="mr-2 text-accent focus:ring-accent"
                />
                Light
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={themeSettings.theme === 'dark'}
                  onChange={(e) => handleThemeChange('theme', e.target.value)}
                  className="mr-2 text-accent focus:ring-accent"
                />
                Dark
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Accent Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                className="w-12 h-12 border border-gray-200 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={themeSettings.accentColor}
                onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none font-mono text-sm"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              This color will be used for buttons, links, and highlights throughout the interface
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-orange-900 mb-2">🎨 Theme Preview</h4>
        <div className="flex items-center gap-3">
          <button 
            style={{ backgroundColor: themeSettings.accentColor }}
            className="px-4 py-2 text-white rounded-lg text-sm font-medium"
          >
            Sample Button
          </button>
          <span style={{ color: themeSettings.accentColor }} className="text-sm font-medium">
            Sample Link
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-card p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#bc3a08] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-card p-6">
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'ai' && renderAISettings()}
            {activeTab === 'theme' && renderThemeSettings()}

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex items-center gap-2 px-6 py-3 bg-[#bc3a08] text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};