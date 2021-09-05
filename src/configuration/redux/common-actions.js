export const TOAST_SHOW = "TOAST_SHOW";
export const TOAST_HIDE = "TOAST_HIDE";

export const showToast = (header, body) => {
    return {
        type: TOAST_SHOW,
        payload: {
            header,
            body
        }
    }
};

export const hideToast = () => {
    return {
        type: TOAST_HIDE
    }
}