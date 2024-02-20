import styled from "styled-components";
import data from "../../data.json";
import { Link } from "react-router-dom";
import { useState } from "react";

const SubwayMenuWrap = styled.div`
    background-color: #fff;
    height: 560px;
    padding-top: 50px;
`;

const SubwayMenuHeader = styled.div`
    display: flex;
    align-items: center;
    width: 1170px;
    margin: 0 auto;
    position: relative;
    > h2 {
        font-size: 32px;
        font-weight: 700;
        background: url("../images/main/bul_tit.png") 0 12px no-repeat;
        min-height: 60px;
        padding: 30px 0px 10px 20px;
    }
`;

const Tabs = styled.div`
    position: absolute;
    right: 0;
`;

const TabList = styled.ul`
    display: flex;
`;

const TabItem = styled.li`
    position: relative;
    margin-left: 40px;
    font-weight: 500;
    color: #666666;
    &.active {
        color: ${(props) => props.theme.green.lighter};
    }

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 15px;
        right: -20px;
    }
`;

const MenuSliderWrap = styled.div`
    position: relative;
`;

const MenuListWrap = styled.div`
    width: 1200px;
    margin: 0 auto;
    > ul {
        display: flex;
        width: 100%;
    }
    > ul > li {
        margin: 0 10px;
    }
`;

const MenuItemWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    strong {
        font-size: 18px;
        font-weight: 700;
    }
`;

const Img = styled.img`
    width: 280px;
    height: 200px;
`;

const Summary = styled.p`
    line-height: normal;
    word-break: keep-all;
    font-size: 13px;
    text-align: center;
    width: 230px;
    margin-top: 15px;
    color: ${(props) => props.theme.grey.darker};
`;

const DirectionBtnWrap = styled.div`
    display: flex;
    svg {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        padding: 5px;
        position: absolute;
        top: 100px;
        overflow: hidden;
        fill: ${(props) => props.theme.grey.darker};
    }
    svg:hover {
        fill: black;
        background-color: ${(props) => props.theme.yellow.lighter};
    }
`;

const PrevBtn = styled.svg`
    left: 50px;
`;

const NextBtn = styled.svg`
    right: 50px;
`;

function SubwayMenu() {
    const allCategoryArr = data.menuList.map(i => i.category);
    const categoryArr = allCategoryArr.filter((i, idx) => allCategoryArr.indexOf(i) === idx);
    // 선택된 탭의 인덱스
    const [activeTab, setActiveTab] = useState(0);
    return (
        <>
            <SubwayMenuWrap>
                <SubwayMenuHeader>
                    <h2>Subway's Menu</h2>
                    <Tabs>
                        <TabList>
                            {categoryArr.map((category, index) => (
                                <TabItem onClick={() => setActiveTab(index)} className={activeTab===index ? "active" : ""} key={index}>{category}</TabItem>
                            ))}
                        </TabList>
                    </Tabs>
                </SubwayMenuHeader>

                <MenuSliderWrap>
                    <MenuListWrap>
                        <ul>
                            {data.menuList.filter(i => i.category===categoryArr[activeTab]).map((item) => (
                                <li key={item.id}>
                                    <Link to={"/"}>
                                        <MenuItemWrap>
                                            <Img alt="menu_img" src={`${process.env.PUBLIC_URL}/${item.img}`} />
                                            <strong>{item.title}</strong>
                                            <Summary>{item.summary.split(' \n ').map(i => <>{i}<br/></>)}</Summary>
                                        </MenuItemWrap>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </MenuListWrap>
                    <DirectionBtnWrap>
                        <PrevBtn viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/>
                        </PrevBtn>
                        <NextBtn viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/>
                        </NextBtn>
                    </DirectionBtnWrap>
                </MenuSliderWrap>
            </SubwayMenuWrap>
        </>
    );
}
export default SubwayMenu;