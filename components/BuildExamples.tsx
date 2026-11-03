import React from "react";

interface BuildExample {
    name: string;
    now: string;
    after: string;
    whyDiyStalls: string;
}

const BUILD_EXAMPLES: BuildExample[] = [
    {
        name: "Customer onboarding, automated",
        now: "Sign-up, welcome, invoice, account. Four people, two days.",
        after: "One form. Minutes.",
        whyDiyStalls: "ChatGPT writes each step. It can’t keep five systems in sync.",
    },
    {
        name: "A finance dashboard from your Excel",
        now: "“Are we making money this month?” takes an afternoon.",
        after: "One screen. Live, from the same file.",
        whyDiyStalls: "Templates fit everyone’s business. Not yours.",
    },
];

const BuildExamples: React.FC = () => {
    return (
        <section id="what-i-build" className="pitch-section">
            <span className="pitch-eyebrow">What I build</span>
            <h2 className="pitch-title">Two examples.</h2>
            <div className="build-examples">
                {BUILD_EXAMPLES.map((example) => (
                    <article key={example.name} className="build-example">
                        <h3 className="build-example-name">{example.name}</h3>
                        <dl className="build-example-body">
                            <dt>Now</dt>
                            <dd>{example.now}</dd>
                            <dt>After</dt>
                            <dd>{example.after}</dd>
                            <dt>Why DIY stalls</dt>
                            <dd className="build-example-stall">{example.whyDiyStalls}</dd>
                        </dl>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BuildExamples;
