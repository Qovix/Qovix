import React, { useState } from 'react';
import { Plus, Database, Settings, Trash2, Wifi, WifiOff, TestTube } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'MySQL' | 'PostgreSQL' | 'MongoDB' | 'SQLite' | 'SQL Server';
  host: string;
  port: number;
  database: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnected: string;
  description?: string;
}

interface DatabaseCardProps {
  database: DatabaseConnection;
  onEdit: (database: DatabaseConnection) => void;
  onDelete: (database: DatabaseConnection) => void;
  onTest: (database: DatabaseConnection) => void;
}

const DatabaseCard: React.FC<DatabaseCardProps> = ({ database, onEdit, onDelete, onTest }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-gray-500';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-600" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <WifiOff className="w-4 h-4 text-red-600" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (_type: string) => {
    return <Database className="w-8 h-8 text-accent" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 hover:shadow-soft transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getTypeIcon(database.type)}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{database.name}</h3>
            <p className="text-sm text-gray-600">{database.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(database.status)}
          <span className={`text-sm font-medium ${getStatusColor(database.status)}`}>
            {database.status === 'connected' ? 'Connected' : 
             database.status === 'error' ? 'Error' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Host:</span>
          <span className="text-gray-900">{database.host}:{database.port}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Database:</span>
          <span className="text-gray-900">{database.database}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last Connected:</span>
          <span className="text-gray-900">{database.lastConnected}</span>
        </div>
      </div>

      {database.description && (
        <p className="text-sm text-gray-600 mb-4">{database.description}</p>
      )}

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onTest(database)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          <TestTube className="w-4 h-4" />
          Test
        </button>
        <button
          onClick={() => onEdit(database)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(database)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  );
};

export const ConnectedDatabases: React.FC = () => {
  const [databases, setDatabases] = useState<DatabaseConnection[]>([
    {
      id: '1',
      name: 'Production MySQL',
      type: 'MySQL',
      host: 'prod-mysql.company.com',
      port: 3306,
      database: 'ecommerce',
      status: 'connected',
      lastConnected: '2023-10-25 09:30',
      description: 'Main production database for e-commerce platform'
    },
    {
      id: '2',
      name: 'Analytics PostgreSQL',
      type: 'PostgreSQL',
      host: 'analytics-pg.company.com',
      port: 5432,
      database: 'analytics_warehouse',
      status: 'connected',
      lastConnected: '2023-10-25 08:15',
      description: 'Data warehouse for analytics and reporting'
    },
    {
      id: '3',
      name: 'User Sessions MongoDB',
      type: 'MongoDB',
      host: 'sessions-mongo.company.com',
      port: 27017,
      database: 'user_sessions',
      status: 'error',
      lastConnected: '2023-10-24 16:45',
      description: 'MongoDB cluster for user session data'
    }
  ]);

  const handleEdit = (database: DatabaseConnection) => {
    console.log('Edit database:', database);
  };

  const handleDelete = (database: DatabaseConnection) => {
    if (window.confirm(`Are you sure you want to remove "${database.name}"?`)) {
      setDatabases(prev => prev.filter(db => db.id !== database.id));
    }
  };

  const handleTest = async (database: DatabaseConnection) => {
    console.log('Testing connection for:', database);
    alert(`Testing connection to ${database.name}...`);
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No databases connected yet</h3>
      <p className="text-gray-600 mb-6">Connect your first database to start querying your data with AI.</p>
      <Link
        to="/connect-database"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 shadow-sm"
      >
        <Plus className="w-5 h-5" />
        Connect Your First Database
      </Link>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Connected Databases</h1>
        <Link
          to="/connect-database"
          className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Connect Database
        </Link>
      </div>

      {databases.length === 0 ? (
        <div className="bg-white rounded-xl shadow-card">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {databases.map((database) => (
            <DatabaseCard
              key={database.id}
              database={database}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTest={handleTest}
            />
          ))}
        </div>
      )}

      {databases.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-xl font-semibold text-gray-900">
                  {databases.filter(db => db.status === 'connected').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-xl font-semibold text-gray-900">
                  {databases.filter(db => db.status === 'error').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Databases</p>
                <p className="text-xl font-semibold text-gray-900">{databases.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Database Types</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Set(databases.map(db => db.type)).size}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};