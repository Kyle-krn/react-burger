import { Ingredient } from "../../services/ingredients/types";

export type IngredientsListType = {
    title: string;
    ingredients: Ingredient[];
    id: 'bun' | 'sauce' | 'main';
    subRef: {current: HTMLParagraphElement | null}
}