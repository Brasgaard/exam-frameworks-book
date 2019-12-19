class CategoryDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const categorySchema = new mongoose.Schema({
            title: String
        });
        this.categoryModel = mongoose.model('categories', categorySchema);
    }

    async getCategories() {
        try {
            return await this.categoryModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }

    async bootstrap() {
        let l = (await this.getCategories()).length;
        console.log("categories collection size:", l);

        if (l === 0) {
            let promises = [];

            let category1 = new this.categoryModel({
                title: 'Styling'
            });
            let category2 = new this.categoryModel({
                title: 'C#'
            });

            promises.push(category1.save());
            promises.push(category2.save());

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new CategoryDAL(mongoose);