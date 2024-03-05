import { WidgetItem } from '@/app/components';
import { Product, products } from '@/data/products';
import { ItemCard } from '@/shopping-cart';
import { Metadata } from 'next';
import { cookies } from 'next/headers';


export const metadata: Metadata = {
    title: 'Carrito de compras',
    description: 'SEO Title',
};

interface ProductInCart {
    product: Product,
    quantity: number,
}

const getProductsInCart = (cart: {[id:string]: number}) => {
    const productsInCart: ProductInCart[] = [];

    for(const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if(product) {
            productsInCart.push({
                product,
                quantity: cart[id]
            });
        }
    }

    return productsInCart;

};

export default function CartPage() {

    const cookiesStore = cookies();

    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce((acum, curr) => ((curr.product.price * curr.quantity)+acum), 0);

    return (
        <div>
            <h1 className="text-5xl">Productos del carrito</h1>
            <hr className="mb-2"/>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className='flex flex-col gap-2 w-full sm:w-8/12'>
                    {
                        productsInCart.map(({product, quantity}) => (
                            <ItemCard 
                                key={product.id}
                                product={product}
                                quantity={quantity}
                            />
                        ))
                    }
                </div>

                <div className='flex flex-col w-full sm:w-4/12'>
                    <WidgetItem title='Total Price'>
                        <div className='flex flex-col'>
                            <h3 className="text-3xl font-bold text-gray-700">${(totalToPay*1.15).toFixed(2)}</h3>
                            <div className="flex items-end gap-1 text-green-500">
                                <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                </svg>
                                <span>15% - ${(totalToPay*0.15).toFixed(2)}</span>
                            </div>
                        </div>
                    </WidgetItem>

                </div>

            </div>

        </div>
    );
}