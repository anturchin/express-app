window.addEventListener('DOMContentLoaded', () => {

	const cart = document.querySelector('#cart');
	if (cart) {
		cart.addEventListener('click', (e) => {

			if (e.target.classList.contains('js-remove')) {
				const id = e.target.dataset.id;

				fetch(`/cart/remove/${id}`, {
					method: 'DELETE',
				}).then(res => res.json())
					.then(cartData => {
						if (cartData.books.length) {
							const html = cartData.books.map(book => {
								return `
								<tr>
									<td>${book.title}</td>
									<td>${book.count}</td>
									<td>
										<button class="btn btn-small js-remove" data-id="${book.id}">del</button>
									</td>
								</tr>
								`;
							}).join('');
							cart.querySelector('tbody').innerHTML = html;
							cart.querySelector('.price').textContent = cartData.price;
						} else {
							cart.innerHTML = `<p>cart is empty</p>`
						}
					});
			}
		})
	}

})