import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginPageWrap = styled.div`
    width: 470px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 70px 0 120px 0;
`;

const LoginPageTitle = styled.h2`
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 50px;
`;

const LoginFormWrap = styled.div`
    background-color: #fff;
    width: 470px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 70px 0;    
    form {
        width: 330px;
        margin: 0 auto;
    }
`;

const FormContent = styled.div`
    > label {
        font-weight: 500;
    }
`;

const LoginInput = styled.input`
    width: 330px;
    height: 55px;
    border: 1.5px solid #e5e5e5;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    padding-left: 10px;
    &[type="email"] {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: none;
    }
    &[type="password"] {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
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
    margin-top: 40px;
`;

const FindWrap = styled.ul`
    color: ${(props) => props.theme.grey.darker};
    font-size: 14px;
    display: flex;
    justify-content: center;
    margin-top: 25px;
    > li {
        position: relative;
        margin: 0 20px;
    }
    > li:not(:last-child)::after {
        content: '';
        position: absolute;
        background-color: #dddddd;
        width: 1px;
        height: 15px;
        right: -20px;
    }
`;

interface ILoginInfo {
    email: string;
    password: string;
}

function Login() {
    const { register, handleSubmit } = useForm<ILoginInfo>();
    const onSubmit = (loginData:ILoginInfo) => {
        console.log(loginData);
        // 로그인 로직
    }
    return (
        <div style={{paddingTop: "170px", minWidth: "800px", backgroundColor: "#f2f2f2"}}>
            <LoginPageWrap>
                <LoginPageTitle>로그인</LoginPageTitle>
                <LoginFormWrap>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormContent>                        
                            {/* <label htmlFor="email">이메일</label> */}
                            <LoginInput {...register("email", { 
                                required: "필수 정보입니다.", 
                                pattern: {value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "이메일 정보를 다시 확인해주세요."}
                                })} placeholder="이메일" type="email" id="email" />
                        </FormContent>
                        <FormContent>
                            {/* <label htmlFor="passwird">비밀번호</label> */}
                            <LoginInput {...register("password", {
                                required: "아이디를 입력해주세요."
                            })} placeholder="비밀번호" type="password" id="password" />
                        </FormContent>
                        <SubmitBtn type="submit">로그인</SubmitBtn>
                    </form>
                    <FindWrap>
                        <li><Link to={"/login"}>아이디 찾기</Link></li>
                        <li><Link to={"/login"}>비밀번호 찾기</Link></li>
                        <li><Link to={"/join"}>회원가입</Link></li>
                    </FindWrap>
                </LoginFormWrap>
            </LoginPageWrap>
        </div>
    )
}

export default Login;