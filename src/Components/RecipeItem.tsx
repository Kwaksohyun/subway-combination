import styled from "styled-components";
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import data from "../data.json";
import { Link } from "react-router-dom";
import { useRecipeLikes } from "../hooks/useRecipeLikes";

const RecipeItemWrap = styled.li`
    width: 290px;
    height: 355px;  
    border-radius: 30px;
    background-color: #fff;
`;

const RecipeImg = styled.img`
    width: 290px;
    height: 205px;
    background-color: ${(props) => props.theme.yellow.lighter};
    border-radius: 30px;
`;

const RecipeInfoWrap = styled.div`
    width: 290px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 23px 20px;
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
    font-size: 12.5px;
    margin-top: 7px;
`;

const RecipeTextRowWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RecipeWriter = styled.span`
    color: ${(props) => props.theme.grey.darker};
    font-size: 14px;
`;

const RecipeHeartWrap = styled.div`
    display: flex;
    align-items: center;
    > span {
        font-size: 14px;
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