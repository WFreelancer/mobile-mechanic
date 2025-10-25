import { forwardRef } from "react";
import styled from 'styled-components'
import TextField from "@mui/material/TextField";



const TextFieldEl = styled(TextField)`
	color: #fff;
	width: 100%;
	font-family: inherit;

	.MuiFormLabel-root{
		color: #fff;
		&.Mui-focused{
			color: #fff;
		}
	}

	input{
		color: #fff;
	}
	input:-internal-autofill-selected {
		appearance: none !important;
		background-image: none !important;
		background-color: transparent !important;
		color: #fff !important;
	}
	input {
		color: #fff !important;
	}
	


	.MuiOutlinedInput-root {
		fieldset {
		  border: none; /* Убирает рамку */
		  border-bottom: 1px solid #fff; /* Оставляет только нижнюю границу */
		}
  
		&:hover fieldset {
		  border-bottom: 1px solid #fff;
		}
  
		&.Mui-focused fieldset {
		  border-bottom: 1px solid var(--color-blue);
		}
	 }
`


const InputWrapper = styled.div`
	position: relative;
	cursor:pointer;
	height: 40px;
	width: 100%;
	@media (min-width: 1800px){
		height: 55px;
	}
	.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root{
		transform: translate(15px, -17px) scale(0.75);
	}
`

const InputError = styled.span`
	position: absolute;
	top: calc(100% + 20px);
	right: 0;
	color: var(--bg-pink);

	@media (min-width: 1800px){
		font-size: 1.5rem;
	};
`

// eslint-disable-next-line
const CustomInput = forwardRef(({ label, error, name, type, helperText, register, ...props }, ref) => {
	return (
		<InputWrapper>
			<TextFieldEl
				{...register(name)}
				{...props}
				type={type}
				name={name}
				label={label}
				inputRef={ref}
			/>
			{error && <InputError>{helperText || 'This field is required'}</InputError>}
		</InputWrapper>
	)
})

export { CustomInput };