import styled from "styled-components";
import data from "../data.json";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductItem from "../Components/MenuComponent/ProductItem";

const MenuListWrap = styled.div`
    background-color: #f2f2f2;
`;

const VisualWrap = styled.div`
    height: 380px;
    background-color: #85c441;
    color: #fff;
    text-align: center;
    overflow: hidden;
    position: relative;
    > h2 {
        font-weight: 800;
        font-size: 65px;
        position: relative;
        z-index: 5;
        padding: 123px 0 23px 0;
    }
    > p {
        line-height: 1.5;
        position: relative;
        z-index: 5;
    }
    .img1 {
        position: absolute;
        left: 50%;
        margin-left: 320px;
        bottom: 0;
        background: url("../images/menu/img_visual_wrap01.jpg") no-repeat;
        width: 400px;
        height: 300px;
    }
    .img2 {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -800px;
        background: url("../images/menu/img_visual_wrap02.jpg") no-repeat;
        width: 590px;
        height: 280px;
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
    padding-bottom: 120px;
    ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
    }
`;

function Wrap() {
    const unitTab = [
        { index: 0, name: "All", dataList: data.unitList },
        { index: 1, name: "시그니처 랩", dataList: data.unitList.filter(i => i.category === "시그니처 랩") },
        { index: 2, name: "미니 랩", dataList: data.unitList.filter(i => i.category === "미니 랩") }
    ];
    // 선택된 탭의 인덱스
    const [activeTab, setActiveTab] = useState<number>(0);
    const showActiveTabMenu = (tabIndex:number) => {
        setActiveTab(tabIndex);
    }
    return (
        <MenuListWrap>
            {/* 상품 visual */}
            <VisualWrap>
                <h2>Wrap</h2>
                <p>
                    Subway를 더 맛있고 간편하게 즐기는 방법<br/>최상의 레시피로 만들어진 써브웨이 랩 시리즈, 이젠 고민하지 마세요!<br/>
                    * 그릴드 랩은 일부 매장에서만 제공 가능합니다.<br/>
                    * 그릴드 랩을 제공하는 매장에서는 시그니처랩을 제공하지 않습니다.매장찾기의 매장정보를 확인해주세요.
                </p>
                <div className="img1"></div>
                <div className="img2"></div>
            </VisualWrap>
            {/* 상품별 정렬 tab */}
            <ProductTab>
                <ul>
                    {unitTab.map((tab, idx) => (
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
                        {unitTab[activeTab].dataList.map((unitInfo) => (
                            <ProductItem key={`${unitTab[activeTab].name}_${unitInfo.id}`} isMenu={true} activeTab={unitTab[activeTab].name} id={unitInfo.id} 
                            img={unitInfo.img} title={unitInfo.title} engTitle={unitInfo.eng_title} calorie={unitInfo.calorie} summary={unitInfo.summary} />  
                        ))}
                    </AnimatePresence>
                </ul>
            </ProductListWrap>
        </MenuListWrap>
    );
}

export default Wrap;