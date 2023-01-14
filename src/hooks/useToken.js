import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const email = user?.user?.email;
  const primaryName = user?.user?.displayName;
  const primaryPic = user?.user?.photoURL;

  const userData = {
    email,
    primaryName,

    primaryPic,
  };

  useEffect(() => {
    if (primaryName && email) {
      fetch(`https://cure-tools.up.railway.app/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [primaryName, email]);

  return [token];
};
export default useToken;
