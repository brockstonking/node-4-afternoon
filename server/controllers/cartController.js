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
    const { user } = req.session;

    const index = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.find(swag => swag.id == id);

    if (index !== -1) {
      user.cart.splice(index, 1);
      user.total -= selectedSwag.price;
    }

    res.status(200).send(user);
    },
    checkout: (req, res, next) => {
        const { session } = req;

        session.user.cart = [];
        session.user.total = 0;

        res.status(200).send(session.user)
    }
}