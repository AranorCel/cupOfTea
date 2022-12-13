import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ProductRating = ({ notes, handleChange }) => {
	//? Will be used for controlled rating
	const [rating, setRating] = useState(notes);

	return (
		<Box
			sx={{ '& > legend': { mt: 2 } }}>
			<Rating name="read-only" value={notes} readOnly onChange={(e) => handleChange(e)} />
		</Box>
	);
}

export default ProductRating