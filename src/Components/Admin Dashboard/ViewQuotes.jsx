import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Context from "../../Context/Context";
import './AdminDashboard.css'

export default function ViewQquotes() {
  const Global = useContext(Context);
  const [Quotes, setQuotes] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/quote/GetQuotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseJson = await response.json();
      console.log(responseJson)
      setQuotes(responseJson);
    };

    if (Global.User) {
      fetchQuotes();
    }
  });

  const deleteQuote = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/quote/DeleteQuote`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    const responseJson = await response.json();
    if (responseJson.Success)
    {
      toast.success('Quote Deleted Successfully')
    }
    else
    {
      toast.error('Error Deleting Quote')
    }
  }

  return (
    <>
        <div className='container my-3 Dashboard-TitleA'>Quotation Requests</div>

        {Quotes.map(
            (quote) => {
              return (
                <>
                <div className='container my-2' id="QuotesDiv">
                  <div className='QuotesCard'>
                    <h5>Quotation:</h5>
                    <div className='QuotesCard-Title'>Name: {quote.name}</div>
                    <div className='QuotesCard-Title'>Email: {quote.email}</div>
                    <div className='QuotesCard-Title'>Phone: {quote.phone}</div>
                    <div className='QuotesCard-Title'>Service: {quote.service}</div>
                    <div className='QuotesCard-Title'>Date: {formatTimestamp(quote.timestamp)}</div>
                  </div>
                  <div className='QuotesCard'>
                    <div className='QuotesCard-Title'>Location: {quote.location}</div>
                    <div className='QuotesCard-Title Quote-D'>Description: {quote.description}</div>
                    <div className='QuoteBtn'>
                    <button type="button" className="Delete-Btn" onClick={()=>deleteQuote(quote._id)}>Delete</button>
                    </div>
                  </div>
                  </div>     
  
                </>
              )
            }
        )}  
          
          
          
        
    
    </>

  )
}

const formatTimestamp = (timestamp) => {
  const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
  };
  return new Date(timestamp).toLocaleString(undefined, options);
};