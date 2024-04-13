import { create } from "zustand";
import axios from "../api/axios";

const RESET_Password_URL = "/user/reset-pass-user";

const useResetPassStore = create((set, get) => ({
  loginEmail: typeof window !== 'undefined' ? localStorage.getItem('loginEmail') : '',
  newPassword: '',
  confirmPassword: '',
  loading: false,
  handleChangePassword: (value) => { set({ newPassword: value }) },
  handleChangeConfirmPassword: (value) => { set({ confirmPassword: value }) },
  handleClickResetPass: async () => {
    try {
      set({ loading: true });
      const response = await axios.post(
        RESET_Password_URL,
        JSON.stringify({
          newPassword: get().newPassword,
          loginEmail: get().loginEmail, 
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      set({ loading: false });
    } catch (error) {
      console.error('Error resetting password:', error);
      set({ loading: false });
    }
  }
}));

export default useResetPassStore;
