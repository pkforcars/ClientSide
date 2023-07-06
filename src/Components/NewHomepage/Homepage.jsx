import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import "./Homepage.css"
import Context from "../../Context/Context"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [FittingKit , SetFittingKit ] = useState(false)

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
            "FittingKit" : FittingKit,     
            "Material": Material,       
            "Total": CalculatePrice()
        });
        if (Global.isLoggedIn) {
            Navigate('/checkout')
        }
        else {
            Navigate('/login')
            Global.SetRedirectToCart(true)
        }

    }

    const baseUrl = process.env.REACT_APP_BASE_URL;
    console.log(baseUrl);

    const DisplayBought = () => {
        return (
            <>
                {(selectedState === 'standard' && PlateChoice === 'Front and Rear') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard</div>
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)} £9.99</div>
                        <div><b>RearSize:</b> {ReturnSize(RearSize)} £9.99</div>
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
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)} £9.99</div>
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
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)} £9.99</div>
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
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)} £19.99</div>
                        <div><b>RearSize:</b> {ReturnSize(RearSize)} £19.99</div>
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
            if (Delivery === "DHL")
            {
                CPrice = CPrice + 6.99
            }
            if (Spare)
            {
                CPrice = CPrice + 15.00
            }
            if (FittingKit)
            {
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
            if (Delivery === "DHL")
            {
                CPrice = CPrice + 6.99
            }
            if (Spare)
            {
                CPrice = CPrice + 15.00
            }
            if (FittingKit)
            {
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
            if (Delivery === "DHL")
            {
                CPrice = CPrice + 6.99
            }
            if (Spare)
            {
                CPrice = CPrice + 15.00
            }
            if (FittingKit)
            {
                CPrice = CPrice + 3.99
            }
        }
        if (selectedState !== 'standard') {
            CPrice = CPrice + 39.99
            if (Border !== "transparent") {
                CPrice = CPrice + 21.99
            }
            if (Delivery === "DHL")
            {
                CPrice = CPrice + 6.99
            }
            if (Spare)
            {
                CPrice = CPrice + 35.00
            }
            if (FittingKit)
            {
                CPrice = CPrice + 3.99
            }
        }

        return CPrice.toFixed(2)
    }
    const HandleDelivery = (e) => { SetDelivery(e.target.value) }
    const handleSpareChange = (event) => { setSpare(event.target.checked); };
    const handleFittingKit = (event) => { SetFittingKit(event.target.checked); };
    const HandlePlates = (e) => { SetPlateChoice(e.target.value); };
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
            SetBadgeFlag(flag.replace("P", ""));
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

    return (
        <>
            <Navigation />
            <Cover />

            <div className="Banner"> 
                <div>Need Replacement Keys? </div>
                <div>Please feel free to reach out to us at 01908 222555 or simply request a quote.</div>
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
                        <div className="radio-inputs">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="radio"
                                    value="standard"
                                    checked={selectedState === 'standard'}
                                    onChange={handleRadioChange}
                                />
                                <span className="name">Standard</span>
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="radio"
                                    value="4d"
                                    checked={selectedState === '4d'}
                                    onChange={handleRadioChange}
                                />
                                <span className="name">4D Plate</span>
                            </label>
                        </div>
                        {selectedState === 'standard' ? (
                            <>
                                <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown' required onChange={HandlePlates}>
                                        <option value="Front and Rear">Front and Rear</option>
                                        <option value="Front Only">Front Only</option>
                                        <option value="Rear Only">Rear Only</option>
                                    </select>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
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
                                            <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
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
                                            <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
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
                            <div className='Order-Div'>
                                <select id='Dropdown-C' required onChange={HandleDelivery}>
                                    <option value="N/A">-- Select Delivery Option--</option>
                                    <option value="DHL">DHL</option>
                                </select>
                            </div>

                            <div className='check'>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Spare}
                                        onChange={handleSpareChange}
                                    />
                                    A spare pair of plates is always handy. Do you want to add a spare pair?
                                </label>
                            </div>
                            <div className='check'>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={FittingKit}
                                        onChange={handleFittingKit}
                                    />
                                    Add a Fitting Kit
                                </label>
                            </div>

                            <button className="Cart-Button" onClick={OrderPlacement}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Divider">
                <div className="Divider-Text">Why Choose Us?</div>
                <div className="Divider-Text2">You're in safe hands!</div>
                <div id="Divider-Holder">
                    <div>
                        <img className="DividerImage" src="/Image1.png" alt="Cover2"></img>
                    </div>
                    <div className="Divider-Box">
                        <div className="Divider-Text3">Makers of Custom Number Plates and Show Plates</div>
                        <div className="Divider-Text4">The Cheapest Registration Plates in the UK!</div>
                        <div className="Divider-Text5">Trusted provider of custom car number plates with over
                            a decade of industry experience. We specialize in offering personalized plates at affordable
                            prices to customers in the UK and Ireland. Our selection includes both legally compliant plates
                            for road use and stylish plates for car shows. Whether you're looking for a unique gift or need
                            to replace your existing registration plates, we have you covered. Choose from a variety of custom
                            designs, including 3D Gel and 4D Premium plates. Rest assured that once you've finalized your design
                            and placed your order, we'll swiftly manufacture and dispatch your new number plates on the same day,
                            delivering to any destination in the UK.
                        </div>
                    </div>
                </div>
                <div id="Divider-Holder">
                    <div className="Divider-Box">
                        <div className="Divider-Text3">3D Gel and 4D Premium Number Plates</div>
                        <div className="Divider-Text5">We specialize in creating customized number plates that allow you to showcase
                            your unique style and personality. Our designs are fully compliant with UK regulations and ensure your plates
                            are road legal. Choose from our range of 3D gel and 4D premium designs, available in various color borders including
                            black, red, grey, and pink. To add that extra touch of personalization, explore our wide selection of side badges,
                            which make for the perfect accessory for modern vehicles. Our 3D gel plates are crafted using high-quality resin,
                            providing a standout three-dimensional effect that looks stunning on cars, particularly in high-end showrooms.
                            For a personal and premium look, opt for our laser-cut acrylic 4D number plates. At Legal Show Plates, we offer
                            affordable pricing for our 3D gel and 4D premium number plates. Order your bespoke plates conveniently online today!
                        </div>
                    </div>
                    <div>
                        <img className="DividerImage" src="/Image2.png" alt="Cover2"></img>
                    </div>
                    <ToastContainer theme="colored" />
                </div>





            </div>

            <Footer />
        </>
    )
}



