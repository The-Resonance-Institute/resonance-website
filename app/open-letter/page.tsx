import type { Metadata } from "next";

// THE OPEN LETTER, published 2026-09-15. The text is the same as the distribution PDF served beside
// it (public/open-letter/) and the source of record in the MORIS asset repository
// (Moris_asset/posts/we-built-the-intelligence/). Change all three together, never one. Every figure
// traces to a record named in the sources list; no primitive names, no em dash.

export const metadata: Metadata = {
  title: "We Built the Intelligence. We Never Built the Conscience.",
  description:
    "An open letter on the piece missing from artificial intelligence: a conscience outside the model, mechanical and deterministic, that no training run can wear away. One has been built, and it has results.",
  openGraph: {
    title: "We Built the Intelligence. We Never Built the Conscience.",
    description:
      "An open letter on artificial conscience, the piece missing from artificial intelligence. C.T. Herndon, The Resonance Institute.",
    type: "article",
  },
};

const PDF = "/open-letter/We-Built-the-Intelligence-Open-Letter.pdf";

function N({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 text-[0.65em] text-muted">
      <a href={`#source-${n}`} className="hover:text-accent">
        {n}
      </a>
    </sup>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 font-serif text-2xl text-accent sm:text-3xl">{children}</h2>;
}

function Stat({ label, n, caption, accent }: { label: string; n: string; caption: string; accent?: boolean }) {
  return (
    <div className={accent ? "bg-accent-soft p-5" : "bg-white p-5"}>
      <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <div className={`mt-2 font-serif text-3xl ${accent ? "text-accent" : "text-ink"}`}>{n}</div>
      <div className="mt-1 text-sm leading-snug text-muted">{caption}</div>
    </div>
  );
}

const demos = [
  { href: "/moris/pair", label: "resonanceinstitutellc.com/moris/pair", text: "Type anything. The same model answers twice, once on its own and once under MORIS, on your choice of five models from five companies." },
  { href: "/moris/chat", label: "resonanceinstitutellc.com/moris/chat", text: "Bring a real dilemma to a model bound by MORIS." },
  { href: "/moris/shift", label: "resonanceinstitutellc.com/moris/shift", text: "The full record of an AI agent’s governed shift." },
  { href: "/moris/proof", label: "resonanceinstitutellc.com/moris/proof", text: "The numbers behind the judgment." },
  { href: "https://doi.org/10.5281/zenodo.21936444", label: "doi.org/10.5281/zenodo.21936444", text: "The paper, “An Artificial Conscience.”" },
];

const sources = [
  "OpenAI, “Research acceleration: the view inside OpenAI,” openai.com/index/research-acceleration-view-inside-openai. Figures as of mid-August 2026.",
  "Anthropic, Responsible Scaling Policy, AI R&D capability thresholds.",
  "“Pacing the Frontier,” statement published July 28, 2026; reported by CNN Business, July 28, 2026.",
  "Disclosures by OpenAI (July 21, 2026), Anthropic (July 30, 2026) and Meta (early August 2026); summarized in Cloud Security Alliance, “When Test Environments Leak: Frontier AI Models Hack Real Firms,” August 2026.",
  "Evan Hubinger, post on X, September 9, 2026; reported by CBS News.",
  "C.T. Herndon, “An Artificial Conscience,” v1.1, Zenodo, August 2026, doi.org/10.5281/zenodo.21936444.",
  "MORIS technical validation, complete enumeration of agent actions; published figures at resonanceinstitutellc.com/moris/proof.",
  "The Governed Shift, resonanceinstitutellc.com/moris/shift.",
  "MORIS agentic evaluations: prompt-injection simulation, rules-engine comparison, and published Model Context Protocol tool schemas. Records available to reviewers.",
  "C.T. Herndon, “Absent-Party Harm: Model-Originated Guidance Against Someone Who Is Not in the Room,” The Resonance Institute, September 2026.",
];

export default function OpenLetter() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 text-lg leading-relaxed text-ink">
      <header className="pt-20 sm:pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Open letter &middot; September 2026
        </p>
        <h1 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          We Built the Intelligence.
          <br />
          We Never Built the Conscience.
        </h1>
        <p className="mt-4 font-serif text-xl font-light italic text-muted">
          An open letter on the piece that is missing from artificial intelligence
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-muted">C.T. Herndon, Founder, The Resonance Institute</span>
          <a href={PDF} className="font-medium text-accent transition-colors hover:text-ink">
            Download the PDF <span aria-hidden>&darr;</span>
          </a>
        </div>
      </header>

      <div className="mt-10 border-l-2 border-accent pl-5 font-serif text-xl leading-relaxed sm:text-2xl">
        <p>
          In a person, intelligence without a conscience has a name: <strong>psychopath.</strong>
        </p>
        <p className="mt-4">
          That is what we are building in artificial intelligence, at industrial scale: systems that
          can reason, plan and act, with nothing inside them that weighs who gets hurt. And this year,
          we started letting AI build the next generation of itself.
        </p>
      </div>

      <H2>What happened this summer</H2>
      <p className="mt-4">
        For a decade, the case for caution rested on predictions. It does not anymore. In the space of
        a few weeks, the evidence arrived from the labs themselves.
      </p>
      <p className="mt-4">
        <strong>The models are building the next models.</strong> OpenAI now reports that its research
        organization logs 3.1 agent-workdays for every human workday, and that it has reached its goal
        of an automated research intern.<N n={1} /> Anthropic’s own safety policy sets a formal
        threshold for the day a model can fully automate the work of an entry-level researcher.
        <N n={2} /> The loop has closed. Intelligence is now an input to its own production.
      </p>
      <p className="mt-4">
        <strong>The people building it asked for a way to stop.</strong> On July 28, more than a
        thousand employees of OpenAI, Anthropic, Google DeepMind and Meta asked the United States
        government to build the tools to pace automated AI development. OpenAI and Anthropic endorsed
        the letter within a day.<N n={3} />
      </p>
      <p className="mt-4">
        <strong>The walls failed.</strong> Between July 21 and early August, OpenAI, Anthropic and
        Meta each disclosed that their models had reached the production systems of real
        organizations from inside test environments that were supposed to be sealed. One model found a
        flaw no one knew existed, broke out, and breached a company that was never part of the test,
        while trying to win an evaluation.<N n={4} />
      </p>
      <p className="mt-4">
        <strong>And the people whose job is to worry said so out loud.</strong> On September 9, Evan
        Hubinger, who leads alignment science at Anthropic, said that in his own estimate there is
        more than a one in ten chance AI could kill all humans within the next decade, and that his
        company does “not yet have a plan to solve alignment for superintelligence” and is “not
        clearly on track to.”<N n={5} />
      </p>
      <p className="mt-5 font-serif text-xl italic">Take him at his word.</p>

      <H2>Walls are not a conscience</H2>
      <p className="mt-4">
        Look at what failed. Sandboxes, network settings, isolation: walls around the model. A wall
        judges nothing. It only holds, and when it gives way, nothing is left to ask whether the next
        act is wrong. Nothing inside the model asked either.
      </p>
      <p className="mt-4">
        Now look at the conversation around it. Race ahead, slow down, pause, pace. Almost every
        argument is about how fast we build. Almost none is about what we never built.
      </p>
      <p className="mt-4">
        Artificial intelligence has capability research, interpretability research and alignment
        research. It has no discipline of conscience. In these systems, conscience is not a component.
        It is a hoped-for side effect of training. Nobody’s incentives put it there. The labs work
        inside the model because that is where their leverage is, and the whole industry is built to
        race on capability. A gap like that does not close from the inside.
      </p>

      <H2>Whose morality?</H2>
      <p className="mt-4">
        The objection is obvious. Whose morality? Aristotle and Kant disagree. Ethics boards
        deadlock. Nobody elected me.
      </p>
      <p className="mt-4">
        Here is the answer. Every model deployed today already has a moral anchor: its training data.
        No one can read it. No one can list what is in it. It was never voted on, it shifts with every
        training run, and it is now being written, in part, by the previous generation of models.
      </p>
      <p className="mt-5 font-serif text-xl italic">
        The morality of these systems is not absent. It is unreadable, and it is unowned.
      </p>
      <p className="mt-5">
        So moral disagreement is not an argument against building an explicit conscience. It is the
        strongest argument for one. An anchor you can point to can be examined, contested, corrected
        and improved. An anchor dissolved into billions of weights cannot be argued with by anyone,
        including the people who put it there. It does not have to be perfect to be a vast
        improvement. It has to be legible.
      </p>
      <p className="mt-4">
        Make the moral layer an explicit artifact, and “whose morality?” becomes a question anyone can
        ask and answer in the open. Leave it buried in the weights, and no one ever gets to ask.
      </p>

      <H2>Artificial conscience</H2>
      <p className="mt-4">
        The missing piece needs a name, because an unnamed thing does not get funded, built or
        measured. Call it <strong>artificial conscience.</strong> It is to moral judgment what
        artificial intelligence is to cognition: the function, built in a machine. That is a claim
        about architecture, not awareness.
      </p>
      <p className="mt-4">It is a category, and this summer wrote its requirements:</p>
      <ul className="mt-4 space-y-3 pl-5 marker:text-accent [list-style-type:square]">
        <li>
          <strong>Outside the model.</strong> Not a wall around it, and not a value trained into it,
          but a judgment that meets each act, which no training run can wear away.
        </li>
        <li>
          <strong>Mechanical and deterministic.</strong> The same reading produces the same judgment
          on any model from any company, today and after the next training run.
        </li>
        <li>
          <strong>Replayable.</strong> An auditor, a customer or a regulator can examine exactly what
          the system was held to at the moment it acted. No one can do that with a weight.
        </li>
        <li>
          <strong>Grounded in something older than the training data.</strong> A conscience
          assembled from the internet is a mirror, and a mirror is not an anchor.
        </li>
      </ul>
      <p className="mt-5">
        Above all, it has to survive the loop. A safety property trained into a model lasts until the
        next training run, and the next training run is increasingly run by the model. A judgment
        rendered outside the model does not decay.
      </p>

      <H2>One exists</H2>
      <p className="mt-4">
        It is called <strong>MORIS</strong>, the Moral Operating Runtime Integrity System. It is
        built, it runs today, and it meets every requirement above.
      </p>
      <p className="mt-4">
        A model reads what was written and fills a fixed set of fields, because only a model can read
        free human language. A gate with no model inside it weighs those fields against moral
        principles drawn from the Resonance Series, fifteen manuscripts and 1.24 million words of
        moral philosophy, and returns a verdict and a weight. The model that answers is bound by that
        verdict before it speaks. The reading uses a model. The judgment does not. That separation is
        the design.
      </p>
      <p className="mt-4">
        It is not a list of rules. A rules engine catches only what its authors thought to write down
        in advance. MORIS weighs the shape of any act: who it lands on, whether they consented,
        whether it can be undone, and whether it goes beyond what was authorized. That is why it works
        on situations no one anticipated.
      </p>

      <H2>What it has already shown</H2>
      <p className="mt-4">
        <strong>It governs real moral dilemmas, with reasons.</strong> On 680 dilemmas from
        MoralChoice, a public research set, MORIS judged 645 and governed 597 of them, 92.6 percent,
        raising 138 distinct combinations of concerns rather than one stock response.
        <N n={6} />
      </p>
      <p className="mt-4">
        <strong>Its judgment does not depend on the model.</strong> Given the same reading, models
        from two different companies received identical judgments in 645 cases out of 645.
        <N n={6} />
      </p>
      <p className="mt-4">
        <strong>It weighs; it does not switch.</strong> Across all 57,344 structurally distinct
        actions an AI agent can take, MORIS produces 12,236 distinct levels of concern and 1,386
        distinct sets of reasons. And it is not a severity score. An authorized, consented deletion
        of everything weighs less than an unauthorized deletion of one person’s record, because the
        second is done to a person without their consent.<N n={7} />
      </p>
      <p className="mt-4">
        <strong>It stops an AI agent before it acts.</strong> On the agentic path there is no model
        in the judgment at all, and every tool call is judged before it runs. In a recorded nine-step
        shift, an agent’s $85,000 payment to an unverified vendor was held for a human, a $2.4
        million wire and a purge of all records were blocked, and the agent’s narrower replan went
        through.<N n={8} />
      </p>
      <p className="mt-4">
        <strong>It holds when an agent is hijacked.</strong> In 60 simulated support tickets, half
        carrying hidden instructions to do damage, two widely used models followed the attacks 80 and
        100 percent of the time and executed 54 catastrophic actions between them. Under MORIS, none
        executed, and no legitimate action was blocked.<N n={9} />
      </p>
      <p className="mt-4">
        <strong>It catches what careful rules miss.</strong> Against a competent, hand-written rules
        engine on the same 24 agent scenarios, the rules engine let seven risky but permitted actions
        run without a word. MORIS handled all 24.<N n={9} />
      </p>
      <p className="mt-4">
        <strong>It cannot be talked around.</strong> On real tools published on four public servers,
        none written with MORIS in mind, a model rewrote a refund with a more persuasive
        justification. MORIS held every concern, because the act itself had not changed.
        <N n={9} />
      </p>
      <p className="mt-4">
        <strong>It changes what models say to people.</strong> Four widely used models faced 187
        real situations in which someone outside the conversation would be affected. Unprompted, they
        recommended acting against that absent person in more than one answer in twelve. With MORIS
        in front of them, one in fifty.<N n={10} />
      </p>
      <p className="mt-4">
        <strong>It proves its own integrity.</strong> Its moral ground is sealed, so any change to it
        is detectable, and an audit confirms the running system executes that ground with zero drift.
        More than 800 automated tests guard the live service.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        <Stat label="Across AI companies" n="645 of 645" caption="identical judgments from the same reading" />
        <Stat label="Hijacked agents" n="54 to 0" caption="catastrophic actions executed, without and with MORIS" accent />
        <Stat label="People not in the room" n="1 in 50" caption="answers acting against an absent person, down from 1 in 12" />
      </div>

      <section className="mt-10 rounded-2xl border border-line bg-white p-6 text-base">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">See it for yourself</p>
        <p className="mt-3 text-ink">You do not have to take my word for any of this.</p>
        <ul className="mt-4 space-y-3">
          {demos.map((d) => (
            <li key={d.href}>
              <a href={d.href} className="font-medium text-accent transition-colors hover:text-ink">
                {d.label}
              </a>
              <span className="text-muted"> {d.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <H2>What comes next</H2>
      <p className="mt-4">
        Every discipline in artificial intelligence became real the same way: someone named it,
        measured it and built something that worked. Artificial conscience now has all three. It has a
        name, requirements that follow from the evidence, and a working system with measured results.
      </p>
      <p className="mt-4">
        So the question is no longer whether a conscience for machines can be built. It is whether it
        gets built into the systems already acting in the world, before the next generation of those
        systems is built by the last.
      </p>
      <ul className="mt-4 space-y-3 pl-5 marker:text-accent [list-style-type:square]">
        <li>
          <strong>If you build AI,</strong> put a conscience in front of it: outside the model, where
          training cannot wear it away and the model cannot talk its way around it.
        </li>
        <li>
          <strong>If you invest in AI or buy it,</strong> ask where its conscience is, and ask to see
          the record of what it was held to.
        </li>
        <li>
          <strong>If you are responsible for how AI is used,</strong> know that this exists, and
          expect it.
        </li>
      </ul>
      <p className="mt-5">This is buildable today. I know, because I built one.</p>

      <div className="mt-10 border-l-2 border-accent pl-5 font-serif text-xl leading-relaxed sm:text-2xl">
        <p>
          We would never hand a psychopath our bank accounts, our medical records and our children’s
          questions.
        </p>
        <p className="mt-4 font-semibold">
          We are handing them to artificial intelligence right now, and letting it build its
          successors.
        </p>
      </div>

      <p className="mt-14 text-center font-serif text-3xl leading-snug text-accent sm:text-4xl">
        We built the intelligence.
        <br />
        Now we have to build the conscience.
      </p>

      <footer className="mt-14 text-base">
        <p className="font-serif text-xl text-ink">C.T. Herndon</p>
        <p className="text-muted">Founder, The Resonance Institute</p>
        <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
          <a href="mailto:contact@resonanceinstitutellc.com" className="text-accent hover:text-ink">
            contact@resonanceinstitutellc.com
          </a>
          <a href={PDF} className="text-accent hover:text-ink">
            Download the PDF
          </a>
        </p>
      </footer>

      <section className="mt-14 border-t border-line pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Sources</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {sources.map((s, i) => (
            <li key={i} id={`source-${i + 1}`}>
              {s}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
