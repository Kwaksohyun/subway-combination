import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        green: {
            lighter: string;
            darker: string;
        }
        yellow: {
            lighter: string;
            darker: string;
            darkest: string;
        },
        grey: {
            lighter: string;
            darker: string;
        },
        brown: {
            darker: string;
        }
    }
}