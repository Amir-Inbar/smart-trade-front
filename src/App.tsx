import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage/HomePage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AppLayout } from './components/Layout/AppLayout';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { SignInPage } from '@/pages/SignInPage';

const ScenariosPage = lazy(() => import('./pages/ScenariosPage/ScenariosPage'));
const TradesPage = lazy(() => import('./pages/TradesPage/TradesPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage/CalendarPage'));

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path='/'
            element={
              isSignedIn ? (
                <Navigate to='/home' replace />
              ) : (
                <Navigate to='/sign-in' replace />
              )
            }
          />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/scenarios'
            element={
              <ProtectedRoute>
                <ScenariosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/trades'
            element={
              <ProtectedRoute>
                <TradesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/calendar'
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
