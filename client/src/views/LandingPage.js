import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';


function LandingPage() {

    const navigate = useNavigate();
    const { 
        loginWithPopup, 
        loginWithRedirect,
        logout,
        user,
        isAuthenticated
      } = useAuth0();

      const userValidation = async (e) => {
        e.preventDefault();
        if (isAuthenticated){
            navigate('/tickets');
        }
      }
    return (
        <div class="box_container">
            <div>
                <h2>Login</h2>
                <div class="content">
                  <button onClick={loginWithPopup}>Login with Popup</button>
                  <button onClick={loginWithRedirect}>Login with Redirect</button>
                  <button onClick={logout}>Logout</button>
                </div>
                <h2>User is {isAuthenticated ? "Logged in" : "Not logged in"}</h2>
                <form onSubmit={userValidation}>
                    <Button title="Entrar" type="submit"  ></Button>
                </form>
            </div>
        </div>
    );
}

export default LandingPage;