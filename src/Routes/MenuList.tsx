import { useEffect, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
`;

const Logo = styled.h1`
    opacity: 0;
    img{
        width: 110px;
        height: 25px;
    }
`;

const TopBtn = styled.div`
    opacity: 0;
    a {
        position: relative;
        color: #bbbbbb;
        font-size: 15px;
        font-weight: 700;
        top: 4px;
        svg {
            position: absolute;
            left: 0;
            bottom: 10px;
            fill: #bbbbbb;
            width: 28px;
            height: 28px;
        }
    }
`;

const SubHeaderContainer = styled.nav`
    position: absolute;
    background-color: transparent;
    z-index: 10;
    width: 100%;
    &.fixed {
        position: fixed;
        top: 0;
        background-color: #fff;
        ${Logo}, ${TopBtn} {
            opacity: 1;
        }
    }
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        background-color: #fff;
        opacity: 0.1;
    }
`;

const SubHeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 60px;
    max-width: 1160px;
    min-width: 680px;
    padding: 0 10px;
    > ul {
        overflow: hidden;
        display: flex;
    }
`;

const LNBWrap = styled.div`
    > ul {
        display: flex;
        justify-content: center;
    }
`;

const LNBItem = styled.li<{isactive: boolean}>`
    position: relative;
    margin: 0 25px;
    color: ${(props) => props.isactive ?  props.theme.yellow.darker: "#fff"};
    font-weight: 500;
    > a {
        line-height: 60px;
    }
    &:not(:last-child)::after {
        content: '';
        position: absolute;
        background-color: #dddddd;
        opacity: 0.2;
        width: 4px;
        height: 4px;
        border-radius: 30px;
        right: -25px;
        bottom: 28px;
    }
    &.active {
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 4px;
            bottom: 0;
            left: 0;
            background-color: ${(props) => props.theme.yellow.darker};
            opacity: 1;
        }
    }
    &.fixed {
        color: ${(props) => props.isactive ?  props.theme.yellow.darker: "#999999"};
        &:not(:last-child)::after {
            opacity: 1;
        }
    }
`;

function MenuList() {
    const sandwichMatch = useMatch("/menuList/sandwich");
    const unitMatch = useMatch("/menuList/unit");
    // window 스크롤 값
    const [scrollY, setScrollY] = useState(0);
    // sub-header를 fixed할지 말지 정하는 setter
    const [fixedNav, setFixedNav] = useState(false);
    const handleScroll = () => {
        if(scrollY > 159) {
            setScrollY(window.pageYOffset);
            setFixedNav(true);
        } else {
            setScrollY(window.pageYOffset);
            setFixedNav(false);
        }
    }
    useEffect(() => {
        // window에서 scroll 감지
        window.addEventListener("scroll", handleScroll);
        // window에서 scroll 감시 종료 -> 이벤트리스너를 삭제해 줘야 scroll 시, 여러 번 렌더되지 않는다.
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    });
    return (
        <>
            <Container>
                {/* 메뉴소개 페이지 내부 탐색 메뉴 */}
                <SubHeaderContainer className={fixedNav ? "fixed" : ""}>
                    <SubHeaderWrap>
                        <Logo>
                            <Link to={"/"}><img src="https://www.subway.co.kr/images/common/logo_w.png" alt="logo" /></Link>
                        </Logo>
                        <LNBWrap>
                            <ul>
                                <LNBItem isactive={sandwichMatch !== null} 
                                        className={`${sandwichMatch!==null ? "active" : ""} ${fixedNav ? "fixed" : ""}`}>
                                    <Link to={"/menuList/sandwich"}>샌드위치</Link>
                                </LNBItem>
                                <LNBItem isactive={unitMatch !== null} 
                                        className={`${unitMatch!==null ? "active" : ""} ${fixedNav ? "fixed" : ""}`}>
                                    <Link to={"/menuList/unit"}>랩ㆍ기타</Link>
                                </LNBItem>
                            </ul>
                        </LNBWrap>
                        <TopBtn>
                            <Link to={"#none"}>
                                TOP
                                <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24">
                                    <path d="M19.061,13.439,14.475,8.854a3.583,3.583,0,0,0-4.95,0L4.939,13.439a1.5,1.5,0,0,0,2.122,2.122l4.586-4.586a.5.5,0,0,1,.707,0l4.585,4.586a1.5,1.5,0,0,0,2.122-2.122Z"/>
                                </svg>
                            </Link>
                        </TopBtn>
                    </SubHeaderWrap>
                </SubHeaderContainer>

                <Outlet />
            </Container>
        </>
    );
}

export default MenuList;