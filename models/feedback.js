const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class FeedBack {
	constructor(name, phone, email, text) {
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.id = uuidv4();
	}

	getFeedBackPerson() {
		return {
			name: this.name,
			phone: this.phone,
			email: this.email,
			id: this.id,
		}
	}

	async save() {
		const feedback = await FeedBack.getAll();
		feedback.push(this.getFeedBackPerson());
		return new Promise((res, rej) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'feedback.json'),
				JSON.stringify(feedback),
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
				path.join(__dirname, '..', 'data', 'feedback.json'),
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

}

module.exports = FeedBack;