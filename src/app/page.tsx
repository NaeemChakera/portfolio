import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Leadership } from "@/components/leadership";
import { Projects } from "@/components/projects";
import { Posts } from "@/components/posts";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Leadership />
        <Projects />
        <Posts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
