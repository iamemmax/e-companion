import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <div style={style}>
        <Oval
          height="70"
          width="70"
          color="#fd758c"
          secondaryColor="#3f2248"
          ariaLabel="loading"
        />
      </div>
    </>
  );
};

const style = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  position: "fixed",
  inset: "0",
  background: "#eee",
  zIndex: "9999",
};

export default Loading;
