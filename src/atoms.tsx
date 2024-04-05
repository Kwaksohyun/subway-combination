import { atom } from "recoil";

interface IRecipe {
    id: number;
    title: string;
    sandwich: string;
    bread: string;
    toasting: string;
    cheese: string;
    topping: string[];
    vegetable: string[];
    sauce: string[];
}

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if(savedValue !== null) {
        // setSelft: atom 값들을 설정 혹은 재설정
        setSelf(JSON.parse(savedValue));
    }
    // onSet : atom 변화가 감지될 때 작동하며 Storage에 데이터 저장
    onSet((newValue: IRecipe[]) => {
        localStorage.setItem(key, JSON.stringify(newValue));
    })

};

export const recipeState = atom<IRecipe[]>({
    key: "recipeList",
    default: [
        {
            id: 1,
            title: "베스트셀러 메뉴의 추천 꿀조합",
            sandwich: "이탈리안 비엠티",
            bread: "파마산 오레가노",
            toasting: "토스팅 O",
            cheese: "모차렐라 치즈",
            topping: [],
            vegetable: ["양상추", "토마토", "피망", "양파", "할라피뇨", "올리브", "피클"],
            sauce: ["랜치", "스위트 어니언"],
        },
        {
            id: 2,
            title: "다이어터를 위한 담백한 샌드위치",
            sandwich: "로스트 치킨",
            bread: "위트",
            toasting: "토스팅 O",
            cheese: "아메리칸 치즈",
            topping: ["아보카도"],
            vegetable: ["양상추", "토마토", "오이", "피망", "양파"],
            sauce: ["소금", "후추", "엑스트라 버진 올리브 오일"],
        },
        {
            id: 3,
            title: "매운맛에 미친자의 추천 레시피",
            sandwich: "치킨 데리야끼",
            bread: "화이트",
            toasting: "토스팅 O",
            cheese: "슈레드 치즈",
            topping: [],
            vegetable: ["양상추", "토마토", "오이", "피망", "양파", "피클", "올리브", "할라피뇨"],
            sauce: ["핫 칠리", "스모크 바비큐"],
        },
        {
            id: 4,
            title: "호불호 없이 맛있게 매운 거 좋아하시는 분들 추천",
            sandwich: "스테이크 & 치즈",
            bread: "화이트",
            toasting: "토스팅 O",
            cheese: "아메리칸 치즈",
            topping: [],
            vegetable: ["양상추", "토마토", "오이", "피망", "양파", "피클", "올리브", "할라피뇨"],
            sauce: ["스위트 칠리", "스모크 바비큐"],
        },
        {
            id: 5,
            title: "진리의 에그마요",
            sandwich: "에그마요",
            bread: "플랫브레드",
            toasting: "토스팅 O",
            cheese: "아메리칸 치즈",
            topping: ["베이컨"],
            vegetable: ["양상추", "토마토", "오이", "피망", "양파", "피클", "올리브", "할라피뇨"],
            sauce: ["랜치", "스위트 칠리"],
        },
    ],
    effects: [localStorageEffect("recipeList")]
})