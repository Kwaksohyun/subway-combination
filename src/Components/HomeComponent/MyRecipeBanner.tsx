import { Link } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
    background-color: ${(props) => props.theme.yellow.darker};
    height: 500px;
    width: 100%;
    min-width: 800px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    > div {
        width: 1200px;
        min-width: 900px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }
`;

const ContentWrap = styled.div`
    height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    > header {
        width: 530px;
        word-spacing: 2px;
    }
`;

const Title = styled.h2`
    color: ${(props) => props.theme.green.darker};
    font-size: 65px;
    font-weight: 800;
    margin-bottom: 20px;
`;

const Description = styled.p`
    color: #6D590D;
    line-height: normal;
    font-weight: 500;
`;

const Button = styled.div`
    background-color: ${(props) => props.theme.green.darker};
    color: #fff;
    width: 125px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`;

const RecipeContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    > strong {
        background-color: #fff;
        color: ${(props) => props.theme.yellow.darkest};
        font-weight: 700;
        font-size: 17px;
        width: 250px;
        height: 37px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: -20px;
        position: relative;
        right: 60px;
        top: 0px;
    }
`;

const RecipeList = styled.ul`
    position: relative;
    height: 400px;
    > li {
        position: relative;
    }
`;

const SandwichWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    > span {
        color: ${(props) => props.theme.brown.darker};
        font-weight: 700;
        font-size: 18px;
        position: absolute;
        top: 30px;
    }
`;

const SandwichImg = styled.img`
    width: 355px;
    height: 250px;
`;

const RecipeSauceWrap = styled.div`
    position: absolute;
    bottom: -10px;
    right: 50px;
    > ul {
        display: flex;
        position: relative;
        margin-bottom: 20px;
    }
`;

const SauceItem = styled.li`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -5px;
    > span {
        text-align: center;
        color: ${(props) => props.theme.brown.darker};
        font-size: 14px;
        font-weight: 700;
        position: relative;
        top: -14px;
    }
`;

const SauceImg = styled.img`
    width: 120px;
    height: 85px;
`;

// const ArrowIcon = styled.svg`
//     position: absolute;
//     bottom: 26px;
//     right: 290px;
// `;

