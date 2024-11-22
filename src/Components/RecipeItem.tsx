import styled from "styled-components";
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import data from "../data.json";
import { Link } from "react-router-dom";

const RecipeItemWrap = styled.li`
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

interface IRecipeItemProps {
    recipeId: number;
    recipeTitle: string;
    sandwichName: string;
    emailId: string;
}

function RecipeItem({recipeId, recipeTitle, sandwichName, emailId}: IRecipeItemProps) {
    const sandwichInfoObj = (sandwich:string) => {
        return data.sandwichList.find(i => i.title === sandwich);
    };

    return (
        <RecipeItemWrap>
            <Link to={`/myRecipeView/recipe?recipeItemIdx=${recipeId}`}
                state={{imgSrc: `${process.env.PUBLIC_URL}/${sandwichInfoObj(sandwichName)?.img}`, calorie: `${sandwichInfoObj(sandwichName)?.calorie}`}}>
                <RecipeImg alt={`img_${sandwichInfoObj(sandwichName)?.eng_title}`} src={`${process.env.PUBLIC_URL}/${sandwichInfoObj(sandwichName)?.img}`} />
                <RecipeInfoWrap>
                    <RecipeTextWrap>
                        <RecipeTitle>{recipeTitle}</RecipeTitle>
                        <RecipeMenu>샌드위치ㆍ{sandwichName}</RecipeMenu>
                    </RecipeTextWrap>
                    <RecipeTextRowWrap>
                        <RecipeWriter>{emailId}</RecipeWriter>
                        <RecipeHeartWrap>
                            <HeartIcon width="20" height="20" />
                            <span>13</span>
                        </RecipeHeartWrap>
                    </RecipeTextRowWrap>
                </RecipeInfoWrap>
            </Link>
        </RecipeItemWrap>
    )
}

export default RecipeItem;