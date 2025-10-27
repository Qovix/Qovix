import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { QueryHistory } from '../pages/history/QueryHistory';
import { ConnectedDatabases } from '../pages/databases/ConnectedDatabases';
import { ConnectDatabase } from '../pages/databases/ConnectDatabase';
import { Settings } from '../pages/settings/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
}

function AppRoutes() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />

          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="history" element={<QueryHistory />} />
            <Route path="databases" element={<ConnectedDatabases />} />
            <Route path="connect-database" element={<ConnectDatabase />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}


export default AppRoutes;
