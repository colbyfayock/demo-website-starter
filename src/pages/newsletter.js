import Head from 'next/head';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/Newsletter.module.scss';

export default function Newsletter() {
  return (
    <Layout>
      <Head>
        <title>Newsletter - Space Jelly</title>
        <meta name="description" content="Sign up for my newsletter!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1 className={styles.title}>
          Newsletter
        </h1>

        <h2>Sign up for the latest updates!</h2>

      </Container>
    </Layout>
  )
}