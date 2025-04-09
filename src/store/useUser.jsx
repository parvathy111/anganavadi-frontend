import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axiosinstance";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [anganwadiNo, setAnganwadiNo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setAnganwadiNo(res.data.anganwadiNo); // should now be available
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setAnganwadiNo(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
    
  const logout = async () => {
    console.log("logout");
    localStorage.clear();
    setUser(null);
    setAnganwadiNo(null);
    navigate("/");
  };

  const changePassword = () => {
    console.log("Change password function called.");
  };

  return (
    <UserContext.Provider value={{ user, anganwadiNo, logout, isLoading, changePassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
