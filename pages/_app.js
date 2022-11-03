import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Layout } from '@/components/Layout';

const client = new ApolloClient({
  uri: 'https://b2cdemo.getswift.asia/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
  </ApolloProvider>
}

export default MyApp
