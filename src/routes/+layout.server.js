export function load({ cookies }) {
	const username = cookies.get('username');
	const name = cookies.get('name');
	return {
		username,
		name
	};
}
