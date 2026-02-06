"use client";

import { GradientText } from "./gradient-text";
import { AnimatedCounter } from "./animated-counter";
import { SplitText } from "./ui/split-text";
import { ScrollReveal } from "./ui/scroll-reveal";
import { Magnet } from "./ui/magnet";
import { Copy, Check, Terminal, Zap, Layers, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  totalSkills: number;
  totalCategories: number;
}

export function HeroSection({ totalSkills, totalCategories }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const installCommand = "npx clawhub@latest install <skill-slug>";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      icon: Zap,
      value: totalSkills,
      suffix: "+",
      label: "社区技能",
      color: "text-primary",
      bg: "bg-primary/10",
      bgHover: "group-hover:bg-primary",
    },
    {
      icon: Layers,
      value: totalCategories,
      suffix: "",
      label: "技能分类",
      color: "text-accent",
      bg: "bg-accent/10",
      bgHover: "group-hover:bg-accent",
    },
    {
      icon: Shield,
      value: 100,
      suffix: "%",
      label: "开源免费",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      bgHover: "group-hover:bg-emerald-400",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        {/* Status badge */}
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-primary/20 mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 pulse-ring" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-sm text-muted-foreground">
              {"已收录 "}
              <span className="text-primary font-semibold tabular-nums">{totalSkills}+</span>
              {" 社区技能"}
            </span>
          </div>
        </ScrollReveal>

        {/* Main heading */}
        <div className="mb-8">
          <SplitText
            text="探索 AI 技能"
            tag="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
            splitType="words"
            delay={120}
            duration={0.8}
            from="bottom"
          />
          <div className="mt-3">
            <GradientText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight inline-block">
              <SplitText
                text="扩展无限可能"
                tag="span"
                splitType="words"
                delay={120}
                duration={0.8}
                from="bottom"
              />
            </GradientText>
          </div>
        </div>

        {/* Description */}
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
            发现社区构建的 OpenClaw 技能库，让你的 AI 助手获得超能力 ——
            自动化工作流程、连接外部服务、执行专业任务。
          </p>
        </ScrollReveal>

        {/* Install command */}
        <ScrollReveal delay={300}>
          <div className="relative group inline-block mb-14">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center gap-3 px-5 py-4 rounded-xl glass border-border/40 group-hover:border-primary/30 transition-all duration-300">
              <Terminal className="w-5 h-5 text-primary shrink-0" />
              <code className="text-sm md:text-base font-mono text-muted-foreground select-all">
                <span className="text-primary">$</span>{" "}
                {installCommand}
              </code>
              <button
                onClick={handleCopy}
                className={cn(
                  "ml-2 p-2 rounded-lg transition-all duration-200",
                  "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                )}
                aria-label={copied ? "已复制" : "复制命令"}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={400 + i * 100} from="scale">
              <Magnet strength={4} padding={40}>
                <div className="group text-center p-5 rounded-2xl glass shimmer-scan cursor-default">
                  <div className="flex justify-center mb-3">
                    <div className={cn(
                      "p-2.5 rounded-xl transition-all duration-300",
                      stat.bg, stat.color,
                      stat.bgHover, "group-hover:text-background group-hover:shadow-lg"
                    )}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className={cn("text-2xl md:text-3xl font-bold tabular-nums", stat.color)}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1.5">{stat.label}</div>
                </div>
              </Magnet>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
