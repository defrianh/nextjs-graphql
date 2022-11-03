import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/Card.module.css'

export const Card = (props) => {
    return (
        <div className={styles.card}>
            <Link href={`/category/${encodeURIComponent(props.url_key)}`}>
                {
                    props.image ? (
                        <Image
                            className={styles.image}
                            src={props.image}
                            alt=""
                            width={300}
                            height={100}
                        />
                    ) : ( <Image
                        className={styles.image}
                        src='/images/no-image.png'
                        alt=""
                        width={300}
                        height={100}
                        />
                    )
                }
                <h2>{props.name}</h2>
            </Link>
        </div>
    )
}