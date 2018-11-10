const orm = require("../config/orm.js")

const burger = {
    selectAll: (cb) => {
        orm.selectAll("burgers", (res) =>{
            cb(res);
        });
    },
    insertOne: (val, cb) => {
        orm.insertOne("burgers", "burger_name", val, (res) => {
            cb(res)
        })
    },
    updateOne: (objColVals, id, cb) => {
        orm.updateOne("burgers", objColVals, id, (res) => {
            cb(res)
        })
    }
}

module.exports = burger;