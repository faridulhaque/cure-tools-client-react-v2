import { useEffect, useState } from "react";

const useAllUsers = (received) => {
  const [users, setUsers] = useState([]);
  const searchedUser = users.find((user) => user?.email === received);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [users]);
  return {
    users,
    searchedUser
  };
};
export default useAllUsers;
