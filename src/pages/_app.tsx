import React from 'react';
import Head from 'next/head';
import Layout from 'Components/templates/layout';
import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Analytics } from '@vercel/analytics/react';
import 'Styles/index.css';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co', // TODO: will put it on config
  cache: new InMemoryCache(),
});

function AnimeCollections(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name='google' content='notranslate' />
        <title>Anime Collections</title>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin=''></link>
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ApolloProvider>
  );
}

export default AnimeCollections;
