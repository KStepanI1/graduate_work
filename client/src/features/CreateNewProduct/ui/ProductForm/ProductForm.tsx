import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { productActions, productReducer } from "../../model/slice/ProductSlice";
import React, { useCallback, useEffect } from "react";
import DynamicModuleLoader, {
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import Button from "shared/ui/Button/Button";
import FilesDropzone from "shared/ui/FilesDropzone/ui/FilesDropzone/FilesDropzone";
import Input from "shared/ui/Input/Input";
import { ProductInfo } from "entities/Product";
import { useAppSelector } from "shared/hooks/useAppSelector/useAppSelector";
import { getCreateProductName } from "../../model/selectors/getProductName/getProductName";
import { getCreateProductDescription } from "../../model/selectors/getProductDescription/getProductDescription";
import { getCreateProductPrice } from "../../model/selectors/getProductPrice/getProductPrice";
import { getCreateProductInfo } from "../../model/selectors/getProductInfo/getProductInfo";
import { getCreateProductFiles } from "../../model/selectors/getProductFiles/getProductFiles";
import { createProduct } from "../../model/services/createProduct";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import cls from "./ProductForm.module.scss";
import Form from "shared/ui/Form/Form";
import { useAppSearchParam } from "shared/hooks/useAppSearchParams/useAppSearchParams";
import { ProductCreateResponse } from "../../model/types/ProductCreateResponse";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "shared/api/ProductApi";
import { ProductMedia } from "entities/Product/model/types/Product";

export interface AddProductFormProps {
    className?: string;
    productId?: number;
    onSuccess?: (result: ProductCreateResponse | string) => void;
}

const initialReducers: ReducersList = {
    productForm: productReducer,
};

const CreateProductForm = (props: AddProductFormProps) => {
    const { className, productId = 0, onSuccess } = props;
    const dispatch = useAppDispatch();
    const name = useAppSelector(getCreateProductName);
    const description = useAppSelector(getCreateProductDescription);
    const price = useAppSelector(getCreateProductPrice);
    const info = useAppSelector(getCreateProductInfo);
    const files = useAppSelector(getCreateProductFiles);

    useQuery({
        queryKey: ["product", productId],
        queryFn: () =>
            !!productId &&
            productApi.getById(productId).then((res) => {
                if (!res?.data)
                    dispatch(
                        productActions.setError("Не удалось получить товар")
                    );

                const { name, info, description, price, files } = res.data;

                dispatch(productActions.setName(name));
                dispatch(productActions.setDescription(description));
                dispatch(productActions.setPrice(price));
                dispatch(productActions.setInfo(info));
                dispatch(productActions.setMedia(files));
            }),
    });

    const onChangeName = useCallback(
        (newName: string) => {
            dispatch(productActions.setName(newName));
        },
        [dispatch]
    );
    const onChangeDescription = useCallback(
        (newDescription: string) => {
            dispatch(productActions.setDescription(newDescription));
        },
        [dispatch]
    );
    const onChangePrice = useCallback(
        (newPrice: string) => {
            dispatch(productActions.setPrice(newPrice));
        },
        [dispatch]
    );
    const onChangeInfo = useCallback(
        (newInfo: ProductInfo[]) => {
            dispatch(productActions.setInfo(newInfo));
        },
        [dispatch]
    );
    const onChangeFiles = useCallback(
        (newFiles: File[]) => {
            dispatch(productActions.setFiles(newFiles));
        },
        [dispatch]
    );
    const onChangeMedia = useCallback(
        (newMedia: ProductMedia[]) => {
            dispatch(productActions.setMedia(newMedia));
        },
        [dispatch]
    );

    const submitHandler = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const result = await dispatch(
                createProduct({
                    name,
                    description,
                    price,
                    info,
                    files,
                    subCategoryId: 1,
                })
            );

            if (result.meta.requestStatus === "fulfilled") {
                onSuccess?.(result.payload);
            }
        },
        [description, dispatch, files, info, name, onSuccess, price]
    );

    useAppSearchParam({
        key: "mode",
        value: "create",
        // options: { removeAfterUnmount: false },
    });

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUmount>
            <Form
                onSubmit={submitHandler}
                className={generateClassNames(cls.CreateProductForm, className)}
            >
                <Input
                    placeholder="Имя товара"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                />
                <textarea
                    placeholder="Описание товара"
                    name="description"
                    value={description}
                    onChange={(e) => onChangeDescription(e.target.value)}
                />
                <Input
                    placeholder="Цена"
                    name="price"
                    value={price}
                    onChange={onChangePrice}
                />
                <FilesDropzone
                    onChange={onChangeFiles}
                    multi
                    accept={{ ["image/*"]: [], ["video/*"]: [] }}
                />
                <Form.Footer>
                    <Button
                        className={generateClassNames(cls.submitBtn)}
                        type="submit"
                    >
                        Создать
                    </Button>
                </Form.Footer>
            </Form>
        </DynamicModuleLoader>
    );
};

export default CreateProductForm;
