import { useEffect, useState } from "react";

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`https://mighty-retreat-73260.herokuapp.com/users`, {
      headers: {
        authorization: `Bearer: ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [users]);
  return {
    users,
  };
};
export default useAllUsers;
