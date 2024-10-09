import reducer, { getIngredients } from './index';
import { IngredientInitialState, Ingredient } from './types';
import { AnyAction } from 'redux';
import { unwrapResult } from '@reduxjs/toolkit';

// Мокируем request для тестов
jest.mock('../../utils/api', () => ({
    request: jest.fn(),
}));

const { request } = require('../../utils/api');

const mockIngredients: Ingredient[] = [
    {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
    },
    {
        _id: "643d69a5c3f7b9001cfa093b",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 90,
        fat: 30,
        carbohydrates: 70,
        calories: 510,
        price: 2000,
        image: "https://code.s3.yandex.net/react/code/bun-03.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-03-large.png",
        __v: 0
    }
];

const initialState: IngredientInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'undefined' })).toEqual(initialState);
    });

    it('should handle getIngredients.pending', () => {
        const action: AnyAction = { type: getIngredients.pending.type, meta: { arg: undefined } };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false,
        });
    });

    it('should handle getIngredients.fulfilled', () => {
        const action: AnyAction = {
            type: getIngredients.fulfilled.type,
            payload: mockIngredients,
            meta: { arg: undefined },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredients: mockIngredients,
            ingredientsRequest: false,
        });
    });

    it('should handle getIngredients.rejected', () => {
        const action: AnyAction = {
            type: getIngredients.rejected.type,
            error: { message: 'Error' },
            meta: { arg: undefined },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true,
            ingredients: [],
        });
    });
});

describe('getIngredients async thunk', () => {
    it('should fetch ingredients successfully', async () => {
        request.mockResolvedValue({ data: mockIngredients });

        const dispatch = jest.fn();
        const thunk = getIngredients();
        const result = await thunk(dispatch, () => ({}), undefined);
        const action = unwrapResult(result);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getIngredients.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getIngredients.fulfilled.type, payload: action }));
    });

    it('should handle fetch ingredients failure', async () => {
        request.mockRejectedValue(new Error('Network Error'));

        const dispatch = jest.fn();
        const thunk = getIngredients();
        await thunk(dispatch, () => ({}), undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getIngredients.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getIngredients.rejected.type }));
    });
});
