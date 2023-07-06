import React, { useState, useContext, useEffect } from 'react';
import Context from "../../Context/Context";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
export default function ReviewPage() {

    const DeleteFeedback = async (id, event) => {
        try {
            let Success = false
            const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/feedback/DeleteFeedback`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id
                    })
                });
            const ResponseToJson = await Response.json();
            Success = ResponseToJson.Success;
            if (Success) {
                toast.success("Review Deleted Successfully");
            }
            else {
                toast.error("An error occured");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const Global = useContext(Context);
    const [Feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/feedback/GetAllFeedback`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseJson = await response.json();
            setFeedbacks(responseJson);
        };

        if (Global.User) {
            fetchOrders();
        }
    });


    return (
        <div>
            <div className='Dashboard-Title'>Manage Feedbacks</div>

            {Feedbacks && (
                <div className='Upper-Div'>
                    <div className='Orders-Holder'>
                        <TableContainer className="OrderContainer">
                            <Table aria-label="Data Table" className='OrderTable'>
                                <TableHead className='OrderHead'>
                                    <TableRow>
                                        <TableCell id="Cell">SR#</TableCell>
                                        <TableCell id="Cell">Descriptions</TableCell>
                                        <TableCell id="Cell">Rating</TableCell>
                                        <TableCell id="Cell">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Feedbacks.map((Order, index) => (
                                        <TableRow key={index}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell >{Order.description.substring(0, 60)}</TableCell>
                                            <TableCell >
                                                {(Order.stars === 0 || Order.stars === 0.5)
                                                    &&
                                                    <div className='stars'>
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                    </div>
                                                }
                                                {(Order.stars === 1 || Order.stars === 1.5)
                                                    &&
                                                    <div className='stars'>
                                                        <StarOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                    </div>
                                                }
                                                {(Order.stars === 2 || Order.stars === 2.5)
                                                    &&
                                                    <div className='stars'>
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                    </div>
                                                }
                                                {(Order.stars === 3 || Order.stars === 3.5)
                                                    &&
                                                    <div className='stars'>
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                    </div>
                                                }
                                                {(Order.stars === 4 || Order.stars === 4.5)
                                                    &&
                                                    <div className='stars'>
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlineOutlinedIcon />
                                                    </div>
                                                }
                                                {(Order.stars === 5)
                                                    &&
                                                    <div className='stars'>
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                        <StarOutlinedIcon />
                                                    </div>
                                                }
                                            </TableCell>
                                            <TableCell id="Cell">
                                                <button type="button" className="Delete-Btn" onClick={() => { DeleteFeedback(Order._id) }}>Delete</button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}
            <ToastContainer theme="colored" />


        </div >


    );
};




