import { Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import SubHeader from "../Components/SubHeader";

const Container = styled.div`
    min-width: 800px;
    position: relative;
    padding-top: 170px;
`;

function MenuList() {
    const subMenuInfo = [
        { index: 0, menuName: "샌드위치", menuPath: "/menuList/sandwich", menuMatch: useMatch("/menuList/sandwich") },
        { index: 1, menuName: "랩ㆍ기타", menuPath: "/menuList/unit", menuMatch: useMatch("/menuList/unit") }
    ];
    return (
        <Container>
            {/* 메뉴소개 페이지 내부 탐색 메뉴 */}
            <SubHeader subMenuInfo={subMenuInfo} isBackgroundImg={true} />

            {/* "샌드위치" or "랩ㆍ기타" 컴포넌트*/}
            <Outlet />
        </Container>
    );
}

export default MenuList;