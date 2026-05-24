import React, { useState, useRef, useEffect } from "react";

export type NodeId = "what" | "who" | "when" | "why" | "how";

interface OrbitalNode {
    id: NodeId;
    label: string;
    angle: number; // degrees, 0 = top
}

const NODES: OrbitalNode[] = [
    { id: "what", label: "Work",    angle: 0   },
    { id: "who",  label: "Me",      angle: 72  },
    { id: "when", label: "Journey", angle: 144 },
    { id: "why",  label: "Drive",   angle: 216 },
    { id: "how",  label: "Process", angle: 288 },
];

const CONTENT: Record<NodeId, React.ReactNode> = {
    what: (
        <div className="ss-content-inner">
            <h3 className="ss-section-title">Work</h3>
            <div className="ss-cases">
                <div className="ss-case">
                    <div className="ss-case-header">
                        <span className="ss-case-name">Pengrow</span>
                        <a
                            className="ss-case-link"
                            href="https://github.com/Dragooz/Pengrow"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub ↗
                        </a>
                    </div>
                    <p className="ss-case-built">
                        Multi-appraiser performance review platform. Django + React + PostgreSQL.
                    </p>
                </div>

                <div className="ss-case">
                    <div className="ss-case-header">
                        <span className="ss-case-name">LLM CS Helper</span>
                        <a
                            className="ss-case-link"
                            href="https://github.com/Dragooz/llm-highlighter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub ↗
                        </a>
                    </div>
                    <p className="ss-case-built">
                        Browser extension that highlights relevant context for CS agents in real time.
                    </p>
                </div>

                <div className="ss-case">
                    <div className="ss-case-header">
                        <span className="ss-case-name">F&amp;B Order Automation</span>
                        <span className="ss-case-anon">Anonymous client</span>
                    </div>
                    <p className="ss-case-built">
                        End-to-end order processing automation. 80% less manual work.
                    </p>
                </div>
            </div>
        </div>
    ),

    who: (
        <div className="ss-content-inner">
            <h3 className="ss-section-title">Me</h3>
            <p className="ss-bio">
                Solo full-stack engineer. AI graduate from University Malaya.
            </p>
            <p className="ss-bio">
                I work with SMEs who need real solutions fast — not lengthy vendor contracts or endless back-and-forth.
            </p>
            <p className="ss-bio">
                I speak business first, code second. If you can describe your problem, I can build the solution.
            </p>
            <div className="ss-traits">
                <div className="ss-trait">
                    <span className="ss-trait-icon">🧩</span>
                    <span>Problem Solver</span>
                </div>
                <div className="ss-trait">
                    <span className="ss-trait-icon">🤝</span>
                    <span>Business-minded</span>
                </div>
                <div className="ss-trait">
                    <span className="ss-trait-icon">⚡</span>
                    <span>Ships fast</span>
                </div>
            </div>
        </div>
    ),

    when: (
        <div className="ss-content-inner">
            <h3 className="ss-section-title">Journey</h3>
            <div className="ss-timeline">
                <div className="ss-timeline-item">
                    <div className="ss-tl-dot" />
                    <div className="ss-tl-body">
                        <div className="ss-tl-role">Consulting — Technology Strategy &amp; Transformation</div>
                        <div className="ss-tl-company">Deloitte</div>
                        <div className="ss-tl-period">2022</div>
                    </div>
                </div>
                <div className="ss-timeline-item">
                    <div className="ss-tl-dot" />
                    <div className="ss-tl-body">
                        <div className="ss-tl-role">Software Engineer</div>
                        <div className="ss-tl-company">Reluvate</div>
                        <div className="ss-tl-period">2022 – 2024</div>
                    </div>
                </div>
                <div className="ss-timeline-item">
                    <div className="ss-tl-dot active" />
                    <div className="ss-tl-body">
                        <div className="ss-tl-role">Fullstack Engineer</div>
                        <div className="ss-tl-company">Swipey</div>
                        <div className="ss-tl-period">2024 – Present</div>
                    </div>
                </div>
            </div>
        </div>
    ),

    why: (
        <div className="ss-content-inner">
            <h3 className="ss-section-title">Drive</h3>
            <div className="ss-drives">
                <div className="ss-drive-item">
                    <span className="ss-drive-num">01</span>
                    <div>
                        <div className="ss-drive-title">Puzzle Solving</div>
                        <div className="ss-drive-desc">The satisfaction of untangling a messy problem is unmatched.</div>
                    </div>
                </div>
                <div className="ss-drive-item">
                    <span className="ss-drive-num">02</span>
                    <div>
                        <div className="ss-drive-title">Building Good Products</div>
                        <div className="ss-drive-desc">Shipping something that actually works and people use — that&apos;s the goal.</div>
                    </div>
                </div>
                <div className="ss-drive-item">
                    <span className="ss-drive-num">03</span>
                    <div>
                        <div className="ss-drive-title">Constant Learning</div>
                        <div className="ss-drive-desc">Tech evolves. I evolve with it. Always picking up the next useful thing.</div>
                    </div>
                </div>
            </div>
        </div>
    ),

    how: (
        <div className="ss-content-inner">
            <h3 className="ss-section-title">Process</h3>
            <div className="ss-steps">
                <div className="ss-step">
                    <span className="ss-step-num">01</span>
                    <div>
                        <div className="ss-step-title">Understand the real problem</div>
                        <div className="ss-step-desc">Not just the brief — the business context, the pain, the goal.</div>
                    </div>
                </div>
                <div className="ss-step">
                    <span className="ss-step-num">02</span>
                    <div>
                        <div className="ss-step-title">Break it down</div>
                        <div className="ss-step-desc">Identify what actually needs building vs what&apos;s nice-to-have.</div>
                    </div>
                </div>
                <div className="ss-step">
                    <span className="ss-step-num">03</span>
                    <div>
                        <div className="ss-step-title">Ship &amp; test</div>
                        <div className="ss-step-desc">Iterate fast. Real feedback beats perfect plans.</div>
                    </div>
                </div>
            </div>
        </div>
    ),
};

