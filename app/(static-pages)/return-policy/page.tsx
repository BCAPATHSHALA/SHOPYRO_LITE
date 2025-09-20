import { PageLayout } from "@/components/layout/page-layout";
import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RETURN_POLICY_CONTENT } from "@/siteconfig/static-pages.config";
import { CheckCircle, XCircle } from "lucide-react";
import { PAGE_METADATA } from "@/siteconfig/seo.config";

export const metadata = PAGE_METADATA.returnPolicy;

export default function ReturnPolicyPage() {
  const { hero, policy, process, exceptions } = RETURN_POLICY_CONTENT;

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
        />

        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Return Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Return Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {policy.timeframe} return window
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {policy.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Return Exceptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    {exceptions.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exceptions.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Return Process */}
            <Card>
              <CardHeader>
                <CardTitle>{process.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {process.steps.map((step, index) => (
                    <div key={index} className="text-center space-y-3">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
