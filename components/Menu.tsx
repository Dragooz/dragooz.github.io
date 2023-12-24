import Link from "next/link";
import React from "react";

const Menu = () => {
    return (
        <div id="menu" className="menuContainer">
            <div id="menuItems">
                {/*     Who: Personal Profile & Background
        Share who you are, including your personal background, your journey into tech, and what defines you as a professional. This section is about your identity, both personal and professional.*/}
                {/*Where: Learning Path & Growth
        Focus on where your learning has taken place and where you've grown. This could include your educational background, self-taught skills, and professional development experiences. It's about the places, both physical and metaphorical, that have shaped your skills and knowledge.*/}
                {/*When: Career Timeline & Milestones
        Outline the key when moments of your career. When did you start your tech journey? When did you achieve significant milestones or face pivotal moments? This chronological perspective can give viewers a sense of your career progression and timeline.*/}
                {/*Why: Motivations & Passions
        Explain why you do what you do. What motivates you in your career? Why are you passionate about tech and full-stack development? This section delves into your inner motivations and the reasons behind your career choices.*/}
                {/*How: Teamwork & Collaborative Approach
        Illustrate how you work with others and how you approach projects and challenges. This includes your teamwork experiences, your problem-solving methods, and how you contribute to a collaborative environment. */}
                <Link href="/" className="menuItem">
                    What
                </Link>
                <Link href="/" className="menuItem">
                    Who
                </Link>
                <Link href="/" className="menuItem">
                    When
                </Link>
                <Link href="/" className="menuItem">
                    Where
                </Link>
                <Link href="/" className="menuItem">
                    Why
                </Link>
                <Link href="/" className="menuItem">
                    How
                </Link>
            </div>
        </div>
    );
};

export default Menu;
