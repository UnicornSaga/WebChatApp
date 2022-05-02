import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../Assets/house.png";
import settingIcon from "../../Assets/setting.png";
import searchIcon from "../../Assets/search.png";
import AppIcon from "../../Assets/AppIcon.png";
import logoutIcon from "../../Assets/logout.png";
import { Navigate } from "react-router-dom";
import "./mainpage.scss";


const Sidebar = ( { logout } ) => {

    return (
        <html>
            <body>

                <div class="sidenav">
                    <img src ={AppIcon}height = "100" width= "100"/>
                    <button href="#home"><img src ={homeIcon} height = "40" width= "40"/></button> 
                    <button href="#search"><img src ={searchIcon} height = "40" width= "40"/></button>
                    <button href = "#setting"
                                onClick={() => {
                                    return <Navigate to="/setting" />
                                }}
                            >
                                <img src ={settingIcon} height = "40" width= "40"/>
                    </button>

                   <footer>
                        <button
                                onClick={() => logout({
                                    returnTo: window.location.origin,
                                })}
                            >
                            <img src ={logoutIcon} height = "40" width= "40"/>
                        </button>
                   </footer>
                        
                </div>
            </body>
        </html>

    );
}

export default Sidebar;
