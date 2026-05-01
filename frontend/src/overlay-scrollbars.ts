import { OverlayScrollbars } from "overlayscrollbars";

// Initialize custom scrollbars on the body element
OverlayScrollbars(document.body, {
    scrollbars: {
        theme: "os-theme-custom",
        autoHide: "leave",
        autoHideDelay: 200,
        visibility: "auto",
        clickScroll: true,
    },
});

const search_results = document.getElementById("search-results-outer");
if (search_results)
    OverlayScrollbars(search_results, {
        scrollbars: {
            theme: "os-theme-custom",
            autoHide: "leave",
            autoHideDelay: 200,
            visibility: "auto",
            clickScroll: true,
        },
    });

// Initialize custom scrollbars on all pre elements inside .content
const initPreScrollbars = () => {
    document.querySelectorAll(".content pre").forEach((pre) => {
        OverlayScrollbars(pre as HTMLElement, {
            scrollbars: {
                theme: "os-theme-custom",
                autoHide: "leave",
                autoHideDelay: 200,
                visibility: "auto",
            },
            overflow: {
                x: "scroll",
                y: "hidden",
            },
        });
    });
};

document.addEventListener("DOMContentLoaded", initPreScrollbars);
