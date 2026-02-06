import { Suspense } from "react";
import { getSiteData } from "@/lib/data";
import { SkillsBrowser } from "@/components/skills/skills-browser";
import { HeroSection } from "@/components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, BookOpen, Terminal, Menu, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuroraHero } from "@/components/aurora-hero";

/* ---------- Loading skeletons ---------- */

function HeroLoading() {
  return (
    <div className="py-20 md:py-32 space-y-8">
      <Skeleton className="h-8 w-48 rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-16 w-96 max-w-full" />
        <Skeleton className="h-16 w-80 max-w-full" />
      </div>
      <Skeleton className="h-6 w-full max-w-2xl" />
      <Skeleton className="h-14 w-96 rounded-xl" />
      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

/* ---------- Async data wrappers ---------- */

async function HeroWrapper() {
  const data = await getSiteData();
  const totalSkills = data.categories.reduce((acc, c) => acc + c.skills.length, 0);
  const totalCategories = data.categories.length;
  return <HeroSection totalSkills={totalSkills} totalCategories={totalCategories} />;
}



/* ---------- Page ---------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      {/* Dot grid background */}
      <div className="fixed inset-0 dot-grid pointer-events-none opacity-40" />

      {/* ========= Header ========= */}
      <header className="sticky top-0 z-50 w-full glass-strong border-b border-border/30">
        <div className="container flex h-16 items-center justify-between">
          {/* Left: brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/25 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                  <Terminal className="h-4 w-4" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base tracking-tight leading-tight">
                  <span className="text-primary">Open</span>
                  <span className="text-foreground">Claw</span>
                  <span className="text-muted-foreground font-normal ml-1.5 text-xs">技能库</span>
                </span>
                <span className="text-[10px] text-muted-foreground/60 leading-none">
                  {"by 入行 365"}
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-primary/5" asChild>
                <Link href="#skills">浏览技能</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-primary/5" asChild>
                <Link href="https://www.clawhub.com" target="_blank" rel="noopener noreferrer">
                  文档
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/5"
              asChild
            >
              <Link href="https://github.com/openclaw/skills" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button
              size="sm"
              className="hidden sm:flex gap-2 bg-primary text-background hover:bg-primary/90 glow-sm font-medium"
              asChild
            >
              <Link href="https://www.clawhub.com" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                开始使用
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">菜单</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ========= Main content ========= */}
      <main className="container relative">
        {/* Aurora hero background */}
        <AuroraHero />

        {/* Hero */}
        <Suspense fallback={<HeroLoading />}>
          <HeroWrapper />
        </Suspense>

        {/* Skills browser - fetches its own data via API to avoid large document */}
        <section id="skills" className="pb-20">
          <SkillsBrowser />
        </section>
      </main>

      {/* ========= Footer ========= */}
      <footer className="relative border-t border-border/30 glass-strong">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Terminal className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">
                    <span className="text-primary">Open</span>Claw
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">入行 365 出品</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                开源的 AI 技能生态系统，由社区驱动，为开发者打造。本站是 rhzl.ruhang365.cn 的组成部分。
              </p>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">资源</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="https://www.clawhub.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    官方文档
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/openclaw/skills" target="_blank" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    GitHub 仓库
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    浏览技能
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">社区</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="https://github.com/openclaw/skills/issues" target="_blank" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    提交问题
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/openclaw/skills/pulls" target="_blank" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    贡献代码
                  </Link>
                </li>
                <li>
                  <Link href="https://rhzl.ruhang365.cn" target="_blank" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    入行 365
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/60">
              {"入行 365 \u00B7 rhzl.ruhang365.cn \u00B7 社区驱动的开源项目"}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/openclaw/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/50 hover:text-primary transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
