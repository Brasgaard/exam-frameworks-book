class BookDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const bookSchema = new mongoose.Schema({
            title: String,
            author: String,
            category: String,
            price: Number,
            name: String
        });
        this.bookModel = mongoose.model('books', bookSchema);
    }

    async getBooks() {
        try {
            return await this.bookModel.find({});
        } catch (error) {
            console.error("getBooks:", error.message);
            return {};
        }
    }

    async getBook(id) {
        try {
            return await this.bookModel.findById(id);
        } catch (error) {
            console.error("getBook:", error.message);
            return {};
        }
    }

    async createBook(newBook) {
        let question = new this.bookModel(newBook);
        return question.save();
    }

    async bootstrap(count = 5) {
        let l = (await this.getBooks()).length;
        console.log("books collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let book = new this.bookModel({
                    title: 'Styling',
                    author: 'Jens',
                    category:'Css',
                    price: 213,
                    name:'Alex'
                });
                promises.push(book.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new BookDAL(mongoose);