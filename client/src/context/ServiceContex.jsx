import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { useAuth } from "./AuthContext";

export const useServices = () => {
  const { user } = useAuth();
  const [service, setService] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ServiceLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      const userId = await user._id;
      const filteredServices = response.data.filter(
        (service) => service.freelancer_id._id === userId
      );
      setServices(response.data);
      setService(filteredServices);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDetailService = async (id) => {
    try {
      if (!id) {
        throw new Error("No service ID provided");
      }
      const response = await axios.get(`/api/service/${id}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching service details:", err);
      throw err;
    }
  };

  const createService = async (serviceData) => {
    try {
      const data = {...serviceData, freelancer_id: user._id}
      const response = await axios.post("/api/service", data);
      return response.data;
    } catch (err) {
      console.error("Error creating service:", err);
      throw err;
    }
  };

  const updateServiceStatus = async (id, status) => {
    try {
      const response = await axios.put(`/api/service/status/${id}`, status);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error updating service:", err);
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await axios.delete(`/api/service/${id}`);
      return response.data;
    } catch (err) {
      console.error("Error deleting service:", err);
      throw err;
    }
  };

  return { service,services,ServiceLoading, categories, fetchDetailService, createService, updateServiceStatus, deleteService };
};
