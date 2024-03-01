import styled from "styled-components";
import data from "../../data.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SubwayMenuContainer = styled.div`
    background-color: #fff;
    height: 560px;
    padding-top: 50px;
`;

const SubwayMenuHeader = styled.div`
    display: flex;
    align-items: center;
    width: 1170px;
    margin: 0 auto;
    padding-bottom: 30px;
    position: relative;
    > h2 {
        font-size: 32px;
        font-weight: 800;
        background: url("../images/main/bul_tit.png") 0 12px no-repeat;
        min-height: 60px;
        padding: 30px 0px 10px 30px;
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
    cursor: pointer;
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

const MenuSlideContainer = styled.div`
    position: relative;
`;

const MenuSlideWrap = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const MenuListWrap = styled.ul`
    display: flex;
    width: 100%;
    overflow: hidden;
    > li {
        margin: 0 25px;
    }
`;

const MenuItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    strong {
        font-size: 18px;
        font-weight: 700;
    }
`;

const SandwichImg = styled.img`
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

const SlideDirectionBtnWrap = styled.div`
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

const Slide = {
    invisible: (back:boolean) => (
        { x: back ? -200 : 200, opacity: 0 }
    ),
    visible: { x: 0, opacity: 1 },
    exit: (back:boolean) => (
        { x: back ? 200 : -200, opacity: 0 }
    )
}

const offset = 4;
function SubwayMenu() {
    const allCategoryArr = data?.sandwichList.map(i => i.category);
    const categoryArr = allCategoryArr.filter((i, idx) => allCategoryArr.indexOf(i) === idx);
    // 선택된 탭의 인덱스
    const [activeTab, setActiveTab] = useState(0);
    // 메뉴 페이지 인덱스
    const [pageIndex, setPageIndex] = useState(0);
    // back 상태 -> prev, next 방향 알기 위해
    const [back, setBack] = useState(false);
    const maxIndex = Math.ceil(data.sandwichList.filter(i => i.category === categoryArr[activeTab]).length / offset) - 1;
    const showActiveTabMenu = (tabIndex:number) => {
        setActiveTab(tabIndex);
        setPageIndex(0);
    }
    const movePrevSlide = () => {
        setBack(true);
        setPageIndex((prev) => prev===0 ? 0 : prev - 1);
    };
    const moveNextSlide = () => {
        setBack(false);
        setPageIndex((prev) => prev===maxIndex ? maxIndex : prev + 1);
    };
    return (
        <>
            <SubwayMenuContainer>
                <SubwayMenuHeader>
                    <h2>Subway's Menu</h2>
                    <Tabs>
                        <TabList>
                            {categoryArr.map((category:string, index:number) => (
                                <TabItem onClick={() => showActiveTabMenu(index)} className={activeTab===index ? "active" : ""} key={index}>{category}</TabItem>
                            ))}
                        </TabList>
                    </Tabs>
                </SubwayMenuHeader>

                <MenuSlideContainer>
                    <MenuSlideWrap>
                        <AnimatePresence custom={back} mode="wait">
                            <MenuListWrap key={pageIndex}>
                                {data.sandwichList.filter(i => i.category === categoryArr[activeTab])
                                    .slice(offset*pageIndex, offset*pageIndex + offset)
                                    .map((item) => (
                                    <motion.li key={item.id} custom={back} variants={Slide} initial="invisible" animate="visible" exit="exit" transition={{type: "tween"}}>
                                        <Link to={"/"}>
                                            <MenuItemInfo>
                                                <SandwichImg alt={item["eng_title"]+"_img"} src={`${process.env.PUBLIC_URL}/${item.img}`} />
                                                <strong>{item.title}</strong>
                                                <Summary>{item.summary.split(' \n ').map(i => <>{i}<br/></>)}</Summary>
                                            </MenuItemInfo>
                                        </Link>
                                    </motion.li>
                                ))}
                            </MenuListWrap>
                        </AnimatePresence>
                    </MenuSlideWrap>
                    <SlideDirectionBtnWrap>
                        <PrevBtn onClick={movePrevSlide} viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/>
                        </PrevBtn>
                        <NextBtn onClick={moveNextSlide} viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/>
                        </NextBtn>
                    </SlideDirectionBtnWrap>
                </MenuSlideContainer>
            </SubwayMenuContainer>
        </>
    );
}
export default SubwayMenu;