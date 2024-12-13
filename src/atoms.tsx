import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

// export interface IRecipe {
//     id: number;
//     date: string;
//     userEmailId: string;
//     title: string;
//     sandwich: string;
//     bread: string;
//     toasting: string;
//     cheese: string;
//     topping: string[];
//     vegetable: string[];
//     sauce: string[];
// }

// const localStorageEffect: <T>(key: string) => AtomEffect<T> = 
//     // ※제네릭 타입 : 단일 타입이 아닌 다양한 타입이 될 수 있다.
//     (key: string) => ({ setSelf, onSet }) => {
//     const savedValue = localStorage.getItem(key);
//     if(savedValue !== null) {
//         // setSelft: atom 값들을 설정 혹은 재설정
//         setSelf(JSON.parse(savedValue));
//     }
//     // onSet : atom 변화가 감지될 때 작동하며 Storage에 데이터 저장
//     onSet((newValue, _, isReset) => {
//         isReset 
//             ? localStorage.removeItem(key)
//             : localStorage.setItem(key, JSON.stringify(newValue));
//     })
// };

// 인덱스 시그니처(Index Signature) : 객체의 키 정의하는 방식
export interface ILikesType {
    [key: number]: boolean;
}

export interface ILikesCountType {
    [key: number]: number;
}

export const sessionState = atom<Session|null>({
    key: "sessionState",
    default: null,
});

// 좋아요 상태
export const likesState = atom<ILikesType>({
    key: "likesState",
    default: {},
})

// 좋아요 갯수
export const likesCountState = atom<ILikesCountType>({
    key: "likesCountState",
    default: {},
})

// export const recipeState = atom<IRecipe[]>({
//     key: "recipeList",
//     default: [
//         {
//             id: 1,
//             date: "2024-04-04",
//             userEmailId: "basiclover",
//             title: "베스트셀러 메뉴의 추천 꿀조합",
//             sandwich: "이탈리안 비엠티",
//             bread: "파마산 오레가노",
//             toasting: "토스팅 O",
//             cheese: "모차렐라 치즈",
//             topping: [],
//             vegetable: ["양상추", "토마토", "피망", "양파", "할라피뇨", "올리브", "피클"],
//             sauce: ["랜치", "스위트 어니언", "스위트 칠리",],
//         },
//         {
//             id: 2,
//             date: "2024-04-04",
//             userEmailId: "ardor",
//             title: "다이어터를 위한 담백한 샌드위치",
//             sandwich: "로스트 치킨",
//             bread: "위트",
//             toasting: "토스팅 O",
//             cheese: "아메리칸 치즈",
//             topping: ["아보카도"],
//             vegetable: ["양상추", "토마토", "오이", "피망", "양파"],
//             sauce: ["소금", "후추", "엑스트라 버진 올리브 오일"],
//         },
//         {
//             id: 3,
//             date: "2024-04-04",
//             userEmailId: "minchef",
//             title: "매운맛에 미친자의 추천 레시피",
//             sandwich: "치킨 데리야끼",
//             bread: "화이트",
//             toasting: "토스팅 O",
//             cheese: "슈레드 치즈",
//             topping: [],
//             vegetable: ["양상추", "토마토", "오이", "피망", "양파", "피클", "올리브", "할라피뇨"],
//             sauce: ["핫 칠리", "스모크 바비큐"],
//         },
//         {
//             id: 4,
//             date: "2024-04-05",
//             userEmailId: "elinPark",
//             title: "스테이크앤치즈 꿀조합 추천 이렇게 드시면 성공함",
//             sandwich: "스테이크 & 치즈",
//             bread: "하티",
//             toasting: "토스팅 O",
//             cheese: "슈레드 치즈",
//             topping: [],
//             vegetable: ["양상추", "토마토", "오이", "피망", "양파", "올리브", "할라피뇨"],
//             sauce: ["랜치", "스위트 어니언", "스모크 바비큐"],
//         },
//         {
//             id: 5,
//             date: "2024-04-05",
//             userEmailId: "soobin05",
//             title: "진리의 에그마요",
//             sandwich: "에그마요",
//             bread: "플랫브레드",
//             toasting: "토스팅 O",
//             cheese: "아메리칸 치즈",
//             topping: ["베이컨"],
//             vegetable: ["양상추", "토마토", "오이", "피망", "양파", "피클", "올리브", "할라피뇨"],
//             sauce: ["랜치", "스위트 칠리"],
//         },
//         {
//             id: 6,
//             date: "2024-04-11",
//             userEmailId: "mukzzang",
//             title: "샌드위치 1000개 먹어본 전직 써브웨이 4년 알바생의 BMT 추천 조합",
//             sandwich: "이탈리안 비엠티",
//             bread: "위트",
//             toasting: "토스팅 O",
//             cheese: "모차렐라 치즈",
//             topping: [],
//             vegetable: ["양상추", "토마토", "피망", "양파", "피클", "올리브", "할라피뇨"],
//             sauce: ["홀스래디쉬", "엑스트라 버진 올리브 오일", "후추"],
//         },
//     ],
//     effects: [localStorageEffect("recipeList")]
// })