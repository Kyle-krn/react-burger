import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    bun : null,
    selectedIngredients: [],
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        addIngredient:{
            reducer(state, action) {
                state.selectedIngredients.push(action.payload);
            },
            prepare(ingredient) {
                return {
                    payload: {
                        ...ingredient,
                        uuid: uuidv4(),
                    }
                }
            }
        },
        sortIngredient(state, action) {
            const { dragIndex, hoverIndex } = action.payload;
            const draggedItem = state.selectedIngredients[dragIndex];
            state.selectedIngredients.splice(dragIndex, 1);
            state.selectedIngredients.splice(hoverIndex, 0, draggedItem);
        },
        removeIngredient (state, action) {
            state.selectedIngredients.splice(action.payload, 1);
        },
        resetBurgerConstructor (state, action) {
            return initialState;
        },
        setBun (state, action) {
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
