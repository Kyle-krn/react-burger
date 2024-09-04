import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from './styles.module.css';
import { DraggableIngredientType } from './types';

const DraggableIngredient: FC<DraggableIngredientType> = ({name, price, image, index, onDrop, onDeleteIngredient}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{isHover}, drop] = useDrop<{index: number}, void, {isHover: boolean}>({
        accept: 'sortIngredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(draggedItem) {
            if (!ref.current) {
                return;
            }
            const dragIndex = draggedItem.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            onDrop(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        } 
    })
    const [{isDrag}, drag] = useDrag({
        type: 'sortIngredient',
        item : {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    drag(drop(ref));
    return (
        <div ref={ref}>
            <ConstructorElement
                extraClass={`${styles.draggable} ${isDrag? 'opacity-50' : ''} ${isHover? styles.hover: ''}`}
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => onDeleteIngredient(index)}
            />
        </div>
    )
}

export default DraggableIngredient;