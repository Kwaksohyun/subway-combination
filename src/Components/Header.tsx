import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: #fff;
    width: 100%;
    min-width: 800px;
    height: 171px;
    overflow: hidden;
    position: absolute;     // body를 기준으로 위치
    z-index: 20;
    transition: all 0.3s ease;
    > div {
        max-width: 775px;
        margin: 0 auto;
    }
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 170px;
        background-color: #e5e5e5;
        width: 100%;
        height: 1px;
    }
    &.open {
        height: 292px;
        overflow: inherit;
        transition: all 0.2s ease;
    }
`;

const Logo = styled.h1`
    margin: 30px auto;
    max-width: 200px;
    a {
        margin: 0 auto;
    }
    img {
        width: 200px;
        height: 40px;
    }
`;

const NavLink = styled(Link)`
    font-weight: 700;
    font-size: 18px;
    margin: 25px 0px;
`;

const Nav = styled.nav`
    width: 100%;
    text-align: center;
    > ul {
        display: flex;
    }
    > ul > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 155px;
        cursor: pointer;
        position: relative;
    }
    > ul > li:hover ${NavLink} {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
`;

const Dropdown = styled(motion.div)`
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 68px;
    opacity: 0;
    transform: translateY(-15px);
    transition: all 0.2s ease;    // property-name | duration | timing-funtion
    &.open {
        opacity: 1;
        transform: translateY(0px);
        transition: all 0.2s ease;
    }
    > ul {
        padding: 15px 0;
    }   
    > ul > li {
        padding: 15px 0;
    }
    > ul > li > a:hover,
    > ul > li > a:focus {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
`;

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const mouseEvent = (event: React.MouseEvent<HTMLElement>, bool:boolean) => {
        setIsOpen(bool);
    };
    return (
        <HeaderContainer className={isOpen ? "open" : ""}>
            <div>
                <Logo>
                    <Link to={"/"}><img src="https://www.subway.co.kr/images/common/logo_w.png" alt="logo" /></Link>
                </Logo>
                <Nav onMouseLeave={(event) => mouseEvent(event, false)}>
                    <ul>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"#none"}>메뉴소개</NavLink>
                            <Dropdown className={isOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/menuList/sandwich"}>샌드위치</Link></li>
                                    <li><Link to={"/menuList/unit"}>랩ㆍ기타</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/utilizationSubway"}>이용방법</NavLink>
                            <Dropdown className={isOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/utilizationSubway"}>써브웨이 이용방법</Link></li>
                                    <li><Link to={"/freshInfo"}>신선한 재료 소개</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/myRecipeList"}>꿀조합</NavLink>
                            <Dropdown className={isOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/myRecipeList"}>나만의 꿀조합 레시피</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/"}>써브웨이</NavLink>
                            <Dropdown className={isOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/subwayHistory"}>써브웨이 역사</Link></li>
                                    <li><Link to={"/storeSearch"}>매장 찾기</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/"}>온라인 주문</NavLink>
                        </li>
                    </ul>
                </Nav>
            </div>
        </HeaderContainer>
    );
}
export default Header;