import React, { useState, useContext, useEffect } from 'react';
import Context from "../../Context/Context";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export default function ViewOrders() {
    const Global = useContext(Context);
    const [Orders, setOrders] = useState([]);
    const Navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/GetDisputedOrders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseJson = await response.json();
            setOrders(responseJson);
        };

        if (Global.User) {
            fetchOrders();
        }
    });

    const HandleStatus = (id) => {
        const UpdateStatus = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/Status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    OrderStatus: document.getElementById("Dropdown-A").value
                })
            });
            const responseJson = await response.json();
            if (responseJson.Success) {
                toast.success("Order Updated")
            }
            else {
                toast.error("Unable to Update")
            }

            document.getElementById("Dropdown-A").value = ""
            console.log(responseJson)
        };
        UpdateStatus();

    }
    return (
        <>
            <div className='Dashboard-TitleA'>Disputed Orders</div>


            <TableContainer className="OrderContainer">
                <Table aria-label="Data Table" className='OrderTable'>
                    <TableHead className='OrderHead'>
                        <TableRow>
                            <TableCell id="Cell">SR#</TableCell>
                            <TableCell id="Cell">User Email</TableCell>
                            <TableCell id="Cell">Address 1</TableCell>
                            <TableCell id="Cell">Phone</TableCell>
                            <TableCell id="Cell">Delivery</TableCell>
                            <TableCell id="Cell">Order Status</TableCell>
                            <TableCell id="Cell">Timestamp</TableCell>
                            <TableCell id="Cell">Status Action</TableCell>
                            <TableCell id="Cell">View Order</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Orders.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.UserEmail}</TableCell>
                                <TableCell>{item.Address1}</TableCell>
                                <TableCell>{item.Phone}</TableCell>
                                <TableCell>{item.Delivery}</TableCell>
                                <TableCell>{item.OrderStatus}</TableCell>
                                <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
                                <TableCell>
                                    <select id='Dropdown-A' required onChange={() => { HandleStatus(item._id) }}>
                                        <option value="">-- Select Status--</option>
                                        <option value="Processing">Confirmed and Process</option>
                                        <option value="Disputed">Disputed</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                <button className='View-Button' onClick={() => {
                                        Global.SetOrder(item)
                                        Navigate('/order')
                                    }
                                    }>View</button>
                              </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <ToastContainer theme="colored" />

        </>
    );
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