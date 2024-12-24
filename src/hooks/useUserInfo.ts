import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import supabase from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";

function useUserInfo() {
    const session = useRecoilValue(sessionState);

    const fetchUserInfoData = async () => {
        const { data, error } = await supabase
            .from('user_info')
            .select()
            .eq('id', session?.user?.id)
            .single();
        if(error) {
            throw new Error("사용자 정보를 가져오지 못했습니다.");
        } else {
            return data;
        }
    }

    const { data: userInfoData, isLoading, error: userInfoError } = useQuery({
        queryKey: ["userInfo", session?.user.id],
        queryFn: fetchUserInfoData,
        enabled: !!session?.user.id     // 세션 데이터가 있을 때만 쿼리 요청
    });

    return { userInfoData, isLoading, userInfoError }
}

export default useUserInfo;