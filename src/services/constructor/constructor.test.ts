import reducer, {
    addIngredient,
    removeIngredient,
    resetBurgerConstructor,
    setBun,
    sortIngredient,
  } from './index';
  
  import { BurgerConstructorState, BurgerConstructorIngredient } from './types';
  import { Ingredient } from '../ingredients/types';
  import { initialState } from './index';
  
  describe('burgerConstructorSlice', () => {
    const mockIngredient: Ingredient = {
      _id: '1',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 30,
      calories: 200,
      price: 300,
      image: 'test-image',
      image_mobile: 'test-image-mobile',
      image_large: 'test-image-large',
      __v: 0,
    };
  
    const mockBurgerIngredient: BurgerConstructorIngredient = {
      ...mockIngredient,
      uuid: 'test-uuid',
    };
  
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    const addIngredientForTest = (ingredient: Ingredient) => ({
      type: addIngredient.type,
      payload: {
        ...ingredient,
        uuid: 'test-uuid', // Ваш замоканный uuid
      },
    });
  
    it('should handle addIngredient', () => {
      const newState = reducer(
        initialState,
        addIngredientForTest(mockIngredient)
      );
  
      expect(newState.selectedIngredients.length).toBe(1);
      expect(newState.selectedIngredients[0]).toEqual({
        ...mockIngredient,
        uuid: 'test-uuid', // UUID должен быть сгенерирован
      });
    });
  
    it('should handle removeIngredient', () => {
      const stateWithIngredients: BurgerConstructorState = {
        ...initialState,
        selectedIngredients: [
          mockBurgerIngredient,
        ],
      };
  
      const newState = reducer(
        stateWithIngredients,
        removeIngredient(0)
      );
  
      expect(newState.selectedIngredients.length).toBe(0);
    });
  
    it('should handle sortIngredient', () => {
      const stateWithIngredients: BurgerConstructorState = {
        ...initialState,
        selectedIngredients: [
          { ...mockIngredient, uuid: 'uuid-1' },
          { ...mockIngredient, uuid: 'uuid-2' },
        ],
      };
  
      const newState = reducer(
        stateWithIngredients,
        sortIngredient({ dragIndex: 0, hoverIndex: 1 })
      );
  
      expect(newState.selectedIngredients[0].uuid).toBe('uuid-2');
      expect(newState.selectedIngredients[1].uuid).toBe('uuid-1');
    });
  
    it('should handle setBun', () => {
      const newState = reducer(
        initialState,
        setBun(mockIngredient)
      );
  
      expect(newState.bun).toEqual(mockIngredient);
    });
  
    it('should handle resetBurgerConstructor', () => {
      const stateWithBunAndIngredients: BurgerConstructorState = {
        bun: mockIngredient,
        selectedIngredients: [
          mockBurgerIngredient,
        ],
      };
  
      const newState = reducer(
        stateWithBunAndIngredients,
        resetBurgerConstructor()
      );
  
      expect(newState).toEqual(initialState);
    });
  });