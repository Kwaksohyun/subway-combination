import { Link, useMatch } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { recipeState } from "../atoms";
import data from "../data.json";

const PageHeaderContainer = styled.article`
    align-items: center;
    margin: 140px 0 80px 0;
`;

const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const PageHeaderTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 20px;
`;

const PageText = styled.span`
    color: ${(props) => props.theme.grey.darker};
`;

const MyRecipeContentWrap = styled.div`
    
`;

const MakeMyRecipeBox = styled.aside`
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 4px solid ${(props) => props.theme.yellow.darker};
    border-radius: 25px;
    width: 930px;
    padding: 20px 30px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    > img {
        width: 250px;
        height: 80px;
    }
`;

const MakeMyRecipeContent = styled.div`
    > h3 {
        color: ${(props) => props.theme.green.lighter};
        font-size: 25px;
        font-weight: 700;
        padding-bottom: 15px;
    }
`;

const ShareButton = styled.div`
    background-color: ${(props) => props.theme.green.darker};
    color: #fff;
    font-weight: 500;
    width: 125px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
`;

const RecipeListWrap = styled.div`
    width: 100%;
    background-color: #f2f2f2;
    margin-top: -60px;
    padding: 130px 0 120px 0;
    > ul {
        width: 1235px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 25px;
        // 화면 1024px 이하
        @media (max-width: 1024px) {
            width: 920px;
            grid-template-columns: repeat(3, 1fr);
        }
        // 화면 768px 이하
        @media (max-width: 768px) {
            width: 605px;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

const RecipeItem = styled.li`
    width: 290px;
    height: 360px;  
    border-radius: 30px;
    background-color: #fff;
`;

const RecipeImg = styled.img`
    width: 290px;
    height: 210px;
    background-color: ${(props) => props.theme.yellow.lighter};
    border-radius: 30px;
`;

const RecipeInfoWrap = styled.div`
    width: 290px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 20px;
`;

const RecipeTextWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecipeTitle = styled.strong`
    font-size: 17px;
    font-weight: 700;
    line-height: normal;
`;

const RecipeMenu = styled.span`
    color: #666666;
    font-size: 13px;
    margin-top: 13px;
`;

const RecipeTextRowWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const RecipeWriter = styled.span`
    color: ${(props) => props.theme.grey.darker};
    font-size: 13px;
`;

const ReviewInfoWrap = styled.div`
    display: flex;
    > span {
        color: #666666;
        font-size: 15px;
    }
`;

const StarIcon = styled.svg`
    fill: ${(props) => props.theme.yellow.darker};
    width: 16px;
    height: 16px;
`;

function MyRecipeList() {
    const subMenuInfo = [
        { index: 0, menuName: "나만의 꿀조합 레시피", menuPath: "/myRecipeList", menuMatch: useMatch("/myRecipeList") }
    ];
    const recipes = useRecoilValue(recipeState);
    const sandwichInfoObj = (sandwich:string) => {
        return data.sandwichList.find(i => i.title === sandwich);
    }
    return (
        <div style={{paddingTop: "170px"}}>
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false} />

            <PageHeaderContainer>
                <PageHeader>
                    <PageHeaderTitle>나만의 꿀조합 레시피</PageHeaderTitle>
                    <PageText>다양한 커스터마이징 꿀조합 레시피를 참고하여 더욱 맛있게 즐겨보세요.</PageText>
                </PageHeader>
            </PageHeaderContainer>

            <MyRecipeContentWrap>
                <MakeMyRecipeBox>
                    <img src={`${process.env.PUBLIC_URL}/images/img_recipe_customizing.png`} alt="img_recipe_customizing" />
                    <MakeMyRecipeContent>
                        <h3>나만의 써브웨이 꿀조합은?</h3>
                        <PageText>내가 즐겨벅는 나만의 써브웨이 꿀조합 레시피를 공유해주세요!</PageText>
                    </MakeMyRecipeContent>
                    <ShareButton>
                        <Link to={"/myRecipeList/registerMyRecipe"}>공유하기</Link>
                    </ShareButton>
                </MakeMyRecipeBox>
            
                {/* 꿀조합 레시피 목록 */}
                <RecipeListWrap>
                    <ul>
                        {recipes.map((recipe) => (
                            <RecipeItem key={recipe.id}>
                                <Link to={`/myRecipeView/recipe?recipeItemIdx=${recipe.id}`}>
                                    <RecipeImg alt={`img_${sandwichInfoObj(recipe.sandwich)?.eng_title}`} src={`${process.env.PUBLIC_URL}/${sandwichInfoObj(recipe.sandwich)?.img}`} />
                                    <RecipeInfoWrap>
                                        <RecipeTextWrap>
                                            <RecipeTitle>{recipe.title}</RecipeTitle>
                                            <RecipeMenu>샌드위치ㆍ{recipe.sandwich}</RecipeMenu>
                                        </RecipeTextWrap>
                                        <RecipeTextRowWrap>
                                            <RecipeWriter>writer</RecipeWriter>
                                            <ReviewInfoWrap>
                                                <StarIcon version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="info"/>
                                                    <g id="icons">
                                                        <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" id="favorite"/>
                                                    </g>
                                                </StarIcon>
                                                <span>4.6 (10)</span>
                                            </ReviewInfoWrap>
                                        </RecipeTextRowWrap>
                                    </RecipeInfoWrap>
                                </Link>
                            </RecipeItem>
                        ))}
                    </ul>
                </RecipeListWrap>
            </MyRecipeContentWrap>
        </div>
    )
}

export default MyRecipeList;