import { observable, action, runInAction } from "mobx";
import ProApi from '../api/product';

class ProductStore {
	@observable
	data = {
		list: [],
		loading: true,
		currItem: {weight: '111'},
		username: 'the usernamwee',
	};

	@action
	changeUserName = (name) => {
		this.data.username = name;
	}

	@action
	updateCurrItem = (obj) => {
		Object.assign(this.data.currItem, obj);
	}

	@action
	getList = async () => {
		this.data.loading = true;
		try {
			const list = await ProApi.getList();
			runInAction(() => {
				this.data.list = list;
				this.data.loading = false;
			})
		} catch (err) {
			this.data.loading = false;
			console.log(err);
		}
	}

	@action
	getItem = async (id) => {
		this.data.loading = true;
		try {
			const item = await ProApi.getItem(id);
			runInAction(() => {
				this.data.currItem = item;
				this.data.loading = false;
			})
		} catch {
			this.data.loading = false;
			console.log(err);
		}
	}

	@action
	creatItem = async (paras) => {
		try {
			return await ProApi.creatItem(paras);
		} catch {
			console.log(err);
		}
	}

	@action
	updateItem = async (paras) => {
		try {
			return await ProApi.updateItem(paras);
		} catch {
			console.log(err);
		}
	}

	@action
	deleteItem = async (id) => {
		try {
			return await ProApi.deleteItem(id);
		} catch {
			console.log(err);
		}
	}

	// async getBook(bookName) {
	// 	const book = await fetchBook(bookName);

	// 	const [author, rating] = await Promise.all([
	// 	  fetchAuthor(book.authorId),
	// 	  fetchRating(book.id)
	// 	]);

	// 	return {
	// 		...book,
	// 		author,
	// 		rating
	// 	  };
	// }
}

export default new ProductStore();