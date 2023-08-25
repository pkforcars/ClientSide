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

    const RenderPage = () => {
        Navigate('/requestquote')
    }

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
            "FrontText" : FrontText,
            "RearText" : RearText
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
                            <div><b>Badge Type:</b> Gel</div>
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
                {(selectedState !== 'standard') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b>4D Plate</div>
                        <div><b>FrontSize:</b> {FrontText} £39.99</div>
                        <div><b>RearSize:</b> {RearText} £39.99</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border} £21.99</div>
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
    const handleRadioChange = (e) => { setSelectedState(e.target.value); };
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
    const HandleBadgeBg = (e) => {
        if (e.target.value === 'Gel') {
            SetBadgeBackground("#428E3A")
        }
        else {
            SetBadgeBackground("#366CB7")
        }
    };
    const HandleBorder = (e) => {
        if (e.target.value === 'No') {
            SetBorder("transparent")
        }
        else {
            SetBorder("#000000")
        }


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

    const ReturnSize = (Option) => {
        const Size = {
            Option1: 'Standard Size (20.5x4.4in)',
            Option6: 'Standard UK Car Large Rear',
            Option2: 'Short Plate [ 6 Letters ]',
            Option3: 'Short Plate [ 5 Letters ]',
            Option4: 'Standard UK Motorcycle',
            Option5: 'Standard 4x4 Plate'
        }
        return Size[Option] || ""
    }

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

    const HandlePlates = (e)=>{
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
                    <div className='Plate-Builder'>
                        {selectedState === 'standard' ? (
                            <>
                                <div className="type-inputs">
                                    <label >
                                        <input className="type-input" type="radio" name="engine" 
                                        onChange={HandlePlates} value="Front and Rear" checked={PlateChoice=== 'Front and Rear'} />
                                        <span className="type-tile">
                                            <span className="type-icon">
                                                <img src="/FRONTPLATE.png" alt="Front Plate" width={100} height={25} />
                                                <img src="/REAR.png" alt="Rear" width={100} height={25} />
                                            </span>
                                            <span className="type-label">Front and Rear</span>
                                        </span>
                                    </label>
                                    <label>
                                        <input className="type-input" type="radio" name="engine" onChange={HandlePlates} value="Front Only" checked={PlateChoice=== 'Front Only'} />
                                        <span className="type-tile">
                                            <span className="type-icon">
                                                <img src="/FRONTPLATE.png" alt="Front Plate" width={90} height={25} />
                                            </span>
                                            <span className="type-label">Front Only</span>
                                        </span>
                                    </label>
                                    <label>
                                        <input className="type-input" type="radio" name="engine" onChange={HandlePlates} value="Rear Only" checked={PlateChoice=== 'Rear Only'} />
                                        <span className="type-tile">
                                            <span className="type-icon">
                                                <img src="/REAR.png" alt="Rear" width={90} height={25} />
                                            </span>
                                            <span className="type-label">Rear Only</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown' required onChange={HandleMaterial}>
                                        <option value="">-- Select Material--</option>
                                        <option value="Standard-ABS">Standard ABS</option>
                                    </select>
                                </div>

                                {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") &&
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
                                }

                                {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") &&
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
                                }
                                <div className="container my-2" id='Selection-Options2'>
                                    <select id='Dropdown-Large' required onChange={HandleBadge}>
                                        <option value="">-- Select Badge --</option>
                                        <option value="None">-- None --</option>
                                        {Badges.map((badge, index) => (
                                            <option key={index} value={badge}>{badge}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown' required onChange={HandleBadgeBg}>
                                        <option value="">-- Select Badge Type --</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Gel">Gel</option>
                                    </select>
                                    <select id='Dropdown' required onChange={HandleBorder}>
                                        <option value="">-- Select Border --</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>


                                <div className="Centeralize1" onClick={ResetAll}>
                                    <button className="Cart-Button1">Reset</button>
                                </div>

                            </>
                        ) :
                            (
                                <>
                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown-Large' required onChange={HandleMaterial}>
                                            <option value="">-- Select Material--</option>
                                            <option value="Standard-ABS">Standard ABS</option>
                                        </select>
                                    </div>

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

                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown' required onChange={HandleBorder}>
                                            <option value="">-- Select Border --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>


                                    <div className="Centeralize1" onClick={ResetAll}>
                                        <button className="Cart-Button1">Reset</button>
                                    </div>

                                </>
                            )}
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
                                    <img src={`/Union.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option2" &&
                        <div className="Centeralize">
                            <div className="Option3NEW_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 6).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option2" &&
                        <div className="Centeralize">
                            <div className="Option3NEW_Plate1" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option3_Text" : "Option3_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 6).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 5).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option10NEW_Plate1" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option3_Text" : "Option3_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 5).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option4" &&
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option4" &&
                        <div className="Centeralize">
                            <div className='Option2B_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option2B_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2B_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2B_Bottom'>
                                        <div className='Option2B_Container2' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`/Union.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                            <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                        </div>
                                        <div className='Option2B_Plate'>
                                            {PlateText && <p>{PlateText.substring(4)}</p>}
                                            {!PlateText && <p>NO#</p>}
                                        </div>
                                    </div>
                                    <div>
                                        {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div>
                                        {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option5" &&
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="Option1B" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                                    <img src={`/Union.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option2" &&
                        <div className="Centeralize">
                            <div className="Option3NEW_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 6).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option2" &&
                        <div className="Centeralize">
                            <div className="Option3NEW_Plate1" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option3_Text" : "Option3_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 6).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 5).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option10NEW_Plate1" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option3_Text" : "Option3_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText.replace(/\s/g, '').slice(0, 5).replace(/(.{4})/g, '$1 ')}</div>}
                                    {!PlateText && <div className="Option10NEW_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    <div className="centered-container">
                                        {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div className="centered-container">
                                        {Layout === "Custom Plates" && (
                                            <p
                                                className="Option2_Footer"
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option4" &&
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option4" &&
                        <div className="Centeralize">
                            <div className='Option2B_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option2B_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2B_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2B_Bottom'>
                                        <div className='Option2B_Container2' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`/Union.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                            <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                        </div>
                                        <div className='Option2B_Plate'>
                                            {PlateText && <p>{PlateText.substring(4)}</p>}
                                            {!PlateText && <p>NO#</p>}
                                        </div>
                                    </div>
                                    <div>
                                        {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    </div>
                                    <div>
                                        {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option5" &&
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="Option1B" style={{ backgroundColor: "#F1B317" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option6" &&
                        <div className="Centeralize">
                            <div className="Option2NEW_Basic" style={{ backgroundColor: "#F1B317" }}>
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
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option6" &&
                        <div className="Centeralize">
                            <div className="Option1BNEW" style={{ backgroundColor: "#F1B317" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Union.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
















                    {selectedState !== 'standard' && FrontSize === "Option1" &&
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
                    {selectedState !== 'standard' && FrontSize === "Option3" &&
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
                    {selectedState !== 'standard' && FrontSize === "Option2" &&
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

                    {selectedState !== 'standard' && FrontSize === "Option4" &&
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
                    {selectedState !== 'standard' && FrontSize === "Option5" &&
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


                    {selectedState !== 'standard' && RearSize === "Option1" &&
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

                    {selectedState !== 'standard' && RearSize === "Option3" &&
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
                    {selectedState !== 'standard' && RearSize === "Option2" &&
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

                    {selectedState !== 'standard' && RearSize === "Option4" &&
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
                    {selectedState !== 'standard' && RearSize === "Option5" &&
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

                    {selectedState !== 'standard' && RearSize === "Option6" &&
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
                                <label style={{color: "black" }}
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
                                <label style={{color: "black" }}
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

            <Footer />
        </>
    )
}



const Cover = () => {
    return (
        <>
            <div className="homepage2">
                <div className='container'>
                    <h1>Standard Plates</h1>
                </div>
            </div>

        </>
    )
}


const Badges = [
    "UNION-ENG",
    "UNION-ENGLAND",
    "UNIONP-ENG",
    "UNIONP-ENGLAND",
];

