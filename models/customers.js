const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Customers {
	constructor(name, phone, email, text) {
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.text = text;
		this.id = uuidv4();
	}

	static async update(name, phone, email, text, id) {
		const customers = await Customers.getAll();
		const findCustomerIndex = customers.findIndex(c => c.id === id);

		customers[findCustomerIndex] = { name, phone, email, text, id };

		return new Promise((res, rej) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'customers.json'),
				JSON.stringify(customers),
				(err) => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				}
			)
		})
	}

	getCustomersPerson() {
		return {
			name: this.name,
			phone: this.phone,
			email: this.email,
			text: this.text,
			id: this.id,
		}
	}

	async save() {
		const customers = await Customers.getAll();
		customers.push(this.getCustomersPerson());
		return new Promise((res, rej) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'customers.json'),
				JSON.stringify(customers),
				(err) => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				}
			)
		})
	}

	static getAll() {
		return new Promise((res, rej) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'customers.json'),
				'utf-8',
				(err, content) => {
					if (err) {
						rej(err);
					} else {
						res(JSON.parse(content));
					}

				}
			)
		})

	}

	static async getByID(id) {
		const customers = await Customers.getAll();
		return customers.find(customer => customer.id === id);
	}

}

module.exports = Customers;