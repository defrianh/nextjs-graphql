import Head from 'next/head'
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client';
import { Loading } from '@/components/Loading';
import styles from '@/styles/Home.module.css'
import productStyles from '@/styles/Product.module.css'
import Image from 'next/image';

export const CREATE_CART_TOKEN = gql`
    mutation CreateCartToken{
        createEmptyCart
    }
`;

export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart($cardId: String!, $sku: String!, $quantity: Float!) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cardId
                cart_items: {
                    data: {
                        sku: $sku
                        quantity: $quantity
                    }
                }
            }
        ) {
            cart {
                id        
            }
        }
    }
`
export const GET_PRODUCT_DETAIL = gql`
    query GetDetailProduct($search: String, $filter: ProductAttributeFilterInput ){
        products(search: $search, filter:$filter){
            items{
                name
                sku
                __typename
                description{
                    html
                }
                price_range{
                    minimum_price{
                        final_price{
                            currency
                            value
                        }
                    }
                }
                image{
                    url
                }
            }
        }
    }
`;

export default function ProductDetail() {
    const router = useRouter()
    const { query } = router
    const url_key = query.url_key

    const [genToken, { tokens }] = useMutation(CREATE_CART_TOKEN);
    const [addCart, { dataCart }] = useMutation(ADD_PRODUCT_TO_CART);

    const { data, loading, error } = useQuery(GET_PRODUCT_DETAIL, {
        variables: {
            search: "",
            filter: {
                url_key: {
                    eq: url_key
                }
            }
        }
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const addToCart = async (sku) => {
        let localToken = localStorage.getItem('cartToken')
        if (!localToken) {
            let fetcToken = await genToken()
            localToken = fetcToken.data.createEmptyCart
            localStorage.setItem('cartToken', localToken)
        }
        console.log(localToken)
        try{
            let dataAdded = await addCart({
                variables: {
                    cardId: localToken,
                    sku,
                    quantity: 1
                }
            })
        }catch(err){
            console.log(err)
            return null
        }
        if (dataAdded) {
            console.log('Berhasil Menambahkan ' + sku + ' ke cart')
        } else {
            console.warn('Gagal Menambahkan ')
        }
    }

    const product = data.products.items[0];

    return (
        <div className={styles.container}>
            <Head>
                <title>{product.name}</title>
            </Head>
            <main className={productStyles.main}>
                <div className={productStyles.imagecontainer}>
                    {
                        product.image.url ? (
                            <Image
                                className={productStyles.imageproduct}
                                src={product.image.url}
                                alt=""
                                width={300}
                                height={100}
                            />
                        ) : (<Image
                            className={productStyles.imageproduct}
                            src='/images/no-image.png'
                            alt=""
                            width={300}
                            height={100}
                        />
                        )
                    }
                </div>
                <div className={productStyles.desc}>
                    <h2>{product.name}</h2>
                    <h3>{
                        new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(product.price_range.minimum_price.final_price.value)
                    }</h3>
                    <hr/>
                    <p dangerouslySetInnerHTML={{ __html: product.description.html.toString() }}></p>
                    <hr/>
                    <button 
                        className={productStyles.button} 
                        onClick={() => addToCart(product.sku)}>Add To Cart</button>
                </div>
            </main>

        </div>
    )
}
