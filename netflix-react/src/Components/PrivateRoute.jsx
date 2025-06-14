import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>; 

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ;
};

export default PrivateRoute;