import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
    width: 100%;
    position: relative;
    z-index: 15;
    > div {
        min-width: 750px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    margin: 20px 0px;
`;

const Nav = styled.nav`
    width: 100%;
    text-align: center;
    position: relative;
    > ul {
        display: flex;
        width: 750px;
        margin: 0 auto;
    }
    > ul > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150px;
    }
    > ul > li:hover ${NavLink} {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
    &::after {
        content: '';
        position: absolute;
        left: 0;
        background-color: #e5e5e5;
        width: 100%;
        height: 1px;
    }
`;

const Dropdown = styled(motion.div)`
    position: absolute;
    width: 150px;
    > ul {
        padding: 15px 0px;
    }
    > ul > li {
        padding: 10px 0px;
    }
`;

const navVariants = {
    initial: { y: 20, opacity: 0 },
    visible: { y: 60, opacity: 1, transition: { delay: 0.1 } },
    exit: { y: 20, opacity: 0 }
}

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const mouseEvent = (event: React.MouseEvent<HTMLElement>, bool:boolean) => {
        setIsOpen(bool);
    };
    return (
        <HeaderContainer>
            <div>
                <Logo>
                    <Link to={"/"}><img src="https://www.subway.co.kr/images/common/logo_w.png" alt="logo" /></Link>
                </Logo>
                <AnimatePresence>
                    <Nav onMouseLeave={(event) => mouseEvent(event, false)}>
                        <ul>
                            <li onMouseEnter={(event) => mouseEvent(event, true)}>
                                <NavLink to={"#none"}>메뉴소개</NavLink>
                                {isOpen ? (
                                    <Dropdown variants={navVariants} initial="initial" animate="visible" exit="exit" className={isOpen ? "show" : ""}>
                                        <ul>
                                            <li><Link to={"/menuList/sandwich"}>샌드위치</Link></li>
                                            <li><Link to={"/menuList/unit"}>랩ㆍ기타</Link></li>
                                        </ul>
                                    </Dropdown>
                                ) : null}
                                
                            </li>
                            <li onMouseEnter={(event) => mouseEvent(event, true)}>
                                <NavLink to={"/utilizationSubway"}>이용방법</NavLink>
                                {isOpen ? (
                                    <Dropdown variants={navVariants} initial="initial" animate="visible" exit="exit" className={isOpen ? "show" : ""}>
                                        <ul>
                                            <li><Link to={"/utilizationSubway"}>써브웨이 이용방법</Link></li>
                                            <li><Link to={"/freshInfo"}>신선한 재료 소개</Link></li>
                                        </ul>
                                    </Dropdown>
                                ) : null}
                            </li>
                            <li onMouseEnter={(event) => mouseEvent(event, true)}>
                                <NavLink to={"/myRecipeList"}>꿀조합</NavLink>
                                {isOpen ? (
                                    <Dropdown variants={navVariants} initial="initial" animate="visible" exit="exit" className={isOpen ? "show" : ""}>
                                        <ul>
                                            <li><Link to={"/myRecipeList"}>나만의 꿀조합 레시피</Link></li>
                                        </ul>
                                    </Dropdown>
                                ) : null}
                            </li>
                            <li onMouseEnter={(event) => mouseEvent(event, true)}>
                                <NavLink to={"/"}>써브웨이</NavLink>
                                {isOpen ? (
                                    <Dropdown variants={navVariants} initial="initial" animate="visible" exit="exit" className={isOpen ? "show" : ""}>
                                        <ul>
                                            <li><Link to={"/subwayHistory"}>써브웨이 역사</Link></li>
                                            <li><Link to={"/storeSearch"}>매장 찾기</Link></li>
                                        </ul>
                                    </Dropdown>
                                ) : null}
                            </li>
                            <li onMouseEnter={(event) => mouseEvent(event, true)}>
                                <NavLink to={"/"}>온라인 주문</NavLink>
                            </li>
                        </ul>
                    </Nav>
                </AnimatePresence>
            </div>
        </HeaderContainer>
    );
}
export default Header;