import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: #292929;
    color: #ffffff95;
    width: 100%;
    > div {
        padding: 40px 0;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
    // 화면 최대 768px
    @media (max-width: 768px) {
        text-align: center;
        > div {
            flex-direction: column;
        }
    }
`;

const FooterMenuWrap = styled.div`
    margin-right: 45px;
    > ul {
        display: flex;
        justify-content: space-between;
    }
    // 화면 768px 이하
    @media (max-width: 768px) {
        margin: 0;
        > ul {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

const FooterMenuItem = styled.li`
    &:not(:last-child) {
        margin-right: 45px;
    }
    // 화면 768px 이하
    @media (max-width: 768px) {
        margin: 20px 0;
        &:not(:last-child) {
            margin-right: 0px;
        }
    }
    > h3 {
        font-weight: 800;
        font-size: 18px;
        margin-bottom: 15px;
    }
    > ul > li {
        padding: 10px 0;
        font-size: 15px;
    }
    > ul > li:hover {
        color: ${(props) => props.theme.grey.lighter};
        transition-duration: 0.2s;
    }
`;

const SnsWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 45px;
    border-left: 2px solid #6666663c;
    > span {
        font-weight: 800;
        font-size: 18px;
        margin-bottom: 30px;
    }
    // 화면 768px 이하
    @media (max-width: 768px) {
        padding-left: 0;
        border-left: none;
    }
`;

const SnsIcon = styled.svg`
    fill: white;
    width: 55px;
    height: 55px;
    background-color: #525252c1;
    padding: 11px;
    border-radius: 40%;
    cursor: pointer;
    &:not(:last-child) {
        margin-right: 15px;
    }
    &:hover {
        background-color: #6b6a6ac1;
        transition-duration: 0.2s;
    }
`;

function Footer() {
    return (
        <FooterContainer>
            <div>
                <FooterMenuWrap>
                    <ul>
                        <FooterMenuItem>
                            <h3>메뉴소개</h3>
                            <ul>
                                <li><Link to={"/menuList/sandwich"}>샌드위치</Link></li>
                                <li><Link to={"/menuList/unit"}>랩ㆍ기타</Link></li>
                            </ul>
                        </FooterMenuItem>
                        <FooterMenuItem>
                            <h3>이용방법</h3>
                            <ul>
                                <li><Link to={"/utilizationSubway"}>써브웨이 이용방법</Link></li>
                                <li><Link to={"/freshInfo"}>신선한 재료 소개</Link></li>
                            </ul>
                        </FooterMenuItem>
                        <FooterMenuItem>
                            <h3>꿀조합</h3>
                            <ul>
                                <li><Link to={"/myRecipeList"}>나만의 꿀조합 레시피</Link></li>
                            </ul>
                        </FooterMenuItem>
                        <FooterMenuItem>
                            <h3>써브웨이</h3>
                            <ul>
                                <li><Link to={"/subwayHistory"}>써브웨이 역사</Link></li>
                                <li><Link to={"/storeSearch"}>매장 찾기</Link></li>
                            </ul>
                        </FooterMenuItem>
                    </ul>
                </FooterMenuWrap>

                <SnsWrap>
                    <span>SNS</span>
                    <div>
                        <SnsIcon onClick={() => window.open("https://www.instagram.com/subwaykorea/")} 
                            height="100%" version="1.1" viewBox="0 0 600 600" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1.01619,0,0,1.01619,44,43.8384)">
                                <path d="M251.921,0.159C183.503,0.159 174.924,0.449 148.054,1.675C121.24,2.899 102.927,7.157 86.902,13.385C70.336,19.823 56.287,28.437 42.282,42.442C28.277,56.447 19.663,70.496 13.225,87.062C6.997,103.086 2.739,121.399 1.515,148.213C0.289,175.083 0,183.662 0,252.08C0,320.497 0.289,329.076 1.515,355.946C2.739,382.76 6.997,401.073 13.225,417.097C19.663,433.663 28.277,447.712 42.282,461.718C56.287,475.723 70.336,484.337 86.902,490.775C102.927,497.002 121.24,501.261 148.054,502.484C174.924,503.71 183.503,504 251.921,504C320.338,504 328.917,503.71 355.787,502.484C382.601,501.261 400.914,497.002 416.938,490.775C433.504,484.337 447.553,475.723 461.559,461.718C475.564,447.712 484.178,433.663 490.616,417.097C496.843,401.073 501.102,382.76 502.325,355.946C503.551,329.076 503.841,320.497 503.841,252.08C503.841,183.662 503.551,175.083 502.325,148.213C501.102,121.399 496.843,103.086 490.616,87.062C484.178,70.496 475.564,56.447 461.559,42.442C447.553,28.437 433.504,19.823 416.938,13.385C400.914,7.157 382.601,2.899 355.787,1.675C328.917,0.449 320.338,0.159 251.921,0.159ZM251.921,45.551C319.186,45.551 327.154,45.807 353.718,47.019C378.28,48.14 391.619,52.244 400.496,55.693C412.255,60.263 420.647,65.723 429.462,74.538C438.278,83.353 443.737,91.746 448.307,103.504C451.757,112.381 455.861,125.72 456.981,150.282C458.193,176.846 458.45,184.814 458.45,252.08C458.45,319.345 458.193,327.313 456.981,353.877C455.861,378.439 451.757,391.778 448.307,400.655C443.737,412.414 438.278,420.806 429.462,429.621C420.647,438.437 412.255,443.896 400.496,448.466C391.619,451.916 378.28,456.02 353.718,457.14C327.158,458.352 319.191,458.609 251.921,458.609C184.65,458.609 176.684,458.352 150.123,457.14C125.561,456.02 112.222,451.916 103.345,448.466C91.586,443.896 83.194,438.437 74.378,429.621C65.563,420.806 60.103,412.414 55.534,400.655C52.084,391.778 47.98,378.439 46.859,353.877C45.647,327.313 45.391,319.345 45.391,252.08C45.391,184.814 45.647,176.846 46.859,150.282C47.98,125.72 52.084,112.381 55.534,103.504C60.103,91.746 65.563,83.353 74.378,74.538C83.194,65.723 91.586,60.263 103.345,55.693C112.222,52.244 125.561,48.14 150.123,47.019C176.687,45.807 184.655,45.551 251.921,45.551Z"/>
                                <path d="M251.921,336.053C205.543,336.053 167.947,298.457 167.947,252.08C167.947,205.702 205.543,168.106 251.921,168.106C298.298,168.106 335.894,205.702 335.894,252.08C335.894,298.457 298.298,336.053 251.921,336.053ZM251.921,122.715C180.474,122.715 122.556,180.633 122.556,252.08C122.556,323.526 180.474,381.444 251.921,381.444C323.367,381.444 381.285,323.526 381.285,252.08C381.285,180.633 323.367,122.715 251.921,122.715Z" />
                                <path d="M416.627,117.604C416.627,134.3 403.092,147.834 386.396,147.834C369.701,147.834 356.166,134.3 356.166,117.604C356.166,100.908 369.701,87.374 386.396,87.374C403.092,87.374 416.627,100.908 416.627,117.604Z" />
                            </g>
                        </SnsIcon>
                        <SnsIcon onClick={() => window.open("https://www.facebook.com/Subwaykr")} 
                            id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M288,192v-38.1c0-17.2,3.8-25.9,30.5-25.9H352V64h-55.9c-68.5,0-91.1,31.4-91.1,85.3V192h-45v64h45v192h83V256h56.4l7.6-64  H288z"/>
                        </SnsIcon>
                    </div>
                </SnsWrap>
                {/* <span>Copyright &copy; 2024</span> */}
            </div>
        </FooterContainer>
    );
}

export default Footer;