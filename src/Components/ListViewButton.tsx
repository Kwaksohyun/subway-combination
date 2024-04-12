import { Link } from "react-router-dom";
import styled from "styled-components";

const ListViewBtnWrap = styled.div`
    background-color: ${(props) => props.theme.green.darker};
    color: #fff;
    font-weight: 500;
    width: 130px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px auto;
    > a {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const ListIcon = styled.svg`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

interface IListViewButtonProps {
    linkPath: string;
}

function ListViewButton({linkPath}: IListViewButtonProps) {
    return (
        <ListViewBtnWrap>
            <Link to={linkPath}>
                <ListIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title/>
                    <path d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Z" fill="#ffc300"/>
                    <path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#ffc300"/>
                    <path d="M19,18H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#ffc300"/>
                </ListIcon>
                <span>목록보기</span>
            </Link>
        </ListViewBtnWrap>
    )
}

export default ListViewButton;