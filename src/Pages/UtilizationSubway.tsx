import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import data from "../data.json";
import { Fragment, useState } from "react";

const PageHeaderContainer = styled.header`
    align-items: center;
    margin: 140px 0 80px 0;
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

const UtilizationContentWrap = styled.div`
    background-color: #f6f6f6;
    position: relative;
`;

const UtilizationSlideWrap = styled.div`
    height: 695px;
    padding-top: 50px;
`;

const StepProgressContent = styled.div`
    > ol {
        display: flex;
        width: 630px;
        margin: 0 auto;
    }
`;

const SingleStepItem = styled.li<{$isActive:boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    font-size: 14px;
    font-weight: 500;
    background-color: ${(props) => props.$isActive ? props.theme.green.lighter : "#dddddd"};
    color: ${(props) => props.$isActive ? "#fff" : "#bbbbbb"};
    position: relative;
    transition: all 0.2s;   // property-name | duration
    &:not(:last-child) {
        margin-right: 70px;
    }
    &:not(:first-child)::before {
        content: '';
        width: 70px;
        height: 4px;
        background-color: ${(props) => props.$isActive ? props.theme.green.lighter : "#dddddd"};
        position: absolute;
        right: 70px;
        transition: all 0.2s;   // property-name | duration
    }
    > strong {
        font-size: 26px;
        font-weight: 700;
    }
`;

const ImgContent = styled.div`
    height: 420px;
    margin-top: 55px;
    > ol {
        height: 420px;
        display: flex;
        position: relative;
        overflow: hidden;
    }
`;

const StepImgItem = styled.li`
    width: 700px;
    position: absolute;
    opacity: 0;
    // 이전 STEP 이미지
    &.prev {
        opacity: 1;
        left: -35%;
        transition: 0.6s;
    }
    // 현재 STEP 이미지
    &.active {
        opacity: 1;
        left: 11%;
        transition: 0.6s;
    }
    // 다음 sTEP 이미지
    &.active + li {
        opacity: 1;
        left: 82%;
        transition: 0.6s;
    }
    // 화면 1024px 이하
    @media (max-width: 1024px) {
        & > img {
            width: 78%;
        }
        // 이전 STEP 이미지
        &.prev {
            left: -45%;
        }
        // 현재 STEP 이미지
        &.active {
            left: 0%;
        }
    }
`;

const StepInfoContent = styled.div`
    position: absolute;
    left: 62%;
    top: 170px;
    overflow: hidden;
    // 화면 1024px 이하
    @media (max-width: 1024px) {
        left: 50%;
    }
    > ol {
        width: 400px;
        height: 415px;
        border: 1px solid #dddddd;
        background-color: #fff;
        padding: 40px;
        position: relative;
    }
`;

const LeftIcon = styled.svg`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 40px;
    left: -24px;
`;

const StepTitle = styled.strong`
    font-size: 28px;
    font-weight: 500;
    position: relative;
    padding-top: 10px;
    padding-bottom: 30px;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 45px;
        height: 4px;
        background-color: ${(props) => props.theme.yellow.darkest};
    }
`;

const Description = styled.p`
    color: #666666;
    line-height: 1.6;
    padding-top: 15px;
`;

const ShowMoreBtnWrap = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    > a {
        color: #999999;
        font-weight: 700;
        border: 2px solid #999999;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 20px;
        margin-right: 10px;
        > span {
            white-space: nowrap;    // 자동 줄바꿈 무시
        }
    }
`;

const MagnifierIcon = styled.svg`
    width: 18px;
    height: 18px;
    margin-left: 5px;
`;

const StepInfoItem = styled.li`
    display: flex;
    flex-direction: column;
    height: 335px;
    position: absolute;
    top: 40px;
    opacity: 0;
    &.active {
        opacity: 1;
        ${StepTitle}, ${Description} {
            transform: translateY(-40px);
            transition: all 0.6s;
        }
    }
`;

const StepNum = styled.strong`
    color: ${(props) => props.theme.green.lighter};
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 40px;
`;

const SlideControlBtnWrap = styled.div`
    svg {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        position: absolute;
        top: 350px;
        padding: 5px;
        overflow: hidden;
        fill: ${(props) => props.theme.grey.darker};
        cursor: pointer;
    }
    svg:hover {
        fill: black;
        background-color: ${(props) => props.theme.yellow.lighter};
    }
