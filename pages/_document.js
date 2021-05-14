import Document, { Html, Head, Main, NextScript } from 'next/document';

// document overrides the default nextJs document structure:
{
  /* <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html> */
}
// nextJs Rendered in Main component

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
