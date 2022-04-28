import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


export default function sidebar( props ) {

    return (
        <html>
            {/* <body>

                <div class="sidenav">
                    <a href="#home">Home</a>
                    <a href="#search">Search</a>
                    <a href="#settings">Setting</a>
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

            </body> */}
        </html>

    );
}
