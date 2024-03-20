import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useMemo, useState } from "react";
import { productApi } from "shared/api/ProductApi";
import { usePagination } from "shared/hooks/usePagination/usePagination";
import { generateClassNames } from "shared/lib/generateClassNames/generateClassNames";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import cls from "./ProductAdminPage.module.scss";
import { ProductForm } from "features/CreateNewProduct";
import PageLoader from "widgets/PageLoader/PageLoader";
import { Table } from "shared/ui/Table";
import { ColumnDef } from "@tanstack/react-table";
import { ProductSchema } from "entities/Product";
import GalleryViewer from "widgets/GalleryViewer/ui/GalleryViewer";
import Trash24 from "shared/assets/icons/Trash/Trash24.svg";
import Pencil24 from "shared/assets/icons/Pencil/Pencil24.svg";
import ConfirmDialog from "shared/ui/ConfirmDialog/ConfirmDialog";
import {
    ConfirmDialogConfig,
    ConfirmDialogConfigName,
    getConfirmDialogConfig,
} from "shared/lib/getConfirmDialogConfig/getConfirmDialogConfig";

const ProductAdminPage = () => {
    const { limit, offset, pagination, setPagination } = usePagination();
    const [showProductForm, setShowProductForm] = useState(false);
    const [confirmDialogConfig, setConfirmDialogConfig] =
        useState<ConfirmDialogConfig>(null);

    const productsQuery = useQuery({
        queryKey: ["products", limit, offset],
        queryFn: () => productApi.getAll({ limit, offset, includeAll: true }),
    });

    const products = productsQuery?.data?.data;
    const refetch = productsQuery.refetch;

    const columns = useMemo<ColumnDef<ProductSchema>[]>(() => {
        return [
            {
                accessorKey: "files",
                cell: (cell) => (
                    <GalleryViewer
                        data={cell.row.original.files.map((file) => file.link)}
                        slideHeight={100}
                    />
                ),
                header: "Фото",
                size: 80,
            },
            {
                accessorKey: "id",
                cell: (cell) => cell.getValue(),
                header: "Id",
                size: 60,
            },

            {
                accessorKey: "name",
                cell: (cell) => cell.getValue(),
                header: "Название",
            },
            {
                accessorKey: "rating",
                cell: (cell) => cell.getValue(),
                header: "Рейтинг",
                size: 40,
            },
            {
                id: "edit",
                cell: () => (
                    <Button
                        theme={ThemeButton.CLEAR}
                        title="Редактировать"
                        aria-label="Редактировать"
                    >
                        <Pencil24 />
                    </Button>
                ),
                size: 40,
            },
            {
                id: "delete",
                cell: (cell) => (
                    <Button
                        theme={ThemeButton.CLEAR}
                        title="Удалить"
                        aria-label="Удалить"
                        onClick={() =>
                            setConfirmDialogConfig(
                                getConfirmDialogConfig({
                                    configName: ConfirmDialogConfigName.DELETE,
                                    onConfirm: () =>
                                        productApi
                                            .delete(cell.row.original.id)
                                            .then(() => refetch())
                                            .catch(),
                                    onClose: () => setConfirmDialogConfig(null),
                                    objectName: `№${cell.row.original.id} ${cell.row.original.name}`,
                                })
                            )
                        }
                    >
                        <Trash24 />
                    </Button>
                ),
                size: 40,
                maxSize: 40,
            },
        ];
    }, [refetch]);

    if (!products) return null;

    return (
        <div className={generateClassNames(cls.ProductAdminPage)}>
            <div className={generateClassNames(cls.header)}>
                Количество: {products?.count}
                <Button onClick={() => setShowProductForm((state) => !state)}>
                    {showProductForm ? "Отменить" : "Добавить"}
                </Button>
            </div>
            <div className={generateClassNames(cls.content)}>
                <Suspense fallback={<PageLoader />}>
                    {showProductForm ? (
                        <ProductForm
                            onSuccess={() => setShowProductForm(false)}
                            className={generateClassNames("")}
                        ></ProductForm>
                    ) : (
                        <Table
                            data={products.rows}
                            columns={columns}
                            isDataFetching={productsQuery.isFetching}
                            pagination={pagination}
                            onPaginationChange={setPagination}
                            dataAmountTotal={products.count}
                        />
                    )}
                </Suspense>
            </div>
            {confirmDialogConfig && <ConfirmDialog {...confirmDialogConfig} />}
        </div>
    );
};

export default ProductAdminPage;
