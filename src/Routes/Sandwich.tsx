import styled from "styled-components";
import data from "../data.json";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const MenuListWrap = styled.div`
    background-color: #f2f2f2;
`;

const VisualWrap = styled.div`
    width: 100%;
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

const Img = styled.img`
    width: 280px;
    height: 200px;
    &.topping {
        margin-top: 15px;
    }
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

const Summary = styled.div`
    line-height: normal;
    word-break: keep-all;
    text-align: center;
    color: #c3e698;
    font-size: 15px;
    width: 310px;
    opacity: 0;
    position: absolute;
    top: 150px;
`;

const ViewBtn = styled.svg`
    width: 52px;
    height: 52px;
    border-radius: 100%;
    padding: 7px;
    background-color: ${(props) => props.theme.yellow.lighter};
    fill: #fff;
    opacity: 0;
    position: absolute;
    bottom: 28px;
    transform: scale(0.7);
`;

const MenuItem = styled(motion.li)`
    width: 370px;
    height: 330px;
    background-color: #fff;
    position: relative;
    > a {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &:hover {
        background-color: ${(props) => props.theme.green.lighter};
        z-index: 5;
        ${Img}, ${Calorie} {
            opacity: 0;
        }
        ${Title} {
            color: #fff;
            position: absolute;
            top: 135px;
            transform: translateY(-80px);
            transition: transform 0.4s;
        }
        ${EngTitle} {
            color: #fff;
            position: absolute;
            top: 175px;
            transform: translateY(-80px);
            transition: transform 0.4s;
        }
        ${Summary} {
            opacity: 1;
            position: absolute;
            top: 203px;
            transform: translateY(-80px);
            transition: transform 0.4s 0.1s;    // property-name | duration | delay
        }
        ${ViewBtn} {
            opacity: 1;
            transform: scale(1);
            transition: transform 0.3s 0.1s;
        }
    }
`;

// interface ISandwichInfo {
//     id: number;
//     category: string;
//     title: string;
//     eng_title: string;
//     img: string;
//     calorie: string;
//     summary: string;
// }

const menuItemVariants = {
    invisible: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3 }
    }
}

function Sandwich() {
    const sandwichTab = [
        { index: 0, name: "All", dataList: data.sandwichList },
        { index: 1, name: "클래식", dataList: data.sandwichList.filter(i => i.category === "클래식") },
        { index: 2, name: "프레쉬&라이트", dataList: data.sandwichList.filter(i => i.category === "프레쉬&라이트") },
        { index: 3, name: "프리미엄", dataList: data.sandwichList.filter(i => i.category === "클래식") },
        { index: 4, name: "추가 선택", dataList: data.topping },
    ];
    // 선택된 탭의 인덱스
    const [activeTab, setActiveTab] = useState<number>(0);
    const showActiveTabMenu = (tabIndex:number) => {
        setActiveTab(tabIndex);
    }
    return (
        <>
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
                        <AnimatePresence mode="wait">
                            {sandwichTab[activeTab].dataList.map(sandwichInfo => (
                                <MenuItem variants={menuItemVariants} initial="invisible" animate="visible" exit="exit" 
                                    key={`${sandwichTab[activeTab].name}_${sandwichInfo.id}`}>
                                    {/* 메뉴소개 상세페이지로 이동 */}
                                    <Link to={`/menuView/sandwich/?menuItemIdx=${sandwichInfo.id}`}>
                                        <Img className={activeTab===4 ? "topping" : ""} alt={sandwichInfo["eng_title"]+"_img"} src={`${process.env.PUBLIC_URL}/${sandwichInfo.img}`} />
                                        <Title>{sandwichInfo.title}</Title>
                                        <EngTitle>{sandwichInfo.eng_title}</EngTitle>
                                        {activeTab!==4 && <Calorie>{sandwichInfo.calorie}</Calorie>}
                                        <Summary>
                                            <p>{sandwichInfo.summary.split(' \n ').map(i => <>{i}<br/></>)}</p>
                                        </Summary>
                                        {activeTab!==4 && (
                                            <ViewBtn enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
                                            </ViewBtn>
                                        )}
                                    </Link>
                                </MenuItem>
                            ))}
                        </AnimatePresence>
                    </ul>
                </ProductListWrap>
            </MenuListWrap>
        </>
    );
}

export default Sandwich;