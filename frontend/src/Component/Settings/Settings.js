import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

import homeIcon from "../../Assets/house.png";
import settingIcon from "../../Assets/setting.png";
import searchIcon from "../../Assets/search.png";
import AppIcon from "../../Assets/AppIcon.png";

function Settings() {
    const navigate = useNavigate();
    
    const options = [
        {
            header: {
                name: "General",
            },

            values:[
            {
                name: "Name",
                description: "Your name will be changed on WebChatApp.",
            },
            {
                name: "Username",
                description: "Your public username is the same as your timeline address.",
            },
            ]
        },

        {
            header: {
                name: "Security and Login",
            },

            values:[
            {
                name: "Password",
                description: "It's a good idea to use a strong password that you're not using elsewhere.",
            },
            {
                name: "Two-factor authentication",
                description: "We'll ask for a login code if we notice an attempted login from an unrecognized device or browser.",
            },
            ]
        },

        {
            header: {
                name: "Notifications",
            },

            values:[
            {
                name: "Friend Requests",
                description: "Notifications when someone sends you a friend request or accepts your friend request.",
            },
            {
                name: "Groups",
                description: "These are notifications about activity in Groups you've joined.",
            },
            ]
        },
    ]

    const [visibleOptions, setvisibleOptions] = useState(options);

    const onChange=(e) => {
        e.preventDefault();
        const value= e.target.value;
        
        console.log("value", value);

        if(value.trim().length === 0) {
            setvisibleOptions(options);
            return;
        }

        const returnedItems= [];

        visibleOptions.forEach((option, index) => {
            const foundOptions= option.values.filter(item => {
                return item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1
                ||
                item.description.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1
            });
            returnedItems[index] = {
                header:{
                    name: option.header.name,
                },
                values: foundOptions,
            };

            if(
                option.header.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1
            ){
                returnedItems[index] = {
                    header:{
                        name: option.header.name,
                    },
                    values: options[index].values,
                };
            }
        });

        setvisibleOptions(returnedItems);
    };
    
    return (
        <>
            <html>
            <body>

            <div class="sidenav">
                    <img src ={AppIcon}height = "100" width= "100"/>
                    <button href="#home"><img src ={homeIcon} height = "40" width= "40"/></button> 
                    <button href="#search"><img src ={searchIcon} height = "40" width= "40"/></button>
                    <button href = "#setting"
                                onClick={() => {
                                    navigate("/settings")
                                }}
                            >
                                <img src ={settingIcon} height = "40" width= "40"/>
                    </button>
                   <footer class="main">
                   
                   </footer>
                        
                </div>

                <div class="main">
                <h1>Settings</h1>
            
            <button
                onClick={() => {
                    navigate("/main");
                } }
            >
                ◀ Back
            </button>

            <input
                type="text"
                onChange={onChange}
                placeholder="Search..." />

            {visibleOptions.map((option) => (
                    <div key={option.header.name}>
                        <h3>{option.header.name}</h3>

                        <div>{option.values.map((value) => (
                            <div key={value.name}>
                                <ul>
                                    <li>
                                        <h6><button>{value.name}</button></h6>
                                        <p>{value.description}</p>
                                    </li>
                                </ul>
                            </div>
                        ))}

                        </div>
                    </div>))}
                </div>

            </body>
        </html>
        </>
    );
}

export default Settings;