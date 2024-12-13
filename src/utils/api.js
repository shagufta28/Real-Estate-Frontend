import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

// Setup axios instance with baseURL
export const api = axios.create({
    baseURL: "https://real-estate-backend-ut61.onrender.com/api",
    timeout: 10 * 1000,  // 10 seconds timeout globally for all requests
});

// Function to get all properties
export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd");
        return response.data;
    } catch (error) {
        toast.error("Something went wrong, please try again.");
        throw error;
    }
};

// Function to get a single property by ID
export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`);
        return response.data;
    } catch (error) {
        toast.error("Something went wrong, please try again.");
        throw error;
    }
};

// Function to create/register a user
export const createUser = async (email, token) => {
    try {
        await api.post(`/user/register`, { email }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        toast.error("Something went wrong, please try again later.");
        throw error;
    }
};

// Function to book a visit
export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date).format("DD/MM/YYYY") // Format date using dayjs
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, please try again later.");
        throw error;
    }
};


export const removeBooking = async (id, email, token) => {
    try {
        await api.post(
            `/user/removeBooking/${id}`,
            {
                email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, please try again later.");
        throw error;
    }
};

export const getAllBookings= async ( email, token) => {

    if(!token) return
    try {
        const res = await api.post(
            `/user/allBookings/${id}`,
            {
                email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data.bookings

    } catch (error) {
        toast.error("Something went wrong while fetching bookings");
        throw error;
    }
};

export const createResidency = async (propertyDetails, token) => {
    if (!token) {
      console.error("Token is missing");
      throw new Error("Token is missing");
    }
  
    try {
      const response = await axios.post(
        'https://real-estate-backend-ut61.onrender.com/api/residency/create',
        propertyDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("API request failed:", error.response?.data || error.message);
      throw error;
    }
  };