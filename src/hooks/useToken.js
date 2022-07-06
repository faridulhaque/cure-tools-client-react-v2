import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const name = user?.user?.displayName;
  const email = user?.user?.email;
  
  const image = user?.user?.photoURL;

  const userData = {
    name,
    email,
    image,
  };

  useEffect(() => {
    if (name && email && image) {
      fetch(`http://localhost:5000/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData)
      })
        .then((res) => res.json())
        .then((data) => {
          setToken("12345678");
        });
    }
  }, [name, email, image]);

  return [token];
};
export default useToken;
