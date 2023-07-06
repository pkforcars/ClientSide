import React, { useState, useContext, useEffect } from 'react';
import Context from "../../Context/Context";
import './Dashboard.css';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

export default function ReviewPage() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const handleRatingChange = (event) => { setRating(event.target.value); };
    const handleCommentChange = (event) => { setComment(event.target.value); };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let Success = false;
        try {
            const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/feedback/AddFeedback`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization-Token': localStorage.getItem('Token')
                    },
                    body: JSON.stringify({
                        stars: rating,
                        description: comment
                    })
                });
            const ResponseToJson = await Response.json();
            Success = ResponseToJson.Success;
            if (Success) {
                toast.success("Review added Successfully");
            }
            else {
                toast.error("An error occured");
            }
        }
        catch (err) {
            console.log(err);
        }

        setRating(0);
        setComment('');
    };
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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/feedback/GetFeedback`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization-Token': localStorage.getItem('Token')
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
            <div className='Dashboard-TitleA'>Your Feedbacks</div>

            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <div className="Feedback-Area">
                        <div className='Feedback-Pt1'>
                            <label>Leave a Feedback:</label>
                            <textarea value={comment} onChange={handleCommentChange} placeholder="This is a feedback" id="Feedback-area" />
                        </div>
                        <div className='Feedback-Pt2'>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="1"
                                    value={rating}
                                    onChange={handleRatingChange}
                                    className="slider-input"
                                />
                            </div>
                            <div className='d-stars'>
                                {rating >= 0 && rating < 1 &&
                                    <div className='stars'>
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                    </div>
                                }

                                {rating >= 1 && rating < 2 &&
                                    <div className='stars'>
                                        <StarOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                    </div>
                                }

                                {rating >= 2 && rating < 3 &&
                                    <div className='stars'>
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                    </div>
                                }

                                {rating >= 3 && rating < 4 &&
                                    <div className='stars'>
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                    </div>
                                }

                                {rating >= 4 && rating < 5 &&
                                    <div className='stars'>
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlineOutlinedIcon />
                                    </div>
                                }
                                {rating >= 5 &&
                                    <div className='stars'>
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                        <StarOutlinedIcon />
                                    </div>
                                }
                            </div>
                            <button type="submit" className="login-button">Submit</button>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </form>


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




