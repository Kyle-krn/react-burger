import PropTypes from 'prop-types';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from './styles.module.css';

const DraggableIngredient = ({name, price, image, index, onDrop, onDeleteIngredient}) => {
    const ref = useRef();
    const [{isHover}, drop] = useDrop({
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

DraggableIngredient.propTypes = {
    name: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired, 
    onDrop: PropTypes.func.isRequired,
    onDeleteIngredient: PropTypes.func.isRequired,
}

export default DraggableIngredient;