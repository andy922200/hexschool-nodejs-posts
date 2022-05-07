/* connect to mongoDB */
const dbName = "socialNetwork"
const db = require('../mongodb/index')(dbName)
/* load related model */
const Post = require('../model/post_model')
/* load related json*/
const PostArray = require('./post.json')

/* args */
const args = process.argv.slice(2);
const upDown = args[0]

db.once('open', () => {
    if (upDown === 'up') {
        Post.create(PostArray)
            .then(() => {
                console.log('Generate Posts from the seeder is done.')
                return db.close()
            })
            .catch(err => {
                console.log(err)
            })
    }

    if (upDown === 'down') {
        Post.deleteMany({})
            .then(()=>{
                console.log('Cleaning all Seeder Posts is done.')
                return db.close()
            })
            .catch(err => {
                console.log(err)
            })
    }
})