`;

const PrevBtn = styled.svg`
    left: 50px;
`;

const NextBtn = styled.svg`
    right: 50px;
`;

function UtilizationSubway() {
    const subMenuInfo = [
        { index: 0, menuName: "써브웨이 이용방법", menuPath: "/utilizationSubway", menuMatch: useMatch("/utilizationSubway") },
        { index: 1, menuName: "신선한 재료 소개", menuPath: "/freshInfo", menuMatch: useMatch("/freshInfo") }
    ];
    // 현재 STEP 번호
    const [stepNum, setStepNum] = useState(1);
    const movePrevSlide = () => {
        setStepNum((prev) => prev > 1 ? prev - 1 : 1);
    };
    const moveNextSlide = () => {
        setStepNum((prev) => prev===5 ? 5 : prev + 1);
    };
    return (
        <div style={{paddingTop: "170px", minWidth: "800px"}}>
            {/* 이용방법 페이지 내부 탐색 메뉴 */}
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={false} />
            <div>
                {/* 이용 방법 헤더 */}
                <PageHeaderContainer>
                    <PageHeader>
                        <PageHeaderTitle>써브웨이 이용방법</PageHeaderTitle>
                    </PageHeader>
                </PageHeaderContainer>
                {/* 이용 방법 내용 */}
                <UtilizationContentWrap>
                    <UtilizationSlideWrap>
                        {/* STEP 진행 바 */}
                        <StepProgressContent>
                            <ol>
                                {data.utilization.map(step => (
                                    <SingleStepItem $isActive={parseInt(step.stepNum.slice(-1)) <= stepNum ? true : false} key={`stepProgress_${step.id}`}>
                                        STEP
                                        <strong>{step.stepNum.slice(-1)}</strong>
                                    </SingleStepItem>
                                ))}
                            </ol>
                        </StepProgressContent>
                        {/* STEP별 이미지 */}
                        <ImgContent>
                            <ol>
                                {data.utilization.map(step => (
                                    <StepImgItem className={parseInt(step.stepNum.slice(-1)) === stepNum ? "active" : (parseInt(step.stepNum.slice(-1)) === stepNum-1) ? "prev" : ""} key={`stepImg_${step.id}`}>
                                        <img src={`${process.env.PUBLIC_URL}/${step.img}`} alt={step.stepTitle} />
                                    </StepImgItem>
                                ))}
                            </ol>
                        </ImgContent>
                        {/* STEP별 이용방법 내용 */}
                        <StepInfoContent>
                            <ol>
                                {data.utilization.map(step => (
                                    <StepInfoItem className={parseInt(step.stepNum.slice(-1)) === stepNum ? "active" : ""} key={`stepInfo_${step.id}`}>
                                        <StepNum>{step.stepNum}</StepNum>
                                        <StepTitle>{step.stepTitle}</StepTitle>
                                        <Description>{step.description.split(" \n ").map((i, index) => <Fragment key={index}>{i}<br /></Fragment>)}</Description>
                                        <ShowMoreBtnWrap>
                                            {step.showMoreBtn.map(btn => (
                                                <Link key={btn.btnId} to={btn.url}>
                                                    <span>{btn.name}</span>
                                                    <MagnifierIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                    </MagnifierIcon>
                                                </Link>
                                            ))}
                                        </ShowMoreBtnWrap>
                                    </StepInfoItem>
                                ))}
                            </ol>
                            <LeftIcon enableBackground="new 0 0 32 32" id="Layer_4" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="6,16 26,3 26,29   " fill="#fff" stroke="#dddddd" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1"/>
                            </LeftIcon>
                        </StepInfoContent>
                    </UtilizationSlideWrap>
                    {/* 이용 방법 슬라이드 버튼 */}
                    <SlideControlBtnWrap>
                        <PrevBtn onClick={() => movePrevSlide()} viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/>
                        </PrevBtn>
                        <NextBtn onClick={() => moveNextSlide()} viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/>
                        </NextBtn>
                    </SlideControlBtnWrap>
                </UtilizationContentWrap>
            </div>
        </div>
    )
}

export default UtilizationSubway;