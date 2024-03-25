import { useForm } from "react-hook-form";
import data from "../data.json";
import styled from "styled-components";

const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 70px 0;
    > span {
        color: ${(props) => props.theme.grey.darker};
    }
`;

const PageHeaderTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 20px;
`;

const MyRecipeFormWrap = styled.div`
    background-color: #f2f2f2;
    padding: 70px 0;
`;

const MyRecipeForm = styled.form`
    width: 1050px;
    margin: 0 auto;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

const FormStepWrap = styled.div`
    padding: 20px 0;
    display: flex;
    width: 1005px;
`;

const FormLabelTitle = styled.label`
    font-size: 20px;
    font-weight: 500;
    width: 240px;        /* 가장 긴 FormTitle에 따라 */
    padding: 0 35px;
`;

const FormTitle = styled.span`
    font-size: 20px;
    font-weight: 500;
    width: 240px;        /* 가장 긴 FormTitle에 따라 */
    padding: 0 35px;
`;

const FormContent = styled.div`
    > ul {
        width: 763px;
        display: flex;
        flex-wrap: wrap;
    }
    > input[type=text] {
        border: none;
        width: 400px;
        height: 40px;
        border-radius: 7px;
        border: 2px solid #dadada;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 15px;
        padding-left: 10px;
    }
    > select {
        outline: none;
        width: 200px;
        height: 40px;
        border-radius: 7px;
        padding: 0 5px;
        border: 2px solid #dadada;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 15px;
    }
`;

const IngredientItem = styled.li`
    margin: 10px;
    > label {
        width: 107px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        word-break: keep-all;
        font-size: 14.5px;
        cursor: pointer;
    }
    &.noImg {
        display: flex;
        align-items: center;
    }
    &.noImg > label {
        display: block;
        text-align: start;
        padding-left: 8px;
        width: 84px;
    }
`;

const InputRadio = styled.input`
    -webkit-appearance: none;       // 웹킷 브라우저에서 기본 스타일 제거
    -moz-appearance: none;          // 모질라 브라우저에서 기본 스타일 제거
    appearance: none;               // 기본 브라우저에서 기본 스타일 제거
    width: 15px;
    height: 15px;
    border-radius: 100%;
    border: 2px solid #dadada;
    cursor: pointer;
    &:checked {
        background-color: ${(props) => props.theme.green.lighter};  // checked 시 내부 원 색상
        border: 3px solid #fff;       // 테두리가 아닌 테두리와 내부 원 사이의 색상
        box-shadow: 0 0 0 2px ${(props) => props.theme.green.lighter};  // 테두리
        // 그림자로 테두리를 직접 만들어야 한다. 없으면 설정한 색으로 꽉 찬 원만 나온다.
    }
    &:checked + label {
        color: ${(props) => props.theme.green.lighter};
        font-weight: 500;
    }
`;

const IngredientImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
`;

const NotSelectedImg = styled.svg`
    width: 90px;
    height: 90px;
    padding: 10px;
    fill: #dadada;
`;

const SubmitBtn = styled.button`
    border: 0;
    width: 125px;
    height: 40px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.green.darker};
    color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 500;
`;

