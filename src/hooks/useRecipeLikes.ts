import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

// 인덱스 시그니처(Index Signature) : 객체의 키 정의하는 방식
interface ILikesType {
    [key: number]: boolean;
}

interface ILikesCountType {
    [key: number]: number;
}

export const useRecipeLikes = () => {
    const [likes, setLikes] = useState<ILikesType>({});
    const [likesCount, setLikesCount] = useState<ILikesCountType>({});
    const session = useRecoilValue(sessionState);
    const navigate = useNavigate();

    // 로그인 확인 함수
    const checkLoginState = () => {
        if(!session?.user.confirmed_at) {
            if(window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                navigate("/login", { state: "MyRecipeDetail" });
            }
            return false;   // 로그인하지 않은 경우 false 반환
        } 
        return true;    // 로그인한 경우 true 반환
    };

    // 좋아요 버튼 클릭 시 실행행
    const handleManageRecipeLike = async (recipeId:number) => {
        if(!checkLoginState()) return;

        const { error: recipeLikesError } = await supabase
            .from('recipe_likes')
            .upsert({
                user_id: session?.user?.id,
                recipe_id: recipeId,
                is_liked: !likes[recipeId],
            }, { onConflict: 'user_id, recipe_id' });

        if(recipeLikesError) {
            console.log("좋아요 상태 업데이트 실패: ", recipeLikesError);
        } else {
            setLikes((prevLikes) => ({
                ...prevLikes,
                [+recipeId]: !prevLikes[recipeId],
            }))
            setLikesCount((prevCounts) => ({
                ...prevCounts,
                [+recipeId]: (prevCounts[+recipeId] || 0) + (!likes[recipeId] ? 1 : -1)
                // prevCounts[+recipeId]가 undefined인 경우 0으로 쳐리
            }))
        }
    }

    const handleRecipeLikeClick = (recipeId:number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();

        handleManageRecipeLike(recipeId);
    }

    useEffect(() => {
        // 현재 로그인한 사용자의 좋아요 데이터
        const fetchUserLikedRecipes = async () => {
            const { data: usersLikedData, error: usersLikedFetchError } = await supabase
            .from('recipe_likes')
            .select('recipe_id, is_liked')
            .eq('user_id', session?.user?.id)
            .eq('is_liked', true);

            if(usersLikedFetchError) {
                console.log("사용자 좋아요 데이터 불러오기 실패: ", usersLikedFetchError.message);
            } else {
                const initialLikes = usersLikedData.reduce<ILikesType>((acc, recipe) => {
                    acc[recipe.recipe_id] = recipe.is_liked;
                    return acc;
                }, {});
                setLikes(initialLikes);
            }
        }

        // 사용자가 로그인 한 경우에만 실행
        if(session?.user?.id) {
            fetchUserLikedRecipes();
        }
    }, [session?.user?.id]);

    useEffect(() => {
        // 모든 레시피의 좋아요 카운트 가져오기
        const fetchRecipeLikesCount = async () => {
            const { data: likedData, error: likedFetchError } = await supabase
                .from('recipe_likes')
                .select('recipe_id')
                .eq('is_liked', true);

            if(likedFetchError) {
                console.log("좋아요 데이터 불러오기 실패: ", likedFetchError.message);
            } else {
                // 레시피별 좋아요 받은 횟수 카운트({1:2, 2:1, 3:5})
                const likesCount = likedData.reduce<ILikesCountType>((acc, recipe) => {
                    acc[recipe.recipe_id] = acc[recipe.recipe_id] ? acc[recipe.recipe_id]+1 : 1;
                    return acc;
                }, {})
                setLikesCount(likesCount);
            }
        }

        fetchRecipeLikesCount();
    }, [setLikes, setLikesCount])

    return { likes, likesCount, handleManageRecipeLike, handleRecipeLikeClick };
}