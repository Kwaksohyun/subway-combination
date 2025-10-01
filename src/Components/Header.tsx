import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useSetRecoilState } from "recoil";
import { sessionState } from "../atoms";
import useUserInfo from "../hooks/useUserInfo";
import { ReactComponent as BarIcon } from '../assets/bar.svg';

const HeaderContainer = styled.header`
    background-color: #fff;
    width: 100%;
    height: 171px;
    overflow: hidden;
    position: absolute;     // body를 기준으로 위치
    z-index: 15;
    transition: all 0.3s ease;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        background-color: #e5e5e5;
        width: 100%;
        height: 1px;
    }
    &.open {
        height: 292px;
        overflow: inherit;
        transition: all 0.2s ease;
    }
    // 화면 768px 이하
    @media (max-width: 768px) {
        height: 100px;
        overflow: visible;
        transition: none;
        &.open {
            height: 100px;
        }
    }
`;

const HeaderWrap = styled.div`
    margin: 0 auto;
    position: relative;
    > div {
        height: 100px;
        display: flex;
        align-items: center;
    }
`;

const Logo = styled.h1`
    margin: 0 auto;
    width: 250px;
    height: 100px;
    a {
        margin: 0 auto;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Utility = styled.div`
    position: absolute;
    right: 100px;
    display: flex;
    align-items: center;
    // 화면 768px 이하
    @media (max-width: 768px) {
        width: 310px;
        height: 100px;
        right: 0;
        padding-left: 40px;
        background-color: #fff;
        opacity: 0;
        transform: translateX(100%);
        transition: transform 0.4s ease-in-out;
        box-shadow: -5px 5px 5px -5px rgba(0,0,0,0.12);
        &.sidebaropen {
            opacity: 1;
            transform: translateX(0);
            transition: transform 0.4s ease-in-out;
            position: fixed;
            z-index: 20;
        }
    }
    > ul {
        display: flex;
        align-items: center;
    }
`;

const SidebarUserIcon = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 7px;
    opacity: 0;
    z-index: 20;
    // 화면 768px 이하
    @media (max-width: 768px) {
        opacity: 1;
    }
`;

const UtilityItem = styled.li`
    position: relative;
    &:not(:first-child) {
        margin: 0 15px;
    }
    &:last-child::before {
        content: '';
        position: absolute;
        background-color: ${(props) => props.theme.grey.darker};
        opacity: 0.3;
        width: 3px;
        height: 3px;
        border-radius: 30px;
        left: -16px;
        bottom: 5px;
    }
    // 화면 768px 이하
    @media (max-width: 768px) {
        &:not(:first-child) {
            margin-bottom: -17px;
        }
    }
    > a {
        font-size: 14px;
        color: #666666;
        white-space: nowrap;
    }
`;

const Username = styled.span<{$isLoggedIn:boolean}>`
    font-size: 14px;
    font-weight: 500;
    opacity: ${(props) => props.$isLoggedIn ? 1 : 0};
    // 화면 768px 이하
    @media (max-width: 768px) {
        white-space: nowrap;
        position: absolute;
        top: -17px;
        margin-left: 15px;
        opacity: 1;
    }
`;

const Logout = styled.span`
    font-size: 14px;
    color: #666666;
    cursor: pointer;
`;

const NavLink = styled(Link)`
    font-weight: 700;
    font-size: 18px;
    margin: 25px 0px;
    // 화면 768px 이하
    @media (max-width: 768px) {
        padding: 0 25px;
    }
`;

const GNBWrap = styled.nav`
    width: 100%;
    text-align: center;
    word-break: keep-all;

    // 화면 768px 이하
    @media (max-width: 768px) {
        width: 310px;
        height: 100%;
        padding: 10px;
        background-color: #fff;
        box-shadow: -5px 5px 5px -5px rgba(0,0,0,0.12);
        position: absolute;
        right: 0;
        opacity: 0;
        transform: translateX(100%);
        transition: transform 0.4s ease-in-out;

        &.sidebaropen {
            opacity: 1;
            transform: translateX(0);
            transition: transform 0.4s ease-in-out;
            position: fixed;
            z-index: 20;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                background-color: #e5e5e5;
                width: 100%;
                height: 1px;
            }
        }
    }
    > ul {
        display: flex;
        justify-content: center;
        // 화면 768px 이하
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }
    > ul > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 155px;
        cursor: pointer;
        position: relative;
        // 화면 768px 이하
        @media (max-width: 768px) {
            align-items: flex-start;
            margin: 5px 0;
        }
    }
    > ul > li:hover ${NavLink} {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
`;

const Dropdown = styled(motion.div)`
    width: 100%;
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
    // 화면 768px 이하
    @media (max-width: 768px) {
        top: 0;
        height: 500px;
        transform: translateX(60%);

        &.open {
            transform: translateX(85%);
        }
    }
    > ul {
        padding: 15px 0;
    }
    > ul > li {
        padding: 15px 0;
        // 화면 768px 이하
        @media (max-width: 768px) {
            padding: 10px 0;
            text-align: start;
        }
    }
    > ul > li > a:hover,
    > ul > li > a:focus {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
`;

