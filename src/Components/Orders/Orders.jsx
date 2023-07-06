import React, { useState, useContext, useEffect } from 'react'
import './Orders.css'
import Context from "../../Context/Context"
import { useNavigate } from 'react-router-dom'


export default function Orders() {
    const Navigate = useNavigate()
    const Global = useContext(Context)
    let Username = "Customer"
    if (Global.User) {
        Username = `${Global.User.firstName}  ${Global.User.lastName}`
    }
    const [selectedState, setSelectedState] = useState();
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
    const [Vertical, SetVertical] = useState(false)
    const [ShortHand, setShortHand] = useState(false);
    const [Attribute, setAttribute] = useState("PlateFront4D");
    const [Attribute2, setAttribute2] = useState("PlateFront4DR");
    const [FooterText, SetFooterText] = useState("Enter Footer Text")
    const [FooterColor, SetFooterColor] = useState("black")


    useEffect(() => {

        if (Global.Order) {
            setSelectedState(Global.Order.Type)
            SetPlateChoice(Global.Order.PlateChoice)
            SetPlateText(Global.Order.PlateText)
            SetFont(Global.Order.Font)
            SetFrontSize(Global.Order.FrontSize)
            SetRearSize(Global.Order.RearSize)
            SetBadge(Global.Order.Badge)
            if (Global.Order.Badge === "None") {
                SetBadge("")
            }
            if (Global.Order.Badge !== "" && Global.Order.Badge !== "None") {
                const [flag, city] = Global.Order.Badge.split('-');
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
            if (Global.Order.Badge === "") {
                SetBadge("")
                SetBadgeCity("");
                SetBadgeFlag("");
            }
            SetBadgeBackground(Global.Order.BadgeBackground)
            SetBorder(Global.Order.Border)
            SetVertical(Global.Order.Vertical)
            setShortHand(Global.Order.ShortHand)
            if (selectedState !== 'standard') {
                const styleOptions = {
                    Option1: "PlateFront4D",
                    Option4: "PlateFront4D4",
                    Option5: "PlateFront4D5",
                    Option2: "PlateFront4D7",
                    Option3: "PlateFront4D9",
                };
                setAttribute(styleOptions[Global.Order.FrontSize]);
                const plateFront4D = document.getElementById(Attribute);
                if (plateFront4D) {
                    plateFront4D.setAttribute("data-content", PlateText);
                }
                const styleOptions2 = {
                    Option1: "PlateFront4DR",
                    Option4: "PlateFront4D4Copy",
                    Option5: "PlateFront4D5Copy",
                    Option2: "PlateFront4D7",
                    Option3: "PlateFront4D9",
                    Option6: "PlateFront4DR",
                };
                setAttribute2(styleOptions2[Global.Order.RearSize]);
                const plateFront4D1 = document.getElementById(Attribute2);
                if (plateFront4D1) {
                    plateFront4D1.setAttribute("data-content", PlateText);
                }
            }
        }
    })




    return (
        <>
            <div className="ADashboard-Body">
                <div id="Navbar">
                    <div id="Component-1">
                        <h3><span>Bancroft Auto </span>Locksmiths</h3>
                    </div>
                    <div id="Component-2">
                        <div className='Username-Holder'>{Username}</div>
                        <button className='Logout-Btn' onClick={() => {
                            localStorage.removeItem('Token')
                            Global.SetUser(null)
                            Global.setIsLoggedIn(false)
                            Navigate('/')
                        }}>Logout</button>
                    </div>
                </div>


                <div className='Order-Details'>Orders Details</div>


                <div className="container" id='ViewOrders'>
                    <div className='Order-Details-HolderA'>
                        <div id="Plate-Box">Account Information</div>
                        <div className='Account-Info'>
                            <div><b>Account Email: </b>{Global.Order.UserEmail}</div>
                            <div><b>Order Email: </b>{Global.Order.Email}</div>
                            <div><b>Phone: </b>{Global.Order.Phone}</div>
                        </div>

                        <div id="Plate-Box">Address Information</div>
                        <div className='Account-Info'>
                            <div><b>Delivery Address: </b>{Global.Order.Address1}</div>
                            <div><b>Delivery Address 2: </b>{Global.Order.Address2}</div>
                            <div><b>City: </b>{Global.Order.City}</div>
                            <div><b>Post Code: </b>{Global.Order.PostCode}</div>
                            <div><b>Country: </b>{Global.Order.Country}</div>
                        </div>

                        <div id="Plate-Box">Plate Information</div>
                        <div className='Account-Info'>
                            <div><b>Plate Text: </b>{Global.Order.PlateText}</div>
                            {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Front and Rear') &&
                                <div className="Order-HisA">
                                    <div><b>Plate Type:</b> Standard [Front and Rear]</div>
                                    <div><b>Front Plate Size:</b>{ReturnSize(Global.Order.FrontSize)}</div>
                                    <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                    {(Global.Order.Border !== "transparent") &&
                                        <div><b>Border:</b> {Global.Order.Border}</div>
                                    }
                                    {(Global.Order.Border === "transparent") &&
                                        <div><b>Border:</b> None</div>
                                    }
                                    {Global.Order.Badge !== "" &&
                                        <>
                                            <div><b>Badge:</b> {Global.Order.Badge}</div>
                                        </>
                                    }
                                    {Global.Order.Badge === "" &&
                                        <div><b>Badge:</b> No Badges</div>
                                    }
                                    {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                        <div><b>Badge Type:</b> Normal</div>
                                    }
                                    {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                        <div><b>Badge Type:</b> Gel</div>
                                    }
                                    <div><b>Material:</b> Standard ABS</div>
                                    {Global.Order.Vertical &&
                                        <div><b>Vertical:</b> Yes</div>
                                    }
                                    {!Global.Order.Vertical &&
                                        <div><b>Vertical:</b> No</div>
                                    }
                                    {Global.Order.ShortHand &&
                                        <div><b>ShortHand:</b> Yes</div>
                                    }
                                    {!Global.Order.ShortHand &&
                                        <div><b>ShortHand:</b> No</div>
                                    }
                                </div>
                            }
                            {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Front Only') &&
                                <div className="Order-HisA">
                                    <div><b>Plate Type:</b> Standard [Front Only]</div>
                                    <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                    <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                    {(Global.Order.Border !== "transparent") &&
                                        <div><b>Border:</b> {Global.Order.Border}</div>
                                    }
                                    {(Global.Order.Border === "transparent") &&
                                        <div><b>Border:</b> None</div>
                                    }
                                    {Global.Order.Badge !== "" &&
                                        <>
                                            <div><b>Badge:</b> {Global.Order.Badge}</div>
                                        </>
                                    }
                                    {Global.Order.Badge === "" &&
                                        <div><b>Badge:</b> No Badges</div>
                                    }
                                    {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                        <div><b>Badge Type:</b> Normal</div>
                                    }
                                    {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                        <div><b>Badge Type:</b> Gel</div>
                                    }
                                    <div><b>Material:</b> Standard ABS</div>
                                    {Global.Order.Spare &&
                                        <div><b>Spare:</b> Spare Included</div>}
                                    {!Global.Order.Spare &&
                                        <div><b>Spare:</b> Spare Excluded</div>}
                                    {Global.Order.Vertical &&
                                        <div><b>Vertical:</b> Yes</div>
                                    }
                                    {!Global.Order.Vertical &&
                                        <div><b>Vertical:</b> No</div>
                                    }
                                    {Global.Order.ShortHand &&
                                        <div><b>ShortHand:</b> Yes</div>
                                    }
                                    {!Global.Order.ShortHand &&
                                        <div><b>ShortHand:</b> No</div>
                                    }


                                </div>
                            }
                            {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Rear Only') &&
                                <div className="Order-HisA">
                                    <div><b>Plate Type:</b> Standard [Rear Only]</div>
                                    <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                    <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                    {(Global.Order.Border !== "transparent") &&
                                        <div><b>Border:</b> {Global.Order.Border}</div>
                                    }
                                    {(Global.Order.Border === "transparent") &&
                                        <div><b>Border:</b> None</div>
                                    }
                                    {Global.Order.Badge !== "" &&
                                        <>
                                            <div><b>Badge:</b> {Global.Order.Badge}</div>
                                        </>
                                    }
                                    {Global.Order.Badge === "" &&
                                        <div><b>Badge:</b> No Badges</div>
                                    }
                                    {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                        <div><b>Badge Type:</b> Normal</div>
                                    }
                                    {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                        <div><b>Badge Type:</b> Gel</div>
                                    }
                                    <div><b>Material:</b> Standard ABS</div>
                                    {Global.Order.Vertical &&
                                        <div><b>Vertical:</b> Yes</div>
                                    }
                                    {!Global.Order.Vertical &&
                                        <div><b>Vertical:</b> No</div>
                                    }
                                    {Global.Order.ShortHand &&
                                        <div><b>ShortHand:</b> Yes</div>
                                    }
                                    {!Global.Order.ShortHand &&
                                        <div><b>ShortHand:</b> No</div>
                                    }

                                </div>
                            }
                            {(Global.Order.Type !== 'standard') &&
                                <div className="Order-HisA">
                                    <div><b>Plate Type:</b> 4D [Front and Rear]</div>
                                    <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                    <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                    <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                    {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> None</div>
                                }

                                <div><b>Material:</b> Standard ABS</div>

                                </div>
                            }
                        </div>


                        <div id="Plate-Box1"><b>Delivery: </b>{Global.Order.Delivery} Delivery</div>
                        {Global.Order.Spare &&
                            <div id="Plate-Box1"><b>Spare Plate: </b>Included</div>
                        }
                        {!Global.Order.Spare &&
                            <div id="Plate-Box1"><b>Spare Plate: </b>Not Included</div>
                        }
                        {Global.Order.FittingKit &&
                            <div id="Plate-Box1"><b>FittingKit Plate: </b>Included</div>
                        }
                        {!Global.Order.FittingKit &&
                            <div id="Plate-Box1"><b>FittingKit Plate: </b>Not Included</div>
                        }
                        <div id="Plate-Box2"><b>Order Value: </b>£{Global.Order.OrderValue}</div>
                    </div>
                    <div className='PlatesAdmin'>
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

                        </div>



                        <button onClick={() => { Navigate('/admindashboard') }} className='back-btn'>Back</button>
                    </div>
                </div>
            </div>

            <div className="FooterContainer1">
                <div className="Content1">
                    &copy; Copyright 2005-2023 Bancroft Auto Locksmiths. All rights Reserved.
                </div>
            </div>

        </>
    )
}


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

