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

    const [selectedState, setSelectedState] = useState("standard");
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
    const [Delivery, SetDelivery] = useState("")
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
            "RearText": RearText
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
                {(selectedState === 'standard' && PlateChoice === 'Front and Rear') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard</div>
                        <div><b>FrontSize:</b> {FrontText} £9.99</div>
                        <div><b>RearSize:</b> {RearText} £9.99</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border} £21.99</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge} £29.99</div>
                        }
                        {Badge !== "" && BadgeBackground === '#366CB7' &&
                            <div><b>Badge Type:</b> Normal</div>
                        }
                        {Badge !== "" && BadgeBackground !== '#366CB7' &&
                            <div><b>Badge Type:</b> Electric</div>
                        }
                        <div><b>Material:</b> Standard ABS</div>
                    </div>
                }
                {(selectedState === 'standard' && PlateChoice === 'Front Only') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard [Front Only]</div>
                        <div><b>FrontSize:</b> {FrontText} £9.99</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border} £10.99</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge} £14.99</div>
                        }
                        {Badge !== "" && BadgeBackground === '#366CB7' &&
                            <div><b>Badge Type:</b> Normal</div>
                        }
                        {Badge !== "" && BadgeBackground !== '#366CB7' &&
                            <div><b>Badge Type:</b> Gel</div>
                        }
                        <div><b>Material:</b> Standard ABS</div>
                    </div>
                }
                {(selectedState === 'standard' && PlateChoice === 'Rear Only') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard [Rear Only]</div>
                        <div><b>RearSize:</b> {RearText} £9.99</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border} £10.99</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge} £14.99</div>
                        }
                        {Badge !== "" && BadgeBackground === '#366CB7' &&
                            <div><b>Badge Type:</b> Normal</div>
                        }
                        {Badge !== "" && BadgeBackground !== '#366CB7' &&
                            <div><b>Badge Type:</b> Gel</div>
                        }
                        <div><b>Material:</b> Standard ABS</div>
                    </div>
                }
            </>
        )
    }

    const CalculatePrice = () => {
        let CPrice = 0
        if (selectedState === 'standard' && PlateChoice === 'Front and Rear') {
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
        if (selectedState === 'standard' && PlateChoice === 'Front Only') {
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
        if (selectedState === 'standard' && PlateChoice === 'Rear Only') {
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
        if (selectedState !== 'standard') {
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
        const characterCount = plateText.replace(/\s/g, '').length; // Count characters excluding spaces

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
            console.log("SALISISISSI", updatedFlag)

        }
        if (e.target.value === "") {
            SetBadge("")
            SetBadgeCity("");
            SetBadgeFlag("");
        }
    };

    const HandleMaterial = (e) => { SetMaterial(e.target.value) }

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
        SetDelivery("")
        setSpare(false)
    }

    const HandlePlates = (e) => {
        SetPlateChoice(e.target.value)
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") &&
                        <div className='MotorBoxTop'>
                            <h6>Select Front Size:</h6>
                            <div className="container my-2" id='Selection-Options'>
                                <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                                    <option value="">-- Select Front Plate Size--</option>
                                    <option value="Option1">Standard Size (20.5x4.4in)</option>
                                    <option value="Option20">Standard Square (297mm x 203mm)</option>
                                    <option value="Option20">American Import (305mm x 152mm) </option>
                                    <option value="Option20">Euro Square (310mm x 210mm)</option>
                                    <option value="Option20">Small Japenese Import Square (330mm x 165mm)</option>
                                    <option value="Option20">Large Japenese Import Square (330mm x 178mm)</option>
                                    <option value="Option20">Oversize Square (345mm x 200mm)</option>
                                    <option value="Option20">Import (346mm x 178mm)</option>
                                </select>
                            </div>
                            <h6
                                style={{
                                    marginTop: "1rem"
                                }}
                            >Select Rear Size:</h6>
                            <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown-Large' required onChange={HandleRearSize}>
                                        <option value="">-- Select Rear Plate Size--</option>
                                        <option value="Option1">Standard Size (20.5x4.4in)</option>
                                        <option value="Option20">Standard Square (297mm x 203mm)</option>
                                        <option value="Option20">Standard Motorcycle (229mm x 178mm) </option>
                                        <option value="Option21">Jaguar S-Type V1(584mm x 171mm)</option>
                                        <option value="Option22">Jaguar S-Type V2(565mm x 165mm)</option>
                                        <option value="Option23">Jaguar XJ-Type V1(610mm x 150mm)</option>
                                        <option value="Option24">Aston Martin DBS(560mm x 150mm)</option>
                                        <option value="Option25">Jaguar XK8/DB9(552mm x 171mm)</option>
                                        <option value="Option26">Jaguar X-Type Saloon V2(559mm x 160mm)</option>
                                        <option value="Option1">Oversized Oblong V1 (533mm x 127mm)</option>
                                        <option value="Option27">Oversized Oblong V2 (533mm x 152mm)</option>
                                        <option value="Option27">Oversized Oblong V3 (520mm x 152mm)</option>
                                        <option value="Option27">Oversized Oblong V4 (533mm x 140mm)</option>
                                        <option value="Option1">Oversized Oblong V5 (508mm x 152mm)</option>
                                        <option value="Option28">Range Rover Sports V1(616mm x 146mm)</option>
                                        <option value="Option29">Range Rover 75(630mm x 171mm)</option>
                                        <option value="Option20">American Import (305mm x 152mm) </option>
                                        <option value="Option20">Euro Square (310mm x 210mm)</option>
                                        <option value="Option20">Small Japenese Import Square (330mm x 165mm)</option>
                                        <option value="Option20">Large Japenese Import Square (330mm x 178mm)</option>
                                        <option value="Option20">Oversize Square (345mm x 200mm)</option>
                                        <option value="Option20">Import (346mm x 178mm)</option>
                                    </select>
                                </div>
                        </div>
                    }

                    <div className='MotorBoxTop'>
                        <h6>Select Badge:</h6>
                        <div className='MotorBox1'>
                            <label>
                                <input className="type-input" type="radio" name="badge" onChange={HandleBadge} value="None" checked={Badge === 'None'} />
                                <span className="type-tile2">
                                    <span className="type-label">None</span>
                                </span>
                            </label>
                            {Badges.map((badge, index) => (
                                <label key={index}
                                >
                                    <input className="type-input" type="radio" name="badge" onChange={HandleBadge} value={badge.ShortHand} checked={Badge === badge.ShortHand} />
                                    <span className="type-tile2">
                                        <span className="type-label">{badge.Name}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='MotorBoxTop'>
                        <h6>Select Badge Type:</h6>
                        <div className='MotorBox'>
                            <label>
                                <input className="type-input" type="radio" name="badgetype" onChange={HandleBadgeBg} value="Normal" checked={BadgeBackground === '#366CB7'} />
                                <span className="type-tile2">
                                    <span className="type-label">Normal</span>
                                </span>
                            </label>
                            <label>
                                <input className="type-input" type="radio" name="badgetype" onChange={HandleBadgeBg} value="Electric" checked={BadgeBackground === '#428E3A'} />
                                <span className="type-tile2">
                                    <span className="type-label">Electric</span>
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
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
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1B" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option1B_Text1" : "Option1B_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
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
                            </div>
                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState === 'standard' && FrontSize === "Option20" && (
                        <div className="Centeralize">
                            <div style={{ backgroundColor: "#E7E7E7", width: "15rem", padding: "0.3rem", marginBottom: "1rem", borderRadius: "5px" }}>
                                <div style={{ backgroundColor: "#E7E7E7", borderRadius: "5px", border: `3px solid ${Border}` }}>
                                    <div className={Badge ? "MotorPlate1" : "MotorPlate1B"}>
                                        {Badge && (
                                            <div className='MotorPlate-Badges' style={{ backgroundColor: BadgeBackground }}>
                                                <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                                <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                            </div>
                                        )}
                                        <div className='MotorPlate-Container' style={Badge ? {} : { height: "10rem" }}>
                                            {PlateText ? (
                                                <>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>{PlateText.substring(0, 4)}</div>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>{PlateText.substring(4)}</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>REG</div>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>No</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                                        {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
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
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1B" style={{ backgroundColor: "#F1B317" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option1B_Text1" : "Option1B_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
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
                            </div>
                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option20" && (
                        <div className="Centeralize">
                            <div style={{ backgroundColor: "#F1B317", width: "15rem", padding: "0.3rem", marginBottom: "1rem", borderRadius: "5px" }}>
                                <div style={{ backgroundColor: "#F1B317", borderRadius: "5px", border: `3px solid ${Border}` }}>
                                    <div className={Badge ? "MotorPlate1" : "MotorPlate1B"}>
                                        {Badge && (
                                            <div className='MotorPlate-Badges' style={{ backgroundColor: BadgeBackground }}>
                                                <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                                <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                            </div>
                                        )}
                                        <div className='MotorPlate-Container' style={Badge ? {} : { height: "10rem" }}>
                                            {PlateText ? (
                                                <>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>{PlateText.substring(0, 4)}</div>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>{PlateText.substring(4)}</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>REG</div>
                                                    <div className={Badge ? "MotorPlate-Number" : "MotorPlate-NumberB"} style={{ fontFamily: Font }}>No</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                                        {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option21" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/JaquarV1.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option22" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/JaquarV2.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option23" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/JaquarXV1.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option24" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/AstonMartin.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option25" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/Jaquar1.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option26" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/Jaquar2.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option27" &&
                        <div className="Centeralize">
                            <div className='Oversize-Out' style={{ backgroundColor: "#F1B317" }}>
                                <div className="Oversizes" style={{ backgroundColor: "#F1B317", border: `3px solid ${Border}` }}>
                                    <div className='Oversizes-Container'>
                                        {PlateText && <div className="Oversizes-Number" style={{ fontFamily: Font }}>{PlateText}</div>}
                                        {!PlateText && <div className="Oversizes-Number" style={{ fontFamily: Font }}>PREVIEW</div>}
                                    </div>
                                </div>
                                <div className="centered-container">
                                    {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                </div>

                            </div>
                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option27" &&
                        <div className="Centeralize">
                            <div className='Oversize-Out' style={{ backgroundColor: "#F1B317" }}>
                                <div className="Oversizes" style={{ backgroundColor: "#F1B317", border: `3px solid ${Border}` }}>
                                    <div className='Oversize-Badge'>
                                        <div className='MotorPlate-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                        <div className='Oversizes-Container'>
                                            {PlateText && <div className="Oversizes-NumberB" style={{ fontFamily: Font }}>{PlateText}</div>}
                                            {!PlateText && <div className="Oversizes-NumberB" style={{ fontFamily: Font }}>PREVIEW</div>}
                                        </div>
                                    </div>

                                </div>
                                <div className="centered-container">
                                    {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                </div>

                            </div>
                        </div>
                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option28" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/RangeV1.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && selectedState === 'standard' && RearSize === "Option29" && (
                        <div className="Centeralize">
                            <div className='Jaguar'>
                                <img src="/Custom/Range75.png" alt="Jagaur" />
                                <div className={Badge ? 'Jaguar-InnerDiv2' : 'Jaguar-InnerDiv'}>
                                    {Badge && (
                                        <div className='MotorPlate2-Badges' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`${BadgeFlag}.png`} className={Vertical ? "Motor_VImage" : "Motor_Image"} alt='Badge'></img>
                                            <div id={ShortHand ? "Motor_SText" : "Motor_Text"}>{BadgeCity}</div>
                                        </div>
                                    )}
                                    {PlateText ? (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>{PlateText}</div>
                                    ) : (
                                        <div className="JaguarPlate" style={{ fontFamily: Font }}>PREVIEW</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

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
        Name: "Wales",
        ShortHand: "WALES-CYM",
        Flag: "WALES.png"
    },
    {
        Name: "United Kingdom",
        ShortHand: "UK-UK",
        Flag: "UK.png"
    },
    {
        Name: "Scotland",
        ShortHand: "SCOTLAND-SCO",
        Flag: "SCOTLAND.png"
    },
    {
        Name: "England",
        ShortHand: "ENGLAND-ENG",
        Flag: "ENGLAND.png"
    }
]

