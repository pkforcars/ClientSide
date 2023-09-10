import React, { useState , useContext } from 'react'
import Navigation from '../Navigation/Navigation'
import './Services.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context"

export default function Accessories() {
    const Global = useContext(Context)

    const FixingProducts = [
        {
            id: 1,
            name: "Car Number Plate Fixing Kit",
            description: "8 Double Sided Sticky Pads, 4 x Self-Tapping Screws, 4 x Black Caps, 2 x Yellow Caps, 2 x White Caps. Essential kit required for hassle free fitting.",
            //price: 3.99,
            price: 0.1,
            image: "Acc1.png"
        },
        {
            id: 2,
            name: "Bike Fixing Kit",
            description: "8 Double Sided Sticky Pads, 2 x Yellow, 2 x Black & 2 x White Nylon Nuts/Bolts. Essential bike fixing kit required for hassle free fitting.",
            price: 3.99,
            image: "Acc2.png"
        },
        {
            id: 3,
            name: "Number Plate Sticky Pads",
            description: "These are the best quality double sided adhesive pads you will find. We recommend 1 pack for a pair of standard size plates (6 each plate). Please order 2 packs for larger plate sizes.",
            price: 1.99,
            image: "Acc3.jpg"
        },
        {
            id: 4,
            name: "Screen Wash Pod",
            description: "Screen Wash Pod is a concentrated screen wash additive that can be used all year round. It will remove dirt, grease, traffic film and insect deposits easily from your windscreen, leaving a streak free finish for increased visibility.",
            price: 1.99,
            image: "Acc4.jpg"
        },
        {
            id: 5,
            name: "ArmorAll Super Quality Jumbo Sponge",
            description: "ArmorAll Super Quality Jumbo Sponge is a high quality sponge ideal for cleaning all surfaces. It is extra large and easy to hold.",
            price: 3.99,
            image: "Acc5.png"
        },
        {
            id: 6,
            name: "Anti-theft Number Plate Bolts",
            description: "Anti-theft number plate bolts are a great way to secure your number plates. They are a direct replacement for your existing number plate bolts and require a special tool to remove them.",
            price: 6.99,
            image: "Acc6.png"
        },
        {
            id: 7,
            name: "IPhone Lightning to USB Cable.",
            description: "This USB 2.0 cable connects your iPhone, iPad, or iPod with Lightning connector to your computer’s USB port for syncing and charging. Or you can connect to the Apple USB Power Adapter for convenient charging from a wall outlet.",
            price: 2.99,
            image: "Acc8.png"
        },
        {
            id: 8,
            name: "Armorall Headlight Restorer Kit",
            description: "Armorall Headlight Restorer Kit is a simple to use kit that will restore clarity to dull and yellowed headlights. The kit contains a 118ml bottle of Armorall Headlight Restorer and 2 x 1000 grit sanding pads.",
            price: 7.99,
            image: "Acc7.png"
        },
        {
            id: 9,
            name: "Armorall Glass Wipes",
            description: "Armorall Glass Wipes are a quick and easy way to clean your windows and glass. The wipes are specially formulated to give a streak free shine.",
            price: 2.99,
            image: "Acc9.png"
        },
        {
            id: 10,
            name: "6mm Drill Bit",
            description: "6mm Drill Bit for use with our number plate fixing kit.",
            price: 2.99,
            image: "Acc10.png"
        },
        {
            id: 11,
            name: "ArmorAll Shield Extra Large Drying Towel",
            description: "ArmorAll Shield Extra Large Drying Towel is a super absorbent drying towel that will dry your car in no time. It is made from a super absorbent microfibre material that will not scratch your paintwork.",
            price: 7.99,
            image: "Acc11.png"
        },
        {
            id: 12,
            name: "Rain-X Windscreen Repair Kit",
            description: "Rain-X Windscreen Repair Kit is a DIY repair kit that will fix chips and cracks in your windscreen. It will prevent further damage and restore your windscreen to its original strength.",
            price: 12.99,
            image: "Acc13.png"
        },
        {
            id: 13,
            name: "USB Dual Car Charger",
            description: "USB Dual Car Charger is a great way to charge your devices on the go. It has 2 USB ports so you can charge 2 devices at the same time.",
            price: 3.99,
            image: "Acc12.png"
        },
        {
            id: 14,
            name: "USB-C to Lightning Cable Fast Charge (2Meters Long)",
            description: "This USB-C cable connects your iPhone, iPad, or iPod with Lightning connector to your computer’s USB-C port for syncing and charging. Or you can connect to the Apple USB-C Power Adapter for convenient charging from a wall outlet.",
            price: 4.99,
            image: "Acc14.png"
        }
    ]

    const CareProducts = [
        {
            id: 1,
            name: "Kent Synthetic Chamois Cloth",
            description: "Kent Synthetic Chamois Cloth is a super absorbent synthetic chamois cloth that will dry your car in no time. It is made from a super absorbent synthetic material that will not scratch your paintwork.",
            price: 3.99,
            image: "Acc15.png"
        },
        {
            id: 2,
            name: "Kent Supersoft Microfibre Towels (3)",
            description: "Kent Supersoft Microfibre Towels are a great way to dry your car. They are made from a super soft microfibre material that will not scratch your paintwork.",
            price: 5.99,
            image: "Acc16.png"
        },
        {
            id: 3,
            name: "Armor All Leather Wipes",
            description: "Armor All Leather Wipes are a quick and easy way to clean your leather. The wipes are specially formulated to clean, condition and protect your leather.",
            price: 3.99,
            image: "Acc17.png"
        },
        {
            id: 4,
            name: "Armor All Dashboard Wipes",
            description: "Armor All Dashboard Wipes are a quick and easy way to clean your dashboard. The wipes are specially formulated to clean, condition and protect your dashboard.",
            price: 3.99,
            image: "Acc18.png"
        },
        {
            id: 5,
            name: "Armor All All-Round Wipes",
            description: "Armor All All-Round Wipes are a quick and easy way to clean your car. The wipes are specially formulated to clean, condition and protect your car.",
            price: 4.99,
            image:"Acc19.png"
        }
    ]

    const Accessores = [
        {
            id: 1,
            name: "Black Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc20.png"
        },
        {
            id: 2,
            name: "Blue Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc21.png"
        },
        {
            id: 3,
            name: "Chrome Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc22.png"
        },
        {
            id: 4,
            name: "Red Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc23.png"
        },
        {
            id: 5,
            name: "Purple Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc24.png"
        },
        {
            id: 6,
            name: "Number Plate Frame Grey",
            price: 9.99,
            image: "Acc25.png"
        },
        {
            id: 7,
            name: "USB / USC Dual Car - charger For new Iphone Cable",
            price: 5.99,
            image: "Acc26.png"
        },
        {
            id: 8,
            name: "Light Blue Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc27.png"
        },
        {
            id: 9,
            name: "Orange Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc28.png"
        },
        {
            id: 10,
            name: "Green Anodized Tyre Valve Dust Caps (x4)",
            price: 4.99,
            image: "Acc29.png"
        },
        {
            id: 11,
            name: "Yellow Anodized Tyre Valve Dust Caps (x4)",
            price: 9.99,
            image: "Acc30.png"
        }
    ]

    
    const addToCart = (product) => {
        Global.AddToCart(product)
        let Total = parseFloat(Global.Total) + parseFloat(product.price)
        Global.SetTotal(Total)
        toast.success(`${product.name} added to cart`)
    }

    return (
        <>
            <Navigation />
            <div className="homepage2">
                <div className='container'>
                    <h1>Accessories</h1>
                </div>
            </div>

            <div className="container fix">
                <h4>Fixing:</h4>
            </div>

            <div className="container">
                <div className='FixingProduct'>
                    {FixingProducts.map((product) => (
                        <div className='FixingProduct__card' key={product.id}>
                            <div className='ProductImage-Container'>
                                <img
                                    src={`/Accessories/${product.image}`}
                                    alt={product.name}
                                    className='FixingProduct__img'
                                />
                            </div>
                            <div className='FixingProduct__info'>
                                <div className='ProductHeight'>
                                    <h5>{product.name}</h5>
                                    <p>{product.description}</p>
                                </div>
                                <div>
                                    <button
                                        className='product-btn'
                                        onClick={() => {
                                            addToCart(product);
                                        }}
                                    >
                                        Add to Cart £{product.price} 
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container fix">
                <h4>Car Care/Cleaning:</h4>
            </div>

            <div className="container">
                <div className='FixingProduct'>
                    {CareProducts.map((product) => (
                        <div className='FixingProduct__card' key={product.id}>
                            <div className='ProductImage-Container'>
                                <img
                                    src={`/Accessories/${product.image}`}
                                    alt={product.name}
                                    className='FixingProduct__img'
                                />
                            </div>
                            <div className='FixingProduct__info'>
                                <div className='ProductHeight'>
                                    <h5>{product.name}</h5>
                                    <p>{product.description}</p>
                                </div>
                                <div>
                                    <button
                                        className='product-btn'
                                        onClick={() => {
                                            addToCart(product);
                                        }}
                                    >
                                        Add to Cart £{product.price} 
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container fix">
                <h4>Accessories:</h4>
            </div>

            <div className="container">
                <div className='FixingProduct'>
                    {Accessores.map((product) => (
                        <div className='FixingProduct__card' key={product.id}>
                            <div className='ProductImage-Container'>
                                <img
                                    src={`/Accessories/${product.image}`}
                                    alt={product.name}
                                    className='FixingProduct__img'
                                />
                            </div>
                            <div className='FixingProduct__info'>
                                <div className='ProductHeight'>
                                    <h5>{product.name}</h5>
                                </div>
                                <div>
                                    <button
                                        className='product-btn'
                                        onClick={() => {
                                            addToCart(product);
                                        }}
                                    >
                                        Add to Cart £{product.price}
                                    </button>
                                </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer/>


            <Footer />
        </>
    )
}
