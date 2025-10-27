import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/Routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
