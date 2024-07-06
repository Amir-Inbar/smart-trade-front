import Head from 'next/head'

const Index = () => {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title"/>
            </Head>
            <Head>
                <meta property="og:title" content="My new title" key="title"/>
            </Head>
            <p>Hello world!</p>
        </div>
    )
}

export default Index