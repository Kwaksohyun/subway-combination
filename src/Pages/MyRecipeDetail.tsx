import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListViewButton from "../Components/ListViewButton";
import SubHeader from "../Components/SubHeader";
import supabase from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import { useForm } from "react-hook-form";

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

const RecipeCommentsWrap = styled.section`
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    border-top: 1px solid #dddddd;
    padding: 0 30px;
    > h3 {
        font-size: 23px;
        font-weight: 700;
        padding: 30px 0 20px 0;
    }
    > h3 > span {
        margin-left: 5px;
    }
`;

const CommentForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 20px;
`;

const CommentTextarea = styled.textarea`
    border: 1.5px solid #dddddd;
    border-radius: 4px;
    width: 100%;
    height: 90px;
    resize: none;
    margin-bottom: 10px;
    padding: 20px 10px;
    font-family: 'Noto Sans KR', sans-serif;
`;

const CommentPostBtn = styled.button`
    background-color: ${(props) => props.theme.green.lighter};
    color: #fff;
    /* font-weight: 500; */
    width: 65px;
    height: 40px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
`;

const CommentSortWrap = styled.ul`
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #dddddd;
`;

const CommentSortOption = styled.li`
    padding-left: 5px;
    padding-right: 10px;
    cursor: pointer;
`;

const CommentItem = styled.li`
    padding: 20px 0 30px 5px;
    border-bottom: 1px solid #dddddd;
`;

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImg = styled.img`
    width: 43px;
    height: 43px;
    margin-right: 13px;
`;

const CommentInfoWrap = styled.div`
    height: 38px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > span {
        font-size: 15px;
    }
`;

const CommentDateTime = styled.span`
    color: ${(props) => props.theme.grey.darker};
    font-size: 14px;
    margin-right: 5px;
`;

const CommentText = styled.p`
    padding-top: 13px;
    font-size: 15px;
`;

function MyRecipeDetail() {
    const subMenuInfo = [
        { index: 0, menuName: "나만의 꿀조합 레시피", menuPath: "/myRecipeList", menuMatch: useMatch("/myRecipeList") }
    ];
    const location = useLocation();
    // query string에서 recipeItemIdx 추출 (location.search 예시 : "?recipeItemIdx=1")
    const recipeItemIdx = location.search.slice(15);

    const { register, handleSubmit, reset } = useForm();
    const session = useRecoilValue(sessionState);
    const navigate = useNavigate();
    
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
    const { data: recipeDetailData, isLoading:recipeDetalLoading } = useQuery({
        queryKey: ['recipeDetail'], 
        queryFn: fetchRecipeDetailData,
        enabled: !!recipeItemIdx    //  recipeItemIdx가 있을 때만 쿼리 요청
    });

    // 로그인 상태 확인 함수
    const confirmLoginState = () => {
        // 사용자의 이메일이 확인되지 않은 경우(로그인 성공했을 때만 속성이 포함됨)
        if(window.confirm("로그인을 하신 후 이용해 주시기 바랍니다.")) {
            // 로그인이 되어 있는 경우, 레시피 등록 페이지로 이동
            navigate("/login", { state: "MyRecipeDetail" });
        } else {
            document.getElementById("textarea")?.blur();
        }
    };

    const onSubmit = async (data:any) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ("0"+ (today.getMonth()+1)).slice(-2);
        const day =("0" + today.getDate()).slice(-2);

        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');

        // supabase의 comments DB에 댓글 comments DB에 추가
        const { error: commentError } = await supabase.from('comments').insert({
            recipe_id: recipeItemIdx,
            user_id: session?.user?.id,
            created_at: `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`,
            comment: data.comment
        });
        
        if(commentError) {
            throw new Error(commentError.message);
        } else {
            // 댓글을 성공적으로 처리하면 -> 입력 form reset
            alert("댓글이 등록되었습니다.");
            reset();
        }
    };

    // 현재 recipeItemIdx에 대한 전체 댓글 가져오기
    const fetchAllCommentsData = async () => {
        const { data: commentsData, error: commentsError } = await supabase
            .from('comments')
            .select(`*, user_info:user_info!user_id (username, email)`)
            .eq('recipe_id', recipeItemIdx)
            .order('created_at', {ascending: false});
        if(commentsError) {
            console.log(commentsError);
            return [];
        } 
        return commentsData;
    };

    const { data: commentsData, isLoading:commentLoading } = useQuery({
        queryKey: ['comments'], 
        queryFn: fetchAllCommentsData,
    });

    return (
        <div style={{paddingTop: "170px"}}>
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false}  pathIncludesStr="myRecipe" />
                <RecipeViewContainer>
                    {recipeDetalLoading ? <Loading>Loading...</Loading> : (
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

            {/* 레시피 댓글 */}
            <RecipeCommentsWrap>
                <h3>
                    댓글
                    <span>{commentsData?.length}</span>
                </h3>
                <CommentForm onSubmit={handleSubmit(onSubmit)}>
                    {session?.user.confirmed_at ? (
                        <>
                            <CommentTextarea {...register("comment")} placeholder="댓글을 입력해 주세요."></CommentTextarea>
                            <CommentPostBtn type="submit">등록</CommentPostBtn>
                        </>
                    ) : (
                        <>
                            <CommentTextarea {...register("comment")} 
                            onClick={confirmLoginState} id="textarea" placeholder="댓글을 작성하려면 로그인 해주세요."></CommentTextarea>
                        </>
                    )}
                </CommentForm>
                <CommentSortWrap>
                    <CommentSortOption>최신순</CommentSortOption>
                    <CommentSortOption>등록순</CommentSortOption>
                </CommentSortWrap>
                <ul>
                    {commentLoading ? <Loading>Loading...</Loading> : (
                        commentsData?.map(comment => (
                            <CommentItem key={comment.id}>
                                <CommentContainer>
                                    <ProfileImg src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="img_user-profile" />
                                    <CommentInfoWrap>
                                        <span>{comment.user_info.email.split("@")[0]}</span>
                                        <div>
                                            {comment.created_at.split("T").map((i:string) => (
                                                <CommentDateTime key={i}>{i}</CommentDateTime>
                                            ))}
                                        </div>
                                    </CommentInfoWrap>
                                </CommentContainer>
                                <CommentText>{comment.comment}</CommentText>
                            </CommentItem>
                        ))
                    )}
                </ul>
            </RecipeCommentsWrap>

            <ListViewButton linkPath="/myRecipeList" />
        </div>
    )
}

export default MyRecipeDetail;