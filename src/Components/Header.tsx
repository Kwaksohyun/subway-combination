import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useSetRecoilState } from "recoil";
import { sessionState } from "../atoms";

const HeaderContainer = styled.header`
    background-color: #fff;
    width: 100%;
    min-width: 800px;
    height: 171px;
    overflow: hidden;
    position: absolute;     // body를 기준으로 위치
    z-index: 20;
    transition: all 0.3s ease;
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

const HeaderWrap = styled.div`
    max-width: 775px;
    margin: 0 auto;
    position: relative;
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

const Utility = styled.div`
    position: absolute;
    top: 10px;
    right: -130px;
    > ul {
        display: flex;
        align-items: center;
    }
`;

const UtilityItem = styled.li`
    position: relative;
    margin: 0 15px;
    > a {
        font-size: 14px;
        color: #666666;
    }
    &:not(:first-child)::before {
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
`;

const Username = styled.span`
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
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
`;

const GNBWrap = styled.nav`
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
    const [user, setUser] = useState<null|string>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const setSessionState = useSetRecoilState(sessionState);
    const navigate = useNavigate();
    const mouseEvent = (event: React.MouseEvent<HTMLElement>, bool:boolean) => {
        setIsOpen(bool);
    };
    // 로그아웃
    const signOut = async() => {
        const { error } = await supabase.auth.signOut();
        if(error) {
            console.log(error);
        } else {
            setUser(null);
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
                setUser(session?.user.user_metadata.username);
                setIsLoggedIn(true);
                setSessionState(session);
            } else if(event === 'SIGNED_OUT') {
                setUser(null);
                setIsLoggedIn(false);
                setSessionState(null);
            }
        });
        // 컴포넌트가 언마운트될 때 리스너 제거
        return () => {
            subscription.unsubscribe();
        };
    }, [setSessionState])
    return (
        <HeaderContainer className={isOpen ? "open" : ""}>
            <HeaderWrap>
                <Logo>
                    <Link to={"/"}><img src="https://www.subway.co.kr/images/common/logo_w.png" alt="logo" /></Link>
                </Logo>
                <Utility>
                    {isLoggedIn ? (
                        <ul>
                            <UtilityItem>
                                <div>
                                    <Username>{user}</Username>
                                    <Logout onClick={signOut}>로그아웃</Logout>
                                </div>
                            </UtilityItem>
                            <UtilityItem><Link to={"/"}>내 정보</Link></UtilityItem>
                        </ul>
                    ) : (
                        <ul>
                            <UtilityItem><Link to={"/login"}>로그인</Link></UtilityItem>
                            <UtilityItem><Link to={"/join"}>회원가입</Link></UtilityItem>
                        </ul>
                    )}
                </Utility>
                <GNBWrap onMouseLeave={(event) => mouseEvent(event, false)}>
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
                </GNBWrap>
            </HeaderWrap>
        </HeaderContainer>
    );
}
export default Header;