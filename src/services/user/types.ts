import { ResponseBody } from "../../utils/api"

export type UserType = {
    email: string;
    name: string;
};

// Общие состояния запроса
export type RequestStateType = {
    isRequestStart: boolean;
    isRequestSuccess: boolean;
    isRequestFailed: boolean;
    failedText: string;
};

export type UserInitialStateType = RequestStateType & {
    user: UserType | null;
    isLoadingUser: boolean;
}

export type UserThunkArgsType = {
    email: string;
    password: string;
    name: string;
}

export interface SuccessUserResponseType extends ResponseBody {
    user: UserType;
    accessToken: string;
    refreshToken: string;
}

export type UserInfoResponseType = Omit<SuccessUserResponseType, 'accessToken' | 'refreshToken'> 

export type AccessTokenResponseType = Omit<SuccessUserResponseType, 'user'>

export interface MessageResponseType extends ResponseBody {
    message: string;
}

export type RegisterUserRequestType = UserType & {password: string};
export type LoginUserRequestType = Omit<UserType, 'name'> & {password: string};
export type ForgotPasswordRequestType = Omit<UserType, 'name'>;
export type ResetPasswordRequestType = {
    token: string;
    password: string;
}