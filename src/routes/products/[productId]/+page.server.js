export const load = async ({ fetch, params, cookies }) => {
	const username = cookies.get('username');
	const productId = params.productId;
	const response = await fetch(
		`https://cma-backend-moinaz9o0-ayush-kumars-projects-511ab598.vercel.app/products?username=${username}`,
		{
			method: 'GET'
		}
	);
	const data = await response.json();
	let carList = data.carsData;
	let currCar = carList.filter((val) => val.uuid === productId);
	return {
		...currCar
	};
};
