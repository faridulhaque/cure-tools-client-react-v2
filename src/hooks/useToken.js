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
      fetch(`http://localhost:5000/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken("12345678");
        });
    }
  }, [primaryPic, email]);

  return [token];
};
export default useToken;
