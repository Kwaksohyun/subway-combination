import styled from "styled-components";
import data from "../data.json";
import ProductVisual from "../Components/MenuComponent/ProductVisual";
import { AnimatePresence } from "framer-motion";
import ProductItem from "../Components/MenuComponent/ProductItem";
import { useState } from "react";

const MenuListWrap = styled.div`
    background-color: #f2f2f2;
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

function FreshIngredients() {
    const freshInfoTab = [
        { index: 0, name: "All", dataList: data.freshInfo },
        { index: 1, name: "빵", dataList: data.freshInfo.filter(i => i.category === "빵") },
        { index: 2, name: "야채", dataList: data.freshInfo.filter(i => i.category === "야채") },
        { index: 3, name: "치즈", dataList: data.freshInfo.filter(i => i.category === "치즈") },
        { index: 4, name: "소스", dataList: data.freshInfo.filter(i => i.category === "소스") }
    ];
    // 선택된 탭의 인덱스
    const [activeTab, setActiveTab] = useState<number>(0);
    const showActiveTabMenu = (tabIndex:number) => {
        setActiveTab(tabIndex);
    }
    return (
        <MenuListWrap>
            {/* 상품 visual */}
            <ProductVisual visualCategory="Fresh Ingredients"
                            description={`매장에서 직접 굽는 빵, 엄격하게 세척하는 야채의 신선함,\n써브웨이만의 다양한 소스를 맛보세요.`} 
                            visualImgSrc={""} color="#07a5e6" />
            {/* 상품별 정렬 tab */}
            <ProductTab>
                <ul>
                    {freshInfoTab.map((tab, idx) => (
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
                        {freshInfoTab[activeTab].dataList.map((freshInfo) => (
                            <ProductItem key={`${freshInfoTab[activeTab].name}_${freshInfo.id}`} isMenu={false} activeTab={freshInfoTab[activeTab].name} id={freshInfo.id} 
                            img={freshInfo.img} title={freshInfo.title} engTitle={freshInfo.eng_title} calorie={freshInfo.calorie} summary={freshInfo.summary} />  
                        ))}
                    </AnimatePresence>
                </ul>
            </ProductListWrap>
        </MenuListWrap>
    );
}

export default FreshIngredients;