function MyRecipeBanner() {
    return (
        <MainContainer>
            <div>
                <ContentWrap>
                    <header>
                        <Title>나만의<br />써브웨이 꿀조합은?</Title>
                        <Description>
                            내가 즐겨먹는 나만의 꿀조합 레시피를 공유해주세요!<br/>
                            메뉴 선택이 어렵다면, 다양한 추천 꿀조합으로 더욱 맛있게 즐겨보세요!
                        </Description>
                    </header>
                    <Button>
                        <Link to={"/myRecipeList"}>자세히보기</Link>
                    </Button>
                </ContentWrap>

                <RecipeContainer>
                    <strong>베스트셀러 메뉴의 추천 꿀조합</strong>
                    <RecipeList>
                        <li>
                            <SandwichWrap>
                                <span>이탈리안 B.M.T.™</span>
                                <SandwichImg src={`${process.env.PUBLIC_URL}/images/menu/sandwich/Italian_B.M.T.png`} alt="이탈리안 B.M.T.™" />
                            </SandwichWrap>
                            <RecipeSauceWrap>
                                <ul>
                                    <SauceItem style={{right: "140px"}}>
                                        <SauceImg src={`${process.env.PUBLIC_URL}/images/ingredients/img_recipe_s01.png`} alt=""/>
                                        <span>랜치</span>
                                    </SauceItem>
                                    <SauceItem style={{right: "65px"}}>
                                        <SauceImg src={`${process.env.PUBLIC_URL}/images/ingredients/img_recipe_s02.png`} alt=""/>
                                        <span>스위트 어니언</span>
                                    </SauceItem>
                                    <SauceItem style={{right: "-10px"}}>
                                        <SauceImg src={`${process.env.PUBLIC_URL}/images/ingredients/img_recipe_s06.png`} alt=""/>
                                        <span>핫 칠리</span>
                                    </SauceItem>
                                </ul>
                            </RecipeSauceWrap>
                        </li>
                        <li style={{bottom: "60px", right: "160px"}}>
                            <SandwichWrap>
                                <span>에그마요</span>
                                <SandwichImg src={`${process.env.PUBLIC_URL}/images/menu/sandwich/Egg-Mayo.png`} alt="에그마요" />
                            </SandwichWrap>
                        <RecipeSauceWrap>
                            <ul>
                                <SauceItem style={{right: "125px"}}>
                                    <SauceImg src={`${process.env.PUBLIC_URL}/images/ingredients/img_recipe_s01.png`} alt=""/>
                                    <span>랜치</span>
                                </SauceItem>
                                <SauceItem style={{right: "50px"}}>
                                    <SauceImg src={`${process.env.PUBLIC_URL}/images/ingredients/img_recipe_s04.png`} alt=""/>
                                    <span>스위트 칠리</span>
                                </SauceItem>
                            </ul>
                        </RecipeSauceWrap>
                        </li>
                    </RecipeList>
                    
                    {/* <div>
                        <ArrowIcon viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="48px" width="48px">
                            <rect fill="none" height="25" width="25"/>
                            <polyline fill="none" points="176 104 224 152 176 200" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
                            <path d="M32,56a96,96,0,0,0,96,96h96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
                        </ArrowIcon>
                        <svg width="48px" height="48px" id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M76.144,282.827c-4.46,0-8.141-3.526-8.311-8.003c-0.024-0.562,0.008-1.105,0.097-1.634l-28.022-0.162   c-4.306-0.024-7.88-3.331-8.239-7.621c-0.365-4.289,2.601-8.141,6.841-8.889l48.569-8.563c0.593-0.114,1.236-0.162,1.78-0.122   l1.431,0.057l-14.357-34.522c-1.145-2.77-0.722-5.947,1.122-8.312c1.844-2.364,4.77-3.534,7.791-3.111l312.574,46.473l69.645-3.843   c4.737-0.414,8.515,3.25,8.766,7.848c0.26,4.583-3.258,8.507-7.839,8.759l-14.479,0.804c0.105,0.448,0.179,0.918,0.212,1.39   c0.276,3.893-2.185,7.45-5.924,8.564l-18.962,5.646c-0.887,0.26-1.796,0.422-2.705,0.341l-40.437-1.609l-309.373,6.509   C76.258,282.827,76.201,282.827,76.144,282.827z M108.609,248.63l165.647,6.597l40.681-2.25l-217.986-32.41L108.609,248.63z" />
                                <path d="M326.182,349.539c-2.853,0-5.622-1.472-7.174-4.087c-2.283-3.868-1.081-8.849,2.705-11.253l121.261-76.989   c-73.529-33.555-122.098-55.483-129.702-58.555c-1.569-0.357-3.056-1.17-4.193-2.298c-0.925-0.919-1.607-2.024-2.015-3.218   c-1.512-2.332-7.944-11.902-13.722-20.353c-2.129-3.112-1.902-7.271,0.569-10.131c2.452-2.86,6.547-3.689,9.935-2.048l169.14,82.23   c2.714,1.316,4.494,4.005,4.664,7.011c0.099,1.609-0.284,3.177-1.039,4.534c2.234,1.462,3.647,3.932,3.746,6.653   c0.112,3.145-1.554,6.086-4.314,7.597L330.17,348.516C328.902,349.214,327.53,349.539,326.182,349.539z" />
                                <path d="M301.563,352.228c-2.998,0-5.891-1.616-7.377-4.453c-2.137-4.07-0.56-9.1,3.502-11.235l154.295-80.93   l-148.16-69.449c-4.16-1.95-5.949-6.906-3.999-11.066c1.95-4.152,6.874-5.956,11.065-3.998l163.339,76.559   c2.861,1.341,4.713,4.185,4.786,7.345c0.065,3.161-1.656,6.085-4.453,7.556l-169.14,88.721   C304.188,351.919,302.863,352.228,301.563,352.228z"/>
                            </g>
                        </svg>
                        <p>다양한 꿀조합 레시피로<br />즐겨보세요!</p>
                    </div> */}
                </RecipeContainer>
            </div>
        </MainContainer>
    )
}
export default MyRecipeBanner;