interface SolarSystemProps {
    activeNode?: NodeId | null;
    setActiveNode?: (node: NodeId | null) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ activeNode: controlledNode, setActiveNode: controlledSetActiveNode }) => {
    const [internalActiveNode, setInternalActiveNode] = useState<NodeId | null>(null);
    const activeNode = controlledNode !== undefined ? controlledNode : internalActiveNode;
    const setActiveNode = controlledSetActiveNode || ((node: NodeId | null) => setInternalActiveNode(node));

    const orbitRef = useRef<HTMLDivElement>(null);
    const [orbitRadius, setOrbitRadius] = useState(200);

    useEffect(() => {
        if (!orbitRef.current) return;
        const updateRadius = () => {
            if (orbitRef.current) {
                setOrbitRadius(orbitRef.current.offsetWidth * 0.4);
            }
        };
        updateRadius();
        const ro = new ResizeObserver(updateRadius);
        ro.observe(orbitRef.current);
        return () => ro.disconnect();
    }, []);

    const handleNodeClick = (id: NodeId) => {
        setActiveNode(activeNode === id ? null : id);
    };

    return (
        <section id="solar-system">
            {/* Mobile: tab list — content appears directly below clicked tab */}
            <div className="ss-mobile-tabs">
                {NODES.map(node => (
                    <React.Fragment key={node.id}>
                        <button
                            className={`ss-mobile-tab ${activeNode === node.id ? "active" : ""}`}
                            onClick={() => handleNodeClick(node.id)}
                        >
                            {node.label}
                        </button>
                        {activeNode === node.id && (
                            <div className="ss-mobile-content">
                                {CONTENT[node.id]}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Desktop: solar system */}
            <div className={`ss-desktop ${activeNode ? "has-active" : ""}`}>
                <div className="ss-orbit-area" ref={orbitRef}>
                    {/* Center */}
                    <div className="ss-center">
                        <div className="ss-center-icon">5W1H</div>
                        <div className="ss-center-subtitle">The Framework</div>
                    </div>

                    {/* Orbit path visual */}
                    <div className="ss-orbit-ring" />

                    {/* Nodes */}
                    {NODES.map(node => {
                        const rad = (node.angle - 90) * (Math.PI / 180);
                        const x = Math.cos(rad) * orbitRadius;
                        const y = Math.sin(rad) * orbitRadius;
                        const isActive = activeNode === node.id;

                        return (
                            <button
                                key={node.id}
                                className={`ss-node ${isActive ? "active" : ""} ${activeNode && !isActive ? "dimmed" : ""}`}
                                style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                }}
                                onClick={() => handleNodeClick(node.id)}
                                aria-label={node.label}
                            >
                                <span className="ss-node-label">{node.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content panel */}
                <div className={`ss-panel ${activeNode ? "visible" : ""}`}>
                    {activeNode ? CONTENT[activeNode] : (
                        <div className="ss-panel-hint">
                            <span>Select a node to explore</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SolarSystem;
