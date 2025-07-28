import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabaseClient";
import CommentForm, { CommentTextarea } from "./CommentForm";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";

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

const CommentSortWrap = styled.ul`
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px solid #dddddd;
`;

const CommentSortOption = styled.li`
    padding-left: 5px;
    padding-right: 10px;
    color: ${(props) => props.theme.grey.darker};
    cursor: pointer;
    &.active {
        color: black;
        font-weight: 600;
    }
`;

const Loading = styled.h2`
    text-align: center;
`;

const CommentItem = styled.li`
    padding: 20px 0 30px 5px;
    border-bottom: 1px solid #dddddd;
`;

const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    
`;

const CommentInfoWrap = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImg = styled.img`
    width: 43px;
    height: 43px;
    margin-right: 13px;
`;

const CommentInfoMain = styled.div`
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

const CommentBtnWrap = styled.div``;

const CommentOptionBtn = styled.button`
    border: 1px solid #dddddd;
    border-radius: 5px;
    background-color: transparent;
    padding: 4px 9px;
    margin-left: 5px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.grey.lighter};
    }
    &:active {
        background-color: #dddddd;
    }
    &.submit {
        background-color: ${(props) => props.theme.green.lighter};
        color: #fff;
        border: 1px solid ${(props) => props.theme.green.lighter};
    }
`;

const EditCommentTextarea = styled(CommentTextarea)`
    margin-top: 10px;
`;

const CommentText = styled.p`
    padding-top: 13px;
    font-size: 15px;
`;

interface IComment {
    id: number;
    recipe_id: number;
    user_id: string;
    created_at: string;
    comment: string;
    user_info: {
        email: string;
        username: string;
    }
}

function CommentsSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(0);
    const [editValue, setEditValue] = useState("");
    const location = useLocation();
    // query string에서 recipeItemIdx 추출 (location.search 예시 : "?recipeItemIdx=1")
    const recipeItemIdx = location.search.slice(15);

    const [sortType, setSortType] = useState("latest");
    const session = useRecoilValue(sessionState);

    const queryClient = useQueryClient();

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
    
    const { data: commentsData, isLoading:commentLoading } = useQuery<IComment[]>({
        queryKey: ['comments'], 
        queryFn: fetchAllCommentsData,
    });

    // 댓글 정렬(최신순: 내림차순 정렬, 오래된 순: 오름차순)
    const sortedCommentData = [...(commentsData ?? [])].sort((a, b) => {
        return (sortType === "latest") 
            ? (+new Date(b.created_at) - +new Date(a.created_at)) 
            : (+new Date(a.created_at) - +new Date(b.created_at));
    });

    const handleEditInput = (id:number, comment:string) => {
        setSelectedCommentId(id);
        setEditValue(comment);
        // 수정중으로 변경
        setIsEditing(true);
    }

    // 댓글 수정
    const updateComment = async () => {
        try {
            const { error: updateError } = await supabase
                .from('comments')
                .update({ comment: editValue })
                .eq('id', selectedCommentId);
            if(updateError) {
                console.log("업데이트 중 오류 발생", updateError);
                alert("댓글 수정에 실패했습니다.");
            } else {
                // 댓글 수정 후 댓글 목록 새로 가져오기(UI 업데이트)
                queryClient.invalidateQueries({
                    queryKey: ['comments']
                });
                setIsEditing(false);
            }
        } catch(error) {
            console.log(error);
        }
    }
    // 댓글 삭제
    const deleteComment = async (id:number) => {
        try {
            if(window.confirm("삭제하시겠습니까?")) {
                const { error: deleteError } = await supabase.from('comments').delete().eq('id', id);
                
                if(deleteError) {
                    console.log("삭제 중 오류 발생", deleteError);
                    alert("댓글 삭제에 실패했습니다.");
                }
                
                alert("성공적으로 삭제되었습니다.");
                // 댓글 삭제 후 댓글 목록 새로 가져오기(UI 업데이트)
                queryClient.invalidateQueries({
                    queryKey: ['comments']
                });
            }
        } catch(error) {
            // 예상치 못한 오류 처리
            console.log(error);
            alert("예상치 못한 문제가 발생하였습니다. 다시 시도해주세요.");
        }   
    };

    return (
        <RecipeCommentsWrap>
            <h3>
                댓글
                <span>{commentsData?.length}</span>
            </h3>
            {/* 댓글 작성 Form */}
            <CommentForm />
            
            <CommentSortWrap>
                <CommentSortOption 
                    className={sortType === "latest" ? "active" : ""}
                    onClick={() => setSortType("latest")}>최신순</CommentSortOption>
                <CommentSortOption 
                    className={sortType === "oldest" ? "active" : ""}
                    onClick={() => setSortType("oldest")}>오래된 순</CommentSortOption>
            </CommentSortWrap>
            <ul>
                {commentLoading ? <Loading>Loading...</Loading> : (
                    sortedCommentData?.map(comment => (
                        <CommentItem key={comment.id}>
                            <CommentHeader>
                                <CommentInfoWrap>
                                    <ProfileImg src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="img_user-profile" />
                                    <CommentInfoMain>
                                        <span>{comment.user_info.email.split("@")[0]}</span>
                                        <div>
                                            {comment.created_at.split("T").map((i:string) => (
                                                <CommentDateTime key={i}>{i}</CommentDateTime>
                                            ))}
                                        </div>
                                    </CommentInfoMain>
                                </CommentInfoWrap>
                                {(session?.user.id !== comment.user_id) ? "" : isEditing ? (
                                    <CommentBtnWrap>
                                        <CommentOptionBtn onClick={() => setIsEditing(false)} type="button">취소</CommentOptionBtn>
                                        <CommentOptionBtn onClick={updateComment} className="submit" type="button">저장</CommentOptionBtn>
                                    </CommentBtnWrap>
                                ) : (
                                    <CommentBtnWrap>
                                        <CommentOptionBtn onClick={() => handleEditInput(comment.id, comment.comment)} type="button">수정</CommentOptionBtn>
                                        <CommentOptionBtn onClick={() => deleteComment(comment.id)} type="button">삭제</CommentOptionBtn>
                                    </CommentBtnWrap>
                                )}
                            </CommentHeader>
                            {(isEditing && (selectedCommentId === comment.id)) ? (
                                <EditCommentTextarea onChange={e => setEditValue(e.target.value)} defaultValue={comment.comment}></EditCommentTextarea>
                            ) : <CommentText>{comment.comment}</CommentText>}
                        </CommentItem>
                    ))
                )}
            </ul>
        </RecipeCommentsWrap>
    )
}

export default CommentsSection;