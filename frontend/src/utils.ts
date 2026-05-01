import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
type ToastOptions = {
    class?: string;
    variant?: "success" | "destructive" | "normal";
};

const TOAST_CONTAINER_ID = "__toast_container__";

function getToastContainer() {
    let container = document.getElementById(TOAST_CONTAINER_ID);

    if (!container) {
        container = document.createElement("div");
        container.id = TOAST_CONTAINER_ID;
        container.className = cn(
            "fixed bottom-4 right-4 z-[9999] flex max-w-[calc(100vw-2rem)] flex-col gap-2 pointer-events-none",
        );
        document.body.appendChild(container);
    }

    return container;
}

export function toast(message: string, options?: ToastOptions) {
    const container = getToastContainer();
    const el = document.createElement("div");

    const variant = options?.variant ?? "normal";

    const variantClass =
        variant === "success"
            ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
            : variant === "destructive"
              ? "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100"
              : "border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";

    el.className = cn(
        "pointer-events-auto w-80 max-w-full rounded-xl border px-4 py-3 shadow-lg",
        "transition-all duration-300 ease-out",
        "translate-y-2 opacity-0",
        variantClass,
        options?.class,
    );

    el.textContent = message;
    container.appendChild(el);

    requestAnimationFrame(() => {
        el.classList.remove("translate-y-2", "opacity-0");
        el.classList.add("translate-y-0", "opacity-100");
    });

    const fadeOut = () => {
        el.classList.remove("translate-y-0", "opacity-100");
        el.classList.add("translate-y-2", "opacity-0");

        const remove = () => {
            el.remove();
            if (!container.hasChildNodes()) {
                container.remove();
            }
        };

        el.addEventListener("transitionend", remove, { once: true });
    };

    window.setTimeout(fadeOut, 5000);
}
