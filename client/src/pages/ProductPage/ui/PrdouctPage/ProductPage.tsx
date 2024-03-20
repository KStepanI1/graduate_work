import React from "react";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { productApi } from "shared/api/ProductApi";
import { useDocumentTitle } from "shared/hooks/useDocumentTitle/useDocumentTitle";
import Text from "shared/ui/Text/Text";
import { useAppQuery } from "shared/hooks/useAppQuery/useAppQuery";
import { ProductSchema } from "entities/Product/model/types/Product";
import PageLoader from "widgets/PageLoader/PageLoader";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Block from "shared/ui/Block/Block";
import Heart from "shared/assets/icons/Heart/Heart32.svg";
import { GalleryViewer } from "widgets/GalleryViewer";

const ProductPage = () => {
  const { id } = useParams();

  const productQuery = useAppQuery<ProductSchema>({
    queryKey: ["product", id],
    queryFn: () => productApi.getById(id),
  });

  const product = productQuery.responseData;

  useDocumentTitle(product?.name);

  if (productQuery.isFetching) {
    return <PageLoader />;
  }

  return (
    <div className={generateClassNames(cls.ProductPage)}>
      <GalleryViewer
        data={product.files.map((image) => image.link)}
        className={cls.gallery}
        maxWidth={"700px"}
      />

      <Block className={cls.info}>
        <Text title={product.name} />
        <div className={cls.price}>{product.price} ₽</div>
        <div className={cls.infoFooter}>
          <Button className={cls.addToCart}>Добавить в корзину</Button>
          <Button theme={ThemeButton.SECONDARY}>
            <Heart className={(cls.heart, cls.filled)} />
          </Button>
        </div>
      </Block>
      <Block className={generateClassNames(cls.description)}>
        <Text
          text={product.description}
          className={generateClassNames(cls.text)}
        />
      </Block>
    </div>
  );
};

export default ProductPage;
