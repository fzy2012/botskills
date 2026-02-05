"use client";

import { GradientText } from "./gradient-text";
import { AnimatedCounter } from "./animated-counter";
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

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      
      <div className="relative max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 count-animation">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm text-muted-foreground">
            已收录 <span className="text-primary font-semibold">{totalSkills}+</span> 社区技能
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 line-decoration">
          <span className="block text-foreground">探索 AI 技能</span>
          <GradientText className="block mt-2">扩展无限可能</GradientText>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
          发现社区构建的 OpenClaw 技能库，让你的 AI 助手获得超能力 ——
          自动化工作流程、连接外部服务、执行专业任务。
        </p>

        {/* Install command */}
        <div className="relative group inline-block mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative flex items-center gap-3 px-5 py-4 rounded-xl glass border border-border/50 group-hover:border-primary/30 transition-colors">
            <Terminal className="w-5 h-5 text-primary shrink-0" />
            <code className="text-sm md:text-base font-mono text-muted-foreground">
              <span className="text-primary">$</span> {installCommand}
            </code>
            <button
              onClick={handleCopy}
              className={cn(
                "ml-2 p-2 rounded-lg transition-all",
                "hover:bg-primary/10 text-muted-foreground hover:text-primary"
              )}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
          <div className="text-center p-4 rounded-xl glass glass-hover group">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary glow-text">
              <AnimatedCounter value={totalSkills} suffix="+" />
            </div>
            <div className="text-sm text-muted-foreground mt-1">社区技能</div>
          </div>
          
          <div className="text-center p-4 rounded-xl glass glass-hover group">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-accent">
              <AnimatedCounter value={totalCategories} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">技能分类</div>
          </div>
          
          <div className="text-center p-4 rounded-xl glass glass-hover group">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-background transition-colors">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-500">
              100%
            </div>
            <div className="text-sm text-muted-foreground mt-1">开源免费</div>
          </div>
        </div>
      </div>
    </section>
  );
}
