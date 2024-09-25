import { useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import ListViewButton from "../Components/ListViewButton";
import SubHeader from "../Components/SubHeader";
import supabase from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";

const RecipeViewContainer = styled.section`
    margin: 140px 0 80px 0;
`;

const Loading = styled.h2`
    text-align: center;
`;

const RecipeHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 95px;
    justify-content: space-between;
`;

const RecipeMenuWrap = styled.div`
    > span {
        position: relative;
        &:not(:last-child) {
            margin-right: 17px;
        }
    }
    > span:not(:last-child)::after {
        content: 'ㆍ';
        position: absolute;
    }
`;

const RecipeTitle = styled.h3`
    font-size: 30px;
    font-weight: 500;  
`;

const RecipeTextRowWrap = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.grey.darker};
    > span {
        position: relative;
        margin-left: 25px;
    }
    > span::before {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 14px;
        top: 2px;
        left: -11px;
    }
`;

const ReviewScoreWrap = styled.div`
    display: flex;
    align-items: center;
`;

const StarIcon = styled.svg`
    fill: ${(props) => props.theme.yellow.darker};
    margin-right: 2px;
`;

const RecipeInfoWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 70px;
    // 화면 800px 이하
    @media (max-width: 900px) {
        flex-wrap: wrap;
        margin-top: 0;
    }
`;

const RecipeImg = styled.img`
    max-width: 100%;
    max-height: 100vh;
    width: auto;
    height: auto;
    object-fit: contain;
`;

const RecipeDetailWrap = styled.ul`
    border: 5px solid ${(props) => props.theme.grey.lighter};
    border-radius: 50px;
    height: 350px;
    width: 430px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 25px;
    position: relative;
    > strong {
        background-color: ${(props) => props.theme.yellow.darker};
        color: #fff;
        font-weight: 700;
        width: 200px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: -25px;
        right: 110px;
    }
`;

const StepItem = styled.li`
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 35px;
    }
`;

const StepName = styled.strong`
    color: ${(props) => props.theme.grey.darker};
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;    // 자동 줄바꿈 무시
    width: 70px;
`;

const StepContent = styled.p`
    word-spacing: 3px;
    font-weight: 500;
    width: 300px;
    word-break: keep-all;
    line-height: 1.3;
`;

const RecipeReviewWrap = styled.section`
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    border-top: 3px solid #dddddd;
    padding: 0 30px;
    > h3 {
        font-size: 23px;
        font-weight: 700;
        padding: 30px 0 20px 0;
    }
`;

const ReviewItem = styled.li`
    padding: 20px 0 30px 0;
    &:not(:last-child) {
        border-bottom: 2px solid #dddddd;
    }
`;

const ReviewerContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImg = styled.img`
    width: 45px;
    height: 45px;
    margin-right: 13px;
`;

const ReviewerInfoWrap = styled.div`
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ReviewerInfoRowWrap = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.grey.darker};
    width: 135px;
    justify-content: space-between;
    font-size: 14px;
    > span {
        position: relative;
    }
    > span::before {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 14px;
        top: 1px;
        left: -13px;
    }
`;

const ReviewText = styled.p`
    padding: 13px 0 0 10px;
    font-size: 15px;
