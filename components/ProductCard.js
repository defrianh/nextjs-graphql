import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/Card.module.css'

export const ProductCard = (props) => {
    return (
        <div className={styles.card}>
            <Link href={`/product/${encodeURIComponent(props.url_key)}`}>
                {
                    props.image ? (
                        <Image
                            className={styles.imageproduct}
                            src={props.image}
                            alt=""
                            width={300}
                            height={100}
                        />
                    ) : ( <Image
                            className={styles.imageproduct}
                            src='/images/no-image.png'
                            alt=""
                            width={300}
                            height={100}
                        />
                    )
                }
                <div className={styles.info}>
                    <h2 dangerouslySetInnerHTML={{ __html: props.name}}></h2>
                    <h3>{
                        new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(props.price)
                    }</h3>
                </div>
                
            </Link>
        </div>
    )
}