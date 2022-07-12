import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

import { auth } from "../firebase/firebase.init";
import Loading from "../Shared/Loading";

const RequireCommon = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  let location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireCommon;
