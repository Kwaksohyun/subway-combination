import styled from "styled-components";

const VisualWrap = styled.div`
    width: 100%;
    height: 380px;
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
        line-height: 1.5;
        position: relative;
        z-index: 5;
    }
    > div {
        background-repeat: no-repeat;
        background-position: 50%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 380px;
    }
`;

interface IProductVisualProps {
    visualCategory: string;
    description: string;
    visualImgSrc: string;
    color: string;
}

function ProductVisual({visualCategory, description, visualImgSrc, color}:IProductVisualProps) {
    return (
        <VisualWrap style={{backgroundColor: `${color}`}}>
            <h2>{visualCategory}</h2>
            <p>{description.split("\n").map(i => <>{i}<br/></>)}</p>
            <div style={{backgroundImage: `url(${visualImgSrc})`}} ></div>
        </VisualWrap>
    );
}
export default ProductVisual;