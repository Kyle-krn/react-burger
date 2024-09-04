export type DraggableIngredientType = {
    name: string;
    price: number;
    image: string;
    index: number;
    onDrop(dragIndex: number, hoverIndex: number): void;
    onDeleteIngredient(index: number): void;
}