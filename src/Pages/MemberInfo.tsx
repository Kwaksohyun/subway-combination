import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sessionState } from "../atoms";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

const EditMemberInfoPageWrap = styled.div`
    width: 800px;
    padding: 70px 0 120px 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const EditMemberInfoTitle = styled.h2`
    font-size: 36px;
    font-weight: 500;
    padding-bottom: 50px;
`;

const Loading = styled.h2`
    text-align: center;
`;

const EditMemInfoFormWrap = styled.div`
    background-color: #fff;
    width: 800px;
    padding: 45px;
    > h3 {
        font-size: 22px;
        font-weight: 500;
        color: #666666;
        margin-bottom: 20px;
    }
`;

const EditMemInfoForm = styled.form`
    width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    > table {
        width: 700px;
        border: 1.5px solid ${(props) => props.theme.grey.lighter};
        border-collapse: separate;
        border-spacing: 35px 37px;
    }
`;

const InfoTableRow = styled.tr``;

const InfoTableRowTitle = styled.th`
    color: #666666;
    font-weight: 500;
    text-align: left;
    width: 100px;
`;

const InfoTableContent = styled.td`
    display: flex;
    align-items: center;
    > select {
        outline: none;
        width: 60px;
        height: 33px;
        border-radius: 7px;
        padding: 0 5px;
        border: 1px solid #dadada;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 15px;
    }
    > span {
        padding: 0 2px 0 2px;
    }
`;

const InfoInput = styled.input`
    border: none;
    width: 55px;
    height: 33px;
    border-radius: 5px;
    border: 1px solid #dadada;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    text-align: center;
`;

const UserNameInput = styled(InfoInput)`
    width: 130px;
    text-align: start;
`;

const BirthDateInput = styled(InfoInput)`
    margin-right: 5px;
`;

const BtnWrap = styled.div`
    width: 250px;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.button`
    width: 110px;
    height: 40px;
    border-radius: 20px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`;

const CancelBtn = styled(Button)`
    border: 2px solid ${(props) => props.theme.green.lighter};
    background-color: #fff;
    color: ${(props) => props.theme.green.darker};
`;

const EditBtn = styled(Button)`
    border: 0;
    background-color: ${(props) => props.theme.green.lighter};
    color: #fff;
`;

function MemberInfo() {
    const session = useRecoilValue(sessionState);
    const navigate = useNavigate();
    const { register } = useForm();

    const fetchUserInfoData = async () => {
        const { data, error } = await supabase
            .from('user_info')
            .select()
            .eq('id', session?.user?.id);
        if(error) {
            console.log("error: ", error);
            return null;
        } else {
            return data[0];
        }
    }

    const { data: userInfoData, isLoading } = useQuery({
        queryKey: ["userInfo"],
        queryFn: fetchUserInfoData,
        enabled: !!session?.user.id     // 세션 데이터가 있을 때만 쿼리 요청
    });

    return (
        <div style={{paddingTop: "170px", minWidth: "800px", backgroundColor: "#f2f2f2"}}>
            <EditMemberInfoPageWrap>
                <EditMemberInfoTitle>회원정보 수정</EditMemberInfoTitle>
                {isLoading ? <Loading>Loading...</Loading> : (
                    <EditMemInfoFormWrap>
                        <h3>회원 정보</h3>
                        <EditMemInfoForm>
                            <table>
                                <tbody>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>이메일</InfoTableRowTitle>
                                        <InfoTableContent>{userInfoData?.email}</InfoTableContent>
                                    </InfoTableRow>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>이름</InfoTableRowTitle>
                                        <InfoTableContent>
                                            <UserNameInput {...register("username", { required: true })} title="이름" type="text" id="username" defaultValue={userInfoData?.username} />
                                        </InfoTableContent>
                                    </InfoTableRow>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>생년월일</InfoTableRowTitle>
                                        <InfoTableContent>
                                            <BirthDateInput {...register("birth_date_year",{ pattern: /^(19[0-9][0-9]|20\d{2})$/ })} 
                                                title="출생연도" placeholder="YYYY" type="text" id="birth_date_year" defaultValue={userInfoData?.birth_date.split("-")[0]} />
                                            <BirthDateInput {...register("birth_date_month",{ pattern: /^(0[0-9]|1[0-2])$/ })}
                                                title="월" placeholder="MM" type="text" id="birth_date_month" defaultValue={userInfoData?.birth_date.split("-")[1]} />
                                            <BirthDateInput {...register("birth_date_day", { pattern: /^(0[1-9]|[1-2][0-9]|3[0-1])$/ })} 
                                                title="일" placeholder="DD" type="text" id="birth_date_day" defaultValue={userInfoData?.birth_date.split("-")[2]} />
                                        </InfoTableContent>
                                    </InfoTableRow>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>전화번호</InfoTableRowTitle>
                                        <InfoTableContent>
                                            <select {...register("phone1")} title="휴대폰 국번">
                                                <option value="010" selected>010</option>
                                                <option value="011">011</option>
                                                <option value="016">016</option>
                                                <option value="017">017</option>
                                                <option value="018">018</option>
                                                <option value="019">019</option>
                                            </select>
                                            <span>-</span>
                                            <InfoInput {...register("phone2", { pattern: /^([0-9]{3,4})$/ })} 
                                                defaultValue={userInfoData?.phone.split("-")[1]} type="text" id="phone2" title="휴대폰 앞자리" />
                                            <span>-</span>
                                            <InfoInput {...register("phone3", { pattern: /^([0-9]{4})$/ })} 
                                                defaultValue={userInfoData?.phone.split("-")[2]} type="text" id="phone3" title="휴대폰 뒷자리"/>
                                        </InfoTableContent>
                                    </InfoTableRow>
                                </tbody>
                            </table>
                            <BtnWrap>
                                <CancelBtn type="button" onClick={() => navigate("/myPage")}>취소</CancelBtn>
                                <EditBtn type="button">수정</EditBtn>
                            </BtnWrap>
                        </EditMemInfoForm>
                    </EditMemInfoFormWrap>
                )}
                
            </EditMemberInfoPageWrap>
        </div>
    )
}

export default MemberInfo;