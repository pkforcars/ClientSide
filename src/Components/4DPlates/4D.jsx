import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import Context from "../../Context/Context"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.modules.css'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';

export default function HomePage() {
    const Global = useContext(Context)
    const Navigate = useNavigate()

    const [selectedState, setSelectedState] = useState("4D");
    const [PlateChoice, SetPlateChoice] = useState("Front and Rear");
    const [PlateText, SetPlateText] = useState("");
    const [Layout, SetLayout] = useState("Legal Plates");
    const [Font, SetFont] = useState("'Montserrat', sans-serif");
    const [FrontSize, SetFrontSize] = useState("Option1");
    const [RearSize, SetRearSize] = useState("Option1");
    const [Badge, SetBadge] = useState("")
    const [BadgeCity, SetBadgeCity] = useState("")
    const [BadgeFlag, SetBadgeFlag] = useState("")
    const [BadgeBackground, SetBadgeBackground] = useState("#366CB7")
    const [Border, SetBorder] = useState("transparent")
    const [FooterText, SetFooterText] = useState("Enter Footer Text")
    const [Vertical, SetVertical] = useState(false)
    const [ShortHand, setShortHand] = useState(false);
    const [FooterColor, SetFooterColor] = useState("black")
    const [Spare, setSpare] = useState(false)
    const [Material, SetMaterial] = useState("Standard-ABS")
    const [FittingKit, SetFittingKit] = useState(false)
    const [FrontText, SetFrontText] = useState("Standard Size (20.5x4.4in)")
    const [RearText, SetRearText] = useState("Standard Size (20.5x4.4in)")

    const OrderPlacement = () => {
        if (PlateText === "") {
            toast.error("Enter Plate Number")
            return
        }
        if (typeof Global?.Order !== 'undefined') {
            toast.error("You have already added this item to cart. Please remove it from cart to add it again.");
            return;
        }

        let CartItem = {
            "Type": selectedState,
            "FrontOption": FrontSize,
            "RearOption": RearSize,
            "PlateChoice": PlateChoice,
            "PlateText": PlateText,
            "Font": Font,
            "FrontSize": FrontSize,
            "RearSize": RearSize,
            "Badge": Badge,
            "BadgeBackground": BadgeBackground,
            "Border": Border,
            "Vertical": Vertical,
            "ShortHand": ShortHand,
            "Spare": Spare,
            "FittingKit": FittingKit,
            "Material": Material,
            "Total": CalculatePrice(),
            "FrontText": FrontText,
            "RearText": RearText,
            "BadgeCity": BadgeCity,
            "BadgeFlag": BadgeFlag,
            "Layout": Layout,
        };

        Global.SetOrder(CartItem)        
        let Total = parseFloat(Global.Total) + parseFloat(CalculatePrice());
        Global.SetTotal(Total)
        Navigate('/checkout')

        /*
        if (Global.isLoggedIn) {
            Navigate('/checkout')
        }
        else {
            Navigate('/login')
            Global.SetRedirectToCart(true)
        }
        */

    }


    const DisplayBought = () => {
        return (
            <>
                {(selectedState === '4D') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> 4D Plate</div>
                        <div><b>FrontSize:</b> {FrontText} £20.00</div>
                        <div><b>RearSize:</b> {RearText} £20.00</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border} £21.99</div>
                        }
                        <div><b>Material:</b> Standard ABS</div>
                        {Spare &&
                            <div><b>Spare:</b> £35.00</div>
                        }
                        {FittingKit &&
                            <div><b>Fitting Kit:</b> £3.99</div>
                        }
                    </div>
                }
            </>
        )
    }

    const CalculatePrice = () => {
        let CPrice = 0
        if (selectedState === '4D') {
            CPrice = CPrice + 39.99
            if (Border !== "transparent") {
                CPrice = CPrice + 21.99
            }
            if (Spare) {
                CPrice = CPrice + 35.00
            }
            if (FittingKit) {
                CPrice = CPrice + 3.99
            }
        }
        return CPrice.toFixed(2)
    }
    const handleSpareChange = (event) => { setSpare(event.target.checked); };
    const handleFittingKit = (event) => { SetFittingKit(event.target.checked); };
    const HandlePlateText = (e) => {
        const plateText = e.target.value;
        const characterCount = plateText.replace(/\s/g, '').length; // Count characters excluding spaces

        if (characterCount <= 7) {
            SetPlateText(plateText.toUpperCase());
        }
    };

    const HandleFrontSize = (e) => {
        SetFrontSize(e.target.value);
        const selectedText = e.target.options[e.target.selectedIndex].text;
        SetFrontText(selectedText)
        const styleOptions = {
            Option1: "PlateFront4D",
            Option4: "PlateFront4D4",
            Option5: "PlateFront4D5",
            Option2: "PlateFront4D7",
            Option3: "PlateFront4D9",

        };
        setAttribute(styleOptions[e.target.value]);
        const plateFront4D = document.getElementById(Attribute);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText);
        }
    };
    const HandleRearSize = (e) => {
        SetRearSize(e.target.value);
        const selectedText = e.target.options[e.target.selectedIndex].text;
        SetRearText(selectedText)

        const styleOptions = {
            Option1: "PlateFront4DR",
            Option4: "PlateFront4D4Copy",
            Option5: "PlateFront4D5Copy",
            Option2: "PlateFront4D7",
            Option3: "PlateFront4D9",
            Option6: "PlateFront4DR",

        };
        setAttribute2(styleOptions[e.target.value]);
        const plateFront4D = document.getElementById(Attribute2);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText);
        }
    };

    const HandleBorder = (e) => {
        SetBorder(e.target.value)
    };

    const HandleMaterial = (e) => { SetMaterial(e.target.value) }
    const [Attribute, setAttribute] = useState("PlateFront4D");
    const [Attribute2, setAttribute2] = useState("PlateFront4DR");

    useEffect(() => {
        const plateFront4D = document.getElementById(Attribute);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText);
        }
        const plateFront4D2 = document.getElementById(Attribute2);
        if (plateFront4D2) {
            plateFront4D2.setAttribute("data-content", PlateText);
        }

    })


    const ResetAll = () => {
        SetRearSize("Option1");
        SetFrontSize("Option1");
        SetBadgeBackground("#366CB7");
        SetBorder("transparent");
        SetBadge("");
        SetBadgeCity("");
        SetBadgeFlag("");
        SetFooterText("Enter Footer Text");
        SetLayout("Legal Plates");
        SetFont("'Montserrat', sans-serif")
        setSpare(false)
        SetFittingKit(false)
        SetMaterial("Standard-ABS")
        SetPlateChoice("Front and Rear")
        SetPlateText("")
        SetVertical(false)
        setShortHand(false)
        SetFooterColor("black")

    }

    return (
        <>
            <Navigation />
            <Cover />

            <div className='extras'>
                <div className='container extras-inner'>
                    <div className="extras-box">
                        <RequestQuoteIcon className='extras-icon' />
                        <h5>Request Quotation</h5>
                    </div>
                    <div className="extras-box">
                        <LocalShippingOutlinedIcon className='extras-icon' />
                        <h5>Urgent Delivery</h5>
                    </div>
                    <div className="extras-box">
                        <PaymentsOutlinedIcon className='extras-icon' />
                        <h5>Secure Payment</h5>
                    </div>
                    <div className="extras-box">
                        <AssuredWorkloadOutlinedIcon className='extras-icon' />
                        <h5>Guaranteed Service</h5></div>
                </div>
            </div>


            <div className='container' id="Headline">
                <span>You have arrived at the UK's leading number </span>
                <span>your plate design builder. Want to start building your number plate?</span>
            </div>

            <div className="AddPlateText">
                <input required type="text" value={PlateText} placeholder="Enter Registration " name="PlateText" className="PlateText" label="PlateText" onChange={HandlePlateText} />
            </div>
            <div className='container my-2' id="Grid">
                <div className="GridItem1">

                    <div className='MotorBoxTop'>
                        <h6>Select Material:</h6>
                        <div className='MotorBox'>
                            <label>
                                <input className="type-input" type="radio" name="platematerial" onChange={HandleMaterial} value="Standard-ABS" checked={Material === 'Standard-ABS'} />
                                <span className="type-tile2">
                                    <span className="type-label">Standard ABS</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className='MotorBoxTop'>
                        {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") &&
                            <>
                                <h6>Select Front Size:</h6>
                                <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                                        <option value="">-- Select Front Plate Size--</option>
                                        <option value="Option1">Standard Size (20.5x4.4in)</option>
                                        <option value="Option2">Short Plate [ 6 Letters ] </option>
                                        <option value="Option3">Short Plate [ 5 Letters ] </option>
                                        <option value="Option4">Standard UK Motorcycle</option>
                                        <option value="Option5">Standard 4x4 Plate</option>
                                    </select>
                                </div>
                            </>
                        }
                        {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") &&
                            <>
                                <h6
                                    style={{
                                        marginTop: "1rem"
                                    }}
                                >Select Rear Size:</h6>

                                <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown-Large' required onChange={HandleRearSize}>
                                        <option value="">-- Select Rear Plate Size--</option>
                                        <option value="Option1">Standard Size (20.5x4.4in)</option>
                                        <option value="Option6">Standard UK Car Large Rear</option>
                                        <option value="Option2">Short Plate [ 6 Letters ] </option>
                                        <option value="Option3">Short Plate [ 5 Letters ] </option>
                                        <option value="Option4">Standard UK Motorcycle</option>
                                        <option value="Option5">Standard 4x4 Plate</option>
                                    </select>
                                </div>
                            </>
                        }
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Border:</h6>
                        <div className='MotorBox1'>
                            <label>
                                <input className="type-input" type="radio" name="border" onChange={HandleBorder} value="transparent" checked={Border === 'transparent'} />
                                <span className="type-tile2">
                                    <span className="type-label">None</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="border" onChange={HandleBorder} value="Black" checked={Border === 'Black'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "2px solid black",
                                    }}
                                >
                                    <span className="type-label">Black</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="border" onChange={HandleBorder} value="Blue" checked={Border === 'Blue'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "2px solid blue",
                                    }}
                                >
                                    <span className="type-label">Blue</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="border" onChange={HandleBorder} value="Red" checked={Border === 'Red'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "2px solid red",
                                    }}
                                >
                                    <span className="type-label">Red</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="Centeralize1" onClick={ResetAll}>
                        <button className="Cart-Button1">Reset</button>
                    </div>
                </div>

                <div className="GridItem2">
                    {selectedState === '4D' && FrontSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                    {selectedState === '4D' && FrontSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState === '4D' && FrontSize === "Option2" &&
                        <div className="Centeralize">
                            <div className="Option3NEW_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }

                    {selectedState === '4D' && FrontSize === "Option4" &&
                        <div className="Centeralize">
                            <div className='Option2_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option2_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S2'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState === '4D' && FrontSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }


                    {selectedState === '4D' && RearSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {selectedState === '4D' && RearSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState === '4D' && RearSize === "Option2" &&
                        <div className="Centeralize">
                            <div className="Option3NEW_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }

                    {selectedState === '4D' && RearSize === "Option4" &&
                        <div className="Centeralize">
                            <div className='Option2_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option2_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S2'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState === '4D' && RearSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }

                    {selectedState === '4D' && RearSize === "Option6" &&
                        <div className="Centeralize">
                            <div className="Option2NEW_Basic" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }





                    <div className="Centeralize" >
                        <div id='YAB'>
                            <div className="Payment-Box">
                                <DisplayBought />
                                <div className="Price">£{CalculatePrice()}</div>
                            </div>

                            <div className='check'>
                                <label style={{ color: "black" }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={Spare}
                                        onChange={handleSpareChange}
                                        style={{
                                            marginRight: "0.5rem",
                                            marginTop: "0.5rem"
                                        }}

                                    />
                                    A spare pair of plates is always handy. Do you want to add a spare pair? £35.00
                                </label>
                                <label style={{ color: "black" }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={FittingKit}
                                        onChange={handleFittingKit}
                                        style={{
                                            marginRight: "0.5rem",
                                            marginTop: "0.5rem"
                                        }}
                                    />
                                    Do you need a fitting kit? £3.99 Each
                                </label>
                            </div>

                            <button className="Cart-Button" onClick={OrderPlacement}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>

            <Footer />
        </>
    )
}



const Cover = () => {
    return (
        <>
            <div className="homepage2">
                <div className='container'>
                    <h1>4D Plates</h1>
                </div>
            </div>

        </>
    )
}
