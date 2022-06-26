import { useEffect, useState } from "react";

export const useInventories = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tools")
      .then((res) => res.json())
      .then((data) => setInventories(data));
  }, []);
  return {
    inventories,
  };
};
