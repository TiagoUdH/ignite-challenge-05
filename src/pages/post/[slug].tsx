
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
// import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const wordCount = post.data.content.reduce((numberOfWords, contentItem) => {
    const numberOfWordsInHeading = contentItem.heading.split(/\s+/).length
    const numberOfWordsInBody = RichText.asText(contentItem.body).split(/\s+/).length

    numberOfWords += (numberOfWordsInHeading + numberOfWordsInBody)

    return numberOfWords
  }, 0)

  const readingMinutes = Math.ceil(wordCount / 200)

  return <h1>{readingMinutes}</h1>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      "dd MMM yyyy",
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content
    },
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 5 // 5 minutes
  }
};
