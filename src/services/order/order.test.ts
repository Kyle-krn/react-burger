import reducer, { createOrder, getOrder, resetOrder, setSelectedOrder } from './index';
import { OrderInitialStateType } from './types';
import { Order } from '../orders/types';
import { AnyAction } from 'redux';
import { unwrapResult } from '@reduxjs/toolkit';

// Мокируем request для тестов
jest.mock('../../utils/api', () => ({
    request: jest.fn(),
}));

const { request } = require('../../utils/api');

const mockOrder: Order = {
    createdAt: "2024-10-06T12:00:00.000Z",
    ingredients: ["643d69a5c3f7b9001cfa093c"],
    name: "Тестовый заказ",
    number: 12345,
    status: "pending",
    updatedAt: "2024-10-06T12:00:00.000Z",
    _id: "643d69a5c3f7b9001cfa093c"
};

const initialState: OrderInitialStateType = {
    orderRequest: false,
    orderError: false,
    orderId: null,
    order: null,
};

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'undefined' })).toEqual(initialState);
    });

    it('should handle resetOrder', () => {
        const action: AnyAction = { type: resetOrder.type };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
    });

    it('should handle setSelectedOrder', () => {
        const action: AnyAction = { type: setSelectedOrder.type, payload: mockOrder };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            order: mockOrder,
        });
    });

    it('should handle createOrder.pending', () => {
        const action: AnyAction = { type: createOrder.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderRequest: true,
            orderError: false,
        });
    });

    it('should handle createOrder.fulfilled', () => {
        const action: AnyAction = {
            type: createOrder.fulfilled.type,
            payload: { success: true, order: { number: 12345 } },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderRequest: false,
            orderId: action.payload.order.number,
        });
    });

    it('should handle createOrder.rejected', () => {
        const action: AnyAction = { type: createOrder.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderRequest: false,
            orderError: true,
            orderId: null,
        });
    });

    it('should handle getOrder.pending', () => {
        const action: AnyAction = { type: getOrder.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderRequest: true,
            orderError: false,
        });
    });

    it('should handle getOrder.fulfilled', () => {
        const action: AnyAction = {
            type: getOrder.fulfilled.type,
            payload: mockOrder,
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderRequest: false,
            order: mockOrder,
        });
    });

    it('should handle getOrder.rejected', () => {
        const action: AnyAction = { type: getOrder.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderRequest: false,
            orderError: true,
            order: null,
        });
    });
});

describe('createOrder async thunk', () => {
    it('should create order successfully', async () => {
        request.mockResolvedValue({ success: true, order: { number: 12345 } });

        const dispatch = jest.fn();
        const thunk = createOrder();

        const mockState = {
            ingredients: {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false, 
            }, // Здесь должен быть ваш макет ингредиентов
            burgerConstructor: {
                bun: { 
                    _id: 'bun_id',
                    name: 'name',
                    type: 'type',
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: 'image',
                    image_mobile: 'image_mobile',
                    image_large: 'image_large',
                    __v: 0, 
                }, // Макет булки
                selectedIngredients: [{ 
                    _id: 'ingredient_id',
                    name: 'name',
                    type: 'type',
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: 'image',
                    image_mobile: 'image_mobile',
                    image_large: 'image_large',
                    __v: 0, 
                    uuid: 'uuid' 
                }] // Макет выбранных ингредиентов
            },
            order: {
                orderRequest: false,
                orderError: false,
                orderId: null,
                order: null,
            },
            orders: {
                orders: [],
                isConnected: false,
                isError: false,
            }, // Макет заказов
            auth: {
                user: null,
                isRequestStart: false,
                isRequestSuccess: false,
                isRequestFailed: false,
                failedText: '',
                
                isLoadingUser: true,
            }, // Макет аутентификации
            feeds: {
                feeds: [],
                isConnected: false,
                isError: false,
                total: 0,
                totalToday: 0,
            } // Макет фидов
        };

        const result = await thunk(dispatch, () => mockState, undefined);
        const action = unwrapResult(result);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createOrder.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createOrder.fulfilled.type, payload: action }));
    });

    it('should handle create order failure', async () => {
        request.mockRejectedValue(new Error('Network Error'));
        const mockState = {
            ingredients: {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false, 
            }, // Здесь должен быть ваш макет ингредиентов
            burgerConstructor: {
                bun: { 
                    _id: 'bun_id',
                    name: 'name',
                    type: 'type',
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: 'image',
                    image_mobile: 'image_mobile',
                    image_large: 'image_large',
                    __v: 0, 
                }, // Макет булки
                selectedIngredients: [{ 
                    _id: 'ingredient_id',
                    name: 'name',
                    type: 'type',
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: 'image',
                    image_mobile: 'image_mobile',
                    image_large: 'image_large',
                    __v: 0, 
                    uuid: 'uuid' 
                }] // Макет выбранных ингредиентов
            },
            order: {
                orderRequest: false,
                orderError: false,
                orderId: null,
                order: null,
            },
            orders: {
                orders: [],
                isConnected: false,
                isError: false,
            }, // Макет заказов
            auth: {
                user: null,
                isRequestStart: false,
                isRequestSuccess: false,
                isRequestFailed: false,
                failedText: '',
                
                isLoadingUser: true,
            }, // Макет аутентификации
            feeds: {
                feeds: [],
                isConnected: false,
                isError: false,
                total: 0,
                totalToday: 0,
            } // Макет фидов
        };


        const dispatch = jest.fn();
        const thunk = createOrder();
        await thunk(dispatch, () => mockState, undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createOrder.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createOrder.rejected.type }));
    });
});

describe('getOrder async thunk', () => {
    it('should fetch order successfully', async () => {
        request.mockResolvedValue({ orders: [mockOrder] });

        const dispatch = jest.fn();
        const thunk = getOrder({ id: mockOrder._id });
        const result = await thunk(dispatch, () => ({}), undefined);
        const action = unwrapResult(result);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getOrder.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getOrder.fulfilled.type, payload: action }));
    });

    it('should handle fetch order failure', async () => {
        request.mockResolvedValue({ orders: [] }); // simulate not found

        const dispatch = jest.fn();
        const thunk = getOrder({ id: mockOrder._id });
        await thunk(dispatch, () => ({}), undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getOrder.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getOrder.rejected.type }));
    });
});
