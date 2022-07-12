import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";

import useAdmin from "../hooks/useAdmin";
import Loading from "../Shared/Loading";

const RequireUser = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();

  let location = useLocation();
  if (loading || adminLoading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  if (admin) {
    return navigate("/denied");
  }
  return children;
};

export default RequireUser;
