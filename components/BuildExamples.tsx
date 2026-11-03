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
        whyDiyStalls: "ChatGPT writes each step. It can\u2019t keep five systems in sync.",
    },
    {
        name: "A finance dashboard from your Excel",
        now: "\u201cAre we making money this month?\u201d takes an afternoon.",
        after: "One screen. Live, from the same file.",
        whyDiyStalls: "Templates fit everyone\u2019s business. Not yours.",
    },
];

const BuildExamples: React.FC = () => (
    <section className="section">
        <span className="eyebrow">What I build</span>
        <h2 className="section-title">
            Two examples. <span className="accent">Built around how you already work.</span>
        </h2>
        <div className="example-grid">
            {BUILD_EXAMPLES.map((example) => (
                <article key={example.name} className="card example-card">
                    <h3>{example.name}</h3>
                    <dl className="example-body">
                        <dt>Now</dt>
                        <dd>{example.now}</dd>
                        <dt>After</dt>
                        <dd>{example.after}</dd>
                        <dt>Why DIY stalls</dt>
                        <dd className="tail-broken">{example.whyDiyStalls}</dd>
                    </dl>
                </article>
            ))}
        </div>
    </section>
);

export default BuildExamples;
