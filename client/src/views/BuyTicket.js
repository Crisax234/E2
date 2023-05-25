import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Button from "../components/Button";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default function BuyTicket() {

    const { state } = useLocation();
    
    const buyTicket = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${SERVER_URL}/tickets/buy`, {
            id: state.post.event_id,
            quantity: state.post.quantity
        });
      }
    return (
    <div>
        <h2>Comprar ticket para {state.post.name} </h2>
            <div id="content"> 
                <h2 class="subtitle">Fecha: {state.post.date}</h2>
                <h2 class="subtitle">Precio: {state.post.price}</h2>
                <h2 class="subtitle">Ubicacion: {state.post.location}</h2>
                <h2 class="subtitle">Cantidad: {state.post.quantity}</h2>
                <h2 class="subtitle">id evento: {state.post.event_id}</h2>
                <form onSubmit={buyTicket}>
                    <Button title="Comprar" type="submit"  ></Button>
                </form>
        </div>
    </div>


    );
}
