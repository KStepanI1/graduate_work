import React, { memo } from "react";
import cls from "./GalleryViewer.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import extensionFromPath from "shared/lib/extensionFromPath/extensionFromPath";
import { VIDEO_EXTENSIONS } from "shared/const/extensions";
import Image from "shared/ui/Image/Image";
import Video from "shared/ui/Video/Video";

export interface GalleryViewerProps {
    data: string[];
    className?: string;
    slideHeight?: number | string;
    maxWidth?: number | string;
    useStab?: boolean;
    showPagination?: boolean;
    showNavigation?: boolean;
}

const GalleryViewer = (props: GalleryViewerProps) => {
    const {
        data,
        className,
        slideHeight = 500,
        maxWidth = "100%",
        useStab = true,
        showPagination = false,
        showNavigation = false,
    } = props;

    return (
        <div className={(cls.GalleryViewer, className)}>
            <Swiper
                slidesPerView={"auto"}
                cssMode={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                style={{ maxWidth }}
                keyboard={true}
                modules={[
                    Navigation,
                    showPagination && Pagination,
                    Mousewheel,
                    Keyboard,
                ].filter(Boolean)}
                className={cls.swiper}
                spaceBetween={50}
                onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                {data.length === 0 && useStab ? (
                    <SwiperSlide
                        className={cls["swiper-slide"]}
                        style={{ height: slideHeight }}
                    >
                        <div className="stub"></div>
                    </SwiperSlide>
                ) : (
                    data.map((link, i) => {
                        const extension = extensionFromPath(link);
                        let isVideo = false;
                        if (VIDEO_EXTENSIONS.includes(extension.toLowerCase()))
                            isVideo = true;
                        return (
                            <>
                                <SwiperSlide
                                    key={`${i}`}
                                    className={cls["swiper-slide"]}
                                    style={{ height: slideHeight }}
                                >
                                    {isVideo ? (
                                        <Video
                                            className={cls["swiper-video"]}
                                            autoPlay
                                            src={link}
                                        />
                                    ) : (
                                        <Image
                                            className={cls["swiper-image"]}
                                            src={link}
                                        ></Image>
                                    )}
                                </SwiperSlide>
                            </>
                        );
                    })
                )}
            </Swiper>
        </div>
    );
};

export default memo(GalleryViewer);
