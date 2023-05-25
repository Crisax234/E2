import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LandingPage from './views/LandingPage';
import ShowTickets from './views/ShowTickets';
import BuyTicket from './views/BuyTicket'


function Routing(){
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/tickets" element={<ShowTickets/>}/>
                        <Route path='/buy' element={<BuyTicket/>} />
                    </Routes>
        </BrowserRouter>
    )
}

export default Routing;