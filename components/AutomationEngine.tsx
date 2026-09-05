import React, { useRef } from "react";
import {
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useSpring,
} from "motion/react";

const AutomationEngine: React.FC = () => {
    const automationEngineRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const rotateXTarget = useMotionValue(2);
    const rotateYTarget = useMotionValue(-5);
    const rotateX = useSpring(rotateXTarget, {
        stiffness: 120,
        damping: 18,
        mass: 0.55,
    });
    const rotateY = useSpring(rotateYTarget, {
        stiffness: 120,
        damping: 18,
        mass: 0.55,
    });

    const updateAutomationEngineTilt = (): void => {
        if (!automationEngineRef.current) return;
        automationEngineRef.current.style.setProperty(
            "--engine-rotate-x",
            `${rotateX.get()}deg`,
        );
        automationEngineRef.current.style.setProperty(
            "--engine-rotate-y",
            `${rotateY.get()}deg`,
        );
    };

    useMotionValueEvent(rotateX, "change", updateAutomationEngineTilt);
    useMotionValueEvent(rotateY, "change", updateAutomationEngineTilt);

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>,
    ): void => {
        if (shouldReduceMotion || event.pointerType !== "mouse") return;

        const engineBounds = event.currentTarget.getBoundingClientRect();
        const horizontalPosition =
            (event.clientX - engineBounds.left) / engineBounds.width;
        const verticalPosition =
            (event.clientY - engineBounds.top) / engineBounds.height;

        rotateXTarget.set((verticalPosition - 0.5) * -22);
        rotateYTarget.set((horizontalPosition - 0.5) * 22);
        automationEngineRef.current?.style.setProperty(
            "--engine-light-x",
            `${horizontalPosition * 100}%`,
        );
        automationEngineRef.current?.style.setProperty(
            "--engine-light-y",
            `${verticalPosition * 100}%`,
        );
    };

    const resetTilt = (): void => {
        rotateXTarget.set(2);
        rotateYTarget.set(-5);
    };

    return (
        <div
            className="automation-engine-visual"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            aria-hidden="true"
        >
            <div className="automation-engine-aura" />
            <div className="automation-engine-float automation-engine-float-design">
                <span>DESIGN</span>
                <strong>Clear & Concise</strong>
            </div>
            <div className="automation-engine-float automation-engine-float-code">
                <span>ENGINEERING</span>
                <strong>Built to scale</strong>
            </div>
            <div className="automation-engine-stack" ref={automationEngineRef}>
                <div className="automation-engine-layer automation-engine-blueprint">
                    <div className="automation-engine-layer-label">
                        01 / SIGNAL
                    </div>
                    <div className="automation-engine-blueprint-grid">
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div className="automation-engine-layer automation-engine-code">
                    <div className="automation-engine-code-header">
                        <div className="automation-engine-window-dots">
                            <span />
                            <span />
                            <span />
                        </div>
                        <span>workflow.ts</span>
                    </div>
                    <div className="automation-engine-code-body">
                        <div>
                            <span className="code-purple">when</span>{" "}
                            order.received
                        </div>
                        <div className="code-indent">
                            <span className="code-blue">validate</span>(data)
                        </div>
                        <div className="code-indent">
                            <span className="code-blue">automate</span>
                            (workflow)
                        </div>
                        <div className="code-indent">
                            <span className="code-green">notify</span>(team)
                        </div>
                    </div>
                </div>

                <div className="automation-engine-layer automation-engine-result">
                    <div className="automation-engine-result-header">
                        <div>
                            <span className="automation-engine-prompt">
                                &gt;_
                            </span>
                            <span> automation.flow</span>
                        </div>
                        <span className="automation-engine-live">
                            <i /> LIVE
                        </span>
                    </div>

                    <div className="automation-engine-pipeline">
                        <div className="automation-engine-pipeline-step">
                            <span>INPUT</span>
                            <strong>Manual orders</strong>
                            <small>12 steps</small>
                        </div>
                        <div className="automation-engine-connector">
                            <i />
                        </div>
                        <div className="automation-engine-pipeline-step automation-engine-pipeline-core">
                            <div className="automation-engine-core-mark">
                                <i />
                                <span>RUN</span>
                            </div>
                            <strong>Automation</strong>
                            <small>system online</small>
                        </div>
                        <div className="automation-engine-connector">
                            <i />
                        </div>
                        <div className="automation-engine-pipeline-step">
                            <span>OUTPUT</span>
                            <strong>Team notified</strong>
                            <small>complete</small>
                        </div>
                    </div>

                    <div className="automation-engine-impact">
                        <div>
                            <strong>80%</strong>
                            <span>less manual work</span>
                        </div>
                        <span className="automation-engine-complete">
                            ✓ workflow completed
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomationEngine;
