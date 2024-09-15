import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabaseClient";

const JoinPageWrap = styled.div`
    width: 470px;
    padding: 70px 0 120px 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const JoinPageTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 50px;
`;

const JoinFormWrap = styled.div`
    background-color: #fff;
    width: 470px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 50px 0;
`;

const JoinForm = styled.form`
    width: 330px;
    margin: 0 auto;
`;

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    > label {
        font-weight: 500;
    }
    > input {
        width: 330px;
        height: 55px;
        border-radius: 10px;
        border: 2px solid #e5e5e5;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 15px;
        padding-left: 10px;
        margin-top: 5px;
    }
`;

const ErrorMessage = styled.p`
    font-size: 13px;
    padding: 2px 0 0 5px;
    color: #ff4343;
`;

const SubmitBtnWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
`;

const SubmitBtn = styled.button`
    border: 0;
    width: 330px;
    height: 45px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.green.lighter};
    color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`;

interface IUserInfo {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Join() {
    const { register, watch, getValues, setError, clearErrors,
         handleSubmit, formState:{errors} } = useForm<IUserInfo>();
    const navigate = useNavigate();
    
    // 비밀번호 일치 여부 확인
    useEffect(() => {
        if(watch("password") !== watch("confirmPassword") && watch("confirmPassword")) {
            // "confirmPassword" 필드의 오류 설정
            setError("confirmPassword", {
                type: "confirmPassword",
                message: "비밀번호가 일치하지 않습니다.",
            })
        } else {
            // 비밀번호 일치 시, "confirmPassword" 필드에 입력한 값이 없을 때 오류 제거
            clearErrors("confirmPassword");
        } 
    }, [watch, setError, clearErrors])

    // supabase 회원가입
    const signUpHandler = async (userData:IUserInfo) => {
        try {
            // 1. supabase.auth.signUp 메소드로 회원가입 (새로운 사용자 등록)
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        username: userData.userName,
                    }
                }
            });
            // 2. 회원가입 성공 시 user_info 데이터베이스에 사용자 정보 저장
            const userInfoData = await supabase.from("user_info").insert({
                id: data.user?.id,                   // 회원가입 성공 시 받아온 data 중 id(uid) 값을 가져온다.
                created_at: data.user?.created_at,   // 사용자가 등록한 시점의 timestamp
                username: userData.userName,
                email: data.user?.email
            });

            if(error) {
                // 에러 발생 시, 에러 메세지 담은 경고창 띄우기
                alert(`회원가입 실패 : ${error.message}`);
                console.log(userInfoData);
            } else {
                // 회원가입 성공 시, 성공 메시지 띄우고 로그인 페이지로 이동
                // console.log(data);
                alert(`회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.`);
                navigate("/login");
            };
        } catch(error) {
            // 예상치 못한 오류 처리
            console.log(error);
            alert("예상치 못한 문제가 발생하였습니다. 다시 시도해주세요.");
        }
    }
    return (
        <div style={{paddingTop: "170px", minWidth: "800px", backgroundColor: "#f2f2f2"}}>
            <JoinPageWrap>
                <JoinPageTitle>회원가입</JoinPageTitle>
                <JoinFormWrap>
                    <JoinForm onSubmit={handleSubmit(signUpHandler)}>
                        <FormContent>
                            <label htmlFor="userName">이름</label>
                            <input {...register("userName", { required: "필수 정보입니다." })} placeholder="이름" type="text" id="userName"/>
                            {errors.userName && (
                                <ErrorMessage>{errors.userName.message}</ErrorMessage>
                            )}
                        </FormContent>
                        <FormContent>
                            <label htmlFor="email">이메일</label>
                            <input {...register("email", { 
                                required: "필수 정보입니다.", 
                                pattern: {value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "이메일 정보를 다시 확인해주세요."}
                                })} placeholder="이메일" type="email" id="email" />
                            {errors.email && (
                                <ErrorMessage>{errors.email.message}</ErrorMessage>
                            )}
                        </FormContent>
                        <FormContent>
                            <label htmlFor="password">비밀번호</label>
                            {/* 최소 8자리 이상 영문, 숫자 각각 1개 이상 */}
                            <input {...register("password", { 
                                required: "필수 정보입니다.", 
                                maxLength: {value: 16, message: "비밀번호는 최대 16자 이하입니다."}, 
                                pattern: {value: /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/, message: "8~16자의 영문, 숫자 조합으로 입력해주세요."}
                                })} placeholder="비밀번호(영문, 숫자 포함 8~16자)" type="password" id="password"/>
                            {errors.password &&  (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </FormContent>
                        <FormContent>
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <input {...register("confirmPassword", { 
                                required: "필수 정보입니다.",
                                validate: {
                                    confirmPassword: (value) => {
                                        const password = getValues("password");
                                        return password === value || '비밀번호가 일치하지 않습니다.'
                                    }
                                }
                                })} placeholder="비밀번호 확인" type="password" id="confirmPassword"/>
                            {errors.confirmPassword && (
                                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                            )}
                        </FormContent>
                        <SubmitBtnWrap>
                            <SubmitBtn type="submit">회원가입 완료</SubmitBtn>
                        </SubmitBtnWrap>
                    </JoinForm>
                </JoinFormWrap>
            </JoinPageWrap>
        </div>
    )
}

export default Join;