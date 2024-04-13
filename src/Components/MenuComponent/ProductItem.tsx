import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const ProductInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Img = styled.img`
    width: 280px;
    height: 200px;
    &.hasNotCalorie {
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

const ProductItemWrap = styled(motion.li)`
    width: 370px;
    height: 330px;
    background-color: #fff;
    position: relative;
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

const productItemVariants = {
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

interface IProductItemProps {
    isMenu: boolean;
    activeTab: string;
    id: number;
    // category: string;
    title: string;
    engTitle: string;
    img: string;
    calorie: string;
    summary: string;
}

function ProductInfo({isMenu, activeTab, img, title, engTitle, calorie, summary}:IProductItemProps) {
    return (
        <ProductInfoWrap>
            <Img className={(calorie.length === 0) ? "hasNotCalorie" : ""} alt={"img_" + engTitle} src={`${process.env.PUBLIC_URL}/${img}`} />
            <Title>{title}</Title>
            <EngTitle>{engTitle}</EngTitle>
            {(calorie.length > 0) && <Calorie>{calorie}</Calorie>}
            {(summary.length > 0) && (
                <Summary>
                    <p>{summary.split(' \n ').map(i => <>{i}<br/></>)}</p>
                </Summary>
            )}
            {(isMenu && (activeTab!=="추가 선택")) && (
                <ViewBtn version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
                </ViewBtn>
            )}
        </ProductInfoWrap>
    )
}

function ProductItem({isMenu, activeTab, id, img, title, engTitle, calorie, summary}:IProductItemProps) {
    const location = useLocation();
    const menuCategory = location.pathname.split('/menuList/')[1];
    return (
        <ProductItemWrap variants={productItemVariants} initial="invisible" animate="visible" exit="exit">
            {/* 메뉴소개 상세페이지로 이동 */}
            {(isMenu && (activeTab!=="추가 선택")) ? (
                <Link to={`/menuView/${menuCategory}?menuItemIdx=${id}`} state={{ productId: `${id}` }}>
                    <ProductInfo isMenu={isMenu} activeTab={activeTab} id={id} img={img} title={title} engTitle={engTitle} calorie={calorie} summary={summary} />
                </Link>
            ) : <ProductInfo isMenu={isMenu} activeTab={activeTab} id={id} img={img} title={title} engTitle={engTitle} calorie={calorie} summary={summary} />}
        </ProductItemWrap>
    )
};

export default ProductItem;