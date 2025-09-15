import { createContext, useEffect, useState } from "react";

import { fetchUsers } from "./db/airtable";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [users, setUsers] = useState()
  
  useEffect(() => {

    const fetchs = async () => {
      const response = await fetchUsers()
      setUsers(response)
      
    } 

    fetchs()
  

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
     }

     setloading(false)

  }, []);

 
  function handleLogin(id, password) {
    const foundUser = users.find(
      (u) =>
        (u.UID.toLowerCase() === id.toLowerCase() && u.Fname.toLowerCase() == password.toLowerCase())
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser; 
    }

    window.alert("Invalid Details");
    return null;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user,loading, handleLogin, logout, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
}
