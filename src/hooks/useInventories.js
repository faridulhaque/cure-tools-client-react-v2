import { useEffect, useState } from "react";

export const useInventories = () => {
  const [inventories, setInventories] = useState([]);
  

  useEffect(() => {
    fetch("https://cure-tools.up.railway.app/tools")
      .then((res) => res.json())
      .then((data) => setInventories(data));
  }, [inventories]);
  return {
    inventories,
  };
};
