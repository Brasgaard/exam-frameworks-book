class QuestionDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const questionSchema = new mongoose.Schema({
            text: String,
            answers: [{
                text: String,
                votes: Number
            }]
        });
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);
        return question.save();
    }

    async addAnswer(questionId, answer) {
        const question = await this.getQuestion(questionId);
        question.answers.push({text: answer, votes: 0});
        return question.save();
    }

    async upvoteAnswer(questionId, answerId) {
        const question = await this.getQuestion(questionId);
        const answer = question.answers.id(answerId);
        answer.votes++;
        return question.save();
    }

    async bootstrap(count = 5) {
        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let question = new this.questionModel({
                    text: 'What is React Part 1',
                    answers: [
                        {text: "No idea!", votes: -3},
                        {text: "Using async functions!", votes: 2},
                        {text: "It's all async but based on promises!", votes: 3},
                    ]
                });
                promises.push(question.save());
            }

            return Promise.all(promises);
        }
    }
}

module.exports = (mongoose) => new QuestionDAL(mongoose);