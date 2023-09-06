import React, { useState, useContext } from 'react';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import Context from "../../Context/Context"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.module.css'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';

export default function HomePage() {
    const Global = useContext(Context)
    const Navigate = useNavigate()

    const [selectedState, setSelectedState] = useState("custom");
    const [PlateChoice, SetPlateChoice] = useState("Front and Rear");
    const [PlateText, SetPlateText] = useState("");
    const [PlateType, SetPlateType] = useState("Normal")
    const [Layout, SetLayout] = useState("Legal Plates");
    const [Font, SetFont] = useState("black");
    const [FrontSize, SetFrontSize] = useState("Option30");
    const [RearSize, SetRearSize] = useState("Option30");
    const [Badge, SetBadge] = useState("")
    const [BadgeCity, SetBadgeCity] = useState("")
    const [BadgeFlag, SetBadgeFlag] = useState("")
    const [BadgeBackground, SetBadgeBackground] = useState("#366CB7")
    const [Border, SetBorder] = useState("transparent")
    const [Vertical, SetVertical] = useState(false)
    const [ShortHand, setShortHand] = useState(false);
    const [FooterText, SetFooterText] = useState("")
    const [FooterColor, SetFooterColor] = useState("black")
    const [Delivery, SetDelivery] = useState("")
    const [Spare, setSpare] = useState(false)
    const [Material, SetMaterial] = useState("Standard-ABS")
    const [FittingKit, SetFittingKit] = useState(false)
    const [FrontText, SetFrontText] = useState("Standard Size (20.5x4.4in)")
    const [RearText, SetRearText] = useState("Standard Size (20.5x4.4in)")
    const [LeftBadgesPopup, SetLeftBadgesPopUp] = useState(false)
    const [LeftBadge, SetLeftBadge] = useState({})
    const [LeftBadgeBackground, SetLeftBadgeBackground] = useState("white")
    const [RightBadgesPopup, SetRightBadgesPopUp] = useState(false)
    const [RightBadge, SetRightBadge] = useState({})
    const [RightBadgeBackground, SetRightBadgeBackground] = useState("white")



    const OrderPlacement = () => {
        if (PlateText === "") {
            toast.error("Enter Plate Number")
            return
        }
        if (Delivery === "" || Delivery === "N/A") {
            toast.error("Select Delivery Option")
            return
        }

        Global.SetOrder({
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
            "Delivery": Delivery,
            "Spare": Spare,
            "FittingKit": FittingKit,
            "Material": Material,
            "Total": CalculatePrice(),
            "FrontText": FrontText,
            "RearText": RearText,
            "LeftBadge": LeftBadge,
            "LeftBadgeBackground": LeftBadgeBackground,
            "RightBadge": RightBadge,
            "RightBadgeBackground": RightBadgeBackground,
            "FooterText": FooterText,
            "FooterColor": FooterColor,
            "PlateType": PlateType,
            "Layout": Layout            
        });
        if (Global.isLoggedIn) {
            Navigate('/checkout')
        }
        else {
            Navigate('/login')
            Global.SetRedirectToCart(true)
        }

    }

    const DisplayBought = () => {
        return (
            <>
                {(selectedState === 'custom' && PlateChoice === 'Front and Rear') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Custom</div>
                        <div><b>FrontSize:</b> {FrontText} £9.99</div>
                        <div><b>RearSize:</b> {RearText} £9.99</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border} £21.99</div>
                        }
                        {typeof LeftBadge?.Image !== "undefined" &&
                            <div><b>Left Badge :</b> {LeftBadge.Image} [{LeftBadgeBackground}]  £29.99</div>
                        }
                        {typeof RightBadge?.Image !== "undefined"  &&
                            <div><b>Right Badge:</b> {RightBadge.Image} [{RightBadgeBackground}] £29.99</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge} £14.99</div>
                        }
                        {PlateType &&
                            <div><b>Plate Type:</b> {PlateType}</div>
                        }
                        {FooterText !== "" &&
                            <div><b>Footer Text:</b> {FooterText} [{FooterColor}]</div>
                        }
                        {Spare &&
                            <div><b>Spare:</b> £15.00</div>
                        }
                        {FittingKit &&
                            <div><b>Fitting Kit:</b> £3.99</div>
                        }
                        {Font &&
                            <div><b>Font Color:</b> {Font}</div>
                        }
                        <div><b>Material:</b> Standard ABS</div>
                        <div><b>Delivery:</b> {Delivery}</div>
                        <div><b>Total:</b> £{CalculatePrice()}</div>
                    </div>
                }
            </>
        )
    }

    const CalculatePrice = () => {
        let CPrice = 0
        if (selectedState === 'custom' && PlateChoice === 'Front and Rear') {
            CPrice = CPrice + 19.99
            if (Border !== "transparent") {
                CPrice = CPrice + 21.99
            }
            if (Badge !== "") {
                CPrice = CPrice + 29.99
            }
            if (Spare) {
                CPrice = CPrice + 30.00
            }
            if (FittingKit) {
                CPrice = CPrice + 3.99
            }
        }
        if (selectedState === 'custom' && PlateChoice === 'Front Only') {
            CPrice = CPrice + 9.99
            if (Border !== "transparent") {
                CPrice = CPrice + 10.99
            }
            if (Badge !== "") {
                CPrice = CPrice + 14.99
            }
            if (Spare) {
                CPrice = CPrice + 15.00
            }
            if (FittingKit) {
                CPrice = CPrice + 3.99
            }
        }
        if (selectedState === 'custom' && PlateChoice === 'Rear Only') {
            CPrice = CPrice + 9.99
            if (Border !== "transparent") {
                CPrice = CPrice + 10.99
            }
            if (Badge !== "") {
                CPrice = CPrice + 14.99
            }
            if (Spare) {
                CPrice = CPrice + 15.00
            }
            if (FittingKit) {
                CPrice = CPrice + 3.99
            }
        }
        if (selectedState !== 'custom') {
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

        if (Delivery === "Local in Milton Keynes free delivery/collection") {
            CPrice = CPrice + 0
        }
        if (Delivery === "Standard Delivery £3.99") {
            CPrice = CPrice + 3.99
        }
        if (Delivery === "First Class Tracked £6.99") {
            CPrice = CPrice + 6.99
        }
        if (Delivery === "Spacial Delivery £11.99") {
            CPrice = CPrice + 11.99
        }


        return CPrice.toFixed(2)
    }
    const HandleDelivery = (e) => { SetDelivery(e.target.value) }
    const handleSpareChange = (event) => { setSpare(event.target.checked); };
    const handleFittingKit = (event) => { SetFittingKit(event.target.checked); };
    const HandlePlateText = (e) => {
        const plateText = e.target.value;
        const characterCount = plateText.replace(/\s/g, '').length;
        if (characterCount <= 7) {
            SetPlateText(plateText.toUpperCase());
        }
    };
    const HandleFrontSize = (e) => {
        SetFrontSize(e.target.value);
        const selectedText = e.target.options[e.target.selectedIndex].text;
        SetFrontText(selectedText)
    };
    const HandleRearSize = (e) => {
        SetRearSize(e.target.value);
        const selectedText = e.target.options[e.target.selectedIndex].text;
        SetRearText(selectedText)
    };
    const HandleBadgeBg = (e) => {
        if (e.target.value === 'Electric') {
            SetBadgeBackground("#428E3A")
        }
        else {
            SetBadgeBackground("#366CB7")
        }
    };
    const HandleBorder = (e) => {
        SetBorder(e.target.value)
    };
    const HandleBadge = (e) => {
        SetBadge(e.target.value);
        if (e.target.value === "None") {
            SetBadge("")
        }
        if (e.target.value !== "" && e.target.value !== "None") {
            const [flag, city] = e.target.value.split('-');
            if (flag.endsWith('P')) {
                SetVertical(true)
            }
            else {
                SetVertical(false)
            }
            if (city.length > 4) {
                setShortHand(true)
            } else {
                setShortHand(false)
            }
            SetBadgeCity(city);

            var updatedFlag = flag.replace("P", "");
            updatedFlag = updatedFlag.charAt(0).toUpperCase() + updatedFlag.slice(1);
            SetBadgeFlag(updatedFlag);

        }
        if (e.target.value === "") {
            SetBadge("")
            SetBadgeCity("");
            SetBadgeFlag("");
        }
    };

    const HandleMaterial = (e) => { SetMaterial(e.target.value) }
    const HandlePlateType = (e) => { SetPlateType(e.target.value) }

    const ResetAll = () => {
        SetRearSize("Option30");
        SetFrontSize("Option30");
        SetBadgeBackground("#366CB7");
        SetBorder("transparent");
        SetBadge("");
        SetBadgeCity("");
        SetBadgeFlag("");
        SetFooterText("");
        SetLayout("Legal Plates");
        SetFont("black")
        SetDelivery("")
        setSpare(false)
        SetFittingKit(false)
        SetPlateType("Normal")
        SetPlateChoice("Front and Rear")
        SetMaterial("Standard-ABS")
        SetLeftBadge({})
        SetRightBadge({})
        SetLeftBadgeBackground("transparent")
        SetRightBadgeBackground("transparent")
        SetFooterColor("black")
        SetPlateText("")
        SetVertical(false)
        setShortHand(false)
    }

    const HandlePlates = (e) => {
        SetPlateChoice(e.target.value)
    }

    const HandleFontColor = (e) => {
        SetFont(e.target.value)

    }
    const HandleLeftBackgroundColor = (e) => {
        SetLeftBadgeBackground(e.target.value)
    }

    const HandleRightBackgroundColor = (e) => {
        SetRightBadgeBackground(e.target.value)
    }

    const OpenPopUp = () => {
        SetLeftBadgesPopUp(true)
    }

    const ClosePopUp = () => {
        SetLeftBadgesPopUp(false)
    }

    const OpenPopUp2 = () => {
        SetRightBadgesPopUp(true)
    }

    const ClosePopUp2 = () => {
        SetRightBadgesPopUp(false)
    }

    const HandleFooterTextChange = (e) => {
        SetFooterText(e.target.value)
    }

    const HandleFooterColor = (e) => {
        SetFooterColor(e.target.value)
    }

    return (
        <>
            <Navigation />
            <Cover />


            {LeftBadgesPopup && (
                <div className="PopupContainer">
                    <div className="Popup">
                        <div className="PopupNavbar">
                            <h3 className="PopupTitle">Left</h3>
                            <h3 className="PopupTitleIn">Badges</h3>
                        </div>
                        <div className="PopupImages">
                            {Badges.map((badge) => (
                                <div className="PopupImageContainer" onClick={
                                    () => {
                                        if (badge.BadgeText !== "None"

                                        ) {
                                            SetLeftBadge(badge)
                                        } else {
                                            SetLeftBadge({})
                                        }
                                    }
                                }
                                    style={{
                                        backgroundColor: (LeftBadge.BadgeText === badge.BadgeText && LeftBadge.Index === badge.Index) ?
                                            "gray" : "",
                                        color: (LeftBadge.BadgeText === badge.BadgeText && LeftBadge.Index === badge.Index) ?
                                            "white" : ""
                                    }}
                                >
                                    <img
                                        src={`/Custom/${badge.Image}`}
                                        alt="Aberdeen"
                                        width={badge.width}
                                        height={badge.height}
                                    />
                                    <h5>{badge.BadgeText}</h5>
                                </div>
                            ))}                       </div>
                        <div className="ImageContainer">
                        </div>

                        <div className="PopupButtons">
                            <button className="PopupButton" onClick={() => {
                                ClosePopUp()
                                SetLeftBadge({})
                            }}>Close</button>
                            <button className="PopupButton2" onClick={ClosePopUp}>Done</button>
                        </div>
                    </div>
                </div>
            )}
            {RightBadgesPopup && (
                <div className="PopupContainer">
                    <div className="Popup">
                        <div className="PopupNavbar">
                            <h3 className="PopupTitle">Right</h3>
                            <h3 className="PopupTitleIn">Badges</h3>
                        </div>
                        <div className="PopupImages">
                            {Badges.map((badge) => (
                                <div className="PopupImageContainer" onClick={
                                    () => {
                                        if (badge.BadgeText !== "None"

                                        ) {
                                            SetRightBadge(badge)
                                        } else {
                                            SetRightBadge({})
                                        }
                                    }
                                }
                                    style={{
                                        backgroundColor: (RightBadge.BadgeText === badge.BadgeText && RightBadge.Index === badge.Index) ?
                                            "gray" : "",
                                        color: (RightBadge.BadgeText === badge.BadgeText && RightBadge.Index === badge.Index) ?
                                            "white" : ""
                                    }}
                                >
                                    <img
                                        src={`/Custom/${badge.Image}`}
                                        alt="Aberdeen"
                                        width={badge.width}
                                        height={badge.height}
                                    />
                                    <h5>{badge.BadgeText}</h5>
                                </div>
                            ))}                       </div>
                        <div className="ImageContainer">
                        </div>

                        <div className="PopupButtons">
                            <button className="PopupButton" onClick={() => {
                                ClosePopUp2()
                                SetRightBadge({})
                            }}>Close</button>
                            <button className="PopupButton2" onClick={ClosePopUp2}>Done</button>
                        </div>
                    </div>
                </div>
            )}



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
                        <h6>Select Plates:</h6>
                        <div className='MotorBox'>
                            <label>
                                <input className="type-input" type="radio" name="platechoice"
                                    onChange={HandlePlates} value="Front and Rear" checked={PlateChoice === 'Front and Rear'} />
                                <span className="type-tile">
                                    <span className="type-icon">
                                        <img src="/FRONTPLATE.png" alt="Front Plate" width={100} height={25} />
                                        <img src="/REAR.png" alt="Rear" width={100} height={25} />
                                    </span>
                                    <span className="type-label">Front and Rear</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platechoice" onChange={HandlePlates} value="Front Only" checked={PlateChoice === 'Front Only'} />
                                <span className="type-tile">
                                    <span className="type-icon">
                                        <img src="/FRONTPLATE.png" alt="Front Plate" width={100} height={25} />
                                    </span>
                                    <span className="type-label">Front Only</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platechoice" onChange={HandlePlates} value="Rear Only" checked={PlateChoice === 'Rear Only'} />
                                <span className="type-tile">
                                    <span className="type-icon">
                                        <img src="/REAR.png" alt="Rear" width={100} height={25} />
                                    </span>
                                    <span className="type-label">Rear Only</span>
                                </span>
                            </label>
                        </div>
                    </div>


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
                                        <option value="Option30">Standard Size (20.5x4.4in)</option>
                                        <option value="Option30">Standard Car Plate 520mm x 111mm (20.5in x 4.4in)</option>
                                        <option value="Option30">520mm x 111mm (20.5in x 4.4in)</option>
                                        <option value="Option30">Standard Bike Plate 229mm x 178mm (9in x 7in)</option>
                                        <option value="Option30">520mm x 90mm (20.5in x 3.54in)</option>
                                        <option value="Option30">464mm x 95mm (18.3in x 3.74in)</option>
                                        <option value="Option30">260mm x 110mm (10.2in x 4.3in)</option>
                                        <option value="Option30">330mm x 111mm (13in x 4.4in)</option>
                                        <option value="Option30">406mm x 111mm (16in x 4.4in)</option>
                                        <option value="Option30">420mm x 111mm (16.53in x 4.4in)</option>
                                        <option value="Option30">457mm x 111mm (18in x 4.4in)</option>
                                        <option value="Option30">305mm x 76 (12in x 3in)</option>
                                        <option value="Option30">170mm x 80mm (6.69in x 3.14in)</option>
                                        <option value="Option30">152mmx 102mm (6in x 4in)</option>
                                        <option value="Option30">178mm x 127mm (7in x 5in)</option>
                                        <option value="Option30">178mm x 140mm (7in x 5.5in)</option>
                                        <option value="Option30">178mm x 152mm (7in x 6in)</option>
                                        <option value="Option30">190mm x 152mm (7.5in x 6in)</option>
                                        <option value="Option30">190mm x 165mm (7.5in x 6.5in)</option>
                                        <option value="Option30">203mm x 152mm (8in x 6in)</option>
                                        <option value="Option30">305mm x 152mm (12in x 6in)</option>
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
                                        <option value="Option30">Standard Size (20.5x4.4in)</option>
                                        <option value="Option30">Standard Car Plate 520mm x 111mm (20.5in x 4.4in)</option>
                                        <option value="Option30">520mm x 111mm (20.5in x 4.4in)</option>
                                        <option value="Option30">Standard Bike Plate 229mm x 178mm (9in x 7in)</option>
                                        <option value="Option30">520mm x 90mm (20.5in x 3.54in)</option>
                                        <option value="Option30">464mm x 95mm (18.3in x 3.74in)</option>
                                        <option value="Option30">260mm x 110mm (10.2in x 4.3in)</option>
                                        <option value="Option30">330mm x 111mm (13in x 4.4in)</option>
                                        <option value="Option30">406mm x 111mm (16in x 4.4in)</option>
                                        <option value="Option30">420mm x 111mm (16.53in x 4.4in)</option>
                                        <option value="Option30">457mm x 111mm (18in x 4.4in)</option>
                                        <option value="Option30">305mm x 76 (12in x 3in)</option>
                                        <option value="Option30">170mm x 80mm (6.69in x 3.14in)</option>
                                        <option value="Option30">152mmx 102mm (6in x 4in)</option>
                                        <option value="Option30">178mm x 127mm (7in x 5in)</option>
                                        <option value="Option30">178mm x 140mm (7in x 5.5in)</option>
                                        <option value="Option30">178mm x 152mm (7in x 6in)</option>
                                        <option value="Option30">190mm x 152mm (7.5in x 6in)</option>
                                        <option value="Option30">190mm x 165mm (7.5in x 6.5in)</option>
                                        <option value="Option30">203mm x 152mm (8in x 6in)</option>
                                        <option value="Option30">305mm x 152mm (12in x 6in)</option>
                                    </select>
                                </div>
                            </>
                        }
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Type:</h6>
                        <div className='MotorBox'>
                            <label>
                                <input className="type-input" type="radio" name="platetype" onChange={HandlePlateType} value="Normal" checked={PlateType === 'Normal'} />
                                <span className="type-tile2">
                                    <span className="type-label">Normal</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platetype" onChange={HandlePlateType} value="Tinted" checked={PlateType === 'Tinted'} />
                                <span className="type-tile2">
                                    <span className="type-label">Tinted</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platetype" onChange={HandlePlateType} value="Stick-On" checked={PlateType === 'Stick-On'} />
                                <span className="type-tile2">
                                    <span className="type-label">Stick-On</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platetype" onChange={HandlePlateType} value="Stick-On-Tinted" checked={PlateType === 'Stick-On-Tinted'} />
                                <span className="type-tile2">
                                    <span className="type-label">Stick-On-Tinted</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platetype" onChange={HandlePlateType} value="Gel" checked={PlateType === 'Gel'} />
                                <span className="type-tile2">
                                    <span className="type-label">Gel</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="platetype" onChange={HandlePlateType} value="Gel-Tinted" checked={PlateType === 'Gel-Tinted'} />
                                <span className="type-tile2">
                                    <span className="type-label">Gel-Tinted</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Font Color:</h6>
                        <div className='MotorBox'>
                            <label>
                                <input className="type-input" type="radio" name="fontcolor" onChange={HandleFontColor} value="black" checked={Font === 'black'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "2px solid black",
                                        color: "black",
                                        fontWeight: "700",
                                    }}
                                >
                                    <span className="type-label">Black</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="fontcolor" onChange={HandleFontColor} value="white" checked={Font === 'white'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "1px solid black",
                                        color: "white",
                                        fontWeight: "700",
                                    }}
                                >
                                    <span className="type-label">White</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="fontcolor" onChange={HandleFontColor} value="red" checked={Font === 'red'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "2px solid red",
                                        color: "red",
                                        fontWeight: "700",
                                    }}
                                >
                                    <span className="type-label">Red</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="fontcolor" onChange={HandleFontColor} value="blue" checked={Font === 'blue'} />
                                <span className="type-tile2"
                                    style={{
                                        border: "2px solid blue",
                                        color: "blue",
                                        fontWeight: "700",
                                    }}
                                >
                                    <span className="type-label">Blue</span>
                                </span>
                            </label>
                            <label>
                                <input
                                    className="type-input"
                                    type="color"
                                    value={Font}
                                    onChange={HandleFontColor}
                                />
                                <span className="type-tile2"
                                    style={{
                                        border: `2px solid ${Font}`,
                                        color: `${Font}`,
                                        fontWeight: "700",
                                        background: `${Font}`,
                                    }}
                                >
                                    <span className="type-label">Custom</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="fontcolor" onChange={HandleFontColor} value="carbon" checked={Font === 'carbon'} />
                                <span className="type-tile">
                                    <span className="type-icon">
                                        <img src="/carbon.png" alt="Carbon" width={100} height={25} />
                                    </span>
                                    <span className="type-label">Carbon</span>
                                </span>
                            </label>


                        </div>
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Left Badge:</h6>
                        <div className='MotorBox2'>
                            <button onClick={OpenPopUp}>
                                Choose Badge
                            </button>
                            <label>
                                <input
                                    className="type-input"
                                    type="color"
                                    value={LeftBadgeBackground}
                                    onChange={HandleLeftBackgroundColor}
                                />
                                <span className="type-tile2"
                                    style={{
                                        border: (LeftBadgeBackground === "white") ? "2px solid black" : `2px solid ${LeftBadgeBackground}`,
                                        color: `${LeftBadgeBackground}`,
                                        fontWeight: "700",
                                        background: `${LeftBadgeBackground}`,
                                    }}
                                >
                                    <span className="type-label">Choose Backgound Color</span>
                                </span>
                            </label>

                        </div>
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Right Badge:</h6>
                        <div className='MotorBox2'>
                            <button onClick={OpenPopUp2}>
                                Choose Badge
                            </button>
                            <label>
                                <input
                                    className="type-input"
                                    type="color"
                                    value={RightBadgeBackground}
                                    onChange={HandleRightBackgroundColor}
                                />
                                <span className="type-tile2"
                                    style={{
                                        border: (RightBadgeBackground === "white") ? "2px solid black" : `2px solid ${RightBadgeBackground}`,
                                        color: `${RightBadgeBackground}`,
                                        fontWeight: "700",
                                        background: `${RightBadgeBackground}`,
                                    }}
                                >
                                    <span className="type-label">Choose Backgound Color</span>
                                </span>
                            </label>

                        </div>
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Footer Text:</h6>
                        <div className='MotorBox2'>
                            <input
                                style={{
                                    border: `1px solid gray`,
                                    color: `${FooterColor}`,
                                    fontWeight: "300",
                                    fontSize: "0.8rem",
                                    width: "100%",
                                    paddingLeft: "1rem"

                                }}
                                type="text"
                                onChange={HandleFooterTextChange}
                            />
                            <label>
                                <input
                                    className="type-input"
                                    type="color"
                                    value={FooterColor}
                                    onChange={HandleFooterColor}
                                />
                                <span className="type-tile2"
                                    style={{
                                        border: `2px solid ${FooterColor}`,
                                        fontWeight: "700",
                                    }}
                                >
                                    <span className="type-label">Choose Footer Color</span>
                                </span>
                            </label>

                        </div>
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") &&
                        typeof LeftBadge?.Image === "undefined"
                        &&
                        typeof RightBadge?.Image === "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic"
                                style={{
                                    backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                        PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0.5)" : "#E7E7E7"
                                }}>

                                <div className='Option1_Container'>
                                    {PlateText && <div className="Option1_Number" style={{ color: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ color: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#E7E7E7",
                                            zIndex: '99'
                                        }}>
                                            {FooterText ? FooterText : "CPD JE2 4UE"}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")
                        && typeof LeftBadge?.Image !== "undefined"
                        &&
                        typeof RightBadge?.Image === "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="Custom" style={{
                                backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                    PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0.5)" : "#E7E7E7"
                            }}>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (LeftBadgeBackground === "white") ? "transparent" : LeftBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${LeftBadge.Image}`}
                                        alt="Aberdeen"
                                        width={LeftBadge.width}
                                        height={LeftBadge.height}
                                    />
                                    <h5>{LeftBadge.BadgeText}</h5>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#E7E7E7",
                                            color: FooterColor
                                        }}> {FooterText ? FooterText : "CPD JE2 4UE"}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="centered-container" style={{
                                marginTop: "-0.5rem"
                            }}>
                                {Layout === "Custom Plates" && (
                                    <p
                                        className="Option1_Footer"
                                        style={{ backgroundColor: "#E7E7E7", color: FooterColor }}
                                    >
                                        {FooterText}
                                    </p>
                                )}
                            </div>

                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") &&
                        typeof LeftBadge?.Image === "undefined"
                        &&
                        typeof RightBadge?.Image !== "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="CustomR" style={{
                                backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                    PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0.5)" : "#E7E7E7"
                            }}>

                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#E7E7E7",
                                            color: FooterColor
                                        }}> {FooterText ? FooterText : "CPD JE2 4UE"}</p>}
                                    </div>
                                </div>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (RightBadgeBackground === "white") ? "transparent" : RightBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${RightBadge.Image}`}
                                        alt="Aberdeen"
                                        width={RightBadge.width}
                                        height={RightBadge.height}
                                    />
                                    <h5>{RightBadge.BadgeText}</h5>
                                </div>

                            </div>

                            <div className="centered-container" style={{
                                marginTop: "-0.5rem"
                            }}>
                                {Layout === "Custom Plates" && (
                                    <p
                                        className="Option1_Footer"
                                        style={{ backgroundColor: "#E7E7E7", color: FooterColor }}
                                    >
                                        {FooterText}
                                    </p>
                                )}
                            </div>

                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && typeof RightBadge?.Image !== "undefined"
                        &&
                        typeof LeftBadge?.Image !== "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="CustomM" style={{
                                backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                    PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0.5)" : "#E7E7E7"
                            }}>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (LeftBadgeBackground === "white") ? "transparent" : LeftBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${LeftBadge.Image}`}
                                        alt="Aberdeen"
                                        width={LeftBadge.width}
                                        height={LeftBadge.height}
                                    />
                                    <h5>{LeftBadge.BadgeText}</h5>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_CustomM" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_CustomM" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#E7E7E7",
                                            color: FooterColor
                                        }}> {FooterText ? FooterText : "CPD JE2 4UE"}</p>}
                                    </div>
                                </div>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (RightBadgeBackground === "white") ? "transparent" : RightBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${RightBadge.Image}`}
                                        alt="Aberdeen"
                                        width={RightBadge.width}
                                        height={RightBadge.height}
                                    />
                                    <h5>{RightBadge.BadgeText}</h5>
                                </div>

                            </div>

                            <div className="centered-container" style={{
                                marginTop: "-0.5rem"
                            }}>
                                {Layout === "Custom Plates" && (
                                    <p
                                        className="Option1_Footer"
                                        style={{ backgroundColor: "#E7E7E7", color: FooterColor }}
                                    >
                                        {FooterText}
                                    </p>
                                )}
                            </div>

                        </div>
                    }


                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") &&
                        typeof LeftBadge?.Image === "undefined"
                        &&
                        typeof RightBadge?.Image === "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic"
                                style={{
                                    backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                        PlateType === "Gel-Tinted" ? "rgba(241, 179, 23, 0.5)" : "#F1B317"
                                }}>

                                <div className='Option1_Container'>
                                    {PlateText && <div className="Option1_Number" style={{ color: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ color: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#F1B317",
                                            zIndex: '99'
                                        }}>
                                            {FooterText ? FooterText : "CPD JE2 4UE"}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")
                        && typeof LeftBadge?.Image !== "undefined"
                        &&
                        typeof RightBadge?.Image === "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="Custom" style={{
                                backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                    PlateType === "Gel-Tinted" ? "rgba(241, 179, 23, 0.5)" : "#F1B317"
                            }}>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (LeftBadgeBackground === "white") ? "transparent" : LeftBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${LeftBadge.Image}`}
                                        alt="Aberdeen"
                                        width={LeftBadge.width}
                                        height={LeftBadge.height}
                                    />
                                    <h5>{LeftBadge.BadgeText}</h5>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#F1B317",
                                            color: FooterColor
                                        }}> {FooterText ? FooterText : "CPD JE2 4UE"}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="centered-container" style={{
                                marginTop: "-0.5rem"
                            }}>
                                {Layout === "Custom Plates" && (
                                    <p
                                        className="Option1_Footer"
                                        style={{ backgroundColor: "#F1B317", color: FooterColor }}
                                    >
                                        {FooterText}
                                    </p>
                                )}
                            </div>

                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") &&
                        typeof LeftBadge?.Image === "undefined"
                        &&
                        typeof RightBadge?.Image !== "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="CustomR" style={{
                                backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                    PlateType === "Gel-Tinted" ? "rgba(241, 179, 23, 0.5)" : "#F1B317"
                            }}>

                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Custom" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#F1B317",
                                            color: FooterColor
                                        }}> {FooterText ? FooterText : "CPD JE2 4UE"}</p>}
                                    </div>
                                </div>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (RightBadgeBackground === "white") ? "transparent" : RightBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${RightBadge.Image}`}
                                        alt="Aberdeen"
                                        width={RightBadge.width}
                                        height={RightBadge.height}
                                    />
                                    <h5>{RightBadge.BadgeText}</h5>
                                </div>

                            </div>

                            <div className="centered-container" style={{
                                marginTop: "-0.5rem"
                            }}>
                                {Layout === "Custom Plates" && (
                                    <p
                                        className="Option1_Footer"
                                        style={{ backgroundColor: "#F1B317", color: FooterColor }}
                                    >
                                        {FooterText}
                                    </p>
                                )}
                            </div>

                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && typeof RightBadge?.Image !== "undefined"
                        &&
                        typeof LeftBadge?.Image !== "undefined"
                        && selectedState === 'custom' && FrontSize === "Option30" &&
                        <div className="Centeralize">
                            <div className="CustomM" style={{
                                backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                    PlateType === "Gel-Tinted" ? "rgba(241, 179, 23, 0.5)" : "#F1B317"
                            }}>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (LeftBadgeBackground === "white") ? "transparent" : LeftBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${LeftBadge.Image}`}
                                        alt="Aberdeen"
                                        width={LeftBadge.width}
                                        height={LeftBadge.height}
                                    />
                                    <h5>{LeftBadge.BadgeText}</h5>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_CustomM" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_CustomM" style={{ color: Font, border: `3px solid ${Border}`, borderRadius: "0.3rem" }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{
                                            backgroundColor: PlateType === "Tinted" || PlateType === "Stick-On-Tinted" ||
                                                PlateType === "Gel-Tinted" ? "rgba(0, 0, 0, 0)" : "#F1B317",
                                            color: FooterColor
                                        }}> {FooterText ? FooterText : "CPD JE2 4UE"}</p>}
                                    </div>
                                </div>
                                <div className="CustomImageContainer"
                                    style={
                                        {
                                            backgroundColor: (RightBadgeBackground === "white") ? "transparent" : RightBadgeBackground,
                                        }
                                    }
                                >
                                    <img
                                        src={`/Custom/${RightBadge.Image}`}
                                        alt="Aberdeen"
                                        width={RightBadge.width}
                                        height={RightBadge.height}
                                    />
                                    <h5>{RightBadge.BadgeText}</h5>
                                </div>

                            </div>

                            <div className="centered-container" style={{
                                marginTop: "-0.5rem"
                            }}>
                                {Layout === "Custom Plates" && (
                                    <p
                                        className="Option1_Footer"
                                        style={{ backgroundColor: "#F1B317", color: FooterColor }}
                                    >
                                        {FooterText}
                                    </p>
                                )}
                            </div>

                        </div>
                    }


                    <div className="Centeralize" >
                        <div id='YAB'>
                            <div className="Payment-Box">
                                <DisplayBought />
                                <div className="Price" style={{
                                    color: "black",
                                }}>£{CalculatePrice()}</div>
                            </div>
                            <div className='Order-Div' >
                                <select id='Dropdown' required onChange={HandleDelivery} style={{ color: "black" }}>
                                    <option value="N/A">-- Select Delivery Option--</option>
                                    <option value="Local in Milton Keynes free delivery/collection">Local in Milton Keynes free delivery/collection</option>
                                    <option value="Standard Delivery £3.99">Standard Delivery [3-5 Working Days] £3.99</option>
                                    <option value="First Class Tracked £6.99">First Class Tracked [1-2 Working Days] £6.99</option>
                                    <option value="Spacial Delivery £11.99">Spacial Delivery [Next Working Day] £11.99</option>

                                </select>
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
                                    A spare pair of plates is always handy. Do you want to add a spare pair? £15.00 Each
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
                                    Add a Fitting Kit £3.99
                                </label>
                            </div>

                            <button className="Cart-Button" onClick={OrderPlacement}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer theme="colored" />

            <Footer />
        </>
    )
}



const Cover = () => {
    const pathWithoutLeadingSlash = window.location.pathname.slice(1).toLowerCase();

    return (
        <>
            <div className="homepage2">
                <div className='container'>
                    {
                        pathWithoutLeadingSlash === "motorplates" &&
                        <h1>Motorcycle Plates</h1>
                    }
                    {
                        pathWithoutLeadingSlash === "customized" &&
                        <h1>Customized Plates</h1>
                    }
                </div>
            </div>

        </>
    )
}


const Badges = [
    {
        Index: 1,
        Image: "Badge0.png",
        BadgeText: "None",
        width: "60",
        height: "75"
    },
    {
        Index: 1,
        Image: "Badge1.png",
        BadgeText: "",
        width: "50",
        height: "75"
    },
    {
        Index: 2,
        Image: "Badge2.png",
        BadgeText: "",
        width: "80",
        height: "35"
    },
    {
        Index: 3,
        Image: "Badge2.png",
        BadgeText: "Kernow",
        width: "80",
        height: "35"
    },
    {
        Index: 4,
        Image: "Badge9.png",
        BadgeText: "",
        width: "50",
        height: "50"
    },
    {
        Index: 5,
        Image: "Badge9.png",
        BadgeText: "GB",
        width: "50",
        height: "50"
    },
    {
        Index: 6,
        Image: "Badge9.png",
        BadgeText: "CYM",
        width: "50",
        height: "50"
    },
    {
        Index: 7,
        Image: "Badge9.png",
        BadgeText: "CYMRU",
        width: "50",
        height: "50"
    },
    {
        Index: 8,
        Image: "Badge9.png",
        BadgeText: "D",
        width: "50",
        height: "50"
    },
    {
        Index: 9,
        Image: "Badge9.png",
        BadgeText: "E",
        width: "50",
        height: "50"
    },
    {
        Index: 10,
        Image: "Badge9.png",
        BadgeText: "ECOSSE",
        width: "50",
        height: "50"
    },
    {
        Index: 11,
        Image: "Badge9.png",
        BadgeText: "ENG",
        width: "50",
        height: "50"
    },
    {
        Index: 12,
        Image: "Badge9.png",
        BadgeText: "ENGLAND",
        width: "50",
        height: "50"
    },
    {
        Index: 13,
        Image: "Badge9.png",
        BadgeText: "GB",
        width: "50",
        height: "50"
    },
    {
        Index: 14,
        Image: "Badge9.png",
        BadgeText: "GBJ",
        width: "50",
        height: "50"
    },
    {
        Index: 15,
        Image: "Badge9.png",
        BadgeText: "GREAT BRITAIN",
        width: "50",
        height: "50"
    },
    {
        Index: 16,
        Image: "Badge9.png",
        BadgeText: "I",
        width: "50",
        height: "50"
    },
    {
        Index: 17,
        Image: "Badge9.png",
        BadgeText: "IRL",
        width: "50",
        height: "50"
    },
    {
        Index: 18,
        Image: "Badge9.png",
        BadgeText: "NL",
        width: "50",
        height: "50"
    },
    {
        Index: 19,
        Image: "Badge9.png",
        BadgeText: "SCO",
        width: "50",
        height: "50"
    },
    {
        Index: 20,
        Image: "Badge9.png",
        BadgeText: "SCOTLAND",
        width: "50",
        height: "50"
    },
    {
        Index: 21,
        Image: "Badge3.png",
        BadgeText: "GB",
        width: "60",
        height: "80"
    },
    {
        Index: 22,
        Image: "Badge9.png",
        BadgeText: "UK",
        width: "50",
        height: "50"
    },
    {
        Index: 23,
        Image: "Badge9.png",
        BadgeText: "UNITED KINGDOM",
        width: "50",
        height: "50"
    },
    {
        Index: 24,
        Image: "Badge3.png",
        BadgeText: "UK",
        width: "60",
        height: "80"
    },
    {
        Index: 25,
        Image: "Badge9.png",
        BadgeText: "WALES",
        width: "50",
        height: "50"
    },
    {
        Index: 26,
        Image: "Badge4.png",
        BadgeText: "GBM",
        width: "50",
        height: "50"
    },
    {
        Index: 27,
        Image: "Badge4.png",
        BadgeText: "",
        width: "50",
        height: "50"
    },
    {
        Index: 28,
        Image: "ENGLAND.png",
        BadgeText: "GB",
        width: "80",
        height: "40"
    },
    {
        Index: 29,
        Image: "ENGLAND.png",
        BadgeText: "GREAT BRITAIN",
        width: "80",
        height: "40"
    },
    {
        Index: 30,
        Image: "ENGLAND.png",
        BadgeText: "UK",
        width: "80",
        height: "40"
    },
    {
        Index: 31,
        Image: "ENGLAND.png",
        BadgeText: "UNITED KINGDOM",
        width: "80",
        height: "40"
    },
    {
        Index: 32,
        Image: "ENGLAND.png",
        BadgeText: "ENG",
        width: "80",
        height: "40"
    },
    {
        Index: 33,
        Image: "ENGLAND.png",
        BadgeText: "ENGLAND",
        width: "80",
        height: "40"
    },
    {
        Index: 34,
        Image: "ENGLAND2.png",
        BadgeText: "GB",
        width: "50",
        height: "80"
    },
    {
        Index: 35,
        Image: "ENGLAND2.png",
        BadgeText: "GREAT BRITAIN",
        width: "50",
        height: "80"
    },
    {
        Index: 36,
        Image: "ENGLAND2.png",
        BadgeText: "UK",
        width: "50",
        height: "80"
    },
    {
        Index: 37,
        Image: "ENGLAND2.png",
        BadgeText: "UNITED KINGDOM",
        width: "50",
        height: "80"
    },
    {
        Index: 38,
        Image: "ENGLAND2.png",
        BadgeText: "ENG",
        width: "50",
        height: "80"
    },
    {
        Index: 39,
        Image: "ENGLAND2.png",
        BadgeText: "ENGLAND",
        width: "50",
        height: "80"
    },
    {
        Index: 40,
        Image: "ENGLAND.png",
        BadgeText: "",
        width: "80",
        height: "40"
    },
    {
        Index: 41,
        Image: "ENGLAND2.png",
        BadgeText: "",
        width: "50",
        height: "80"
    },
    {
        Index: 42,
        Image: "SCOTLAND.png",
        BadgeText: "SCO",
        width: "80",
        height: "40"
    },
    {
        Index: 43,
        Image: "SCOTLAND2.png",
        BadgeText: "SCO",
        width: "50",
        height: "80"
    },
    {
        Index: 44,
        Image: "SCOTLAND.png",
        BadgeText: "SCOTLAND",
        width: "80",
        height: "40"
    },
    {
        Index: 45,
        Image: "SCOTLAND2.png",
        BadgeText: "SCOTLAND",
        width: "50",
        height: "80"
    },
    {
        Index: 46,
        Image: "SCOTLAND.png",
        BadgeText: "",
        width: "80",
        height: "40"
    },
    {
        Index: 47,
        Image: "SCOTLAND2.png",
        BadgeText: "",
        width: "50",
        height: "80"
    },
    {
        Index: 48,
        Image: "UK.png",
        BadgeText: "UK",
        width: "80",
        height: "40"
    },
    {
        Index: 49,
        Image: "UK.png",
        BadgeText: "UNITED KINGDOM",
        width: "80",
        height: "40"
    },
    {
        Index: 50,
        Image: "UK.png",
        BadgeText: "CYM",
        width: "80",
        height: "40"
    },
    {
        Index: 51,
        Image: "UK.png",
        BadgeText: "GB",
        width: "80",
        height: "40"
    },
    {
        Index: 52,
        Image: "UK.png",
        BadgeText: "GREAT BRITAIN",
        width: "80",
        height: "40"
    },
    {
        Index: 53,
        Image: "UK.png",
        BadgeText: "SCO",
        width: "80",
        height: "40"
    },
    {
        Index: 54,
        Image: "UK.png",
        BadgeText: "SCOTLAND",
        width: "80",
        height: "40"
    },
    {
        Index: 55,
        Image: "UK.png",
        BadgeText: "WALES",
        width: "80",
        height: "40"
    },
    {
        Index: 56,
        Image: "WALES.png",
        BadgeText: "UK",
        width: "80",
        height: "40"
    },
    {
        Index: 57,
        Image: "WALES.png",
        BadgeText: "UNITED KINGDOM",
        width: "80",
        height: "40"
    },
    {
        Index: 58,
        Image: "WALES.png",
        BadgeText: "CYM",
        width: "80",
        height: "40"
    },
    {
        Index: 59,
        Image: "WALES.png",
        BadgeText: "GB",
        width: "80",
        height: "40"
    },
    {
        Index: 60,
        Image: "WALES.png",
        BadgeText: "GREAT BRITAIN",
        width: "80",
        height: "40"
    },
    {
        Index: 61,
        Image: "WALES.png",
        BadgeText: "SCO",
        width: "80",
        height: "40"
    },
    {
        Index: 62,
        Image: "WALES.png",
        BadgeText: "SCOTLAND",
        width: "80",
        height: "40"
    },
    {
        Index: 63,
        Image: "WALES.png",
        BadgeText: "WALES",
        width: "80",
        height: "40"
    },
    {
        Index: 64,
        Image: "Badge4.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 65,
        Image: "Badge5.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 66,
        Image: "Badge6.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 67,
        Image: "Badge7.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 68,
        Image: "Badge8.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 69,
        Image: "Badge10.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 70,
        Image: "Badge11.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 71,
        Image: "Badge12.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 72,
        Image: "Badge13.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 73,
        Image: "Badge14.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 74,
        Image: "Badge15.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 75,
        Image: "Badge16.png",
        BadgeText: "",
        width: "70",
        height: "70"
    },
    {
        Index: 76,
        Image: "Badge17.png",
        BadgeText: "",
        width: "70",
        height: "70"
    }
]

