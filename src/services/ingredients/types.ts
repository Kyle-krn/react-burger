import { ResponseBody } from "../../utils/api";

export type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type IngredientInitialState = {
    ingredients: Ingredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

export interface IngredientsResponse extends ResponseBody {
    data: Ingredient[]
}