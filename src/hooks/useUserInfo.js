import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";

const useUserInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const email = user?.email;
  const avatar = "https://i.ibb.co/6YK1cXs/avatar.jpg";

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    fetch(`https://mighty-retreat-73260.herokuapp.com/user/${email}`, {
      headers: {
        authorization: `Bearer: ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [email, userInfo]);

  return {
    userInfo,
    user,
    loading,
    error,
    avatar,
  };
};
export default useUserInfo;
