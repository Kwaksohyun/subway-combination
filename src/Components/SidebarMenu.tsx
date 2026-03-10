import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUserInfo from "../hooks/useUserInfo";

const SidebarMenuContainer = styled.div`
    background-color: #fff;
    width: 310px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    opacity: 0;
    box-shadow: -5px 5px 5px -5px rgba(0,0,0,0.12);
    transform: translateX(100%);
    transition: transform 0.4s ease-in-out;
    z-index: 19;
    &.sidebaropen {
        opacity: 1;
        transform: translateX(0);
        transition: transform 0.4s ease-in-out;
        
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Utility = styled.div`
    width: 310px;
    height: 100px;
    padding-left: 35px;
    display: flex;
    align-items: center;
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
    z-index: 19;
    // 화면 768px 이하
    @media (max-width: 768px) {
        opacity: 1;
    }
`;

const UtilityItem = styled.li`
    position: relative;
    &:not(:first-child) {
        margin: 0 15px;
        margin-bottom: -17px;
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
    padding: 0 25px;
`;

const GNBWrap = styled.nav`
    width: 100%;
    padding: 10px;
    text-align: center;
    word-break: keep-all;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background-color: #e5e5e5;
        width: 100%;
        height: 1px;
    }
    > ul {
        display: flex;
        flex-direction: column;
    }
    > ul > li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 155px;
        cursor: pointer;
        position: relative;
        margin: 5px 0;
    }
    > ul > li:hover ${NavLink} {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
`;

const Dropdown = styled(motion.div)`
    width: 100%;
    height: 500px;
    position: absolute;
    top: 0;
    opacity: 0;
    transform: translateX(60%);
    transition: all 0.2s ease;    // property-name | duration | timing-funtion
    &.open {
        opacity: 1;
        transform: translateX(85%);
        transition: all 0.2s ease;
    }
    > ul {
        padding: 15px 0;
    }
    > ul > li {
        padding: 10px 0;
        text-align: start;
    }
    > ul > li > a:hover,
    > ul > li > a:focus {
        color: ${(props) => props.theme.green.lighter};
        transition-duration: 0.2s;
    }
`;

interface IMenuInfoProps {
    isLoggedIn: boolean;
    isSidebarOpen: boolean;
    isDropdownOpen: boolean;
    mouseEvent: (event: React.MouseEvent<HTMLElement>, bool: boolean) => void;
    signOut: () => Promise<void>;
}

function SidebarMenu({isLoggedIn, isSidebarOpen, isDropdownOpen, mouseEvent, signOut}: IMenuInfoProps) {
    const { userInfoData } = useUserInfo();
    return(
        <SidebarMenuContainer className={isSidebarOpen ? "sidebaropen" : ""}>
            <div>
                <Utility>
                    {isLoggedIn ? (
                        <>
                            <SidebarUserIcon src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="profileImg" />
                            <ul>
                                <UtilityItem><Username $isLoggedIn={isLoggedIn}>{userInfoData?.username}</Username></UtilityItem>
                                <UtilityItem><Logout onClick={signOut}>로그아웃</Logout></UtilityItem>
                                <UtilityItem><Link to={"/myPage"}>내 정보</Link></UtilityItem>
                            </ul>
                        </>
                    ) : (
                        <>
                            <SidebarUserIcon src={`${process.env.PUBLIC_URL}/images/main/subway_logo_emblem.jpg`} alt="로고 이미지" />
                            <ul>
                                <UtilityItem><Username $isLoggedIn={isLoggedIn}>로그인이 필요합니다</Username></UtilityItem>
                                <UtilityItem><Link to={"/login"}>로그인</Link></UtilityItem>
                                <UtilityItem><Link to={"/join"}>회원가입</Link></UtilityItem>
                            </ul>
                        </>
                    )}
                </Utility>
                <GNBWrap onMouseLeave={(event) => mouseEvent(event, false)}>
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
            </div>
        </SidebarMenuContainer>
    );
}
export default SidebarMenu;