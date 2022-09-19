'use strict';

class userCommentRoutes {
    constructor(model) {
        this.model = model;
    }

    async create(obj) {
        console.log("newData:=====================================",obj);
        try {
            return await this.model.create(obj)
           
        } catch (e) {
            console.error(e);
        }
    }

    async read(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } });
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error(`Error in reading data with the id: ${id}`);
        }
    }

    async update(id, obj) {
        try {
            const dataById = await this.model.findOne({ where: { id } });
            return await dataById.update(obj);
        } catch (e) {
            console.error(`Error while updating data with id: ${id}`);
        }
    }

    async delete(id) {
        try {
            return await this.model.destroy({ where: { id } });
        } catch (e) {
            console.error(`Error while deleting the data with id: ${id}`);
        }
    }

    async readWithComments(Comment) {
        try {
            return await this.model.findAll({ include: [Comment] });
        } catch (e) {
            console.error(`Error while reading the Comments for model ${this.model.name}`);
        }
    }

    async readOneWithComments(id, Comment) {
        try {
            return await this.model.findOne({ where: { id }, include: [Comment] });
        } catch (e) {
            console.error(`Error while reading the Comments for model id ${id}`);
        }
    }

}

module.exports = userCommentRoutes;