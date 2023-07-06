import React, { useState, useContext, useEffect } from 'react';
import Context from "../../Context/Context";
import './Dashboard.css';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function ViewOrders() {
    const Global = useContext(Context);
    const [Orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/GetCustomerOrders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization-Token': localStorage.getItem('Token')
                }
            });
            const responseJson = await response.json();
            setOrders(responseJson);
        };

        if (Global.User) {
            fetchOrders();
        }
    }, [Global.User]);

    return (
        <>
            <div className='Dashboard-TitleA' >Your Orders</div>

            {Orders && (
                <div className='Upper-Div'>
                    <div className='Orders-Holder'>
                        <TableContainer className="OrderContainer">
                            <Table aria-label="Data Table" className='OrderTable'>
                                <TableHead className='OrderHead'>
                                    <TableRow>
                                        <TableCell id="Cell">SR#</TableCell>
                                        <TableCell id="Cell">PlateText</TableCell>
                                        <TableCell id="Cell">Address</TableCell>
                                        <TableCell id="Cell">City</TableCell>
                                        <TableCell id="Cell">Order Value</TableCell>
                                        <TableCell id="Cell">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Orders.map((Order, index) => (
                                        <TableRow key={index}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell >{Order.PlateText}</TableCell>
                                            <TableCell >{Order.Address1}</TableCell>
                                            <TableCell >{Order.City}</TableCell>
                                            <TableCell >£{Order.OrderValue}</TableCell>
                                            <TableCell >{Order.OrderStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

            )}

        </>
    );
}
