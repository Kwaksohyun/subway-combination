import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        green: {
            lighter: string;
            darker: string;
        }
        yellow: {
            darker: string;
            lighter: string;
        },
        grey: {
            lighter: string;
            darker: string;
        }
    }
}