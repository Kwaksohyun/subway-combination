import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import { ReactComponent as BookMarkIcon } from '../assets/bookmark.svg';

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

const RecipeBtnWrap = styled.div`
    display: flex;
    align-items: center;
    > div {
        display: flex;
        align-items: center;
        margin-right: 5px;
    }
    > div > span {
        font-size: 13px;
    }
`;

function MyPage() {
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
                                <MemberName><strong>홍길동</strong>님 안녕하세요.</MemberName>
                                <MemberEmail>test@naver.com</MemberEmail>
                            </MemberInfoDescWrap>
                        </div>
                        <EditMemberInfoLink to={"/"}>회원정보 수정</EditMemberInfoLink>
                    </MemberInfoWrap>
                    <MyPageUserInfoBtnWrap>
                        <BtnItem>
                            <Link to={"/"}>
                                <span>나만의 레시피</span>
                                <p>1</p>
                            </Link>
                        </BtnItem>
                        <BtnItem>
                            <Link to={"/"}>
                                <span>저장한 레시피</span>
                                <p>2</p>
                            </Link>
                        </BtnItem>
                        <BtnItem>
                            <Link to={"/"}>
                                <span>찜한 레시피</span>
                                <p>17</p>
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
                            <ul>
                                <RecipeItem>
                                    <Link to={"/"}>
                                        <RecipeImg src={`${process.env.PUBLIC_URL}/images/menu/sandwich/Tuna.png`} alt="Tuna.png" />
                                        <RecipeInfoWrap>
                                            <RecipeTextWrap>
                                                <RecipeTitle>레시피 제목</RecipeTitle>
                                                <RecipeMenu>샌드위치ㆍ샌드위치 메뉴 이름</RecipeMenu>
                                            </RecipeTextWrap>
                                            <RecipeTextRowWrap>
                                                <RecipeWriter>test</RecipeWriter>
                                                <RecipeBtnWrap>
                                                    <div>
                                                        <HeartIcon width="20" height="20" />
                                                        <span>13</span>
                                                    </div>
                                                    <BookMarkIcon width="20" height="20" />
                                                </RecipeBtnWrap>
                                            </RecipeTextRowWrap>
                                        </RecipeInfoWrap>
                                    </Link>
                                </RecipeItem>
                            </ul>
                        </MyPageRecipeListWrap>
                    </MyPageSubRecipeSection>
                    {/* 저장한 레시피 */}
                    <MyPageSubRecipeSection>
                        <MyPageSubRecipeTitle>
                            <h3>저장한 레시피</h3>
                            <Link to="/">더보기 &gt;</Link>
                        </MyPageSubRecipeTitle>
                        <MyPageRecipeListWrap>
                            <ul>
                            <RecipeItem>
                                    <Link to={"/"}>
                                        <RecipeImg src={`${process.env.PUBLIC_URL}/images/menu/sandwich/Tuna.png`} alt="Tuna.png" />
                                        <RecipeInfoWrap>
                                            <RecipeTextWrap>
                                                <RecipeTitle>레시피 제목</RecipeTitle>
                                                <RecipeMenu>샌드위치ㆍ샌드위치 메뉴 이름</RecipeMenu>
                                            </RecipeTextWrap>
                                            <RecipeTextRowWrap>
                                                <RecipeWriter>test</RecipeWriter>
                                                <RecipeBtnWrap>
                                                    <div>
                                                        <HeartIcon width="20" height="20" />
                                                        <span>13</span>
                                                    </div>
                                                    <BookMarkIcon width="20" height="20" />
                                                </RecipeBtnWrap>
                                            </RecipeTextRowWrap>
                                        </RecipeInfoWrap>
                                    </Link>
                                </RecipeItem>
                                <RecipeItem>
                                    <Link to={"/"}>
                                        <RecipeImg src={`${process.env.PUBLIC_URL}/images/menu/sandwich/Tuna.png`} alt="Tuna.png" />
                                        <RecipeInfoWrap>
                                            <RecipeTextWrap>
                                                <RecipeTitle>레시피 제목</RecipeTitle>
                                                <RecipeMenu>샌드위치ㆍ샌드위치 메뉴 이름</RecipeMenu>
                                            </RecipeTextWrap>
                                            <RecipeTextRowWrap>
                                                <RecipeWriter>test</RecipeWriter>
                                                <RecipeBtnWrap>
                                                    <div>
                                                        <HeartIcon width="20" height="20" />
                                                        <span>13</span>
                                                    </div>
                                                    <BookMarkIcon width="20" height="20" />
                                                </RecipeBtnWrap>
                                            </RecipeTextRowWrap>
                                        </RecipeInfoWrap>
                                    </Link>
                                </RecipeItem>
                            </ul>
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
                                <RecipeItem>
                                    <Link to={"/"}>
                                        <RecipeImg src={`${process.env.PUBLIC_URL}/images/menu/sandwich/Tuna.png`} alt="Tuna.png" />
                                        <RecipeInfoWrap>
                                            <RecipeTextWrap>
                                                <RecipeTitle>레시피 제목</RecipeTitle>
                                                <RecipeMenu>샌드위치ㆍ샌드위치 메뉴 이름</RecipeMenu>
                                            </RecipeTextWrap>
                                            <RecipeTextRowWrap>
                                                <RecipeWriter>test</RecipeWriter>
                                                <RecipeBtnWrap>
                                                    <div>
                                                        <HeartIcon width="20" height="20" />
                                                        <span>13</span>
                                                    </div>
                                                    <BookMarkIcon width="20" height="20" />
                                                </RecipeBtnWrap>
                                            </RecipeTextRowWrap>
                                        </RecipeInfoWrap>
                                    </Link>
                                </RecipeItem>
                            </ul>
                        </MyPageRecipeListWrap>
                    </MyPageSubRecipeSection>
                </MyPageSubRecipeWrap>
            </MyPageMainContainer>
        </section>
    )
}

export default MyPage;