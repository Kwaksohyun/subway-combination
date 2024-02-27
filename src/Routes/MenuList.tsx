import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "../data.json";
import { useState } from "react";

const Container = styled.div`
`;

const SubHeader = styled.nav`
    margin: 0 auto;
    height: 60px;
    /* text-align: center; */
    > ul {
        overflow: hidden;
        display: flex;
    }
`;

const MenuListWrap = styled.div`
    background-color: #f2f2f2;
`;

const VisualWrap = styled.div`
    height: 380px;
    background-color: #e85a1c;
    color: #fff;
    text-align: center;
    position: relative;
    > h2 {
        font-weight: 800;
        font-size: 65px;
        position: relative;
        z-index: 5;
        padding: 123px 0 23px 0;
    }
    > p {
        line-height: normal;
        position: relative;
        z-index: 5;
    }
    > div {
        background: url("../images/menu/img_visual_sandwich.jpg") 50% 0 no-repeat;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 380px;
    }
`;

const ProductTab = styled.div`
    max-width: 1170px;
    min-width: 585px;
    height: 80px;
    margin: 0 auto;
    margin-bottom: 40px;
    background-color: #fff;
    position: relative;
    z-index: 2;
    bottom: 40px;
    > ul {
        display: flex;
        justify-content: center;
    }
`;

const Tab = styled.li`
    position: relative;
    margin: 0px 20px;
    font-weight: 500;
    color: #666666;
    cursor: pointer;
    height: 80px;
    line-height: 80px;
    &:not(:last-child)::after {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 15px;
        right: -20px;
        bottom: 33px;
    }
    &.active {
        color: ${(props) => props.theme.green.lighter};
    }
`;

const ProductListWrap = styled.div`
    width: 1170px;
    margin: 0 auto;
    ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
    }
`;

const MenuItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 370px;
    height: 330px;
    background-color: #fff;
`;

const Img = styled.img`
    width: 280px;
    height: 200px;
`;


const Title = styled.strong`
    font-size: 22px;
    font-weight: 700;
    margin: 5px 0px;
`;

const EngTitle = styled.span`
    color: #666666;
    margin: 5px 0px 15px 0px;
`;

const Calorie = styled.span`
    font-size: 18px;
    font-weight: 800;
    color: ${(props) => props.theme.yellow.lighter};
`;

function MenuList() {
    const sandwichTab = [
        { index: 0, name: "All" },
        { index: 1, name: "클래식" },
        { index: 2, name: "프레쉬&라이트" },
        { index: 3, name: "프리미엄" },
        { index: 4, name: "추가 선택" },
    ];
    // 선택된 탭의 인덱스
    const [activeTab, setActiveTab] = useState(0);
    const showActiveTabMenu = (tabIndex:number) => {
        setActiveTab(tabIndex);
    }
    return (
        <>
            <Container>
                {/* 메뉴소개 페이지 내부 탐색 메뉴 */}
                <SubHeader>
                    <div>
                        <ul>
                            <li><Link to={"/menuList/sandwich"}>샌드위치</Link></li>
                            <li><Link to={"/menuList/unit"}>랩ㆍ기타</Link></li>
                        </ul>
                    </div>
                </SubHeader>

                <MenuListWrap>
                    {/* 상품 visual */}
                    <VisualWrap>
                        <h2>Sandwich</h2>
                        <p>전세계 넘버원 브랜드 Subway!<br />50년 전통의 세계 최고의 샌드위치를 맛보세요!</p>
                        <div></div>
                    </VisualWrap>
                    {/* 상품별 정렬 tab */}
                    <ProductTab>
                        <ul>
                            {sandwichTab.map((tab, idx) => (
                                <Tab onClick={() => showActiveTabMenu(idx)} className={activeTab===tab.index ? "active" : ""} key={idx}>
                                    {tab.name}
                                </Tab>
                            ))}
                        </ul>
                    </ProductTab>
                    {/* 상품목록 */}
                    <ProductListWrap>
                        <ul>
                            {data.menuList.map(sandwichInfo => (
                                <MenuItem key={sandwichInfo.id}>
                                    <Img alt={sandwichInfo["eng_title"]+"_img"} src={`${process.env.PUBLIC_URL}/${sandwichInfo.img}`} />
                                    <Title>{sandwichInfo.title}</Title>
                                    <EngTitle>{sandwichInfo.eng_title}</EngTitle>
                                    <Calorie>{sandwichInfo.calorie}</Calorie>
                                </MenuItem>
                            ))}
                        </ul>
                    </ProductListWrap>
                </MenuListWrap>
            </Container>
        </>
    );
}

export default MenuList;