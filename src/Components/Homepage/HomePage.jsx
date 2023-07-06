import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './Homepage.css'

export default function HomePage() {
  const [selectedState, setSelectedState] = useState("standard");
  const [PlateChoice, SetPlateChoice] = useState("Front and Rear");
  const [PlateText, SetPlateText] = useState("");
  const [Layout, SetLayout] = useState("standard");
  const [Font, SetFont] = useState("'Montserrat', sans-serif");
  const [FrontSize, SetFrontSize] = useState("Option1");
  const [RearSize , SetRearSize] = useState("Option1");
  const [Badge , SetBadge ] = useState()
  const [BadgeCity , SetBadgeCity ] = useState("")
  const [BadgeFlag , SetBadgeFlag ] = useState("")
  const [BadgeBackground , SetBadgeBackground ] = useState("#366CB7")
  const [Border , SetBorder] = useState("transparent")
  const [FooterText,SetFooterText] = useState("FOOTER")
  const [Vertical , SetVertical] = useState(false)
  const [ShortHand, setShortHand] = useState(false);
  const [FooterColor , SetFooterColor] = useState("black")

  const HandleFooterColor= (e) => { SetFooterColor(e.target.value); };

  const HandlePlates = (e) => { SetPlateChoice(e.target.value); };
  const HandlePlateText = (e) => { 
    const plateText = e.target.value;
    SetPlateText(plateText);
  };
    const handleRadioChange = (e) => { setSelectedState(e.target.value); };
  const HandleLayout = (e) => { 
    SetLayout(e.target.value);
    SetFooterColor("black")
   };
  const HandleFont = (e) => { 
    SetFont(e.target.value); 
  };
  const HandleFrontSize = (e) => { 
    SetFrontSize(e.target.value); 
    const styleOptions = {
      Option1: "PlateFront4D",
      Option2: "PlateFront4D2",
      Option3: "PlateFront4D3",
      Option4: "PlateFront4D4",
      Option5: "PlateFront4D5",
      Option6: "PlateFront4D6",
      Option7: "PlateFront4D7",
      Option8: "PlateFront4D8",
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
      Option2: "PlateFront4D2R",
      Option3: "PlateFront4D3R",
      Option4: "PlateFront4D4R",
      Option5: "PlateFront4D5R",
      Option6: "PlateFront4D6R",
      Option7: "PlateFront4D7R",
      Option8: "PlateFront4D8R",
    };
    setAttribute2(styleOptions[e.target.value]);
    const plateFront4D = document.getElementById(Attribute2);
    if (plateFront4D) {
      plateFront4D.setAttribute("data-content", PlateText);
    }
  };
  const HandleBadgeBg = (e) => { SetBadgeBackground(e.target.value) };
  const HandleBorder = (e) => { SetBorder(e.target.value) };
  const HandleBadge = (e) => { 
    SetBadge(e.target.value); 
    if (e.target.value!=="")
    {
      const [flag, city] = e.target.value.split('-');
      if (flag.endsWith('P')) {
        SetVertical(true)
      }
      else{
        SetVertical(false)
      }
      if(city.length>4)
      {
        setShortHand(true)
      }else
      {
        setShortHand(false)
      }
      SetBadgeCity(city);
      SetBadgeFlag(flag.replace("P", ""));  
    }
    if (e.target.value==="")
    {
      SetBadge("")
      SetBadgeCity("");
      SetBadgeFlag("");
    }
  };
  const HandleFooter = (e) => { SetFooterText(e.target.value)}
  const ResetBc = ()=> {SetBorder("transparent")}
  const ResetBg = ()=> {SetBadgeBackground("#366CB7")}
  const [Attribute, setAttribute] = useState("PlateFront4D");
  const [Attribute2, setAttribute2] = useState("PlateFront4DR");

  useEffect( ()=>{
    const plateFront4D = document.getElementById(Attribute);
    if (plateFront4D) {
      plateFront4D.setAttribute("data-content", PlateText);
    }
    const plateFront4D2 = document.getElementById(Attribute2);
    if (plateFront4D2) {
      plateFront4D2.setAttribute("data-content", PlateText);
    }

  })

  return (
    <>
      <Navigation />

      <div className="container" id="Create-Plate-Div">

        <div id="PlateDisplay">
            
          {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option3" &&
                <div className="Centeralize">
                    <div className="SIZE3_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE3_Image2":"SIZE3_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"SIZE3_Text1":"SIZE3_Text2"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

            
            
            
            {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && !Badge && selectedState === 'standard' && FrontSize ==="Option4" &&
                  <div className="Centeralize">
                    <div className="SIZE4" style={{backgroundColor: "#E7E7E7"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option4" &&
                  <div className="Centeralize">
                  <div className="SIZE4" style={{backgroundColor: "#F1B317"}}>
                    <div className='BG_Container2'>
                    {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                    {!PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                    {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                    {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                    </div>
                  </div>
              </div>
          }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && FrontSize ==="Option4" &&
                <div className="Centeralize">
                    <div className="SIZE4_Badge" style={{backgroundColor: "#E7E7E7"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE3_Image2":"SIZE3_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"SIZE3_Text1":"SIZE3_Text2"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option4" &&
                <div className="Centeralize">
                    <div className="SIZE4_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE3_Image2":"SIZE3_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"SIZE3_Text1":"SIZE3_Text2"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
          
          



          {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && !Badge && selectedState === 'standard' && FrontSize ==="Option5" &&
                  <div className="Centeralize">
                    <div className="SIZE5" style={{backgroundColor: "#E7E7E7"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option5" &&
                  <div className="Centeralize">
                  <div className="SIZE5" style={{backgroundColor: "#F1B317"}}>
                    <div className='BG_Container2'>
                    {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                    {!PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                    {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                    {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                    </div>
                  </div>
              </div>
          }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && FrontSize ==="Option5" &&
                <div className="Centeralize">
                    <div className="SIZE5_Badge" style={{backgroundColor: "#E7E7E7"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE5_Image2":"SIZE5_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"SIZE3_Text1":"SIZE3_Text2"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && FrontSize ==="Option5" &&
                <div className="Centeralize">
                    <div className="SIZE5_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE5_Image2":"SIZE5_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"SIZE3_Text1":"SIZE3_Text2"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE3_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


            { (PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && !Badge && selectedState === 'standard' && (FrontSize ==="Option6" || FrontSize ==="Option8")  &&
                <div className="Centeralize">                    
                    <div className='S3_Wrapper' style={{backgroundColor: "#E7E7E7"}}>
                      <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}`}}>
                          <div className='S3_Top'>
                            {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                            {!PlateText && <p>REG</p>}
                          </div>
                          <div className='S3_Bottom'>
                            {PlateText && <p>{PlateText.substring(4)}</p>}
                            {!PlateText && <p className='S3'>NO#</p>}
                          </div>
                          {Layout==="Legal Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                          {Layout==="Custom Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                        </div>
                    </div>
                  </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && (RearSize ==="Option6" || RearSize ==="Option8")  &&
                <div className="Centeralize">                    
                    <div className='S3_Wrapper' style={{backgroundColor: "#F1B317"}}>
                      <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}`}}>
                          <div className='S3_Top'>
                            {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                            {!PlateText && <p>REG</p>}
                          </div>
                          <div className='S3_Bottom'>
                            {PlateText && <p>{PlateText.substring(4)}</p>}
                            {!PlateText && <p className='S3'>NO#</p>}
                          </div>
                          {Layout==="Legal Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                          {Layout==="Custom Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                        </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && (FrontSize ==="Option6" || FrontSize ==="Option8") &&
                <div className="Centeralize">
                    <div className='S3_Wrapper_Badge' style={{backgroundColor: "#E7E7E7"}}>
                      <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}`}}>
                          <div className='S3_Top_Badge'>
                            {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                            {!PlateText && <p>REG</p>}
                          </div>
                          <div className='S3_Bottom_Badge'>
                            <div className='S3_Badge_Container' style={{ backgroundColor: BadgeBackground}}>
                                <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                                <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                            </div>
                            <div className='S3_Badge_PlateNumber'>
                              {PlateText && <p>{PlateText.substring(4)}</p>}
                              {!PlateText && <p>NO#</p>}                              
                            </div>
                          </div>
                          {Layout==="Legal Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                          {Layout==="Custom Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}                    
                        </div>
                    </div>
                <div/> 
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && (RearSize ==="Option6" || RearSize ==="Option8") &&
                <div className="Centeralize">
                    <div className='S3_Wrapper_Badge' style={{backgroundColor: "#F1B317"}}>
                      <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}`}}>
                          <div className='S3_Top_Badge'>
                            {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                            {!PlateText && <p>REG</p>}
                          </div>
                          <div className='S3_Bottom_Badge'>
                            <div className='S3_Badge_Container' style={{ backgroundColor: BadgeBackground}}>
                                <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                                <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                            </div>
                            <div className='S3_Badge_PlateNumber'>
                              {PlateText && <p>{PlateText.substring(4)}</p>}
                              {!PlateText && <p>NO#</p>}                              
                            </div>
                          </div>
                          {Layout==="Legal Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                          {Layout==="Custom Plates" && <p className="SIZE6_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}                    
                        </div>
                    </div>
                <div/> 
                </div>
            }


            { (PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && !Badge && selectedState === 'standard' && FrontSize ==="Option9" &&
                <div className="Centeralize">
                    <div className="Option6_NoBadge" style={{backgroundColor: "#E7E7E7"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="Option5_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="Option5_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option9" &&
                <div className="Centeralize">
                    <div className="Option6_NoBadge" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="Option5_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="Option5_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && FrontSize ==="Option9" &&
                  <div className="Centeralize">
                    <div className="BG_Plate2" style={{backgroundColor: "#E7E7E7"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="BG_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="BG_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="BG_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option9" &&
                  <div className="Centeralize">
                    <div className="BG_Plate2" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="BG_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="BG_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="BG_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


            { (PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && !Badge && selectedState === 'standard' && FrontSize ==="Option7" &&
                <div className="Centeralize">
                    <div className="Option10_NoBadge" style={{backgroundColor: "#E7E7E7"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="Option5_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="Option5_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option7" &&
                <div className="Centeralize">
                    <div className="Option10_NoBadge" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="Option5_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="Option5_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && FrontSize ==="Option7" &&
                <div className="Centeralize">
                    <div className="Option10_Plate1" style={{backgroundColor: "#E7E7E7"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"Option3_Image2":"Option3_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"Option3_Text":"Option3_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option7" &&
                <div className="Centeralize">
                    <div className="Option10_Plate1" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"Option3_Image2":"Option3_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"Option3_Text":"Option3_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


          {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && !Badge && selectedState === 'standard' && FrontSize ==="Option10" &&
                  <div className="Centeralize">
                    <div className="SIZE10" style={{backgroundColor: "#E7E7E7"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
          {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option10" &&
                  <div className="Centeralize">
                    <div className="SIZE10" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE4_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      

            {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only")  && Badge && selectedState === 'standard' && FrontSize ==="Option10" &&
                <div className="Centeralize">
                    <div className="SIZE10_Badge" style={{backgroundColor: "#E7E7E7"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE5_Image2":"SIZE5_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE10_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#E7E7E7"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#E7E7E7" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option10" &&
                <div className="Centeralize">
                    <div className="SIZE10_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE5_Image2":"SIZE5_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE10_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }



            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option11" &&
                  <div className="Centeralize">
                    <div className="SIZE11" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option11" &&
                <div className="Centeralize">
                    <div className="SIZE11_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE5_Image2":"SIZE5_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option12" &&
                  <div className="Centeralize">
                    <div className="SIZE11" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.7rem" }}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option12" &&
                <div className="Centeralize">
                    <div className="SIZE11_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` , padding: "0.7rem"}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option13" &&
                  <div className="Centeralize">
                    <div className="SIZE11" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option13" &&
                <div className="Centeralize">
                    <div className="SIZE11_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` , padding: "0.9rem"}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

          {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option14" &&
                  <div className="Centeralize">
                    <div className="SIZE11" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option14" &&
                <div className="Centeralize">
                    <div className="SIZE11_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` , padding: "0.9rem" , paddingRight: "1.2rem"}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }
          {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option15" &&
                  <div className="Centeralize">
                    <div className="SIZE12" style={{backgroundColor: "#F1B317"}}>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                      {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`}}>YOUR REG</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }      
            {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option15" &&
                <div className="Centeralize">
                    <div className="SIZE12_Badge" style={{backgroundColor: "#F1B317"}}>
                      <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                            <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                            <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                      </div>
                      <div className='BG_Container2'>
                      {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` , padding: "0.9rem" , paddingRight: "1.2rem"}}>{PlateText}</div>}
                      {Layout==="Legal Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317"}}>CPD JE2 4UE</p>}
                      {Layout==="Custom Plates" && <p className="SIZE11_Footer" style={{backgroundColor: "#F1B317" , color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }



            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option16" &&
                <div className="Centeralize">
                    <div class="Rover" style={{ fontFamily: Font }}>
                      <div class="Rover-Inner" style={{ fontFamily: Font , border: `3px solid ${Border}` }}>
                            {PlateText}
                            {Layout==="Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                            {Layout==="Custom Plates" && <p className="Rover_Footer" style={{color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option16" &&
                <div className="Centeralize">
                    <div className="Rover" style={{ fontFamily: Font }}>
                      <div className="Rover-Inner" style={{ fontFamily: Font , border: `3px solid ${Border}` }}>
                            <div className="Rover-Badge">
                                  <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                                  <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"BG_Image2":"BG_Image1"} alt='Badge'></img>
                                  <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                            </div>
                           <div>{PlateText}</div>
                            </div>
                            {Layout==="Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                            {Layout==="Custom Plates" && <p className="Rover_Footer" style={{color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option17" &&
                <div className="Centeralize">
                    <div className="Rover-1" style={{ fontFamily: Font }}>
                      <div className="Rover-Inner-1" style={{ fontFamily: Font , border: `3px solid ${Border}` }}>
                            {PlateText}
                            {Layout==="Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                            {Layout==="Custom Plates" && <p className="Rover_Footer" style={{color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option17" &&
                <div className="Centeralize">
                    <div className="Rover-1" style={{ fontFamily: Font }}>
                      <div className="Rover-Inner-1" style={{ fontFamily: Font , border: `3px solid ${Border}` }}>
                            <div className="Rover-Badge">
                                  <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                                  <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE3_Image2":"BG_Image1"} alt='Badge'></img>
                                  <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                            </div>
                           <div>{PlateText}</div>
                            </div>
                            {Layout==="Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                            {Layout==="Custom Plates" && <p className="Rover_Footer" style={{color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

          { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && !Badge && selectedState === 'standard' && RearSize ==="Option18" &&
                <div className="Centeralize">
                    <div className="Rover-2" style={{ fontFamily: Font }}>
                      <div className="Rover-Inner-2" style={{ fontFamily: Font , border: `3px solid ${Border}` }}>
                            {PlateText}
                            {Layout==="Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                            {Layout==="Custom Plates" && <p className="Rover_Footer" style={{color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }

            { (PlateChoice === "Front and Rear" || PlateChoice === "Rear Only")  && Badge && selectedState === 'standard' && RearSize ==="Option18" &&
                <div className="Centeralize">
                    <div className="Rover-2" style={{ fontFamily: Font }}>
                      <div className="Rover-Inner-2" style={{ fontFamily: Font , border: `3px solid ${Border}` , padding : "1rem" }}>
                            <div className="Rover-Badge">
                                  <div className="BG_Container1" style={{ backgroundColor: BadgeBackground}}>
                                  <img src={`/Badges/${BadgeFlag}.png`}  className={Vertical?"SIZE3_Image2":"BG_Image1"} alt='Badge'></img>
                                  <div id={ShortHand?"BG_Text":"BG_Text1"}>{BadgeCity}</div>
                            </div>
                           <div>{PlateText}</div>
                            </div>
                            {Layout==="Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                            {Layout==="Custom Plates" && <p className="Rover_Footer" style={{color: FooterColor}}>{FooterText}</p>}
                      </div>
                    </div>
                </div>
            }


            </div>
        <div id="Plate-div-2">
          <>
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
          </>

            <div className="PlateDisplay">
              <input required type="text" placeholder="Registration Number" name="PlateText" className="PlateText" label="PlateText" onChange={HandlePlateText} />
            </div>


          {selectedState === 'standard' ? (
            <>
              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown' required onChange={HandlePlates}>
                  <option value="Front and Rear">Front and Rear</option>
                  <option value="Front Only">Front Only</option>
                  <option value="Rear Only">Rear Only</option>
                </select>

                <select id='Dropdown' required onChange={HandleLayout}>
                  <option value="">-- Select Plate Layout --</option>
                  <option value="Custom Plates">Custom Plates</option>
                  <option value="Legal Plates">Legal Plates</option>
                </select>

                <select id='Dropdown' required onChange={HandleFont}>
                  <option value="">-- Select Plate Font--</option>
                  {Fonts.map((font, index) => (
                    <option key={index} value={FontFamily[index]}>{font}</option>
                  ))}
                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                  <option value="">-- Select Front Plate Size--</option>
                  <option value="Option1">Standard Size (20.5x4.4in)</option>
                  <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                  <option value="Option3">229mm x 76mm (9in x 3in)</option>
                  <option value="Option4">254mm x 76mm (10in x 3in)</option>
                  <option value="Option5">305mm x 76mm (12in x 3in)</option>
                  <option value="Option6">305mm x 152mm (12in x 6in)</option>
                  <option value="Option7">330mm x 111mm (13in x 4.4in)</option>
                  <option value="Option8">330mm x 165mm (13in x 6.5in)</option>
                  <option value="Option9">16in x 4.5in (16in x 4.5in)</option>
                  <option value="Option10">520mm x 121mm (20.5in x 4.75in)</option>
                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Large' required onChange={HandleRearSize}>
                  <option value="">-- Select Rear Plate Size--</option>
                  <option value="Option1">Standard Size (20.5x4.4in)</option>
                  <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                  <option value="Option3">229mm x 76mm (9in x 3in)</option>
                  <option value="Option4">254mm x 76mm (10in x 3in)</option>
                  <option value="Option5">305mm x 76mm (12in x 3in)</option>
                  <option value="Option6">305mm x 152mm (12in x 6in)</option>
                  <option value="Option7">330mm x 111mm (13in x 4.4in)</option>
                  <option value="Option8">330mm x 165mm (13in x 6.5in)</option>
                  <option value="Option9">16in x 4.5in (16in x 4.5in)</option>
                  <option value="Option10">520mm x 121mm (20.5in x 4.75in)</option>
                  <option value="Option11">520mm x 127mm (20.5in x Sin)</option>
                  <option value="Option12">520mm x 140mm (20.5in x 5.5in)</option>
                  <option value="Option13">520mm x 152mm (20.5in x 6in)</option>
                  <option value="Option14">533mm x 152mm (21in x 6in)</option>
                  <option value="Option15">559mm x 152mm (22in x 6in)</option>
                  <option value="Option16">Rover 75 (635x175mm)</option>
                  <option value="Option17">Range Rover Sport V1 (615x150mm)</option>
                  <option value="Option18">Range Rover Sport V2 (560x165mm)</option>

                </select>
              </div>

              <div className="container my-2" id='Selection-Options2'>
                <select id='Dropdown-Large' required onChange={HandleBadge}>
                    <option value="">-- Select Badge --</option>
                {Badges.map((badge, index) => (
                    <option key={index} value={badge}>{badge}</option>
                  ))}
                </select>
              </div>

              <div className="container my-2" id='Selection-Options2'>
                  <div id='ColorPickerdiv'>
                    <label htmlFor="ColorPicker" >Select Badge Background:</label>
                    <input type="color" id='ColorPicker' onChange={HandleBadgeBg} />
                  </div>
                  <div>
                    <button type="button" onClick={ResetBg} id="ResetButton">Set Default</button>                  
                  </div>
              </div>

              <div className="container my-2" id='Selection-Options2'>
                  <div id='ColorPickerdiv'>
                    <label htmlFor="ColorPicker" >Select Plate Border Color:</label>
                    <input type="color" style={{ marginLeft:"1.3rem"}}id='ColorPicker' onChange={HandleBorder} />
                  </div>
                  <div>
                    <button type="button" onClick={ResetBc} id="ResetButton">Set Default</button>                  
                  </div>
              </div>

              {Layout==="Custom Plates" &&
                <div className="container my-2" id='Selection-Options'>
                    <input required type="text" placeholder={FooterText} name="PlateText" id="fOOTER" label="PlateText" onChange={HandleFooter} />
                    <div id='ColorPickerdiv'>
                      <label htmlFor="ColorPicker" >Footer Color:</label>
                      <input type="color" id='ColorPicker' onChange={HandleFooterColor} />
                  </div>
                </div>
            }
            </>
          ) :
            (
              <>
                <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Medium' required onChange={HandlePlates}>
                  <option value="Front and Rear">Front and Rear</option>
                  <option value="Front Only">Front Only</option>
                  <option value="Rear Only">Rear Only</option>
                </select>

                <select id='Dropdown-Medium' required onChange={HandleFont}>
                  <option value="">-- Select Plate Font--</option>
                  {Fonts.map((font, index) => (
                    <option key={index} value={FontFamily[index]}>{font}</option>
                  ))}
                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                  <option value="">-- Select Front Plate Size--</option>
                  <option value="Option1">Standard Size (20.5x4.4in)</option>
                  <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                  <option value="Option3">305mm X 152mm (12in X 6in)</option>
                  <option value="Option4">330mm x 111mm (13in X 4.4in)</option>
                  <option value="Option5">330mm X 165mm (13in X 6.5in)</option>
                  <option value="Option6">16in X 4.5in (16in X 4.5in)</option>
                  <option value="Option7">Option7</option>
                  <option value="Option8">Option8</option>
                  <option value="Option9">Option8</option>
                  <option value="Option10">Option10</option>
                  <option value="Option11">Option11</option>


                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Large' required onChange={HandleRearSize}>
                  <option value="">-- Select Rear Plate Size--</option>
                  <option value="Option1">Standard Size (20.5x4.4in)</option>
                  <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                  <option value="Option3">305mm X 152mm (12in X 6in)</option>
                  <option value="Option4">330mm x 111mm (13in X 4.4in)</option>
                  <option value="Option5">330mm X 165mm (13in X 6.5in)</option>
                  <option value="Option6">16in X 4.5in (16in X 4.5in)</option>
                  <option value="Option7">520mm X 127mm (20.5in X 5in)</option>
                  <option value="Option8">Rover 75 (635x175mm)</option>
                  <option value="Option9">Option8</option>
                  <option value="Option10">Option10</option>
                  <option value="Option11">Option11</option>


                </select>
              </div>

              <div className="container my-2" id='Selection-Options2'>
                  <div id='ColorPickerdiv'>
                    <label htmlFor="ColorPicker" >Select Plate Border Color:</label>
                    <input type="color" id='ColorPicker' onChange={HandleBorder} />
                  </div>
                  <div>
                    <button type="button" onClick={ResetBc} id="ResetButton">Reset Border Color</button>                  
                  </div>
              </div>
              </>
            )}
        </div>
      </div>
    </>
  );
}

const Fonts = [
  'Montserrat',
  'Arial',
  'Courier New',
  'Cafe',
  'Face',
  'Fargo',
  'Helvetica',
  'IBM',
  'Munistic',
  'Playback',
  'Prompt',
  'Raptors',
  'Times New Roman',
  'Saira',
  'Sanidana',
  'Sleeping',
  'Trajan',
  'Verdana',
  'Bungee',
  'Comic Neue',
  'Nunito'
];

const FontFamily = [
  "'Montserrat', sans-serif",
  "'Arial', sans-serif",
  "'Courier New', Courier, monospace",
  "'Cafe', sans-serif",
  "'Face', cursive",
  "'Fargo', cursive",
  "'Helvetica', sans-serif",
  "'IBM', sans-serif",
  "'Munistic', cursive",
  "'Playback', cursive",
  "'Prompt', sans-serif",
  "'Raptors', cursive",
  "'Times New Roman', Times, serif",
  "'Saira', sans-serif",
  "'Sanidana', cursive",
  "'Sleeping', cursive",
  "'Trajan', serif",
  "'Verdana', sans-serif",
  "'Bungee', cursive",
  "'Comic Neue', cursive",
  "'Nunito', sans-serif"
];
  
    
const Badges = [
    "ST_GEORGE-ENG",
    "ST_GEORGE-ENGLAND",
    "ST_GEORGE-GB",
    "ST_GEORGE-GREAT BRITAIN",
    "ST_GEORGE-UK",
    "ST_GEORGE-UNITED KINGDOM",
    "ST_GEORGEP-ENG",
    "ST_GEORGEP-ENGLAND",
    "ST_GEORGEP-GB",
    "ST_GEORGEP-GREAT BRITAIN",
    "ST_GEORGEP-UK",
    "ST_GEORGEP-UNITED KINGDOM",
    "WALES-CYM",
    "WALES-CYMRU",
    "WALES-GB",
    "WALES-GREAT BRITAIN",
    "WALES-UK",
    "WALES-UNITED KINGDOM",
    "WALES-WALES",
    "WALESP-CYM",
    "WALESP-CYMRU",
    "WALESP-GB",
    "WALESP-GREAT BRITAIN",
    "WALESP-UK",
    "WALESP-UNITED KINGDOM",
    "WALESP-WALES",
    "SALTIRE-GREAT BRITAIN",
    "SALTIRE-SCOTLAND",
    "SALTIRE-UNITED KINGDOM",
    "SALTIRE-GB",
    "SALTIRE-SCO",
    "SALTIRE-UK",
    "SALTIREP-GREAT BRITAIN",
    "SALTIREP-SCOTLAND",
    "SALTIREP-UNITED KINGDOM",
    "SALTIREP-GB",
    "SALTIREP-SCO",
    "SALTIREP-UK",
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
  
  