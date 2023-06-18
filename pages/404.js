import ResultPage from "../components/globalComponents/ResultPage";
import Image from "next/image";
function PageNotFound() {
  return (
    <ResultPage
      title="404"
      width="400"
      height="400"
      src="/assets/404.jpg"
      style={{
        padding: "20px",
        borderRadius: "5px",
        backgroundColor: "#FFCA03",
      }}
      linkHref="/"
      subTitle="صفحه مورد نظر یافت نشد!"
      ButtonText="Back Home"
    />
  );
}

export default PageNotFound;
{
}
