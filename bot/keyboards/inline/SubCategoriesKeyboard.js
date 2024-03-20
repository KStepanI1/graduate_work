const getKeyboard = (subcategories, key = "category") => {
  return {
    reply_markup: {
      inline_keyboard: [
        ...subcategories.map((subcategory, i) => [
          {
            text: subcategory.name,
            callback_data: `${key}:${subcategory.id}`,
          },
        ]),
      ],
    },
  };
};

module.exports = getKeyboard;
