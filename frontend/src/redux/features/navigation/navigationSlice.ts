import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
    name: "navigation",
    initialState: [
        {
		label: "Features",
		href: "#",
	},
	{
		label: "Pricing",
		href: "#",
	},
	{
		label: "About",
		href: "#",
	},
    ],
    reducers:{}
});

export default navigationSlice.reducer