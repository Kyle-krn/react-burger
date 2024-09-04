import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { FormEvent } from "react";

export type LinkType = {
    description: string;
    hrefText: string;
    href: string;
}

export type InputType = {
    type: "text" | "email" | "password" | undefined;
    placeholder: string;
    name: string;
    value: string;
    extraClass: string;
    icon?: keyof TICons;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
    size?: 'default' | 'small'
}

export type AuthFormProps = {
    title: string;
    btnText: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    inputs: InputType[];
    links: LinkType[],
}