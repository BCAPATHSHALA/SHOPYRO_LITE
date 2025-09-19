import { ABOUT_PAGE_CONTENT } from "@/siteconfig/static-pages.config";

export function OurStory() {
  const { story } = ABOUT_PAGE_CONTENT;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{story.title}</h2>
        </div>

        <div className="space-y-6">
          {story.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
