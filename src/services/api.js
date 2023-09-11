import axios from 'axios';
import React from 'react'
const API_URL='https://flashshare-app-backend.vercel.app'



 const  uploadFile = async (data) => {
  
    try {
        
     let response = await axios.post(`${API_URL}/upload`,data);
     return response.data;

    } catch (error) {
        
        console.error('Error while calling api',error.message);
    }
  
}

export default uploadFile