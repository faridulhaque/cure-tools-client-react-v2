import { useEffect, useState } from "react";

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
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