`;

function MyRecipeDetail() {
    const subMenuInfo = [
        { index: 0, menuName: "나만의 꿀조합 레시피", menuPath: "/myRecipeList", menuMatch: useMatch("/myRecipeList") }
    ];
    const location = useLocation();
    // query string에서 recipeItemIdx 추출 (location.search 예시 : "?recipeItemIdx=1")
    const recipeItemIdx = location.search.slice(15);
    
    // 레시피 상세 데이터 불러오는 함수
    const fetchRecipeDetailData = async () => {
        const { data: recipeData, error: recipeError } = await supabase.from('recipes').select().eq('id', recipeItemIdx).single();
        if(recipeError) {
            console.log(recipeError.message);
            return null;
        }
        return recipeData;
    };

    // ※ isLoading : 캐시된 데이터가 없고 쿼리 시도가 아직 완료되지 않은 경우 
    const { data: recipeDetailData, isLoading } = useQuery({
        queryKey: ['recipeDetail'], 
        queryFn: fetchRecipeDetailData,
        enabled: !!recipeItemIdx    //  recipeItemIdx가 있을 때만 쿼리 요청
    });
    return (
        <div style={{paddingTop: "170px"}}>
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false}  pathIncludesStr="myRecipe" />
                <RecipeViewContainer>
                    {isLoading ? <Loading>Loading...</Loading> : (
                        <>
                            <RecipeHeader>
                                <RecipeMenuWrap>
                                    <span>샌드위치</span>
                                    <span>{recipeDetailData?.sandwich}</span>
                                    <span>{location.state.calorie}</span>
                                </RecipeMenuWrap>
                                <RecipeTitle>{recipeDetailData?.title}</RecipeTitle>
                                <RecipeTextRowWrap>
                                    <ReviewScoreWrap>
                                        <StarIcon width="18" height="18" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g id="info"/>
                                            <g id="icons">
                                                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" id="favorite"/>
                                            </g>
                                        </StarIcon>
                                        <span>4.6 (10)</span>
                                    </ReviewScoreWrap>
                                    <span>{recipeDetailData?.user_email_id}</span>
                                    <span>{recipeDetailData?.created_at.split("T")[0]}</span>
                                </RecipeTextRowWrap>
                            </RecipeHeader>

                            {/* 레시피 */}
                            <RecipeInfoWrap>
                                <RecipeImg src={`${process.env.PUBLIC_URL}${location.state.imgSrc}`} alt={`img_${recipeDetailData?.sandwich}`} />
                                <RecipeDetailWrap>
                                    <strong>나만의 꿀조합 레시피</strong>
                                    <StepItem>
                                        <StepName>빵</StepName>
                                        <StepContent>{recipeDetailData?.bread} / {recipeDetailData?.toasting}</StepContent>
                                    </StepItem>
                                    <StepItem>
                                        <StepName>치즈</StepName>
                                        <StepContent>{recipeDetailData?.cheese}</StepContent>
                                    </StepItem>
                                    <StepItem>
                                        <StepName>토핑</StepName>
                                        <StepContent>{recipeDetailData?.topping.join(", ")}</StepContent>
                                    </StepItem>
                                    <StepItem>
                                        <StepName>야채</StepName>
                                        <StepContent>{recipeDetailData?.vegetable.join(", ")}</StepContent>
                                    </StepItem>
                                    <StepItem>
                                        <StepName>소스</StepName>
                                        <StepContent>{recipeDetailData?.sauce.join(", ")}</StepContent>
                                    </StepItem>
                                </RecipeDetailWrap>
                            </RecipeInfoWrap>
                        </>
                    )}
                </RecipeViewContainer>

            {/* 레시피 리뷰 */}
            <RecipeReviewWrap>
                <h3>레시피 리뷰</h3>
                <ul>
                    <ReviewItem>
                        <ReviewerContainer>
                            <ProfileImg src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="img_user-profile" />
                            <ReviewerInfoWrap>
                                <span>reviewer1</span>
                                <ReviewerInfoRowWrap>
                                    <ReviewScoreWrap>
                                        <StarIcon width="16" height="16" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g id="info"/>
                                            <g id="icons">
                                                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" id="favorite"/>
                                            </g>
                                        </StarIcon>
                                        <span>5.0</span>
                                    </ReviewScoreWrap>
                                    <span>2024-04-06</span>
                                </ReviewerInfoRowWrap>
                            </ReviewerInfoWrap>
                        </ReviewerContainer>
                        <ReviewText>이제 이 레시피로만 먹어요..♥</ReviewText>
                    </ReviewItem>
                    <ReviewItem>
                        <ReviewerContainer>
                            <ProfileImg src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="img_user-profile" />
                            <ReviewerInfoWrap>
                                <span>reviewer2</span>
                                <ReviewerInfoRowWrap>
                                    <ReviewScoreWrap>
                                        <StarIcon width="16" height="16" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <g id="info"/>
                                            <g id="icons">
                                                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" id="favorite"/>
                                            </g>
                                        </StarIcon>
                                        <span>5.0</span>
                                    </ReviewScoreWrap>
                                    <span>2024-04-07</span>
                                </ReviewerInfoRowWrap>
                            </ReviewerInfoWrap>
                        </ReviewerContainer>
                        <ReviewText>안 먹어본 사람은 있어도 한 번만 먹은 사람은 없을 듯</ReviewText>
                    </ReviewItem>
                </ul>
            </RecipeReviewWrap>

            <ListViewButton linkPath="/myRecipeList" />
        </div>
    )
}

export default MyRecipeDetail;