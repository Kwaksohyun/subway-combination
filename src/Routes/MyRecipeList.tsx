import { Link, useMatch } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import styled from "styled-components";

const PageHeaderContainer = styled.article`
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 60px;
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
`;

const MakeMyRecipeBox = styled.aside`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 4px solid ${(props) => props.theme.yellow.darker};
    border-radius: 25px;
    width: 930px;
    padding: 20px 30px;
    > img {
        width: 250px;
        height: 80px;
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

const ShareButton = styled.div`
    background-color: ${(props) => props.theme.green.darker};
    color: #fff;
    width: 125px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`;

function MyRecipeList() {
    const subMenuInfo = [
        { index: 0, menuName: "나만의 꿀조합 레시피", menuPath: "/myRecipeList", menuMatch: useMatch("/myRecipeList") }
    ];
    return (
        <>
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false} />

            <PageHeaderContainer>
                <PageHeader>
                    <PageHeaderTitle>나만의 꿀조합 레시피</PageHeaderTitle>
                    <PageText>다양한 커스터마이징 꿀조합 레시피를 참고하여 더욱 맛있게 즐겨보세요.</PageText>
                </PageHeader>
                <MakeMyRecipeBox>
                    <img src={`${process.env.PUBLIC_URL}/images/img_recipe_customizing.png`} alt="img_recipe_customizing" />
                    <MakeMyRecipeContent>
                        <h3>나만의 써브웨이 꿀조합은?</h3>
                        <PageText>내가 즐겨벅는 나만의 써브웨이 꿀조합 레시피를 공유해주세요!</PageText>
                    </MakeMyRecipeContent>
                    <ShareButton>
                        <Link to={"/"}>공유하기</Link>
                    </ShareButton>
                </MakeMyRecipeBox>
            </PageHeaderContainer>

            {/* 꿀조합 레시피 목록 */}
            <div>

            </div>
        </>
    )
}

export default MyRecipeList;