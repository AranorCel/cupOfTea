import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const ProductRating = ({ notes, handleChange }) => {
	//? Will be used for controlled rating
	const [rating, setRating] = useState(notes);

	return (
		<Box
			sx={{ '& > legend': { mt: 2 } }}>
			<Typography component="legend">Notes</Typography>
			<Rating name="read-only" value={rating} readOnly onChange={(e) => handleChange(e)} />
		</Box>
	);
}

export default ProductRating