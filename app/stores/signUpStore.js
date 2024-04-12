import { create } from "zustand";
import axios from "../api/axios";

const REGISTER_URL = "/user/sign-up-user";

const useSignUpStore = create((set, get) => ({
  formData: {
    email: "",
    password: "",
    userName: "",
    age: "",
    tel: "",
    address: "",
  },
  loading: false,

  handleChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleClickSignUp: async () => {
    const { formData } = get();
    
    try {
      set({ loading: true });
      
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      console.log(response.data);
      set({ loading: false });
    } catch (error) {
      console.error("Error signing up:", error);
      set({ loading: false });
    }
  },
}));

export default useSignUpStore;
