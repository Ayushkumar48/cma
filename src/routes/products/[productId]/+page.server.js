export const load = async ({ fetch, params, cookies }) => {
	const username = cookies.get('username');
	const productId = params.productId;
	const response = await fetch(`/api/products?username=${username}`, {
		method: 'GET'
	});
	const data = await response.json();
	let carList = data.carsData;
	let currCar = carList.filter((val) => val.uuid === productId);
	return {
		...currCar,
		username
	};
};
