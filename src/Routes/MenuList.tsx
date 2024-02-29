import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
`;

const SubHeader = styled.nav`
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

const Logo = styled.h1`
    img{
        width: 110px;
        height: 25px;
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
    color: ${(props) => props.isactive ?  props.theme.yellow.darker: "#999999"};
    font-weight: 500;
    &:not(:last-child)::after {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 4px;
        height: 4px;
        border-radius: 30px;
        right: -25px;
        top: 6px;
    }
`;

const TopBtn = styled.div`
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

function MenuList() {
    const sandwichMatch = useMatch("/menuList/sandwich");
    const unitMatch = useMatch("/menuList/unit");

    return (
        <>
            <Container>
                {/* 메뉴소개 페이지 내부 탐색 메뉴 */}
                <SubHeader>
                    <Logo>
                        <Link to={"/"}><img src="https://www.subway.co.kr/images/common/logo_w.png" alt="logo" /></Link>
                    </Logo>
                    <LNBWrap>
                        <ul>
                            <LNBItem isactive={sandwichMatch !== null}>
                                <Link to={"/menuList/sandwich"}>샌드위치</Link>
                            </LNBItem>
                            <LNBItem isactive={unitMatch !== null}>
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
                </SubHeader>

                <Outlet />
            </Container>
        </>
    );
}

export default MenuList;