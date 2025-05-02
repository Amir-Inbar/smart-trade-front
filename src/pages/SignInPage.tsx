import { SignIn } from '@clerk/clerk-react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  if (isSignedIn) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary hover:bg-primary/90',
            footerActionLink: 'text-primary hover:text-primary/90',
            footer: 'hidden',
          },
        }}
        routing='path'
        path='/sign-in'
        afterSignInUrl={from}
        signUpUrl={undefined}
      />
    </div>
  );
};
