import { Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import SubHeader from "../Components/SubHeader";

const Container = styled.div`
    position: relative;
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

            <Outlet />
        </Container>
    );
}

export default MenuList;