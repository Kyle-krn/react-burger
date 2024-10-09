import userReducer, {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    getUserInfo,
    upadteUserInfo,
    resetRequest,
} from './index';
import { SuccessUserResponseType } from './types';

describe('userReducer', () => {
    const initialState = {
        user: null,
        isRequestStart: false,
        isRequestSuccess: false,
        isRequestFailed: false,
        failedText: '',
        isLoadingUser: true,
    };

    it('должен вернуть начальное состояние', () => {
        const result = userReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    it('должен начинать запрос при registerUser.pending', () => {
        const result = userReducer(initialState, registerUser.pending('', { email: '', password: '', name: '' }));
        expect(result.isRequestStart).toBe(true);
        expect(result.isRequestFailed).toBe(false);
        expect(result.isRequestSuccess).toBe(false);
    });

    it('должен обновлять состояние при успешной регистрации пользователя', () => {
        const mockResponse: SuccessUserResponseType = {
            success: true,
            user: { email: 'test@example.com', name: 'Test User' },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };

        const result = userReducer(initialState, registerUser.fulfilled(mockResponse, '', { email: '', password: '', name: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestSuccess).toBe(true);
        expect(result.isRequestFailed).toBe(false);
        expect(result.user).toEqual(mockResponse.user);
    });

    it('должен обновлять состояние при неуспешной регистрации пользователя', () => {
        const result = userReducer(initialState, registerUser.rejected(null, '', { email: '', password: '', name: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestFailed).toBe(true);
        expect(result.isRequestSuccess).toBe(false);
        expect(result.failedText).toBe('Что-то пошло не так.'); // В вашем коде по умолчанию
    });

    it('должен обновлять состояние при успешном входе пользователя', () => {
        const mockResponse: SuccessUserResponseType = {
            success: true,
            user: { email: 'test@example.com', name: 'Test User' },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };

        const result = userReducer(initialState, loginUser.fulfilled(mockResponse, '', { email: '', password: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestSuccess).toBe(true);
        expect(result.isRequestFailed).toBe(false);
        expect(result.user).toEqual(mockResponse.user);
    });

    it('должен обновлять состояние при неуспешном входе пользователя', () => {
        const result = userReducer(initialState, loginUser.rejected(null, '', { email: '', password: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestFailed).toBe(true);
        expect(result.isRequestSuccess).toBe(false);
        expect(result.failedText).toBe('Что-то пошло не так.'); // В вашем коде по умолчанию
    });

    it('должен очищать состояние при logoutUser', () => {
        const result = userReducer(initialState, logoutUser.fulfilled({ success: true, message: 'Logged out' }, ''));
        expect(result.user).toBeNull();
        expect(result.isLoadingUser).toBe(false);
    });

    it('должен очищать состояние при успешной смене пароля', () => {
        const result = userReducer(initialState, resetPassword.fulfilled({ success: true, message: 'Password reset successful' }, '', { password: '', token: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestSuccess).toBe(true);
        expect(result.isRequestFailed).toBe(false);
    });

    it('должен очищать состояние при неуспешной смене пароля', () => {
        const result = userReducer(initialState, resetPassword.rejected(null, '', { password: '', token: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestFailed).toBe(true);
        expect(result.isRequestSuccess).toBe(false);
    });

    it('должен очищать состояние запроса', () => {
        const result = userReducer(initialState, resetRequest());
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestSuccess).toBe(false);
        expect(result.isRequestFailed).toBe(false);
    });

    it('должен загружать информацию о пользователе при getUserInfo.fulfilled', () => {
        const mockResponse = {
            success: true,
            user: { email: 'test@example.com', name: 'Test User' },
        };

        const result = userReducer(initialState, getUserInfo.fulfilled(mockResponse, ''));
        expect(result.isLoadingUser).toBe(false);
        expect(result.user).toEqual(mockResponse.user);
    });
    

    it('должен обновлять информацию о пользователе при upadteUserInfo.fulfilled', () => {
        const mockResponse: SuccessUserResponseType = {
            success: true,
            user: { email: 'updated@example.com', name: 'Updated User' },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };

        const result = userReducer(initialState, upadteUserInfo.fulfilled(mockResponse, '', { email: '', password: '', name: '' }));
        expect(result.isRequestStart).toBe(false);
        expect(result.isRequestSuccess).toBe(true);
        expect(result.isRequestFailed).toBe(false);
        expect(result.user).toEqual(mockResponse.user);
    });
});
