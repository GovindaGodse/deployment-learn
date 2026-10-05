import './App.css'

const pipeline = [
  { number: '01', title: 'Push code', detail: 'Commit and push changes to the main branch on GitHub.' },
  { number: '02', title: 'Install', detail: 'Jenkins checks out the repository and runs npm ci.' },
  { number: '03', title: 'Validate', detail: 'The pipeline runs the linter, then creates a production build.' },
  { number: '04', title: 'Deploy', detail: 'A successful build publishes dist/ to Netlify using Jenkins credentials.' },
]

const stages = [
  ['Install Dependencies', 'npm ci', 'Reproducibly install the exact dependencies recorded in the lockfile.'],
  ['Lint', 'npm run lint', 'Catch code quality issues before they reach the production build.'],
  ['Build', 'npm run build', 'Compile the React/Vite app into production assets in dist/.'],
  ['Deploy to Netlify', 'netlify-cli deploy --prod --dir=dist', 'Publish the validated build with secrets injected by Jenkins.'],
]

const terms = [
  ['CI', 'Continuous Integration: automatically validate changes as they are shared.'],
  ['CD', 'Continuous Delivery/Deployment: prepare or deploy validated changes.'],
  ['Jenkinsfile', 'Pipeline-as-code stored beside the application in the repository.'],
  ['Agent', 'The machine or environment where Jenkins runs pipeline steps.'],
  ['Stage / step', 'A named pipeline phase / an individual action within that phase.'],
  ['Artifact', 'A build output; in this project, the Vite dist/ directory.'],
  ['Credential', 'Secret authentication material stored securely by Jenkins.'],
  ['Webhook', 'An HTTP notification that tells Jenkins a GitHub event occurred.'],
  ['Rollback', 'Returning production to a previous known-good version.'],
]

