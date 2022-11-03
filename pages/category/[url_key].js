import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading';
import { ProductCard } from '@/components/ProductCard';

export const GET_PRODUCT_BY_CATEGORY = gql`
    query GetCategoryLists($filters: CategoryFilterInput){
        categoryList(filters: $filters){
            name
            products{
                items{
                    name
                    only_x_left_in_stock
                    qty_available
                    uid
                    sku
                    url_key
                    image{
                        url
                    }
                    price_range{
                        minimum_price{
                            final_price{
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;

const CategoryList = () => {
    const router = useRouter()
    const { query } = router
    const url_key = query.url_key

    const { data, loading, error } = useQuery(GET_PRODUCT_BY_CATEGORY, {
        variables: {
            filters: {
                url_key: {
                    eq: url_key
                }
            }
        }
    })

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (!data.categoryList) {
        console.error(error);
        return null;
    }
    const products = data.categoryList[0].products.items;

    return (
        <div className={styles.container}>
            <Head>
                <title>Product By Category</title>
            </Head>

            <main className={styles.main}>
                <h1>{ data.categoryList[0].name} </h1>
                <div className={styles.grid}>
                {
                    products.map((product, i) => (
                        <ProductCard
                            key={i}
                            url_key={product.url_key}
                            image={product.image.url}
                            name={product.name} 
                            price={product.price_range.minimum_price.final_price.value}
                            />
                    ))
                }
                </div>
            </main>
        </div>
    )
}

export default CategoryList