function RegisterMyRecipe() {
    const { register } = useForm();
    return (
        <>
            <PageHeader>
                <PageHeaderTitle>나만의 써브웨이 꿀조합은?</PageHeaderTitle>
                <span>내가 즐겨먹는 나만의 써브웨이 꿀조합 레시피를 공유해주세요!</span>
            </PageHeader>
            <MyRecipeFormWrap>
                <MyRecipeForm>
                    {/* 1) 제목 */}
                    <FormStepWrap>
                        <FormLabelTitle htmlFor="title">제목</FormLabelTitle>
                        <FormContent>
                            <input {...register("title", { required: true })} type="text" id="title" placeholder="제목을 입력해주세요."/>
                        </FormContent>
                    </FormStepWrap>
                    {/* 2) 메뉴 */}
                    <FormStepWrap>
                        <FormLabelTitle htmlFor="menu-select">메뉴</FormLabelTitle>
                        <FormContent>
                            <select {...register("sandwich", { required: true })} id="menu-select">
                                <option value="">메뉴를 선택해주세요</option>
                                {data.sandwichList.map(sandwich => (
                                    <option key={sandwich.id} value={sandwich.title}>{sandwich.title}</option>
                                ))}
                            </select>
                        </FormContent>
                    </FormStepWrap>
                    {/* 3) 빵 */}
                    <FormStepWrap>
                        <FormTitle>빵</FormTitle>
                        <FormContent>
                            <ul>
                                {data.freshInfo.filter(i => i.category === "빵").map(bread => (
                                    <IngredientItem key={bread.id}>
                                        <InputRadio {...register("bread", { required: true })} type="radio" id={`bread_${bread.id}`} />
                                        <label htmlFor={`bread_${bread.id}`}>
                                            <IngredientImg src={`${process.env.PUBLIC_URL}/${bread.img}`} alt={`img_${bread.eng_title}`} />
                                            {bread.title}
                                        </label>
                                    </IngredientItem>
                                ))}
                            </ul>
                        </FormContent>
                    </FormStepWrap>
                    {/* 4) 토스팅 */}
                    <FormStepWrap>
                        <FormTitle>빵/미트 토스팅 선택</FormTitle>
                        <FormContent>
                            <ul>
                                <IngredientItem className="noImg">
                                    <InputRadio {...register("toasting", { required: true })} type="radio" id={"toasting"} />
                                    <label htmlFor={"toasting"}>토스팅</label>
                                </IngredientItem>
                                <IngredientItem className="noImg">
                                    <InputRadio {...register("toasting", { required: true })} type="radio" id={"no_toasting"} />
                                    <label htmlFor={"no_toasting"}>토스팅 안 함</label>
                                </IngredientItem>
                            </ul>
                        </FormContent>
                    </FormStepWrap>
                    {/* 5) 치즈 */}
                    <FormStepWrap>
                        <FormTitle>치즈</FormTitle>
                        <FormContent>
                            <ul>
                                {data.freshInfo.filter(i => i.category === "치즈").map(cheese => (
                                    <IngredientItem key={cheese.id}>
                                        <InputRadio {...register("cheese", { required: true })} type="radio" id={`cheese_${cheese.id}`} />
                                        <label htmlFor={`cheese_${cheese.id}`}>
                                            <IngredientImg src={`${process.env.PUBLIC_URL}/${cheese.img}`} alt={`img_${cheese.eng_title}`} />
                                            {cheese.title}
                                        </label>
                                    </IngredientItem>
                                ))}
                                <IngredientItem>
                                    <InputRadio {...register("cheese", { required: true })} type="radio" id={`cheese_notSelected`} />
                                    <label htmlFor={`cheese_notSelected`}>
                                        <NotSelectedImg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                            <rect fill="none" height="256" width="256"/>
                                            <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm37.7,130.3a8.1,8.1,0,0,1,0,11.4,8.2,8.2,0,0,1-11.4,0L128,139.3l-26.3,26.4a8.2,8.2,0,0,1-11.4,0,8.1,8.1,0,0,1,0-11.4L116.7,128,90.3,101.7a8.1,8.1,0,0,1,11.4-11.4L128,116.7l26.3-26.4a8.1,8.1,0,0,1,11.4,11.4L139.3,128Z"/>
                                        </NotSelectedImg>
                                        치즈 제외
                                    </label>
                                </IngredientItem>
                            </ul>
                        </FormContent>
                    </FormStepWrap>
                    {/* 6) 추가 토핑 */}
                    <FormStepWrap>
                        <FormTitle>추가 토핑</FormTitle>
                        <FormContent>
                            <ul>
                                {data.topping.map(topping => (
                                    <IngredientItem key={topping.id}>
                                        <InputRadio {...register("topping", { required: true })} type="radio" id={`topping_${topping.id}`} />
                                        <label htmlFor={`topping_${topping.id}`}>
                                            <IngredientImg src={`${process.env.PUBLIC_URL}/${topping.img}`} alt={`img_${topping.eng_title}`} />
                                            {topping.title}
                                        </label>
                                    </IngredientItem>
                                ))}
                                <IngredientItem>
                                    <InputRadio {...register("topping", { required: true })} type="radio" id={`topping_notSelected`} />
                                    <label htmlFor={`topping_notSelected`}>
                                        <NotSelectedImg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                            <rect fill="none" height="256" width="256"/>
                                            <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm37.7,130.3a8.1,8.1,0,0,1,0,11.4,8.2,8.2,0,0,1-11.4,0L128,139.3l-26.3,26.4a8.2,8.2,0,0,1-11.4,0,8.1,8.1,0,0,1,0-11.4L116.7,128,90.3,101.7a8.1,8.1,0,0,1,11.4-11.4L128,116.7l26.3-26.4a8.1,8.1,0,0,1,11.4,11.4L139.3,128Z"/>
                                        </NotSelectedImg>
                                        선택 안함
                                    </label>
                                </IngredientItem>
                            </ul>
                        </FormContent>
                    </FormStepWrap>
                    {/* 7) 야채 - 다중 선택 */}
                    <FormStepWrap>
                        <FormTitle>야채</FormTitle>
                        <FormContent>                        
                            <ul>
                                {data.freshInfo.filter(i => i.category === "야채").map(vege => (
                                    <IngredientItem key={vege.id}>
                                        <input {...register("vegetable", { required: true })} type="checkbox" id={`vege_${vege.id}`} />
                                        <label htmlFor={`vege_${vege.id}`}>
                                            <IngredientImg src={`${process.env.PUBLIC_URL}/${vege.img}`} alt={`img_${vege.eng_title}`} />
                                            {vege.title}
                                        </label>
                                    </IngredientItem>
                                ))}
                            </ul>
                        </FormContent>
                    </FormStepWrap>
                    {/* 8) 소스 - 다중 선택(최대 3개) */}
                    <FormStepWrap>
                        <FormTitle>소스</FormTitle>
                        <FormContent>
                            <ul>
                                {data.freshInfo.filter(i => i.category === "소스").map(sauce => (
                                    <IngredientItem key={sauce.id}>
                                        <input {...register(`sauce_${sauce.id}`, { required: true })} type="checkbox" id={`sauce_${sauce.id}`} value={sauce.title} />
                                        <label htmlFor={`sauce_${sauce.id}`}>
                                            <IngredientImg src={`${process.env.PUBLIC_URL}/${sauce.img}`} alt={`img_${sauce.eng_title}`} />
                                            {sauce.title}
                                        </label>
                                    </IngredientItem>
                                ))}
                            </ul>
                        </FormContent>
                    </FormStepWrap>
                    <div>
                        <SubmitBtn type="submit">등록하기</SubmitBtn>
                    </div>
                </MyRecipeForm>
            </MyRecipeFormWrap>
        </>
    )
}

export default RegisterMyRecipe;