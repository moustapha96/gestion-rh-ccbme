import uiDark from "@/assets/images/demo/ui-components-dark.png";
import ui from "@/assets/images/demo/ui-components.png";
import PreviewCard from "./PreviewCard";
import { adminDemos } from "./data";

const AdminDemos = () => {
  const uiDemo = {
    darkImage: uiDark,
    lightImage: ui,
    link: "/admin/ui-components",
    name: "Ui Components",
  };

  return (
    <section id="admin-demo" className="py-20">
      <div className="mx-20">
        <div className=" mx-auto text-center mb-14">
          <span className="inline-flex text-base border-x-2 border-x-primary-600 text-primary-700 font-semibold px-2 rounded-lg bg-primary/20 mb-2">
            Demo
          </span>
          <h2 className="text-3xl font-semibold text-default-950 mb-2.5">
            Admin Demo
          </h2>
          <p className="text-base text-default-900">
            a cutting-edge, one-page template designed for unparalleled
            performance and seamless user experiences
          </p>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 justify-content-center">
          {adminDemos.map((demo, idx) => (
            <PreviewCard demo={demo} key={idx} />
          ))}
          <div className="lg:col-span-3 lg:flex gap-3 justify-center">
            <div className="lg:w-1/3">
              <PreviewCard demo={uiDemo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDemos;
