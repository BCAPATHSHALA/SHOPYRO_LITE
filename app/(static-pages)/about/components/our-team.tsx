import { TeamMember } from "@/components/static-pages/molecules/team-member";
import { ABOUT_PAGE_CONTENT } from "@/siteconfig/static-pages.config";

export function OurTeam() {
  const { team } = ABOUT_PAGE_CONTENT;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{team.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {team.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.members.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
