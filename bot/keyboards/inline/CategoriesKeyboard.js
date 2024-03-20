const getKeyboard = (categories, key = "category") => {
  return {
    reply_markup: {
      inline_keyboard: [
        ...categories.map((category, i) => [
          {
            text: category.name,
            callback_data: `${key}:${category.id}`,
          },
        ]),
      ],
    },
  };
};

module.exports = getKeyboard;
