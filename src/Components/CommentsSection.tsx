import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabaseClient";
import CommentForm from "./CommentForm";

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

function CommentsSection() {
    const location = useLocation();
    // query string에서 recipeItemIdx 추출 (location.search 예시 : "?recipeItemIdx=1")
    const recipeItemIdx = location.search.slice(15);

    const [sortType, setSortType] = useState("latest");

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

    const handleSortChange = (sortOption:string) => {
        setSortType(sortOption);
    }

    // 최신순-내림차순 정렬, 오래된 순-오름차순
    const sortedCommentData = [...(commentsData ?? [])].sort((a, b) => {
        return (sortType === "latest") 
            ? (+new Date(b.created_at) - +new Date(a.created_at)) 
            : (+new Date(a.created_at) - +new Date(b.created_at));
    });

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
                    onClick={() => handleSortChange("latest")}>최신순</CommentSortOption>
                <CommentSortOption 
                    className={sortType === "oldest" ? "active" : ""}
                    onClick={() => handleSortChange("oldest")}>오래된 순</CommentSortOption>
            </CommentSortWrap>
            <ul>
                {commentLoading ? <Loading>Loading...</Loading> : (
                    sortedCommentData?.map(comment => (
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
    )
}

export default CommentsSection;