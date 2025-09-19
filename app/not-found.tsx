import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 bg-gradient-to-b from-background to-muted">
        <div className="text-center max-w-lg mx-auto">
          {/* Giant 404 */}
          <h1 className="text-9xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            404
          </h1>

          {/* Glass card */}
          <div className="mt-6 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-md shadow-lg p-10">
            <h2 className="text-3xl font-semibold mb-3 text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved, deleted, or the link is broken.
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              ⬅ Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
