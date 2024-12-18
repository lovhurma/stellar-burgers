import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { getIngredientsState } from '../../services/slices/ingredientSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientID = useParams().id;
  const ingredients = useSelector(getIngredientsState);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientID
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
