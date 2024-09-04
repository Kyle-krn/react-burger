import { Ingredient } from '../ingredients/types';

export type BurgerConstructorIngredient = Ingredient & {
    uuid: string;
}

export type BurgerConstructorState = {
    bun: Ingredient | null;
    selectedIngredients: BurgerConstructorIngredient[];
}

export type SortIngredient = {
    dragIndex: number;
    hoverIndex: number;
}