const IconBtn = styled.button`
    position: absolute;
    top: 29px;
    right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 20;
    // 화면 768px 이하
    @media (max-width: 768px) {
        display: block;

        &.sidebaropen {
            position: fixed;
        }
    }
`

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);        // nav 드롭다운
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const setSessionState = useSetRecoilState(sessionState);
    const { userInfoData } = useUserInfo();
    const navigate = useNavigate();
    const mouseEvent = (event: React.MouseEvent<HTMLElement>, bool:boolean) => {
        setIsDropdownOpen(bool);
    };
    // 로그아웃
    const signOut = async() => {
        const { error } = await supabase.auth.signOut();
        if(error) {
            console.log(error);
        } else {
            setIsLoggedIn(false);
            setSessionState(null);
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    }
    // onAuthStateChange를 통해 인증 상태 변화를 감지하여 사용자 이름과 로그인 상태를 업데이트
    useEffect(() => {
        const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
            // SIGNED_IN : 사용자 세션이 확인되거나 재설정될 때마다 발생
            // confirmed_at : 사용자의 이메일이 확인된 타임스탬프로, 로그인 성공했을 때만 속성이 포함됨(회원가입 시 포함x)
            // -> 회원가입할 때에도 SIGNED_IN event 발생
            //    로그인 성공 시에만 조건문이 실행되도록 confirmed_at 존재하는지 확인
            if (event === 'SIGNED_IN' && session?.user.confirmed_at) {
                setIsLoggedIn(true);
                setSessionState(session);
            } else if(event === 'SIGNED_OUT') {
                setIsLoggedIn(false);
                setSessionState(null);
            }
        });
        // 컴포넌트가 언마운트될 때 리스너 제거
        return () => {
            subscription.unsubscribe();
        };
    }, [setSessionState])
    useEffect(() => {
        window.addEventListener("resize", () => {
            if(window.innerWidth > 768) {
                setSidebarOpen(false);
            }
        })
    }, [])
    return (
        <HeaderContainer className={`${isDropdownOpen ? "open" : ""} ${isSidebarOpen ? "sidebaropen" : ""}`}>
            <HeaderWrap>
                <div>
                    <Logo>
                        <Link to={"/"}><img src={`${process.env.PUBLIC_URL}/images/main/subway_logo.webp`} alt="logo" /></Link>
                    </Logo>
                    <Utility className={isSidebarOpen ? "sidebaropen" : ""}>
                        {isLoggedIn ? (
                            <>
                                <SidebarUserIcon className={isSidebarOpen ? "sidebaropen" : ""} 
                                    src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="profileImg" />
                                <ul>
                                    <UtilityItem><Username $isLoggedIn={isLoggedIn}>{userInfoData?.username}</Username></UtilityItem>
                                    <UtilityItem><Logout onClick={signOut}>로그아웃</Logout></UtilityItem>
                                    <UtilityItem><Link to={"/myPage"}>내 정보</Link></UtilityItem>
                                </ul>
                            </>
                        ) : (
                            <>
                                <SidebarUserIcon className={isSidebarOpen ? "sidebaropen" : ""} 
                                    src={`${process.env.PUBLIC_URL}/images/main/subway_logo_emblem.jpg`} alt="로고 이미지" />
                                <ul>
                                    <UtilityItem><Username $isLoggedIn={isLoggedIn}>로그인이 필요합니다</Username></UtilityItem>
                                    <UtilityItem><Link to={"/login"}>로그인</Link></UtilityItem>
                                    <UtilityItem><Link to={"/join"}>회원가입</Link></UtilityItem>
                                </ul>
                            </>
                        )}
                    </Utility>
                </div>
                <GNBWrap className={isSidebarOpen ? "sidebaropen" : ""} onMouseLeave={(event) => mouseEvent(event, false)}>
                    <ul>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"#none"}>메뉴소개</NavLink>
                            <Dropdown className={isDropdownOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/menuList/sandwich"}>샌드위치</Link></li>
                                    <li><Link to={"/menuList/unit"}>랩ㆍ기타</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/utilizationSubway"}>이용방법</NavLink>
                            <Dropdown className={isDropdownOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/utilizationSubway"}>써브웨이 이용방법</Link></li>
                                    <li><Link to={"/freshInfo"}>신선한 재료 소개</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/myRecipeList"}>꿀조합</NavLink>
                            <Dropdown className={isDropdownOpen ? "open" : ""}>
                                <ul>
                                    <li><Link to={"/myRecipeList"}>나만의 꿀조합 레시피</Link></li>
                                </ul>
                            </Dropdown>
                        </li>
                        <li onMouseEnter={(event) => mouseEvent(event, true)}>
                            <NavLink to={"/"}>써브웨이</NavLink>
                            <Dropdown className={isDropdownOpen ? "open" : ""}>
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
                </GNBWrap>
            </HeaderWrap>
            {/* 햄버거 버튼 (메뉴 바) */}
            <IconBtn onClick={() => setSidebarOpen(prev => !prev)} className={isSidebarOpen ? "sidebaropen" : ""} aria-label="메뉴 버튼">
                <BarIcon width="40" height="40" />
            </IconBtn>
        </HeaderContainer>
    );
}
export default Header;