function App() {
  return (
    <main className="guide-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> HANDS-ON REVISION GUIDE</p>
          <h1>CI/CD with <span>Jenkins</span></h1>
          <p className="hero-subtitle">A practical field guide to automating a React + Vite app from GitHub to Netlify.</p>
          <div className="hero-tags"><span>React</span><span>Vite</span><span>GitHub</span><span>Netlify</span></div>
        </div>
        <div className="hero-mark" aria-hidden="true"><span>J</span><i>↗</i></div>
        <div className="hero-foot"><span>PIPELINE STATUS</span><strong><span className="status-dot" /> AUTOMATED FLOW</strong></div>
      </header>

      <section className="intro card">
        <div className="section-kicker">01 — THE BIG PICTURE</div>
        <div>
          <h2>From a code change to a live site.</h2>
          <p>Continuous Integration checks that changes are valid. Continuous Delivery or Deployment gets the validated build to users. Here, Jenkins automates both: every GitHub push triggers install, lint, build, and a Netlify production deploy.</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><div className="section-kicker">02 — THE JOURNEY</div><h2>One push. Four steps.</h2></div><span className="muted-label">END-TO-END FLOW</span></div>
        <div className="pipeline-grid">
          {pipeline.map((step) => <article className="pipeline-card" key={step.number}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.detail}</p></article>)}
        </div>
      </section>

      <section className="section-block two-column">
        <div className="panel-card">
          <div className="section-kicker">03 — PIPELINE STAGES</div><h2>What Jenkins runs</h2>
          <div className="stage-list">{stages.map(([title, command, detail], index) => <article className="stage" key={title}><span className="stage-index">0{index + 1}</span><div><h3>{title}</h3><code>{command}</code><p>{detail}</p></div></article>)}</div>
        </div>
        <aside className="code-card">
          <div className="code-top"><span><i /> <i /> <i /></span><span>Jenkinsfile · overview</span></div>
          <pre><code><b>pipeline</b> {'{'}{'\n'}  agent any{'\n'}  stages {'{'}{'\n'}    stage(<em>'Install'</em>) {'{'} npm ci {'}'}{'\n'}    stage(<em>'Lint'</em>) {'{'} npm run lint {'}'}{'\n'}    stage(<em>'Build'</em>) {'{'} npm run build {'}'}{'\n'}    stage(<em>'Deploy'</em>) {'{'} Netlify {'}'}{'\n'}  {'}'}{'\n'}  post {'{'} success / failure {'}'}{'\n'}{'}'}</code></pre>
          <p className="code-caption">The Jenkinsfile keeps pipeline configuration version-controlled with the app.</p>
        </aside>
      </section>

      <section className="section-block setup-grid">
        <div><div className="section-kicker">04 — SETUP NOTES</div><h2>Make the environment work.</h2><p className="section-lead">A reliable pipeline depends on Jenkins seeing the same tools, secrets, and triggers every time.</p></div>
        <div className="setup-cards">
          <article className="note-card"><span className="note-icon">⌘</span><div><h3>macOS & Node</h3><p>Confirm <code>node</code> and <code>npm</code> are available to the Jenkins service. Set PATH in the pipeline when the service cannot see your shell environment. Start or stop Jenkins with Homebrew services.</p><code className="command">brew services start jenkins-lts</code></div></article>
          <article className="note-card"><span className="note-icon">▣</span><div><h3>Keep secrets in Jenkins</h3><p>Store the Netlify auth token and site ID as Jenkins secret text credentials. Reference them by credentials ID and expose them only inside <code>withCredentials</code>.</p><code className="command">NETLIFY_AUTH_TOKEN · NETLIFY_SITE_ID</code></div></article>
          <article className="note-card"><span className="note-icon">↗</span><div><h3>Connect GitHub webhooks</h3><p>For local Jenkins, ngrok provides a temporary public URL. Configure GitHub to send push events to the Jenkins webhook endpoint and enable the GitHub hook trigger on the job.</p><code className="command">ngrok http 8080</code></div></article>
        </div>
      </section>

      <section className="section-block two-column lower-grid">
        <article className="panel-card checklist"><div className="section-kicker">05 — WHEN SOMETHING BREAKS</div><h2>Quick checks</h2><ul><li><strong>Build fails:</strong> reproduce locally with lint and build; inspect the Jenkins console log.</li><li><strong>Command not found:</strong> check Node/npm installation and Jenkins PATH.</li><li><strong>Deploy fails:</strong> verify credential IDs, token, site ID, and Netlify CLI output.</li><li><strong>No webhook build:</strong> confirm ngrok URL, webhook path, and job trigger setting.</li><li><strong>Site looks unchanged:</strong> inspect build status and Netlify deploy history, then check the production URL and browser cache.</li></ul></article>
        <article className="panel-card commands"><div className="section-kicker">06 — COMMANDS TO REMEMBER</div><h2>Useful at a glance</h2><div className="command-group"><h3>Project</h3><code>npm install<br />npm run lint<br />npm run build<br />npm run dev</code></div><div className="command-group"><h3>Git</h3><code>git status<br />git add .<br />git commit -m &quot;message&quot;<br />git push origin main</code></div><div className="command-group"><h3>Jenkins</h3><code>brew services start jenkins-lts<br />brew services stop jenkins-lts</code></div></article>
      </section>

      <section className="section-block glossary-section"><div className="section-heading"><div><div className="section-kicker">07 — THE LANGUAGE</div><h2>CI/CD, decoded.</h2></div><span className="muted-label">QUICK GLOSSARY</span></div><dl className="glossary">{terms.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>

      <section className="closing-card"><div className="closing-icon">✓</div><div><div className="section-kicker">THE CORE PRINCIPLE</div><h2>CI/CD is the whole path.</h2><p>It’s the automated route from a code change to a validated, deployable production artifact—with triggers, secrets, environments, and failure handling designed deliberately.</p></div><div className="closing-flow">CODE <span>→</span> CHECK <span>→</span> BUILD <span>→</span> DEPLOY</div></section>
      <footer><span>CI/CD WITH JENKINS</span><span>REACT + VITE · REVISION NOTES</span></footer>
    </main>
  )
}

export default App
