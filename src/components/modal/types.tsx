export type ModalType = {
    title?: string;
    onClose(): void;
    children: React.ReactNode;
}