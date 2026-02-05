import { Suspense } from "react";
import { getSiteData } from "@/lib/data";
import { SkillCard } from "@/components/skills/skill-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownContent } from "@/components/markdown-content";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function SkillsLoading() {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((i) => (
        <section key={i}>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
              <Skeleton key={j} className="h-32 rounded-lg" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ContentLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

async function SkillsContent() {
  const data = await getSiteData();
  
  return (
    <div className="space-y-12">
      {data.categories.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Loading skills or failed to fetch data...
        </div>
      ) : (
        data.categories.map((category) => (
          <section key={category.name} id={category.name.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold tracking-tight">
                {category.name}
              </h2>
              <Badge variant="secondary" className="text-xs">
                {category.skills.length}
              </Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.skills.map((skill) => (
                <SkillCard key={skill.url} skill={skill} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

async function InstallationContent() {
  const data = await getSiteData();
  
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow max-w-4xl mx-auto">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Installation Guide
        </h3>
        <p className="text-sm text-muted-foreground">Follow these instructions to set up skills.</p>
      </div>
      <div className="p-6 pt-0">
        <MarkdownContent content={data.installation} />
      </div>
    </div>
  );
}

async function AboutContent() {
  const data = await getSiteData();
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <MarkdownContent content={data.about} />
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Project Info</h3>
          <MarkdownContent content={data.introduction} className="prose-sm" />
        </div>
      </div>
    </div>
  );
}

async function HeaderStats() {
  const data = await getSiteData();
  const totalSkills = data.categories.reduce((acc, c) => acc + c.skills.length, 0);
  
  return (
    <Badge variant="outline" className="ml-auto">
      {totalSkills}+ Skills
    </Badge>
  );
}

async function HeroContent() {
  const data = await getSiteData();
  const totalSkills = data.categories.reduce((acc, c) => acc + c.skills.length, 0);
  
  return (
    <p className="text-xl text-muted-foreground">
      Discover {totalSkills}+ community-built skills for your AI assistant.
      Extend capabilities, automate workflows, and perform specialized tasks.
    </p>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Bot Skills
              </span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="#skills" className="transition-colors hover:text-foreground/80 text-foreground/60">Skills</a>
              <a href="#installation" className="transition-colors hover:text-foreground/80 text-foreground/60">Installation</a>
              <a href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Suspense fallback={<Skeleton className="h-5 w-20" />}>
                <HeaderStats />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              Awesome OpenClaw Skills
            </h1>
            <Suspense fallback={<Skeleton className="h-7 w-full max-w-xl" />}>
              <HeroContent />
            </Suspense>
          </div>
        </div>

        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList>
            <TabsTrigger value="skills">Browse Skills</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="space-y-8">
            <Suspense fallback={<SkillsLoading />}>
              <SkillsContent />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="installation">
            <Suspense fallback={<ContentLoading />}>
              <InstallationContent />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="about">
            <Suspense fallback={<ContentLoading />}>
              <AboutContent />
            </Suspense>
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}
