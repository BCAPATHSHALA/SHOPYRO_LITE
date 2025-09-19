import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamMember({ name, role, bio, image }: TeamMemberProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center space-y-4">
        <div className="relative w-24 h-24 mx-auto">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-primary font-medium text-sm">{role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
}
