import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';
import { useCallback, useEffect, useState } from 'react';

const AvailableMeals = () => {
	const { isLoading, error, sendRequest: sendMealsRequest } = useHttp();
	const [meals, setMeals] = useState([]);

	const transformMeals = useCallback(meals => {
		const loadedMeals = [];
		for (const key in meals) {
			loadedMeals.push({
				id: key,
				name: meals[key].name,
				description: meals[key].description,
				price: meals[key].price,
			});
		}

		setMeals(
			loadedMeals.map(meal => (
				<MealItem
					id={meal.id}
					key={meal.id}
					name={meal.name}
					description={meal.description}
					price={meal.price}
				/>
			)),
		);
	}, []);

	useEffect(() => {
		sendMealsRequest(
			{
				url: 'https://food-order-app-38245-default-rtdb.firebaseio.com/meals.json',
			},
			transformMeals,
		);
	}, [transformMeals, sendMealsRequest]);

	if (isLoading) {
		return (
			<section className={classes['MealsLoading']}>
				<p>Loading...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={classes['MealsError']}>
				<p>{error}</p>
			</section>
		);
	}
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{meals}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
