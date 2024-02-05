import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Organize Your Thoughts Effortlessly
              </span>
            </span>

            <h1 className="mt-8 pb-2 text-gradient text-3xl font-extrabold tracking-tight lg:text-7xl">
              Where Ideas Flourish and Organization Thrives!
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-base lg:text-xl text-secondary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ea
              unde perspiciatis error iusto at natus voluptatem optio.
              Accusantium eaque harum quam sequi totam quas voluptate facilis
              architecto?
            </p>
          </div>

          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <RegisterLink>
              <Button size="lg" className="w-full">
                Sign Up for free
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
