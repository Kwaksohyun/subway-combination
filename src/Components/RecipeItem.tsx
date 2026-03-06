import styled from "styled-components";
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import data from "../data.json";
import { Link } from "react-router-dom";
import { useRecipeLikes } from "../hooks/useRecipeLikes";

const RecipeItemWrap = styled.li`
    /* width: 290px; */
    /* height: 355px; */
    width: 100%;
    aspect-ratio: 290 / 355;
    border-radius: 30px;
    background-color: #fff;
`;

const RecipeImg = styled.img`
    /* width: 290px;
    height: 205px; */
    width: 100%;
    height: 57.5%;
    object-fit: cover;
    background-color: ${(props) => props.theme.yellow.lighter};
    border-radius: 30px;
`;

const RecipeInfoWrap = styled.div`
    /* width: 290px; */
    /* height: 170px; */
    width: 100%;
    min-width: 0;
    height: 42.5%;
    min-height: 105px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 23px 20px;
    flex-shrink: 0;
    // 화면 600px 이하
    @media (max-width: 600px) {
        padding: 20px;
    }
    // 화면 575px 이하
    @media (max-width: 575px) {
        padding: 17px;
    }
    // 화면 545px 이하
    @media (max-width: 545px) {
        padding: 13px 15px;
    }
`;

const RecipeTextWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecipeTitle = styled.strong`
    font-weight: 700;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;      // 2줄보다 길면 생략(...)
    overflow: hidden;
    // 화면 575px 이하
    @media (max-width: 575px) {
        font-size: 15px;
    }
`;

const RecipeMenu = styled.span`
    color: #666666;
    font-size: 12.5px;
    margin-top: 7px;
    white-space: nowrap;    // 자동 줄바꿈 무시
    // 화면 575px 이하
    @media (max-width: 575px) {
        font-size: 11.5px;
    }
`;

const RecipeTextRowWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    // 화면 575px 이하
    @media (max-width: 575px) {
        font-size: 13px;
    }
`;

const RecipeWriter = styled.span`
    color: ${(props) => props.theme.grey.darker};
`;

const RecipeHeartWrap = styled.div`
    display: flex;
    align-items: center;
    > span {
        padding-bottom: 2px;
        color: ${(props) => props.theme.grey.darker};
    }
`;

const IconButton = styled.button`
    border: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;
    > .heart-icon {
        transition: fill 1s;
    }
`;

interface IRecipeItemProps {
    recipeId: number;
    recipeTitle: string;
    sandwichName: string;
    emailId: string;
}

function RecipeItem({recipeId, recipeTitle, sandwichName, emailId}: IRecipeItemProps) {
    const { likes, likesCount, handleRecipeLikeClick } = useRecipeLikes();

    const sandwichInfoObj = (sandwich:string) => {
        return data.sandwichList.find(i => i.title === sandwich);
    };
    return (
        <RecipeItemWrap>
            <Link to={`/myRecipeView/recipe?recipeItemIdx=${recipeId}`}>
                <RecipeImg alt={`img_${sandwichInfoObj(sandwichName)?.eng_title}`} src={`${process.env.PUBLIC_URL}/${sandwichInfoObj(sandwichName)?.img}`} />
                <RecipeInfoWrap>
                    <RecipeTextWrap>
                        <RecipeTitle>{recipeTitle}</RecipeTitle>
                        <RecipeMenu>샌드위치ㆍ{sandwichName}</RecipeMenu>
                    </RecipeTextWrap>
                    <RecipeTextRowWrap>
                        <RecipeWriter>{emailId}</RecipeWriter>
                        <RecipeHeartWrap>
                            <IconButton aria-label={likes[recipeId] ? "좋아요 취소" : "좋아요 추가"} type="button" value={recipeId} onClick={handleRecipeLikeClick(recipeId)}>
                                <HeartIcon className="heart-icon" fill={likes[recipeId] ? "#ff3232" : "none"} 
                                        stroke={likes[recipeId] ? "#ff3232" : "#999999"}
                                        width="22" height="22" />
                            </IconButton>
                            <span>{likesCount[recipeId] || 0}</span>
                        </RecipeHeartWrap>
                    </RecipeTextRowWrap>
                </RecipeInfoWrap>
            </Link>
        </RecipeItemWrap>
    )
}

export default RecipeItem;