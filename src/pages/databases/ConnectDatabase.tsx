import React, { useState } from 'react';
import { Eye, EyeOff, Database, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface DatabaseFormData {
  name: string;
  type: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ConnectDatabase: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [formData, setFormData] = useState<DatabaseFormData>({
    name: '',
    type: 'MySQL',
    host: '',
    port: '',
    username: '',
    password: '',
    database: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const databaseTypes = [
    { value: 'MySQL', label: 'MySQL' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'SQLite', label: 'SQLite' },
    { value: 'SQL Server', label: 'Microsoft SQL Server' },
    { value: 'Oracle', label: 'Oracle Database' }
  ];

  const getDefaultPort = (type: string): string => {
    const portMap: { [key: string]: string } = {
      'MySQL': '3306',
      'PostgreSQL': '5432',
      'MongoDB': '27017',
      'SQLite': '',
      'SQL Server': '1433',
      'Oracle': '1521'
    };
    return portMap[type] || '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'type') {
      setFormData(prev => ({ ...prev, port: getDefaultPort(value) }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Database name is required';
    if (!formData.host.trim()) newErrors.host = 'Host is required';
    if (!formData.port.trim()) newErrors.port = 'Port is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.type !== 'SQLite' && !formData.database.trim()) {
      newErrors.database = 'Database name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionSuccess(true);
      
      setTimeout(() => {
        navigate('/databases');
      }, 2000);
    }, 2000);
  };

  if (connectionSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="bg-white rounded-xl shadow-card p-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Successful!</h2>
          <p className="text-gray-600 mb-4">
            Successfully connected to <strong>{formData.name}</strong>
          </p>
          <p className="text-sm text-gray-500">Redirecting to databases page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/databases"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Connect a New Database</h1>
          <p className="text-gray-600">Add a database connection to start querying your data</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Connection Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Production MySQL"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none ${
                errors.name ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Database Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            >
              {databaseTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-2">
                Host *
              </label>
              <input
                type="text"
                id="host"
                name="host"
                value={formData.host}
                onChange={handleInputChange}
                placeholder="localhost or your.database.host.com"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none ${
                  errors.host ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.host && <p className="mt-1 text-sm text-red-600">{errors.host}</p>}
            </div>
            <div>
              <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">
                Port *
              </label>
              <input
                type="text"
                id="port"
                name="port"
                value={formData.port}
                onChange={handleInputChange}
                placeholder="3306"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none ${
                  errors.port ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.port && <p className="mt-1 text-sm text-red-600">{errors.port}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="database_user"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none ${
                  errors.username ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none ${
                    errors.password ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          {formData.type !== 'SQLite' && (
            <div>
              <label htmlFor="database" className="block text-sm font-medium text-gray-700 mb-2">
                Database Name *
              </label>
              <input
                type="text"
                id="database"
                name="database"
                value={formData.database}
                onChange={handleInputChange}
                placeholder="my_database"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none ${
                  errors.database ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.database && <p className="mt-1 text-sm text-red-600">{errors.database}</p>}
            </div>
          )}

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Brief description of this database connection..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isConnecting}
              className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  Connect Database
                </>
              )}
            </button>
            <Link
              to="/databases"
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};