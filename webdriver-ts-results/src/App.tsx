import * as React from 'react';
import styles from './App.css';
import { FrameworkType, knownIssues } from './Common';
import ResultTable from './ResultTable';
import { SelectionBar } from './selection/SelectionBar';
import { Styled } from 'direflow-component';


const App = () => {
  // eslint-disable-next-line no-constant-condition
  const disclaimer = (<div>
        <h2>Rendering Benchmarks Data</h2>
        <p className="comment">This project is based on <a href="https://github.com/krausest/js-framework-benchmark">js-framework-benchmark</a>. The main difference is that this project (<a href="https://github.com/fullwebdev/benchmark" target="_blank" rel="noopener noreferrer">fullwebdev/benchmark</a>) focuses on Vanilla JS and microlibraries, while the main goal of js-framework-benchmark is to compare rendering libraries and frameworks. Go check the official <a href="https://krausest.github.io/js-framework-benchmark/index.html">results page</a> of js-framework-benchmark for more comprehensive and up-to-date framework examples.</p>
        <p>For more information, visit the <a href="https://fullweb.dev/rendering/">Rendering</a> section of fullweb.dev.</p>
      </div>);

    return (
      <Styled styles={styles}>
        <div>
          {disclaimer}
          <p>The benchmark was run on a MSI GE60 laptop (i7-3630QM, 16 GB RAM, Manjaro Linux 20.2.1 (Linux 4.19.175-1), Chrome 88.0.4324.182 (64-bit))</p>
          <SelectionBar/>
          <ResultTable type={FrameworkType.KEYED}/>
          <ResultTable type={FrameworkType.NON_KEYED}/>

            <h3>Known Issues</h3>
            {knownIssues.map(issue =>
              <dl key={issue.issue.toFixed()} id={issue.issue.toFixed()}>
                <dt><a target="_blank" rel="noopener noreferrer" href={issue.link}>{issue.issue.toFixed()}</a></dt>
                <dd>{issue.text}</dd>
              </dl>
            )}
        </div>
      </Styled>)
}

export default App;
