// ...rest of the initial code omitted for simplicity.
const { body } = require("express-validator");

module.exports = () => {
    return [
        body("search")
            .exists()
            .bail()
            .withMessage("search field is required")
            .isLength({ min: 1 })
            .withMessage("search must be greater then 1 letters"),
        body("int")
            .exists()
            .bail()
            .withMessage("int field is required")
            .isInt()
            .withMessage("int must be integer")
            .isInt({min: 1})
            .withMessage("int must be greater than 0"),
    ]
}