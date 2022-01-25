import Head from 'next/head';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

import { getPosts } from '@lib/posts';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/Post.module.scss'

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{ post.title } - Space Jelly</title>
        <meta name="description" content={`Learn more about ${post.title} on Space Jelly`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1 className={styles.title}>{ post.title }</h1>

        <p>{ new Date(post.date).toString() }</p>

        <ul>
          {post.categories.map(category => {
            return (
              <li key={category}>{ category }</li>
            )
          })}
        </ul>

        <div dangerouslySetInnerHTML={{
          __html: post.html
        }} />
      </Container>

    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const posts = await getPosts();
  const post = posts.find(({ slug }) => slug === params.postSlug);

  const content = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(post.content)

  return {
    props: {
      post: {
        ...post,
        html: content.value
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts();

  const paths = posts.map(post => {
    return {
      params: {
        postSlug: post.slug
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}