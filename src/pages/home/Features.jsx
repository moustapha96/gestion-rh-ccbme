import { allFeatures } from "./data";

const Features = () => {
  return (
    <section className="py-20" id="features">
      <div className="mx-20">
        <div className=" mx-auto text-center mb-14">
          <span className="inline-flex text-base border-x-2 border-x-primary-600 text-primary-700 font-semibold px-2 rounded-lg bg-primary/20 mb-2">
            Features
          </span>
          <h2 className="text-3xl font-semibold text-default-950 mb-2.5">
            Awesome Template Features
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {allFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-default-50 rounded-xl border border-default-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col justify-center items-center text-center gap-4">
                    <div className="shrink">
                      {typeof feature.icon == "string" ? (
                        <div className="inline-flex items-center justify-center h-12 w-12 bg-primary-500/20 text-primary-600 rounded-md">
                          <img src={feature.icon} className="h-6 w-6" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/20 text-primary-600 rounded-md">
                          <Icon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="grow">
                      <h4 className="text-lg font-semibold text-default-950 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-default-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-base text-center mt-6 font-medium text-primary-900">
          Empower Your Journey with Our Engaging Landing Demo.🔥
        </p>
      </div>
    </section>
  );
};

export default Features;
