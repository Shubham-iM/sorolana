import { Divider } from "@mui/material";
 import React from "react";

 function Test() {
   return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ position: "relative" }}>
        <Divider orientation="vertical" flexItem sx={{ height: "300px", marginRight: "40px", backgroundColor: "white",width:"1px" }} />
        <div>
         <Divider orientation="horizontal" sx={{ width: "300px", marginTop: "40px", backgroundColor: "white" }} />
        </div>
      </div>
     </div>
  )
}
 export default Test;



