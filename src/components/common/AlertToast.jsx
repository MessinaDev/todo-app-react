import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "store/reducers/alertSlice";
import { Slide } from "@mui/material";

export default function AlertToast({ text, type, duration }) {
  const alert = useSelector((state) => state.alert.alert);
  const dispatch = useDispatch();

  const style = {
    position: "fixed",
    bottom: 0,
    right: 0,
  };

  useEffect(() => {
    if (duration) {
      const timeout = setTimeout(() => dispatch(hideAlert()), duration);
      return () => clearTimeout(timeout);
    }
  });

  return (
    <>
      <Slide direction="left" in={!!alert} mountOnEnter unmountOnExit>
        <Alert style={style} variant="filled" severity={type}>
          {text}
        </Alert>
      </Slide>
    </>
  );
}
