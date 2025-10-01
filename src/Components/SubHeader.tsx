import { useEffect, useState } from "react";
import { Link, PathMatch } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.h1`
    opacity: 0;
    height: 25px;
    img{
        width: 150px;
        height: 100%;
        object-fit: cover;
    }
`;

const TopBtn = styled.button`
    border: 0;
    background-color: transparent;
    position: relative;
    color: #bbbbbb;
    font-size: 15px;
    font-weight: 700;
    top: 4px;
    opacity: 0;
    cursor: pointer;
    svg {
        position: absolute;
        left: 7px;
        bottom: 10px;
        fill: #bbbbbb;
        width: 28px;
        height: 28px;
    }
`;

const SubHeaderContainer = styled.nav<{$isBackImg: boolean}>`
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
        background-color: ${(props) => props.$isBackImg ? "#fff" : "#e5e5e5"};
        opacity: ${(props) => props.$isBackImg ? 0.1 : 1};
    }
`;

const SubHeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 60px;
    max-width: 1160px;
    min-width: 650px;
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

const LNBItem = styled.li<{$isactive: boolean, $isBackImg: boolean}>`
    position: relative;
    margin: 0 25px;
    font-weight: 500;
    > a {
        line-height: 60px;
    }
    &.isBackgroundImg {
        color: ${(props) => props.$isactive ? props.theme.yellow.darker: "#fff"};
    }
    &.NoBackgroundImg {
        color: ${(props) => props.$isactive ? props.theme.green.darker: props.theme.grey.darker};
    }
    &:not(:first-child)::before {
        content: '';
        position: absolute;
        background-color: #dddddd;
        opacity: 0.3;
        width: 4px;
        height: 4px;
        border-radius: 30px;
        left: -26px;
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
            background-color: ${(props) => props.$isBackImg ? props.theme.yellow.darker : props.theme.green.darker};
            opacity: 1;
            z-index: 5;
        }
    }
    &.fixed {
        color: ${(props) => (!props.$isactive) ? props.theme.grey.darker : props.$isBackImg ? props.theme.yellow.darker : props.theme.green.darker};
        &:not(:first-child)::before {
            opacity: 1;
        }
    }
`;

interface ImenuInfo {
    index: number;
    menuName: string;
    menuPath: string;
    menuMatch: PathMatch<string>|null;
};

interface IsubMenuProps {
    subMenuInfo: ImenuInfo[];
    isBackgroundImg: boolean;
    pathIncludesStr?: string|undefined;
};

function SubHeader(props:IsubMenuProps) {
    // sub-header를 fixed할지 말지 정하는 setter
    const [fixedNav, setFixedNav] = useState(false);

    // TOP 버튼 누르면 상단으로 이동
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    // 스크롤했을 때 특정 위치에서 상단 고정
    useEffect(() => {
        const handleFixedNav = () => {
            if(window.scrollY > 159) {
                setFixedNav(true);
            } else {
                setFixedNav(false);
            }
        }
        // window에서 scroll 감지
        window.addEventListener("scroll", handleFixedNav);
        // 이벤트 등록 제거 -> 이벤트리스너를 제거하여 컴포넌트가 리렌더링될 때마다 계속해서 handler가 추가되지 않도록 처리 (clean up)
        return () => {
            window.removeEventListener("scroll", handleFixedNav);
        };
    }, []);
    return (
        <SubHeaderContainer className={fixedNav ? "fixed" : ""} $isBackImg={props.isBackgroundImg}>
            <SubHeaderWrap>
                <Logo>
                    <Link to={"/"}><img src={`${process.env.PUBLIC_URL}/images/main/subway_logo.webp`} alt="logo" /></Link>
                </Logo>
                <LNBWrap>
                    <ul>
                        {props.subMenuInfo.map((menuItem)  => (
                            <LNBItem key={menuItem.index} 
                                $isactive={(menuItem.menuMatch !== null) || (menuItem.menuPath.includes(props.pathIncludesStr ?? " "))} 
                                $isBackImg={props.isBackgroundImg}
                                className={`${props.isBackgroundImg ? "isBackgroundImg" : "NoBackgroundImg"} ${((menuItem.menuMatch !== null) || (menuItem.menuPath.includes(props.pathIncludesStr ?? " "))) ? "active" : ""} ${fixedNav ? "fixed" : ""}`}>
                                <Link to={menuItem.menuPath}>{menuItem.menuName}</Link>
                            </LNBItem>
                        ))}
                    </ul>
                </LNBWrap>
                <TopBtn onClick={scrollToTop} type="button">
                    TOP
                    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24">
                        <path d="M19.061,13.439,14.475,8.854a3.583,3.583,0,0,0-4.95,0L4.939,13.439a1.5,1.5,0,0,0,2.122,2.122l4.586-4.586a.5.5,0,0,1,.707,0l4.585,4.586a1.5,1.5,0,0,0,2.122-2.122Z"/>
                    </svg>
                </TopBtn>
            </SubHeaderWrap>
        </SubHeaderContainer>
    );
}

export default SubHeader;