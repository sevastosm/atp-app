import { NutritionContextProvider } from 'src/context/nutrition/NutritionContext';
import NutritionContainer from './NutritionContainer';

type Props = {};

const Nutrition = (props: Props) => {
  return (
    <NutritionContextProvider>
      <NutritionContainer />
    </NutritionContextProvider>
  );
};

export default Nutrition;
