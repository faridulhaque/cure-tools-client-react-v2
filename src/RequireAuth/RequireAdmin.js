import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";
import useAdmin from "../hooks/useAdmin";
import Loading from "../Shared/Loading";

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);

  if (loading || adminLoading) {
    return <Loading></Loading>;
  }
  if (!user) {
    
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  if (!admin) {
    navigate("/denied");
  }

  return children;
};

export default RequireAdmin;
