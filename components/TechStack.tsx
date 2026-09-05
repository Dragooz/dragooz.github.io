import React from "react";
import { BsOpenai } from "react-icons/bs";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiDjango,
    SiPython,
    SiPostgresql,
    SiDocker,
    SiGit,
    SiNodedotjs,
    SiFastapi,
    SiRailway,
    SiVercel,
    SiSupabase,
    SiRedis,
} from "react-icons/si";

const CATEGORIES = [
    {
        name: "Frontend",
        icons: [
            { icon: SiReact, name: "React", color: "#61DAFB" },
            { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
            { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
            { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
        ],
    },
    {
        name: "Backend",
        icons: [
            { icon: SiDjango, name: "Django", color: "#44B78B" },
            { icon: SiPython, name: "Python", color: "#3776AB" },
            { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
            { icon: SiFastapi, name: "FastAPI", color: "#009688" },
        ],
    },
    {
        name: "Deploy & Infra",
        icons: [
            { icon: SiRailway, name: "Railway", color: "#FFFFFF" },
            { icon: SiVercel, name: "Vercel", color: "#FFFFFF" },
            { icon: SiDocker, name: "Docker", color: "#2496ED" },
            { icon: SiSupabase, name: "Supabase", color: "#3FCF8E" },
        ],
    },
    {
        name: "AI & Data",
        icons: [
            { icon: BsOpenai, name: "OpenAI", color: "#FFFFFF" },
            { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
            { icon: SiRedis, name: "Redis", color: "#DC382D" },
            { icon: SiGit, name: "Git", color: "#F05032" },
        ],
    },
];

const TechStack: React.FC = () => {
    return (
        <section className="tech-stack">
            <h3 className="tech-stack-title">Tools I Work With</h3>
            <div className="tech-stack-grid">
                {CATEGORIES.map(cat => (
                    <div key={cat.name} className="tech-category">
                        <div className="tech-category-name">{cat.name}</div>
                        <div className="tech-icons">
                            {cat.icons.map(item => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.name} className="tech-icon-item">
                                        <Icon
                                            style={{ color: item.color, width: 24, height: 24 }}
                                        />
                                        <span className="tech-icon-label">{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <p className="tech-stack-tagline">
                Simple script or full-stack app — I pick what ships fastest.
            </p>
        </section>
    );
};

export default TechStack;
