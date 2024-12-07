import { Link } from "react-router-dom";
import styled from "styled-components";
import RecipeItem from "../Components/RecipeItem";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import supabase from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";

const PageHeaderContainer = styled.header`
    margin: 140px 0 80px 0;
`;

const PageHeaderTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    text-align: center;
`;

const MyPageMainContainer = styled.main`
    background-color: #f2f2f2;
    padding: 50px 0 120px 0;
`;

const MyPageUserInfoContainer = styled.div`
    width: 600px;
    height: 270px;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 auto;
    padding: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MemberInfoWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;
    padding-bottom: 30px;
    > div {
        display: flex;
        align-items: center;
    }
    > div > img {
        width: 55px;
        height: 55px;
    }
`;

const MemberInfoDescWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 55px;
    justify-content: space-evenly;
    margin-left: 15px;
`;

const MemberName = styled.p`
    > strong {
        font-weight: 500;
    }
`;

const MemberEmail = styled.span`
    font-size: 15px;
    color: #00000094;
`;

const EditMemberInfoLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 115px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 30px;
    font-size: 13px;
`;

const MyPageUserInfoBtnWrap = styled.ul`
    display: flex;
    justify-content: space-evenly;
`;

const BtnItem = styled.li`
    > a {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    > a > span {
        font-size: 14px;
        margin-bottom: 10px;
    }
    > a > p {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background-color: ${(props) => props.theme.green.lighter};
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-size: 20px;
    }
`;

const MyPageSubRecipeWrap = styled.div`
    width: 1190px;
    margin: 0 auto;
`;

const MyPageSubRecipeSection = styled.section`
    margin-top: 100px;
`;

const MyPageSubRecipeTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000;
    padding-bottom: 15px;
    > h3 {
        font-size: 21px;
        font-weight: 500;
    }
    > a {
        font-size: 14px;
    }
`;

const MyPageRecipeListWrap = styled.div`
    > ul {
        margin: 30px 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
    }
`;

const Loading = styled.h2`
    text-align: center;
`;

function MyPage() {
    const session = useRecoilValue(sessionState);

    // 나만의 레시피
    const fetchMyRecipesData = async () => {
        const { data, error } = await supabase
            .from('recipes')
            .select()
            .eq('user_id', session?.user?.id);
        if(error) {
            console.log("error: ", error);
            return null;
        } else {
            return data;
        }
    }

    // 저장한 레시피
    const fetchSavedRecipesData = async () => {
        const { data, error } = await supabase
            .from('saved_recipes')
            .select(`*, recipes (*)`)
            .eq('user_id', session?.user?.id)
            .eq('is_saved', true)
        if(error) {
            console.log("error: ", error);
            return null;
        } else {
            return data;
        }
    }

    const { data: myRecipeData, isLoading: myRecipeLoading} = useQuery({
        queryKey: ['myRecipe'],
        queryFn: fetchMyRecipesData,
        enabled: !!session?.user.id         //  세션 데이터가 있을 때만 쿼리 요청
    });

    const { data: savedRecipesData, isLoading: savedRecipesLoading} = useQuery({
        queryKey: ['savedRecipes'],
        queryFn: fetchSavedRecipesData,
        enabled: !!session?.user.id 
    });
    
    return (
        <section style={{paddingTop: "170px", minWidth: "800px"}}>
            {/* 마이페이지 헤더 */}
            <PageHeaderContainer>
                <PageHeaderTitle>마이페이지</PageHeaderTitle>
            </PageHeaderContainer>

            <MyPageMainContainer>
                <MyPageUserInfoContainer>
                    <MemberInfoWrap>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="profileImg" />
                            <MemberInfoDescWrap>
                                <MemberName><strong>{session?.user.user_metadata.username}</strong>님 안녕하세요.</MemberName>
                                <MemberEmail>{session?.user.user_metadata.email}</MemberEmail>
                            </MemberInfoDescWrap>
                        </div>
                        <EditMemberInfoLink to={"/"}>회원정보 수정</EditMemberInfoLink>
                    </MemberInfoWrap>
                    <MyPageUserInfoBtnWrap>
                        <BtnItem>
                            <Link to={"/"}>
                                <span>나만의 레시피</span>
                                <p>{myRecipeData?.length}</p>
                            </Link>
                        </BtnItem>
                        <BtnItem>
                            <Link to={"/"}>
                                <span>저장한 레시피</span>
                                <p>{savedRecipesData?.length}</p>
                            </Link>
                        </BtnItem>
                        <BtnItem>
                            <Link to={"/"}>
                                <span>찜한 레시피</span>
                                <p>1</p>
                            </Link>
                        </BtnItem>
                    </MyPageUserInfoBtnWrap>
                </MyPageUserInfoContainer>

                <MyPageSubRecipeWrap>
                    {/* 나만의 레시피 */}
                    <MyPageSubRecipeSection>
                        <MyPageSubRecipeTitle>
                            <h3>나만의 레시피</h3>
                            <Link to="/">더보기 &gt;</Link>
                        </MyPageSubRecipeTitle>
                        <MyPageRecipeListWrap>
                            {myRecipeLoading ? <Loading>Loading...</Loading> : (
                                <ul>
                                    {myRecipeData?.map((recipe) => (
                                        <RecipeItem key={recipe.id} recipeId={recipe.id} recipeTitle={recipe.title}
                                                    sandwichName={recipe.sandwich} emailId={recipe.user_email_id} />
                                    ))}
                                </ul>
                            )}
                        </MyPageRecipeListWrap>
                    </MyPageSubRecipeSection>
                    {/* 저장한 레시피 */}
                    <MyPageSubRecipeSection>
                        <MyPageSubRecipeTitle>
                            <h3>저장한 레시피</h3>
                            <Link to="/">더보기 &gt;</Link>
                        </MyPageSubRecipeTitle>
                        <MyPageRecipeListWrap>
                            {savedRecipesLoading ? <Loading>Loading...</Loading> : (
                                <ul>
                                    {savedRecipesData?.map((savedRecipe) => (
                                        <RecipeItem key={savedRecipe.id} recipeId={savedRecipe.recipes.id} recipeTitle={savedRecipe.recipes.title}
                                                    sandwichName={savedRecipe.recipes.sandwich} emailId={savedRecipe.recipes.user_email_id} />
                                    ))}
                                </ul>
                            )}
                        </MyPageRecipeListWrap>
                    </MyPageSubRecipeSection>
                    {/* 찜한 레시피 */}
                    <MyPageSubRecipeSection>
                        <MyPageSubRecipeTitle>
                            <h3>찜한 레시피</h3>
                            <Link to="/">더보기 &gt;</Link>
                        </MyPageSubRecipeTitle>
                        <MyPageRecipeListWrap>
                            <ul>
                                <RecipeItem key={Math.random()} recipeId={1} recipeTitle="레시피 제목"
                                            sandwichName="에그마요" emailId="test" />
                            </ul>
                        </MyPageRecipeListWrap>
                    </MyPageSubRecipeSection>
                </MyPageSubRecipeWrap>
            </MyPageMainContainer>
        </section>
    )
}

export default MyPage;