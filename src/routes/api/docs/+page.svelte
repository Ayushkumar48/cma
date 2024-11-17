<div class="flex flex-col gap-4 p-4">
	<div class="flex flex-col gap-2 pl-2">
		<div class="text-xl">Tech Stack</div>
		<p>Sveltekit for frontend and backend.</p>
		<p>Node.js and Express.js for single route /products.</p>
		<p>MongoDB for data.</p>
		<p>Cloudinary for images.</p>
	</div>
	<p>
		Only /products handlers are made using node.js and express.js and rest handlers are made using
		SvletKit's routing. There was some compatibility issue with some libraries using the modernjs,
		so had to create some routes on seperate server.
	</p>
	<div class="flex flex-col gap-2 pl-2">
		<div class="text-lg">/products</div>
		<p class="pl-2">----This route does products or cars get, post, update and delete.</p>
		<p>----In get handler, we request with a query param - username.</p>
		<p>----In post handler, we request with body to save data.</p>
		<p>----In delete handler, we request with 2 query params - uuid and username.</p>
		<p>----Post handler does the work of put handler, so no need of a seperate handler.</p>
	</div>
	<div class="flex flex-col gap-2 pl-2">
		<div class="text-lg">/auth-login</div>
		<p class="pl-2">----Everything is done using Sveltekit's in-built form actions.</p>
	</div>
	<div class="flex flex-col gap-2 pl-2">
		<div class="text-lg">/auth-signup</div>
		<p class="pl-2">
			----Some form validation is done in frontend and some in backend using form actions.
		</p>
		<p>----Also Signup is done using form actions.</p>
	</div>
	<div class="flex flex-col gap-2 pl-2">
		<div class="text-lg">/products/[productId]</div>
		<p class="pl-2">----This is a dynamic route for showing individual cars.</p>
	</div>
</div>
