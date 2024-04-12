import { create } from "zustand";
import axios from "../api/axios";

const REGISTER_URL = "/user/sign-in-user";

const useSignInStore = create((set, get) => ({
    loginEmail: '',
    loginPassword: '',
    loading: false,
    handleChangePassword: (value) => { set({ loginPassword: value }) },
    handleChangeEmail: (value) => { set({ loginEmail: value }) },
    handleClickSignIn: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    loginEmail: get().loginEmail,
                    loginPassword: get().loginPassword, 
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            console.log(response.data);
            set({ loading: false });
        } catch (error) {
            console.error('Error signing in:', error);
            set({ loading: false });
        }
    }
}))

export default useSignInStore;
