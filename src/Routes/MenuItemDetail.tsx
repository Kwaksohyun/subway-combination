import { useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import data from "../data.json";
import ListViewButton from "../Components/ListViewButton";
import SubHeader from "../Components/SubHeader";
import { Fragment } from "react";

const ProductInfoWrap = styled.div`
    padding-top: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProductCategory = styled.span`
    color: ${(props) => props.theme.green.lighter};
    font-size: 18px;
    font-weight: 700;
`;

const Title = styled.strong`
    font-size: 50px;
    white-space: nowrap;    // 자동 줄바꿈 무시
    margin: 20px 0 15px 0;
`;

const TextRowWrap = styled.div`
    font-size: 17px;
    display: flex;
`;

const EngTitle = styled.span`
    color: ${(props) => props.theme.grey.darker};
`;

const Calorie = styled.span`
    position: relative;
    padding-left: 40px;
    &::before {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 14px;
        top: 2px;
        left: 20px;
    }
`;

const Img = styled.img``;

const Summary = styled.p`
    text-align: center;
    color: ${(props) => props.theme.grey.darker};
    line-height: 1.5;
    font-weight: 500;
`;

function MenuItemDetail() {
    const subMenuInfo = [
        { index: 0, menuName: "샌드위치", menuPath: "/menuList/sandwich", menuMatch: useMatch("/menuList/sandwich") },
        { index: 1, menuName: "랩ㆍ기타", menuPath: "/menuList/unit", menuMatch: useMatch("/menuList/unit") }
    ];
    const { menuCategory } = useParams();
    const location = useLocation();
    const productData = menuCategory === "sandwich" ? data.sandwichList.find(i => `${i.id}` === location.state.productId) : data.unitList.find(i => `${i.id}` === location.state.productId);
    return (
        <div style={{paddingTop: "170px"}}>
            {/* 메뉴소개 페이지 내부 탐색 메뉴 */}
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false} pathIncludesStr={menuCategory} />

            <ProductInfoWrap>
                <ProductCategory>{productData?.category}</ProductCategory>
                <Title>{productData?.title}</Title>
                <TextRowWrap>
                    <EngTitle>{productData?.eng_title}</EngTitle>
                    <Calorie>{productData?.calorie}</Calorie>
                </TextRowWrap>
                <Img src={`${process.env.PUBLIC_URL}/${productData?.img}`} alt={`img_${productData?.eng_title}`} />
                <Summary>{productData?.summary.split(' \n ').map((i, index) => <Fragment key={index}>{i}<br/></Fragment>)}</Summary>
            </ProductInfoWrap>

            <ListViewButton linkPath={`/menuList/${menuCategory}`} />
        </div>
        
    )
}

export default MenuItemDetail;