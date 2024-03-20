import ReactDOM from "react-dom/client";
import "./app/styles/index.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import { PageError } from "widgets/PageError";
import PageLoader from "widgets/PageLoader/PageLoader";
import { StoreProvider } from "app/providers/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
    <Suspense fallback={<PageLoader />}>
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary fallback={<PageError />}>
                <StoreProvider>
                    <BrowserRouter>
                        <ThemeProvider>
                            <App />
                        </ThemeProvider>
                    </BrowserRouter>
                </StoreProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    </Suspense>
);
