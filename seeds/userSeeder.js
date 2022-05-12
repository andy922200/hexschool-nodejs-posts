/* connect to mongoDB */
const dbName = "socialNetwork"
const db = require('../mongodb/index')(dbName)
/* load related model */
const User = require('../model/user_model')
/* load related json*/
const userArray = require('./user.json')

/* args */
const args = process.argv.slice(2);
const upDown = args[0]

db.once('open', () => {
    console.log(upDown)
    if(upDown === 'up'){
        User.create(userArray)
            .then(() => {
                console.log('Generate Users from the seeder is done.')
                return db.close()
            })
            .catch(err => {
                console.log(err)
            })
    }

    if (upDown === 'down') {
        User.deleteMany({})
            .then(() => {
                console.log('Cleaning all Seeder Users is done.')
                return db.close()
            })
            .catch(err => {
                console.log(err)
            })
    }
})