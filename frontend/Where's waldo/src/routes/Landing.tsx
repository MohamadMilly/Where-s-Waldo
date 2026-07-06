import { Play } from "lucide-react";
import { PageWrapper } from "../components/shared/PageWrapper";
import { RouteLink } from "../components/ui/RouteLink";

export function Landing() {
  return (
    <PageWrapper>
      <section className="w-full flex gap-3 flex-wrap justify-center">
        <div className="basis-90 shrink grow">
          <h1 className="text-2xl md:text-4xl mb-4 text-purple-700">
            Where's Waldo !
          </h1>
          <p className="text-sm mb-4 sm:text-base text-gray-700">
            Find Waldo from an extensive scene and crowded of people. Find him
            faster than everyone else!
          </p>
          <RouteLink
            className="inline-flex items-center gap-0.5"
            route="/scenes"
          >
            <Play size={22} />
            <span>Play</span>
          </RouteLink>
        </div>
        <div className="shrink max-w-[250px] sm:max-w-[350px] md:max-w-[450px] w-full border-b-4 border-purple-400">
          <img
            className="max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mx-auto -mb-5"
            src="https://static.wikia.nocookie.net/vsbattles/images/b/b6/9fsGLcZ.png/revision/latest?cb=20171110160025"
            alt="Where's Waldo"
          />
        </div>
      </section>
    </PageWrapper>
  );
}
