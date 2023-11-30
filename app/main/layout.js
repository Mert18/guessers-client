"use client"
import React, { useEffect } from 'react'
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:2222",
  realm: "quarkus",
  clientId: "backend-service",
});

const MainLayout = ({children}) => {
   const initKeycloak = async () => {
      try {
        await keycloak.init({ onLoad: "login-required" });
        console.log(keycloak);
      } catch (error) {
        console.error("Failed to initialize Keycloak.", error);
      }
    };
  
   useEffect(() => { 
      initKeycloak();
    }, [])
  return (
     <div>{children}</div>
  )
}

export default MainLayout