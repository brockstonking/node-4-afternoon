const swag = require('./../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.params;
        let { user } = req.session;

        const itemInCart =  user.cart.findIndex( e => { return e.id == id })

        if (itemInCart === -1){
            const item = swag.find( e => { return e.id == id})

            user.cart.push(item);
            user.total += item.price;
        } 

        res.status(200).send(user);
    },
    delete: (req, res, next) => {
        const { id } = req.params;
        const { session } = req;

        const itemIndex = session.user.cart.findIndex( e => e.id  == id);
        const swagItem = swag.findIndex( e => e.id == id);

        if (itemIndex !== -1) {
            session.user.cart.splice(itemIndex, 1);
            session.user.total -= swagItem.price;
        }
        res.status(200).send(session.user)
    },
    checkout: (req, res, next) => {
        const { session } = req;

        session.user.cart = [];
        session.user.total = 0;

        res.status(200).send(session.user)
    }
}