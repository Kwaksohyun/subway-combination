import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import supabase from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

const CommentFormWrap = styled.form`
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

function CommentForm() {
    const { register, handleSubmit, reset } = useForm();
    const session = useRecoilValue(sessionState);
    const navigate = useNavigate();
    const location = useLocation();
    
    // query string에서 recipeItemIdx 추출 (location.search 예시 : "?recipeItemIdx=1")
    const recipeItemIdx = location.search.slice(15);

    const queryClient = useQueryClient();

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
            alert("댓글이 등록되었습니다.");
            // 댓글 등록 후 댓글 목록 새로 가져오기(UI 업데이트)
            queryClient.invalidateQueries({
                queryKey: ['comments']
            });
            // 댓글을 성공적으로 처리하면 -> 입력 form reset
            reset();
        }
    };
    
    return (
        <CommentFormWrap onSubmit={handleSubmit(onSubmit)}>
            {session?.user.confirmed_at ? (
                <>
                    <CommentTextarea {...register("comment", {required: true})} placeholder="댓글을 입력해 주세요."></CommentTextarea>
                    <CommentPostBtn type="submit">등록</CommentPostBtn>
                </>
            ) : (
                <>
                    <CommentTextarea {...register("comment")} 
                    onClick={confirmLoginState} id="textarea" placeholder="댓글을 작성하려면 로그인 해주세요."></CommentTextarea>
                </>
            )}
        </CommentFormWrap>
    )
}

export default CommentForm;