import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../Assets/house.png";
import settingIcon from "../../Assets/setting.png";
import searchIcon from "../../Assets/search.png";
import AppIcon from "../../Assets/AppIcon.png";
import logoutIcon from "../../Assets/logout.png";
import messTitle from "../../Assets/mess.png";
import { Navigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import "./sidebar.scss";


const Sidebar = ( { children, logout } ) => {

    return (
        <Container fluid className="p-0">
            <div className="p-0 h-100 layoutContainer">
                <Row>
                    <Col xs={1} className="sidebarWrapper m-3">
                        <div className="sidebarItem">
                            <img src ={AppIcon} height = "100" width= "100"/>
                            <Button href="#home" className="bg-transparent border-0 m-3"><img src ={homeIcon} height = "40" width= "40"/></Button> 
                            <Button href="#search" className="bg-transparent border-0 m-3"><img src ={searchIcon} height = "40" width= "40"/></Button>
                            <Button 
                                className="bg-transparent border-0 m-3"
                                href = "#setting"
                                onClick={() => {
                                    return <Navigate to="/setting" />
                                }}
                            >
                                        <img src ={settingIcon} height = "40" width= "40"/>
                            </Button>
                            <Button
                                className="bg-transparent border-0 m-3"
                                onClick={() => logout({
                                    returnTo: window.location.origin,
                                })}
                            >
                                <img src ={logoutIcon} height = "40" width= "40" />
                            </Button>
                        </div>
                    </Col>

                    {children}
                </Row>
            </div>
        </Container>

    );
}

export default Sidebar;
