import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import './Services.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";

export default function Services() {

    const Navigate = useNavigate();
    const [Email, SetEmail] = useState("")
    const [Name , SetName ] = useState("")
    const [PhoneNumber , SetPhone] = useState("")
    const [Registeration, SetRegisteration] = useState("")
    const [Service , SetService] = useState("")
    const [Location , SetLocation] = useState("")
    const [Description , SetDescription ] = useState("")
    const HandleEmail = (e) => { SetEmail(e.target.value) }
    const HandleName = (e) => { SetName(e.target.value) }
    const HandlePhone = (e) => { SetPhone(e.target.value) }
    const HandleRegisteration = (e) => { SetRegisteration(e.target.value) }
    const HandleService = (e) => { SetService(e.target.value) }
    const HandleLocation = (e) => { SetLocation(e.target.value) }
    const HandleDescription = (e) => { SetDescription(e.target.value) }

    const Submit = async (e) => {
        e.preventDefault()
        if ( Email === "" || Name === "" || PhoneNumber === "" || Registeration === "" || Service === "" || Location === "" || Description === "")
        {
            toast.error("Please fill all the fields")
            return
        } 
        let Success = false;
        try
        {
          toast.success("Please wait...")
           const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/quote/AddQuote`, 
           {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: Email,
                name: Name,
                phone: PhoneNumber,
                registeration: Registeration,
                service: Service,
                location: Location,
                description: Description
            })})

          const ResponseToJson = await Response.json();
          Success = ResponseToJson.Success;
          if (Success) {
            toast.success("You'll be contacted soon");
            setTimeout(() => {
                Navigate("/");
          }, 1000)}
        }
        catch(err)
        {
            console.log(err);
        }
        
    }

    function scrollToSection() {
        const targetElement = document.getElementById('ReqForm'); 
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      
    return (
        <>
            <Navigation />

            <div className='Services-Head'>Our Services</div>

            <div className='container my-4 Services-Container'>
                <div className='S-Container-1 animated fadeInLeft'>
                    <img src='/Spare-Car-Key.png' alt="Spare Car Key and Programming" />
                </div>
                <div className='S-Container-2 animated fadeInRight'>
                    <h5>
                        Car Key Cutting <span>And Programming</span>
                    </h5>
                    <p>At Bancroft, we take pride in being your trusted local car key specialist, providing comprehensive services
                        for car key cutting and programming across a wide range of vehicles. Our skilled team operates state-of-the-art
                        auto locksmith vans equipped with advanced computerized technology for precise vehicle key cutting. This enables
                        us to offer on-the-spot car key cutting services for nearly all makes and models. When you choose us for spare
                        car keys cut and programmed, rest assured that you'll receive a cost-effective solution without compromising on quality.
                    </p>
                    <p>One question our customers often have is why car keys need programming. The answer lies in the integration of modern
                        car keys with a vehicle's immobilizer chip. Our experienced technicians excel at programming spare and replacement
                        car keys to seamlessly synchronize with your vehicle. We utilize a diverse range of programming tools, ensuring we
                        can cut and program various types of car keys to meet your specific requirements. With our expertise and resources,
                        we ensure a smooth and efficient process, leaving you with fully functional car keys that perfectly match your vehicle.
                    </p>
                    <button className="Touch" onClick={scrollToSection}>Get in Touch</button>
                </div>
            </div >

            <div className='container Service-Divider'></div>

            <div className='container my-4 Services-Container'>
                <div className='S-Container-2 animated fadeInLeft'>
                    <h5>
                        <span>Car Replacement</span> Services
                    </h5>
                    <p>At Bancroft, we understand the urgency of car key replacement and strive to provide a seamless and
                        stress-free experience. Our dedicated car key locksmith service ensures that you can quickly get
                        back on the road without any hassle. Don't let a lost car key disrupt your day when you have us as
                        your trusted car key specialist.
                    </p>
                    <p>When it comes to car key replacement, we've got you covered. Our expertise in car key cutting and
                        programming enables us to assist you in any situation. Whether you've lost your keys or need a spare,
                        we have the solutions you need. Count on our reliable service to deliver efficient car key replacement
                        services tailored to your requirements. With Bancroft, restoring access to your vehicle is simple and hassle-free.
                    </p>
                    <p>

                        Don't let a lost car key disrupt your day any longer. Trust Bancroft as your dedicated car key specialist to handle the complexities of car key cutting and programming. With our expertise, personalized solutions, and commitment to quality service, we ensure that your car key replacement experience is efficient, stress-free, and tailored to your specific situation. Get in touch with us today to regain access to your vehicle with ease.
                    </p>
                    <button className="Touch" onClick={scrollToSection}>Get in Touch</button>
                </div>
                <div className='S-Container-1 animated fadeInRight'>
                    <img src='/LostKey.png' alt="Spare Car Key and Programming" ></img>
                </div>

            </div>

            <div className='container Service-Divider'></div>

            <div className='container my-4 Services-Container'>
                <div className='S-Container-1 animated fadeInLeft'>
                    <img src='/Car-Opening.png' alt="Spare Car Key and Programming" ></img>
                </div>

                <div className='S-Container-2 animated fadeInRight'>
                    <h5>
                        Secure Car <span>Opening</span>
                    </h5>
                    <p>At Bancroft Auto Locksmiths, we have extensive experience in performing non-destructive
                        vehicle entry to help you when you have locked your keys in the car. Our skilled team is proficient
                        in various techniques, including lock picking, which allows us to gain access to most commercial and
                        private vehicles. With our fine-tuned methods, we can retrieve locked keys from the boot or car without
                        causing any damage.
                    </p>
                    <p>When you reach out to us because of a key locked in the car, rest assured that we will
                        never resort to forced entry or cause any harm to your vehicle. Our expertise enables us
                        to employ precise techniques to retrieve your keys without leaving any signs of damage or
                        forced entry. In many cases, we can swiftly open the car and have you back on the road within moments.   </p>
                    <p>
                        Discovering that your keys are locked in the car can be a highly stressful situation, especially
                        when you have important places to be. To alleviate your concerns and ensure a prompt resolution,
                        we offer an emergency auto locksmith service. Simply give us a call, and one of our team members
                        will provide you with expert guidance on the best course of action.                    </p>
                    <button className="Touch" onClick={scrollToSection}>Get in Touch</button>
                </div>
            </div>

            <div className='container Service-Divider'></div>

            <div className='container my-4 Services-Container'>
                <div className='S-Container-2 animated fadeInLeft'>
                    <h5>
                        <span>Instrument Cluster</span> Repair Services
                    </h5>
                    <p>If you are in need of instrument cluster repair near me, look no further than Bancroft Auto Locksmiths.
                        As specialists in dashboard repair, we are equipped to handle a wide range of issues and faults that may arise
                        with your vehicle's dashboard.
                    </p>
                    <p>The dashboard of a vehicle is a complex system consisting of odometer counters, gears, indicators,
                        plastic housing, and windows. While electronic failures can occur within the dashboard, non-electronic
                        components can also contribute to problems. At Bancroft we have the expertise to address various issues
                        that may affect your instrument cluster.
                    </p>
                    <p>
                        Our experienced team of professionals specializes in instrument cluster repair services. We have the knowledge and tools to
                        diagnose and resolve almost any problem you may encounter with your dashboard cluster. Whether it's a malfunctioning odometer,
                        faulty indicators, or damaged plastic housing, we can make sense of the problem and provide effective solutions.
                    </p>

                    <button className="Touch" onClick={scrollToSection}>Get in Touch</button>
                </div>
                <div className='S-Container-1 animated fadeInRight'>
                    <img src='Cluster.png' alt="Instrument Cluster Repair Services" ></img>
                </div>
            </div>

            <div className='container Service-Divider'></div>

            <div className='container my-4 Services-Container'>
                <div className='S-Container-1 animated fadeInLeft'>
                    <img src='Immobilizer.png' alt="Instrument Cluster Repair Services" ></img>
                </div>

                <div className='S-Container-2 animated fadeInRight'>
                    <h5>
                        Immobiliser <span>Problems</span>
                    </h5>
                    <p>An immobiliser fault can cause major issues and lead to expensive repair bills. There are many reasons why you might be experiencing car immobiliser problems. These problems can include:</p>
                    <ul>
                        <li>Central locking no longer working or working inconsistently.</li>
                        <li>Vehicle not starting and the immobiliser light comes on the dashboard.</li>
                        <li>Immobiliser light on the dashboard is flashing.</li>
                        <li>Vehicle starts and then stops.</li>
                        <li>Car alarm doesn't work because of immobiliser problems.</li>
                        <li>Car key stops working and no longer locks or unlocks the vehicle.</li>
                    </ul>
                    <p>
                        Many of these common issues are caused by key fobs losing their coding. This could be due to corroded or defected wiring with the key or an issue with the ECU. Because our team of auto locksmiths are specialists in immobiliser problems, we can get to the bottom of the problem. If you need to reset car immobiliser or identify your immobiliser fault, our team can help.
                    </p>
                    <button className="Touch" onClick={scrollToSection}>Get in Touch</button>
                </div>
            </div>

            <div className='container Service-Divider'></div>

            <div className="container my-4 Services-Container">
                    <div className="S-Container-2 animated fadeInLeft">
                        <h5>
                            Van <span>Locks</span>
                        </h5>
                        <p>When it comes to van security, Bancroft Auto Locksmith offers professional van lock services to keep your vehicle safe and protected. Our experienced team specializes in installing, repairing, and replacing:</p>
                        <ul>
                            <li>Slam Locks Repairs</li>
                            <li>Slam Handles</li>
                            <li>Replocks</li>
                            <li>Vehicle Component Protection</li>
                            <li>Shielding & Repair Plates</li>
                            <li>Hook Locks & Dead Locks</li>
                        </ul>
                        <p>We understand the importance of securing your van and its contents, whether it's for personal or commercial use. Our van lock services cover a wide range of needs, including van lock installation, lock upgrades, lock repairs, and key replacement for van locks.</p>
                        <p>Whether you need to upgrade your van locks to advanced security systems, repair a faulty lock, or replace lost or damaged keys, we have the expertise to deliver reliable and efficient solutions. Our team is equipped with the latest tools and techniques to ensure precise installations and repairs, tailored to your specific van make and model.</p>
                        <button className="Touch">Get in Touch</button>
                    </div>
                    <div className="S-Container-1 animated fadeInRight">
                        <img src="VanLock1.png" alt="Van Locks"></img>
                    </div>
                </div>

                <div className="container RequestForm" id="ReqForm">
                    <div className="FCont1">
                        <h4><span>Areas</span> we cover</h4>
                        <div className="Areas-Div">
                            <h5>Aylesbury</h5>
                            <h5>Bedfordshire</h5>
                            <h5>Buckinghamshire</h5>
                            <h5>Leighton Buzzard</h5>
                            <h5>Luton</h5>
                            <h5>Northamptonshire</h5>
                            <h5>Wellingborough</h5>
                        </div>
                        <div>
                            <h6 className='Contact1'>
                                Or call us at:
                            </h6 >
                            <h6 className='Contact'>
                                Phone: 07572448224
                            </h6>
                            <h6 className='Contact'>
                                Office: 01908 222555
                            </h6>
                        </div>

                    </div>
                    <div className="FCont2">
                        <div className="container my-2">
                            <h4><span>Get</span> in touch now!</h4>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandleEmail} type="email" name="email" id="email" placeholder="Email*" autoComplete="off" className="Request-Input" label="Email" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandleName} name="name" type="text" id="name" placeholder="Name*" autoComplete="off" className="Request-Input" label="Name" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandlePhone}   name="phone" type="text" id="phone" placeholder="Phone Number*" autoComplete="off" className="Request-Input" label="Phone Number" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandleRegisteration} name="carRegistration" type="text" id="carRegistration" placeholder="Car Registration*" autoComplete="off" className="Request-Input" label="Car Registration" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <select id="Dropdown-Request" required onChange={HandleService}>
                                <option value="">-- Select Service --</option>
                                <option value="Car Key Cutting And Programming">Car Key Cutting And Programming</option>
                                <option value="Car Replacement Services">Car Replacement Services</option>
                                <option value="Secure Car Opening">Secure Car Opening</option>
                                <option value="Instrument Cluster Repair Services">Instrument Cluster Repair Services</option>
                                <option value="Immobiliser Problems">Immobiliser Problems</option>
                                <option value="Car Key Repairs">Car Key Repairs</option>
                                <option value="Van Locks">Van Locks</option>
                            </select>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <select id="Dropdown-Request" required onChange={HandleLocation}>
                                <option value="">-- Select Location --</option>
                                <option value="Aylesbury">Aylesbury</option>
                                <option value="Bedfordshire">Bedfordshire</option>
                                <option value="Buckinghamshire">Buckinghamshire</option>
                                <option value="Leighton Buzzard">Leighton Buzzard</option>
                                <option value="Luton">Luton</option>
                                <option value="Northamptonshire">Northamptonshire</option>
                                <option value="Wellingborough">Wellingborough</option>
                            </select>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <textarea placeholder="Description" id="Request-area" onChange={HandleDescription}></textarea>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <button className="Request-Button" onClick={Submit} >Submit</button>
                        </div>
                    </div>
                </div>


            <ToastContainer theme="colored"/>
            <Footer/>
            </>
            )
}
