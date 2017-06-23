'use strict';

module.exports = {
    isValidID: function(id) {
        return !Number.isNaN(id) && id > 1;
    }

    // knexError: function(knex, err) {
    //     err.status = 500;
    //     //console.error(err);
    //     knex.destroy();
    //     return err;
    // }
}
