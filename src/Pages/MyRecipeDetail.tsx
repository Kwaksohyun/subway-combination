import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListViewButton from "../Components/ListViewButton";
import SubHeader from "../Components/SubHeader";
import supabase from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import CommentsSection from "../Components/CommentsSection";
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import { ReactComponent as BookMarkIcon } from '../assets/bookmark.svg';
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import { useRecipeLikes } from "../hooks/useRecipeLikes";
import data from "../data.json";

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
    height: 100px;
    max-width: 1160px;
    margin: 0 auto;
    justify-content: space-between;
    position: relative;
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
    text-align: center;
`;

const RecipeTextRowWrap = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.grey.darker};
    > span {
        position: relative;
    }
    > span:first-child {
        margin-right: 25px;
    }
    > span:first-child::after {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 14px;
        top: 2px;
        right: -12px;
    }
`;

const BtnWrap = styled.div`
    position: absolute;
    right: 5px;
`;

const IconButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 53px;
    height: 53px;
    border-radius: 30px;
    border: 1px solid #dddddd;
    background-color: #fff;
    color: ${(props) => props.theme.grey.darker};
    margin-bottom: 5px;
    cursor: pointer;
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

function MyRecipeDetail() {
    const subMenuInfo = [
        { index: 0, menuName: "나만의 꿀조합 레시피", menuPath: "/myRecipeList", menuMatch: useMatch("/myRecipeList") }
    ];
    const [isSaved, setIsSaved] = useState(false);      // 저장 여부 상태
    const session = useRecoilValue(sessionState);
    
    const { likes, likesCount, handleManageRecipeLike } = useRecipeLikes();

    const location = useLocation();
    const navigate = useNavigate();
    // query string에서 recipeItemIdx 추출 (location.search 예시 : "?recipeItemIdx=1")
    const recipeItemIdx = location.search.slice(15);

    const sandwichInfoObj = (sandwich:string) => {
        return data.sandwichList.find(i => i.title === sandwich);
    };

    // 레시피 상세 데이터 불러오는 함수
    const fetchRecipeDetailData = async () => {
        const { data: recipeData, error: recipeError } = await supabase
            .from('recipes')
            .select()
            .eq('id', recipeItemIdx).single();
        if(recipeError) {
            console.log(recipeError.message);
            return null;
        }
        return recipeData;
    };

    // ※ isLoading : 캐시된 데이터가 없고 쿼리 시도가 아직 완료되지 않은 경우 
    const { data: recipeDetailData, isLoading: recipeDetalLoading } = useQuery({
        queryKey: ['recipeDetail', recipeItemIdx],  // 각 레시피의 데이터를 별도의 캐시로 관리
        queryFn: fetchRecipeDetailData,
        enabled: !!recipeItemIdx,                   //  recipeItemIdx가 있을 때만 쿼리 요청
    });

    // 로그인 확인 함수
    const checkLoginState = () => {
        if(!session?.user.confirmed_at) {
            if(window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                navigate("/login", { state: "MyRecipeDetail" });
            }
            return false;   // 로그인하지 않은 경우 false 반환
        } 
        return true;    // 로그인한 경우 true 반환
    };

    // 레시피 저장
    const savedRecipe = async () => {
        // 로그인 확인
            // 로그인하지 않은 경우 -> 함수 실행 중단
            // 로그인한 경우 -> 아래 로직 실행
        if(!checkLoginState()) return;

        // recipe_id와 user_id의 조합으로 UNIQUE 제약 조건에 따라 UPSERT
        const { error: recipeSaveError } = await supabase
            .from('saved_recipes')
            .upsert({
                recipe_id: recipeItemIdx,
                user_id: session?.user?.id,
                is_saved: !isSaved,
            }, { onConflict: 'recipe_id, user_id' });       
        if(recipeSaveError) {
            console.log("레시피 저장 실패: ", recipeSaveError.message);
        } else {
            setIsSaved((prevIsSaved) => !prevIsSaved);
        }
    }

    useEffect(() => {
        // 페이지 로드될 때 사용자의 해당 레시피 저장 상태를 가져오는 함수
        const fetchSavedRecipesData = async () => {
            const { data: savedRecipesData, error: savedRecipesFetchError } = await supabase
                .from('saved_recipes')
                .select()
                .eq('user_id', session?.user?.id)
                .eq('recipe_id', recipeItemIdx);

            if(savedRecipesFetchError) {
                console.log("저장된 데이터가 없습니다.: ", savedRecipesFetchError.message);
            } else {
                // 데이터가 있다면 isSaved 상태 업데이트
                setIsSaved(savedRecipesData.length>0 && savedRecipesData[0].is_saved);  
            }
        };
        // 사용자가 로그인 한 경우에만 실행
        if(session?.user?.id) {
            fetchSavedRecipesData();
        }
    }, [session?.user?.id, recipeItemIdx]);
    return (
        <div style={{paddingTop: "170px"}}>
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false} pathIncludesStr="myRecipe" />
                <RecipeViewContainer>
                    {recipeDetalLoading ? <Loading>Loading...</Loading> : (
                        <>
                            <RecipeHeader>
                                <RecipeMenuWrap>
                                    <span>샌드위치</span>
                                    <span>{recipeDetailData?.sandwich}</span>
                                    <span>{sandwichInfoObj(recipeDetailData?.sandwich)?.calorie}</span>
                                </RecipeMenuWrap>
                                <RecipeTitle>{recipeDetailData?.title}</RecipeTitle>
                                <RecipeTextRowWrap>
                                    <span>{recipeDetailData?.user_email_id}</span>
                                    <span>{recipeDetailData?.created_at.split("T")[0]}</span>
                                </RecipeTextRowWrap>
                                <BtnWrap>
                                    <IconButton type="button" value={recipeItemIdx} onClick={() => handleManageRecipeLike(+recipeItemIdx)}>
                                        <HeartIcon fill={likes[+recipeItemIdx] ? "#ff3232" : "none"} 
                                            stroke={likes[+recipeItemIdx] ? "#ff3232" : "#999999"}
                                            width="30" height="30" strokeWidth="1.2" />
                                        <span>{likesCount[+recipeItemIdx] || 0}</span>
                                    </IconButton>
                                    <IconButton type="button" onClick={savedRecipe}>
                                        <BookMarkIcon fill={isSaved ? "#ffce32" : "none"} 
                                            stroke={isSaved ? "#ffce32" : "#999999"}
                                            width="30" height="30" strokeWidth="1.2" />
                                    </IconButton>
                                </BtnWrap>
                            </RecipeHeader>

                            {/* 레시피 */}
                            <RecipeInfoWrap>
                                <RecipeImg src={`${process.env.PUBLIC_URL}/${sandwichInfoObj(recipeDetailData?.sandwich)?.img}`} alt={`img_${recipeDetailData?.sandwich}`} />
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

            {/* 댓글 */}
            <CommentsSection />

            <ListViewButton linkPath="/myRecipeList" />
        </div>
    )
}

export default MyRecipeDetail;