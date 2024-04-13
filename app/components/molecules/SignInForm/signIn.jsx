"use client";
import React from "react";
import useSignInStore from "../../../stores/signInStore";
import "./signIn.css";
import { Button, Input, CircularProgress } from "@mui/material";

export default function SignInForm() {
  const {
    handleChangePassword,
    handleChangeEmail,
    handleClickSignIn,
    handleClickForgetPass,
    loading,
  } = useSignInStore();

  return (
    <div className="sign-in-form-wrapper">
      <div className="sign-in-box">
        <div className="input-wrapper">
          <Input
            placeholder={"Email"}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <Input
            type="password"
            placeholder={"Password"}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <Button onClick={handleClickSignIn} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Button onClick={handleClickForgetPass} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Forget password"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
