const { models } = require("../db");

const getProductInclude = ({ includeAll = false, includeInfo = false }) =>
    [
        { model: models.file },
        includeAll && {
            model: models.subCategory,
            include: { model: models.category },
        },
        (includeAll || includeInfo) && {
            model: models.productInfo,
            as: "info",
        },
    ].filter(Boolean);

module.exports = getProductInclude;
