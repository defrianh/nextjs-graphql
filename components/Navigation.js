import Link from 'next/link'

const Navigation = () => {
    return (
        <nav className='navigation'>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/'>Test 1</Link></li>
                <li><Link href='/'>Test 2</Link></li>
            </ul>
            <style jsx>
                {`
                .navigation {
                    padding:5px;
                    border-bottom:1px solid #eaeaea;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                    overflow: hidden;
                    width: 50%;
                    margin: 0 auto;
                  }
                  
                  li {
                    float: left;
                    padding: 14px 16px;
                    margin-right:10px;
                  }
                  
                  li a {
                    display: block;
                    text-align: center;
                    text-decoration: none;
                  }
                  li a:hover{
                    color:#0070f3;
                  }
                  li:hover{
                    color:#0070f3;
                  }
            `}
            </style>
        </nav>
    )
}
export default Navigation