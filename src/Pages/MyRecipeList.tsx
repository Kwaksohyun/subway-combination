import { Link, useMatch, useNavigate } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import data from "../data.json";
import supabase from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { ReactComponent as HeartIcon } from '../assets/heart.svg';

const PageHeaderContainer = styled.header`
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
    white-space: nowrap;    // 자동 줄바꿈 무시
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
    max-width: 950px;
    min-width: 550px;
    height: 130px;
    padding: 0 30px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    // 화면 800px 이하
    @media (max-width: 900px) {
        max-width: 760px;
    }
    @media (max-width: 800px) {
        max-width: 630px;
    }
    > img {
        width: 250px;
        height: 80px;
        // 화면 800px 이하
        @media (max-width: 900px) {
            display: none;
        }
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

const ShareButton = styled.button`
    background-color: ${(props) => props.theme.green.darker};
    color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 500;
    width: 125px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
`;

const RecipeListWrap = styled.div`
    background-color: #f2f2f2;
    margin-top: -60px;
    padding: 130px 0 120px 0;
    overflow: hidden;
    > div {
        width: 1250px;
        margin: 0 auto;
        // 화면 1024px 이하
        @media (max-width: 1024px) {
            width: 920px;
        }
        // 화면 800px 이하
        @media (max-width: 800px) {
            width: 605px;
        }
    }
    > div > ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        // 화면 1024px 이하
        @media (max-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
        }
        // 화면 800px 이하
        @media (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

const Loading = styled.h2`
    text-align: center;
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
    line-height: 1.3;
`;

const RecipeMenu = styled.span`
    color: #666666;
    font-size: 13px;
    margin-top: 7px;
`;

const RecipeTextRowWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const RecipeWriter = styled.span`
    color: ${(props) => props.theme.grey.darker};
    font-size: 13px;
`;

const RecipeHeartWrap = styled.div`
    display: flex;
    align-items: center;
    > span {
        font-size: 15px;
        padding-bottom: 2px;
    }
`;

interface IRecipe {
    id: number;
    created_at: string;
    user_id: string;
    user_email_id: string;
    title: string;
    sandwich: string;
    bread: string;
    toasting: string;
    cheese: string;
    topping: string[];
    vegetable: string[];
    sauce: string[];
    description: string;
}

function MyRecipeList() {
    const subMenuInfo = [
        { index: 0, menuName: "나만의 꿀조합 레시피", menuPath: "/myRecipeList", menuMatch: useMatch("/myRecipeList") }
    ];
    const session = useRecoilValue(sessionState);
    const navigate = useNavigate();
    
    const sandwichInfoObj = (sandwich:string) => {
        return data.sandwichList.find(i => i.title === sandwich);
    };

    // supabase의 recipes 테이블에서 레시피 데이터 불러오는 함수
    const fetchAllRecipesData = async () => {
        const { data: recipeData, error: recipeError } = await supabase.from("recipes").select("*");
        if(recipeError) {
            // 오류 발생 시, 빈 배열 반환
            console.log("레시피 정보를 가져오지 못했습니다.", recipeError);
            return [];
        } 
        return recipeData;
    };

    const { data: recipesData, isLoading } = useQuery<IRecipe[]>({
        queryKey: ['Allrecipes'], 
        queryFn: fetchAllRecipesData,
    });
    
    // "공유하기" 버튼 클릭 시, 로그인 상태 확인 함수
    const handleRequireLogin = () => {
        // 사용자의 이메일이 확인되지 않은 경우(로그인 성공했을 때만 속성이 포함됨)
        if(!session?.user.confirmed_at) {
            // 로그인 요청 메시지를 띄우고 로그인 페이지로 이동
            alert(`로그인 후 이용해 주세요.\n로그인 페이지로 이동합니다.`);
            navigate("/login", { state: "registerMyRecipe" });
        } else {
            // 로그인이 되어 있는 경우, 레시피 등록 페이지로 이동
            navigate("/myRecipeList/registerMyRecipe");
        }
    };
    return (
        <section style={{paddingTop: "170px", minWidth: "800px"}}>
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false} />
            
            {/* 나만의 꿀조합 레시피 헤더 */}
            <PageHeaderContainer>
                <PageHeader>
                    <PageHeaderTitle>나만의 꿀조합 레시피</PageHeaderTitle>
                    <PageText>다양한 커스터마이징 꿀조합 레시피를 참고하여 더욱 맛있게 즐겨보세요.</PageText>
                </PageHeader>
            </PageHeaderContainer>

            <MyRecipeContentWrap>
                {/* 나만의 꿀조합 레시피 입력창 이동 */}
                <MakeMyRecipeBox>
                    <img src={`${process.env.PUBLIC_URL}/images/img_recipe_customizing.png`} alt="img_recipe_customizing" />
                    <MakeMyRecipeContent>
                        <h3>나만의 써브웨이 꿀조합은?</h3>
                        <PageText>내가 즐겨벅는 나만의 써브웨이 꿀조합 레시피를 공유해주세요!</PageText>
                    </MakeMyRecipeContent>
                    <ShareButton onClick={handleRequireLogin}>공유하기</ShareButton>
                </MakeMyRecipeBox>
            
                {/* 나만의 꿀조합 레시피 목록 */}
                <RecipeListWrap>
                    <div>
                        {isLoading ? <Loading>Loading...</Loading> : (
                            <ul>
                                {recipesData?.map((recipe) => (
                                    <RecipeItem key={recipe.id}>
                                        <Link to={`/myRecipeView/recipe?recipeItemIdx=${recipe.id}`}
                                            state={{imgSrc: `${process.env.PUBLIC_URL}/${sandwichInfoObj(recipe.sandwich)?.img}`, calorie: `${sandwichInfoObj(recipe.sandwich)?.calorie}`}}>
                                            <RecipeImg alt={`img_${sandwichInfoObj(recipe.sandwich)?.eng_title}`} src={`${process.env.PUBLIC_URL}/${sandwichInfoObj(recipe.sandwich)?.img}`} />
                                            <RecipeInfoWrap>
                                                <RecipeTextWrap>
                                                    <RecipeTitle>{recipe.title}</RecipeTitle>
                                                    <RecipeMenu>샌드위치ㆍ{recipe.sandwich}</RecipeMenu>
                                                </RecipeTextWrap>
                                                <RecipeTextRowWrap>
                                                    <RecipeWriter>{recipe.user_email_id}</RecipeWriter>
                                                    <RecipeHeartWrap>
                                                        <HeartIcon width="20" height="20" />
                                                        <span>13</span>
                                                    </RecipeHeartWrap>
                                                </RecipeTextRowWrap>
                                            </RecipeInfoWrap>
                                        </Link>
                                    </RecipeItem>
                                ))}
                            </ul>
                        )}
                    </div>
                </RecipeListWrap>
            </MyRecipeContentWrap>
        </section>
    )
}

export default MyRecipeList;