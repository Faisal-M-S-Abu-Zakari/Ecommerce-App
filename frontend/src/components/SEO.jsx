import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url }) => {
  return (
    <Helmet>
      <title>{title} | FAISAL</title>
      <meta name="description" content={description || "Discover luxury fashion at FAISAL. Exclusive collection of stylish clothing for men, women, and kids."} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;