import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { BurgerConstructorState, BurgerConstructorIngredient, SortIngredient } from './types';
import { Ingredient } from '../ingredients/types';


const initialState: BurgerConstructorState = {
    bun : null,
    selectedIngredients: [],
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        addIngredient:{
            reducer(state, action: PayloadAction<BurgerConstructorIngredient>) {
                state.selectedIngredients.push(action.payload);
            },
            prepare(ingredient: Ingredient) {
                return {
                    payload: {
                        ...ingredient,
                        uuid: uuidv4(),
                    } as BurgerConstructorIngredient
                }
            }
        },
        sortIngredient(state, action: PayloadAction<SortIngredient>) {
            const { dragIndex, hoverIndex } = action.payload;
            const draggedItem = state.selectedIngredients[dragIndex];
            state.selectedIngredients.splice(dragIndex, 1);
            state.selectedIngredients.splice(hoverIndex, 0, draggedItem);
        },
        removeIngredient (state, action: PayloadAction<number>) {
            state.selectedIngredients.splice(action.payload, 1);
        },
        resetBurgerConstructor (state) {
            return initialState;
        },
        setBun (state, action: PayloadAction<Ingredient>) {
            state.bun = action.payload;
        },
    },
  }) 


const { actions, reducer } = burgerConstructorSlice;

export const {
    addIngredient,
    removeIngredient,
    resetBurgerConstructor,
    setBun,
    sortIngredient,
} = actions;

export default reducer;
