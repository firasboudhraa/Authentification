'use client'
import React from "react";
import useSignUpStore from "../../../stores/signUpStore";
import { Button, Input, CircularProgress} from "@mui/material";

import "./signUp.css";

export default function SignUpForm() {
  const { handleChange, handleClickSignUp, loading } = useSignUpStore();

  return (
    <div className="sign-up-form">
      <div className="sign-up-box">
        <div className="input-field">
          <Input
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="input-field">
          <Input
            placeholder="User Name"
            onChange={(e) => handleChange("userName", e.target.value)}
          />
        </div>
        <div className="input-field">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div className="input-field">
          <Input
            type="number"
            placeholder="Age"
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>
        <div className="input-field">
          <Input
            type="tel"
            placeholder="Tel"
            onChange={(e) => handleChange("tel", e.target.value)}
          />
        </div>
        <div className="input-field">
          <Input
            placeholder="Address"
            rows={5}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div className="button-submit ">
          <Button onClick={handleClickSignUp} disabled={loading}>
            {loading ? 
              <CircularProgress size={24} color="inherit" />
             : (
              "Register"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
