export const simpleAction = () => dispatch => {
	dispatch({
		type: "SIMPLE ACTION",
		payload: "result_of_simple_action"
	})
};