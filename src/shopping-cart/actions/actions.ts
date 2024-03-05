import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

export const getCookieCart = (): {[id: string]: number } => {
    if(hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
        return cookieCart;
    }
    return {};
};

export const addProductToCart = (id: string) => {
    const cookieCart = getCookieCart();
    if(cookieCart[id]) {
        cookieCart[id] = cookieCart[id]+1;
    }else {
        cookieCart[id] = 1;
    }

    setCookie('cart', JSON.stringify(cookieCart));
};

export const deleteProductToCartByOne = (id: string) => {
    const cookieCart = getCookieCart();
    if(cookieCart[id]) {
        if(cookieCart[id]===1) {
            delete cookieCart[id];
        }else {
            cookieCart[id]--;
        }
    }
    if(Object.values(cookieCart).length===0) {
        deleteCookie('cart');
    }else {
        setCookie('cart', JSON.stringify(cookieCart));
    }
};

export const deleteProductToCart = (id: string) => {
    const cookieCart = getCookieCart();
    delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart));
};