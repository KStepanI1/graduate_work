const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");
const File = require("./File");
const ProductFiles = require("./ProductFiles");
const Role = require("./Role");
const SubCategory = require("./SubCategory");
const UserOrders = require("./UserOrders");
const Order = require("./Order");
const Token = require("./Token");
const TelegramUser = require("./TelegramUser");
const Basket = require("./Basket");
const Rating = require("./Rating");
const BasketProduct = require("./BasketProduct");
const ProdcutInfo = require("./ProductInfo");
const OrderProduct = require("./OrderProduct");

Role.belongsTo(User);
User.hasMany(Role);

Product.belongsToMany(File, { through: ProductFiles });
File.belongsToMany(Product, { through: ProductFiles });

Order.belongsToMany(User, { through: UserOrders });
User.belongsToMany(Order, { through: UserOrders });

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

SubCategory.hasMany(Product);
Product.belongsTo(SubCategory);

Token.belongsTo(User);
User.hasOne(Token);

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProdcutInfo, { as: "info" });
ProdcutInfo.belongsTo(Product);

module.exports = {
    user: User,
    category: Category,
    product: Product,
    file: File,
    productFiles: ProductFiles,
    subCategory: SubCategory,
    token: Token,
    telegramUser: TelegramUser,
    rating: Rating,
    productInfo: ProdcutInfo,
    basketProduct: BasketProduct,
    basket: Basket,
    role: Role,
    order: Order,
    orderProduct: OrderProduct,
};
