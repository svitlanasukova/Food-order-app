import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const validatePostalCode = value =>
	value.trim() !== '' && value.trim().length === 5;

const Checkout = props => {
	const {
		value: nameValue,
		hasError: nameHasError,
		isValid: nameIsValid,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetName,
	} = useInput(isNotEmpty);
	const {
		value: streetValue,
		hasError: streetHasError,
		isValid: streetIsValid,
		valueChangeHandler: streetChangeHandler,
		inputBlurHandler: streetBlurHandler,
		reset: resetStreet,
	} = useInput(isNotEmpty);
	const {
		value: postalValue,
		hasError: postalHasError,
		isValid: postalIsValid,
		valueChangeHandler: postalChangeHandler,
		inputBlurHandler: postalBlurHandler,
		reset: resetPostal,
	} = useInput(validatePostalCode);
	const {
		value: cityValue,
		hasError: cityHasError,
		isValid: cityIsValid,
		valueChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		reset: resetCity,
	} = useInput(isNotEmpty);

	let formIsValid =
		nameIsValid && streetIsValid && postalIsValid && cityIsValid;

	const confirmHandler = event => {
		event.preventDefault();

		if (!formIsValid) {
			if (!nameIsValid) nameBlurHandler();
			if (!streetIsValid) streetBlurHandler();
			if (!postalIsValid) postalBlurHandler();
			if (!cityIsValid) cityBlurHandler();
			return;
		}

		props.onConfirm({
			name: nameValue,
			street: streetValue,
			postalCode: postalValue,
			city: cityValue,
		});
		// console.log(nameValue, streetValue, postalValue, cityValue);

		resetName();
		resetStreet();
		resetPostal();
		resetCity();
	};

	return (
		<form onSubmit={confirmHandler}>
			<div
				className={
					nameHasError
						? classes.control + ' ' + classes.invalid
						: classes.control
				}
			>
				<label htmlFor="name">Your name</label>
				<input
					type="text"
					name="name"
					id="name"
					value={nameValue}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
				/>
				{nameHasError && <p>Please enter name.</p>}
			</div>
			<div
				className={
					streetHasError
						? classes.control + ' ' + classes.invalid
						: classes.control
				}
			>
				<label htmlFor="street">Street</label>
				<input
					type="text"
					name="street"
					id="street"
					value={streetValue}
					onChange={streetChangeHandler}
					onBlur={streetBlurHandler}
				/>
				{streetHasError && <p>Please enter street.</p>}
			</div>
			<div
				className={
					postalHasError
						? classes.control + ' ' + classes.invalid
						: classes.control
				}
			>
				<label htmlFor="postal">Postal code</label>
				<input
					type="text"
					name="postal"
					id="postal"
					value={postalValue}
					onChange={postalChangeHandler}
					onBlur={postalBlurHandler}
				/>
				{postalHasError && <p>Please enter postal code (5 characters long).</p>}
			</div>
			<div
				className={
					cityHasError
						? classes.control + ' ' + classes.invalid
						: classes.control
				}
			>
				<label htmlFor="city">City</label>
				<input
					type="text"
					name="city"
					id="city"
					value={cityValue}
					onChange={cityChangeHandler}
					onBlur={cityBlurHandler}
				/>
				{cityHasError && <p>Please enter city.</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
