module.exports = (product) => {
    return `
*Название*: ${product.name || ""}

*Описание*: ${product.description ? ` ${product.description}` : ""}

*Цена*: ${product.price ? product.price + "₽" : ""}
`;
};
