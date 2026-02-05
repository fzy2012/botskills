import { Suspense } from "react";
import { getSiteData } from "@/lib/data";
import { SkillsBrowser } from "@/components/skills/skills-browser";
import { StatsCard } from "@/components/stats-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Boxes, Layers, Sparkles, Github, BookOpen, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function SkillsLoading() {
  return (
    <div className="space-y-6">
      {/* Search skeleton */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-11 w-full max-w-md" />
            <Skeleton className="h-11 w-24" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

async function StatsSection() {
  const data = await getSiteData();
  const totalSkills = data.categories.reduce((acc, c) => acc + c.skills.length, 0);
  const totalCategories = data.categories.length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatsCard
        value={`${totalSkills}+`}
        label="社区技能"
        icon={<Sparkles className="h-6 w-6" />}
      />
      <StatsCard
        value={totalCategories}
        label="技能分类"
        icon={<Layers className="h-6 w-6" />}
      />
      <StatsCard
        value="开源"
        label="免费使用"
        icon={<Boxes className="h-6 w-6" />}
      />
    </div>
  );
}

async function SkillsBrowserWrapper() {
  const data = await getSiteData();
  return <SkillsBrowser categories={data.categories} />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="text-primary">Open</span>Claw
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href="#skills">技能库</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href="#install">安装指南</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2" asChild>
              <Link href="https://github.com/openclaw/skills" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2" asChild>
              <Link href="https://www.clawhub.com" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                文档
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container relative py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="max-w-3xl space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-primary glow-text">AI 技能</span>
                <br />
                <span className="text-foreground">扩展无限可能</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                探索社区构建的 OpenClaw 技能，扩展 AI 助手能力，自动化工作流程，执行专业任务。
              </p>
            </div>
            
            {/* Quick Install */}
            <div id="install" className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border border-border/50 font-mono text-sm">
                <span className="text-primary">$</span>
                <span className="text-muted-foreground">npx clawhub@latest install</span>
                <span className="text-foreground">{'<skill-slug>'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-28 rounded-xl" />
                ))}
              </div>
            }
          >
            <StatsSection />
          </Suspense>
        </section>

        {/* Skills Browser */}
        <section id="skills">
          <Suspense fallback={<SkillsLoading />}>
            <SkillsBrowserWrapper />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              社区驱动的开源项目，欢迎贡献
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/openclaw/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://www.clawhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ClawHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
