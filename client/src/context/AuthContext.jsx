import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../utils/axiosConfig";
import { MySwals } from "../components/NotifyAlert";
import bcrypt from "bcryptjs";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const result = await response.data;
      setUser(result.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser([]);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUser();
      fetchAllUser();
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [user]);
  const fetchAllUser = async () => {
    try {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const result = await response.data;
      setUsers(result);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser([]);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    const response = await axios.post("/api/login", { email, password });
    if (response.data.User) {
      if (role !== response.data.User.role) {
        return MySwals(
          `You are ${response.data.User.role} not allowed to login as ${role}`,
          "error"
        );
      } else {
        Cookies.set("token", response.data.User.token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
        });
        
        await fetchUser();
        MySwals("Login successful", "success");
      }
    } else {
      console.error("Error fetching user profile:", data.message);
      MySwals("Invalid email or password", "error");
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !name || !password) {
        return MySwals("Please fill all the fields", "error");
      } else if (password.length < 6) {
        return MySwals("Password must be at least 6 characters", "error");
      } else if (!emailRegex.test(email)) {
        return MySwals("Please enter a valid email", "error");
      }
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        role,
      });
      if (response.status === 200) {
        MySwals("Registered Successfully!", "success");
        return true;
      } else {
        MySwals("User already exists", "error");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      if (data.newPassword) {
        const currentUserResponse = await axios.get(`/api/user`);
        const currentUser = currentUserResponse.data.user;

        const isOldPasswordCorrect = await bcrypt.compare(
          data.oldPassword,
          currentUser.password
        );

        if (!isOldPasswordCorrect) {
          MySwals("Password lama salah!", "error");
          throw new Error("Password lama salah!");
        }

        if (data.newPassword !== data.confirmNewPassword) {
          MySwals("Password baru tidak cocok!", "error");
          throw new Error("Password baru tidak cocok!");
        }

        const formData = {
          ...data,
          password: await bcrypt.hash(data.newPassword, 10),
        };

        delete formData.oldPassword;
        delete formData.newPassword;
        delete formData.confirmNewPassword;

        const response = await axios.put(`/api/user/${id}`, formData);

        if (response.status === 200) {
          MySwals("Profil berhasil diperbarui!", "success");
          return true;
        } else {
          MySwals("User update failed", "error");
          throw new Error("Gagal memperbarui profil");
        }
      } else {
        const response = await axios.put(`/api/user/${id}`, data);

        if (response.status === 200) {
          MySwals("Profil berhasil diperbarui!", "success");
          return true;
        } else {
          MySwals("Gagal memperbarui profil", "error");
          throw new Error("Gagal memperbarui profil");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      MySwals("An error occurred while updating user", "error");
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser([]);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated,
        authLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
