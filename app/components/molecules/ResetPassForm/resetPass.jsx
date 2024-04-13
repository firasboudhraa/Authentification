"use client";
import React from "react";
import useResetPassStore from "../../../stores/resetPass";
import "./resetPass.css";
import { Button, Input, CircularProgress } from "@mui/material";

export default function ResetPassForm() {
  const {
    handleChangePassword,
    handleClickResetPass,
    loading,
  } = useResetPassStore();

  return (
    <div className="reset-pass-form-wrapper">
      <div className="reset-pass-box">
        <div className="input-wrapper">
          <Input
            type="password"
            placeholder={"Password"}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <Input
            type="password"
            placeholder={"Confirm Password"}
            onChange={(e) => handleChangeConfirmPassword(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <Button onClick={handleClickResetPass} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
