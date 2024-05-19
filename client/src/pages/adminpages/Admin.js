import React, { useEffect, useState } from "react";
import Adminlayout from "../../layout/Adminlayout";
import { useNavigate } from "react-router";

const Admin = () => {
  const navigate = useNavigate();
  const [tok, settok] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    settok(token);
    if (!token) {
      navigate("/admin");
    }
  });

  return <div>{tok ? <Adminlayout></Adminlayout> : <h1></h1>}</div>;
};

export default Admin;
