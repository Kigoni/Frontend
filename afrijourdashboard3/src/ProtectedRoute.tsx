// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from './AuthContext';

// interface ProtectedRouteProps {
//   children: JSX.Element;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const  {user}  = useContext(AuthContext); // Access the user from AuthContext

//   // If the user is not authenticated (user is null), redirect to "/sign-in"
//   if (!user) {
//     return <Navigate to="/sign-in" replace />;
//   }

//   // If authenticated, render the child component
//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  // Check if the authContext exists and the user is authenticated
  if (!authContext?.user) {
    return <Navigate to="/sign-in" replace />;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;
