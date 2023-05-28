
import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ShowTickets = () => {
  const [ticket, setTicket] = useState([]);
  const getData = async () => {
        //const { data } = await axios.get(`${SERVER_URL}/tickets`);
        const {data} = await axios.get('https://10iy41uzu8.execute-api.us-east-2.amazonaws.com/v1/tickets');
    return data;
  }

  useEffect(()=>{
    getData().then((data) => {
    setTicket(data);
    });
  }, [])

  const navigate = useNavigate();
  const { state } = useLocation();
  const clickMe = async (post) => {
        navigate('/buy', { state: post })
    }; 
  return (
    <div class= "form_container">
      <h2>Eventos</h2>
            {ticket.map((post) => {
       return (
              <table id="requests" key={post.id}>
                <tr>
                    <th>name</th>
                    <th> date </th>
                    <th> price </th>
                    <th>quantity</th>
                    <th>location</th>
                    <th> latitude</th>
                </tr>
                <tr onClick={() => {
              clickMe({post});
              }}>
                    <td> {post.name} </td>
                    <td> {post.date} </td>
                    <td> {post.price} </td>
                    <td> {post.quantity}</td>
                    <td>{post.location}</td>
                    <td> {post.latitude} </td>
                </tr>
          </table>
       );
    })}
        </div>
  );
}

export default ShowTickets;
