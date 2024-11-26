import PreviewCard from "./PreviewCard";
import { authDemos } from "./data";

const SecurityDemos = () => {
  return (
    <section className="py-20">
      <div className="mx-20">
        <div className=" mx-auto text-center mb-14">
          <span className="inline-flex text-base border-x-2 border-x-primary-600 text-primary-700 font-semibold px-2 rounded-lg bg-primary/20 mb-2">
            Demo
          </span>
          <h2 className="text-3xl font-semibold text-default-950 mb-2.5">
            Security
          </h2>
          <p className="text-base text-default-900">
            serves as the perfect starting point for your next project,
            showcasing the expertise in building real websites with Tailwind CSS
          </p>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 justify-content-center">
          {authDemos.slice(0, 3).map((demo, idx) => (
            <PreviewCard demo={demo} key={idx} />
          ))}

          <div className="lg:col-span-3 lg:flex gap-3 justify-center">
            {authDemos.slice(3).map((demo, idx) => (
              <div className="lg:w-1/3" key={idx + demo.name}>
                <PreviewCard demo={demo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityDemos;
