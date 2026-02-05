import { Suspense } from "react";
import { getSiteData } from "@/lib/data";
import { SkillsBrowser } from "@/components/skills/skills-browser";
import { HeroSection } from "@/components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, BookOpen, Terminal, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function SkillsLoading() {
  return (
    <div className="space-y-8">
      {/* Search skeleton */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-6 glass">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-full max-w-md rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function HeroLoading() {
  return (
    <div className="py-16 md:py-24 space-y-8">
      <Skeleton className="h-8 w-48 rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-16 w-96 max-w-full" />
        <Skeleton className="h-16 w-80 max-w-full" />
      </div>
      <Skeleton className="h-6 w-full max-w-2xl" />
      <Skeleton className="h-14 w-96 rounded-xl" />
      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

async function HeroWrapper() {
  const data = await getSiteData();
  const totalSkills = data.categories.reduce((acc, c) => acc + c.skills.length, 0);
  const totalCategories = data.categories.length;
  
  return <HeroSection totalSkills={totalSkills} totalCategories={totalCategories} />;
}

async function SkillsBrowserWrapper() {
  const data = await getSiteData();
  return <SkillsBrowser categories={data.categories} />;
}

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg text-foreground">
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass border-b border-border/30">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-background transition-all">
                  <Terminal className="h-4 w-4" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:block">
                <span className="text-primary">Open</span>
                <span className="text-foreground">Claw</span>
                <span className="text-muted-foreground font-normal ml-2 text-sm">技能库</span>
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-primary/10" asChild>
              <Link href="#skills">浏览技能</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-primary/10" asChild>
              <Link href="https://www.clawhub.com" target="_blank" rel="noopener noreferrer">
                文档
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10"
              asChild
            >
              <Link href="https://github.com/openclaw/skills" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="hidden sm:flex gap-2 bg-primary text-background hover:bg-primary/90 glow-sm"
              asChild
            >
              <Link href="https://www.clawhub.com" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                <span>开始使用</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container relative">
        {/* Hero Section */}
        <Suspense fallback={<HeroLoading />}>
          <HeroWrapper />
        </Suspense>

        {/* Skills Browser */}
        <section id="skills" className="pb-16">
          <Suspense fallback={<SkillsLoading />}>
            <SkillsBrowserWrapper />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/30 glass">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Terminal className="h-4 w-4" />
                </div>
                <span className="font-bold">OpenClaw</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                开源的 AI 技能生态系统，由社区驱动，为开发者打造。
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">资源</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://www.clawhub.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    官方文档
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/openclaw/skills" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    GitHub 仓库
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                    浏览技能
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">社区</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://github.com/openclaw/skills/issues" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    提交问题
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/openclaw/skills/pulls" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    贡献代码
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              社区驱动的开源项目，欢迎贡献
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/openclaw/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
