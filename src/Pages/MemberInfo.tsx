import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUserInfo from "../hooks/useUserInfo";
import supabase from "../supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

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
`;

const EditMemInfoTitle = styled.div`
    width: 700px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 7px;
    > h3 {
        font-size: 24px;
        font-weight: 500;
        padding-bottom: 15px;
    }
    > span {
        font-size: 13px;
        color: #666666;
    }
    > span::before {
        content: "*";
        color: #e85a1c;
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
    > span {
        color: #e85a1c;
    }
`;

const InfoTableContent = styled.td`
    display: flex;
    flex-direction: column;
    &.username {
        display: block;
    }
    
    > span {
        padding: 0 2px 0 2px;
    }
`;

const InfoInputWrap = styled.div`
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

const ErrorMessage = styled.p`
    font-size: 12px;
    color: #e85a1c;
    margin-top: 3px;
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
    color: ${(props) => props.theme.green.darkest};
`;

const EditBtn = styled(Button)`
    border: 0;
    background-color: ${(props) => props.theme.green.lighter};
    color: #fff;
`;

interface IEditUserInfoForm {
    username: string;
    birth_date_year: string;     // 입력 안 했을 때 → ""
    birth_date_month: string;
    birth_date_day: string;
    phone1: string;
    phone2: string;
    phone3: string;
}

interface IEditedInfo {
    username: string;
    birth_date?: string;
    phone?: string;
}

function MemberInfo() {
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, formState:{errors} } = useForm<IEditUserInfoForm>();

    const { userInfoData, isLoading, userInfoError } = useUserInfo();

    const queryClient = useQueryClient();

    if(userInfoError) {
        return <Loading>사용자 정보를 가져오는데 실패했습니다.</Loading>
    }

    // 회원 정보 수정
    const updateUserInfo = async (data:IEditUserInfoForm) => {        
        const editedUserInfoObj:IEditedInfo = {
            username: data.username.trim(),
        }
        // 생년월일 모두 입력된 경우에 추가
        if(data.birth_date_year && data.birth_date_month && data.birth_date_day) {
            editedUserInfoObj.birth_date = `${data.birth_date_year}-${data.birth_date_month}-${data.birth_date_day}`;
        }
        // 전화번호 모두 입력된 경우에 추가
        if(data.phone1 && data.phone2 && data.phone3) {
            editedUserInfoObj.phone = `${data.phone1}-${data.phone2}-${data.phone3}`;
        }
        try {
            if(window.confirm("입력하신 내용으로 회원정보를 수정하시겠습니까?")) {
                const { error: editUserInfoError } = await supabase
                    .from('user_info')
                    .update(editedUserInfoObj)
                    .eq('id', userInfoData.id);
                if(editUserInfoError) {
                    alert("회원 정보 수정 중 오류가 발생했습니다.");
                    throw new Error(editUserInfoError.message);
                } else {
                    // 캐시 무효화(쿼리 재요청) : 회원 정보 수정 후 최신 데이터로 새로 가져오기
                    queryClient.invalidateQueries({
                        queryKey: ['userInfo']
                    });
                    alert("회원 정보를 수정하였습니다.");
                    navigate("/myPage");
                }
            }
        } catch(error) {
            console.log("회원 정보 수정 중 오류가 발생했습니다.", error);
        }
    }

    return (
        <div style={{paddingTop: "170px", minWidth: "800px", backgroundColor: "#f2f2f2"}}>
            <EditMemberInfoPageWrap>
                <EditMemberInfoTitle>회원정보 수정</EditMemberInfoTitle>
                {isLoading ? <Loading>Loading...</Loading> : (
                    <EditMemInfoFormWrap>
                        <EditMemInfoTitle>
                            <h3>회원 정보</h3>
                            <span>필수 입력 항목</span>
                        </EditMemInfoTitle>
                        <EditMemInfoForm>
                            <table>
                                <tbody>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>이메일</InfoTableRowTitle>
                                        <InfoTableContent>{userInfoData?.email}</InfoTableContent>
                                    </InfoTableRow>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>이름<span>*</span></InfoTableRowTitle>
                                        <InfoTableContent className="username">
                                            <UserNameInput {...register("username", { required: "이름을 입력해주세요." })} title="이름" type="text" id="username" defaultValue={userInfoData?.username} />
                                            {errors.username && <ErrorMessage>{errors.username.message?.toString()}</ErrorMessage>}
                                        </InfoTableContent>
                                    </InfoTableRow>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>생년월일</InfoTableRowTitle>
                                        <InfoTableContent>
                                            <InfoInputWrap>
                                                <BirthDateInput {...register("birth_date_year", { 
                                                        pattern: { value: /^(19[0-9][0-9]|20\d{2})$/, message: "생년월일을 확인해주세요." },
                                                        maxLength: { value: 4, message: "생년월일을 확인해주세요." },
                                                        validate: {
                                                            // 입력 필드 중 일부만 입력한 경우 나머지 필드도 입력하도록
                                                            validateRequiredGroup: (value) => {
                                                                const { birth_date_month, birth_date_day } = getValues();
                                                                if((value || birth_date_month || birth_date_day) && !(value && birth_date_month && birth_date_day)) {
                                                                    return "생년월일 8자리를 모두 입력해 주세요.";
                                                                }
                                                                return true;
                                                            }
                                                        }
                                                    })} 
                                                    title="출생연도" placeholder="YYYY" type="text" id="birth_date_year" 
                                                    defaultValue={userInfoData?.birth_date ? userInfoData?.birth_date.split("-")[0] : ""} />
                                                <BirthDateInput {...register("birth_date_month",{ 
                                                        pattern: { value: /^(0[0-9]|1[0-2])$/, message: "생년월일을 확인해주세요." }
                                                    })}
                                                    title="월" placeholder="MM" type="text" id="birth_date_month" 
                                                    defaultValue={userInfoData?.birth_date ? userInfoData?.birth_date.split("-")[1] : ""} />
                                                <BirthDateInput {...register("birth_date_day", { 
                                                        pattern: { value: /^(0[1-9]|[1-2][0-9]|3[0-1])$/, message: "생년월일을 확인해주세요." }
                                                    })} 
                                                    title="일" placeholder="DD" type="text" id="birth_date_day" 
                                                    defaultValue={userInfoData?.birth_date ? userInfoData?.birth_date.split("-")[2] : ""} />
                                            </InfoInputWrap>
                                            {(errors.birth_date_year || errors.birth_date_month || errors.birth_date_day) && (
                                                <ErrorMessage>
                                                    {errors.birth_date_year?.message?.toString() || errors.birth_date_month?.message?.toString() || errors.birth_date_day?.message?.toString()}
                                                </ErrorMessage>
                                            )}
                                        </InfoTableContent>
                                    </InfoTableRow>
                                    <InfoTableRow>
                                        <InfoTableRowTitle>전화번호</InfoTableRowTitle>
                                        <InfoTableContent>
                                            <InfoInputWrap>
                                                <select {...register("phone1")} title="휴대폰 국번">
                                                    <option value="010">010</option>
                                                    <option value="011">011</option>
                                                    <option value="016">016</option>
                                                    <option value="017">017</option>
                                                    <option value="018">018</option>
                                                    <option value="019">019</option>
                                                </select>
                                                <span>-</span>
                                                <InfoInput {...register("phone2", { 
                                                    pattern: { value: /^([0-9]{3,4})$/, message: "전화번호를 확인해주세요."},
                                                    validate: (value) => {
                                                        // 입력 필드 중 일부만 입력한 경우 나머지 필드도 입력하도록
                                                        const { phone3 } = getValues();
                                                        if((value || phone3) && !(value && phone3)) {
                                                            return "전화번호를 모두 입력해 주세요.";
                                                        }
                                                        return true;
                                                    }
                                                    })} 
                                                    defaultValue={userInfoData?.phone ? userInfoData?.phone.split("-")[1] : ""} type="text" id="phone2" title="휴대폰 앞자리" />
                                                <span>-</span>
                                                <InfoInput {...register("phone3", { pattern: { value: /^([0-9]{4})$/, message: "전화번호를 확인해주세요."} })} 
                                                    defaultValue={userInfoData?.phone ? userInfoData?.phone.split("-")[2] : ""} type="text" id="phone3" title="휴대폰 뒷자리"/>
                                            </InfoInputWrap>
                                            {(errors.phone2 || errors.phone3) && (
                                                <ErrorMessage>
                                                    {errors.phone2?.message?.toString() || errors.phone3?.message?.toString()}
                                                </ErrorMessage>
                                            )}
                                        </InfoTableContent>
                                    </InfoTableRow>
                                </tbody>
                            </table>
                            <BtnWrap>
                                <CancelBtn type="button" onClick={() => navigate("/myPage")}>취소</CancelBtn>
                                <EditBtn type="button" onClick={handleSubmit(updateUserInfo)}>수정</EditBtn>
                            </BtnWrap>
                        </EditMemInfoForm>
                    </EditMemInfoFormWrap>
                )}
                
            </EditMemberInfoPageWrap>
        </div>
    )
}

export default MemberInfo;