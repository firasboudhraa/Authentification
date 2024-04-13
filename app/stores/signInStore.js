import { create } from "zustand";
import axios from "../api/axios";

const REGISTER_URL = "/user/sign-in-user";
const FORGOT_Pass_URL = "/user/forgot-pass-user";

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
    }, 
    handleClickForgetPass: async() => {
        try {
            set ({ loading : true });
            const response = await axios.post (FORGOT_Pass_URL , JSON.stringify({
            loginEmail: get().loginEmail,
        }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log(response.data);
        set({ loading : false});
    }catch(error) {
        console.error('Eroor sending  reset link to email',error);
        set({ loading: false});
    }
    }
}))

export default useSignInStore;
