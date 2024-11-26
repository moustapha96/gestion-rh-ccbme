import { Helmet } from "react-helmet-async";

const PageMetaData = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title} | CCBME-GE
      </title>
    </Helmet>
  );
};

export default PageMetaData;
