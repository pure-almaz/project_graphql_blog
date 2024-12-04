import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <meta name="viewport" content="width=device-width,minimum-scale=1, initial-scale=1" />
        <title>Learn - Top SEO & Web Development Tips | Skiie Blog</title>
        <meta name="description" content="Discover expert insights on SEO and web development from Skiie's top 3% professionals. Join us in making a difference with every read." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
