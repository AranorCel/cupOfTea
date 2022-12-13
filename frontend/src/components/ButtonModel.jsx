import { Box, Button } from '@mui/material';

const ButtonModel = ({ handleClick, type, label }) => {
	return (
		<Box
			m={1}
			display="flex"
			justifyContent="center"
			alignItems="center"
			onClick={handleClick}
		>
			<Button type={type} variant="contained" color="warning" sx={{ height: 40 }}>
				{label}
			</Button>
		</Box>
	);
}

export default ButtonModel