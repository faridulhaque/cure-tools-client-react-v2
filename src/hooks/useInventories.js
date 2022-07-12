import { useEffect, useState } from "react";

export const useInventories = () => {
  const [inventories, setInventories] = useState([]);
  

  useEffect(() => {
    fetch("https://mighty-retreat-73260.herokuapp.com/tools")
      .then((res) => res.json())
      .then((data) => setInventories(data));
  }, [inventories]);
  return {
    inventories,
  };
};
