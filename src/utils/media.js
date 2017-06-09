import { css } from "styled-components";

export const media = {
	handheld: (...args) => css`
		@media (max-width: 800px) { // if the viewwr width is smaller than this value use hand held css
			${css(...args)}
		}
	`
}; //lol