const Cover = () => {
    return (
        <>
            <div id="Cover-Holder">
                <img src="/Cover.png" alt="Cover"></img>
            </div>

        </>
    )
}


const GetPrices = (Option) => {
    const Price = {
        Option1: 12.99,
        Option2: 16.99,
        Option3: 15.49,
        Option4: 17.49,
        Option5: 18.49,
        Option6: 19.49,
        Option7: 19.49,
        Option8: 18.49,
        Option9: 22.49,
        Option10: 19.49,
        Option11: 18.49,
        Option12: 19.49,
        Option13: 20.49,
        Option14: 21.49,
        Option15: 22.49,
        Option16: 27.49,
        Option17: 27.49,
        Option18: 27.49,
    };
    return Price[Option] || 0;
}

const GetPrices4D = (FrontOption, RearOption) => {
    if (FrontOption === 'Option1' && RearOption === 'Option1')
        return 46.98
    else if (FrontOption === 'Option1' && RearOption === 'Option2')
        return 51.48
    else if (FrontOption === 'Option1' && RearOption === 'Option10')
        return 54.98
    else if (FrontOption === 'Option1' && RearOption === 'Option11')
        return 53.98
    else if (FrontOption === 'Option1' && RearOption === 'Option12')
        return 54.98
    else if (FrontOption === 'Option1' && RearOption === 'Option13')
        return 55.98
    else if (FrontOption === 'Option1' && RearOption === 'Option14')
        return 56.98
    else if (FrontOption === 'Option1' && RearOption === 'Option15')
        return 57.98
    else if (FrontOption === 'Option1' && RearOption === 'Option16')
        return 62.98
    else if (FrontOption === 'Option1' && RearOption === 'Option17')
        return 62.98
    else if (FrontOption === 'Option1' && RearOption === 'Option18')
        return 62.98


    else if (FrontOption === 'Option10' && RearOption === 'Option1')
        return 54.98
    else if (FrontOption === 'Option10' && RearOption === 'Option2')
        return 59.48
    else if (FrontOption === 'Option10' && RearOption === 'Option10')
        return 62.98
    else if (FrontOption === 'Option10' && RearOption === 'Option11')
        return 61.98
    else if (FrontOption === 'Option10' && RearOption === 'Option12')
        return 62.98
    else if (FrontOption === 'Option10' && RearOption === 'Option13')
        return 63.98
    else if (FrontOption === 'Option10' && RearOption === 'Option14')
        return 64.98
    else if (FrontOption === 'Option10' && RearOption === 'Option15')
        return 65.98
    else if (FrontOption === 'Option10' && RearOption === 'Option16')
        return 70.98
    else if (FrontOption === 'Option10' && RearOption === 'Option17')
        return 70.98
    else if (FrontOption === 'Option10' && RearOption === 'Option18')
        return 70.98
    else
        return 0
}

const Badges = [
    "UNION-ENG",
    "UNION-ENGLAND",
    "UNION-GB",
    "UNION-GREAT BRITAIN",
    "UNION-UK",
    "UNION-UNITED KINGDOM",
    "UNIONP-ENG",
    "UNIONP-ENGLAND",
    "UNIONP-GB",
    "UNIONP-GREAT BRITAIN",
    "UNIONP-UK",
    "UNIONP-UNITED KINGDOM",
    "UNION-CYM",
    "UNION-CYMRU",
    "UNION-UNION",
    "UNIONP-CYM",
    "UNIONP-CYMRU",
    "UNIONP-WALES",
    "UNION-SCOTLAND",
    "UNION-SCO",
    "UNIONP-SCOTLAND",
    "UNIONP-SCO"
];

