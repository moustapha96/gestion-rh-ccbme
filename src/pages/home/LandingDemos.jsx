import webDesignerDark from "@/assets/images/demo/web-designer-dark.png";
import webDesigner from "@/assets/images/demo/web-designer.png";
import PreviewCard from "./PreviewCard";
import { landingDemos } from "./data";

const LandingDemos = () => {
  const webDemo = {
    darkImage: webDesignerDark,
    lightImage: webDesigner,
    link: "/landing/web-designer",
    name: "Web Designer",
  };
  return (
    <section id="demos" className="py-20">
      <div className="mx-20">
        <div className=" mx-auto text-center mb-14">
          <span className="inline-flex text-base border-x-2 border-x-primary-600 text-primary-700 font-semibold px-2 rounded-lg bg-primary/20 mb-2">
            Demo
          </span>
          <h2 className="text-3xl font-semibold text-default-950 mb-2.5">
            Landing Demo
          </h2>
          <p className="text-base text-default-900">
            Elevate Your Presence: Unveiling the Power of Our Landing Demo!
          </p>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 justify-content-center">
          {landingDemos.map((demo, idx) => {
            return <PreviewCard demo={demo} key={idx} />;
          })}
          <div className="lg:col-span-3 lg:flex gap-3 justify-center">
            <div className="lg:w-1/3">
              <PreviewCard demo={webDemo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingDemos;
