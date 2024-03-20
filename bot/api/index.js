const { CategoriesApi } = require("./CategoriesApi");
const { FilesApi } = require("./FilesApi");
const ProductsApi = require("./ProductsApi");
const { SubCategoriesApi } = require("./SubCategoriesApi");
const UsersApi = require("./UsersApi");

module.exports = {
  users: UsersApi,
  products: ProductsApi,
  files: FilesApi,
  categories: CategoriesApi,
  subCategories: SubCategoriesApi,
};
