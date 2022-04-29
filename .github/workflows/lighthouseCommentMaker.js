// @ts-check

/**
 * @typedef {Object} Summary
 * @prop {number} performance
 * @prop {number} accessibility
 * @prop {number} best-practices
 * @prop {number} seo
 * @prop {number} pwa
 */

/**
 * @typedef {Object} Manifest
 * @prop {string} url
 * @prop {boolean} isRepresentativeRun
 * @prop {string} htmlPath
 * @prop {string} jsonPath
 * @prop {Summary} summary
 */

/**
 * @typedef {Object} LighthouseOutputs
 * @prop {Record<string, string>} links
 * @prop {Manifest[]} manifest
 */

 const formatScore = (/** @type { number } */ score) => Math.round(score * 100);
 const emojiScore = (/** @type { number } */ score) =>
   score >= 0.9 ? '🟢' : score >= 0.5 ? '🟠' : '🔴';
 
 const scoreRow = (
   /** @type { string } */ label,
   /** @type { number } */ score
 ) => `| ${emojiScore(score)} ${label} | ${formatScore(score)} |`;
 
 /**
  * @param {LighthouseOutputs} lighthouseOutputs
  */
function makeComment(lighthouseOutputs) {
  const reportLinks = Object.entries(lighthouseOutputs.links);
  console.log(JSON.stringify(reportLinks));
  const reports = lighthouseOutputs.manifest.map((manifest) => {
    let report = `
      *Lighthouse ran against [${manifest.url}](${manifest.url})*. Here's the summary:
      | Category | Score |
      | -------- | ----- |
      ${scoreRow('Performance', manifest.summary.performance)}
      ${scoreRow('Accessibility', manifest.summary.accessibility)}
      ${scoreRow('Best practices', manifest.summary['best-practices'])}
      ${scoreRow('SEO', manifest.summary.seo)}
      ${scoreRow('PWA', manifest.summary.pwa)}
      [Report details](${reportLinks[manifest.url]}). 

    `;
    return report;
    })
  let comment = `## ⚡️🏠 Lighthouse report` + reports.join();   
 
  return comment;
 }
 
 module.exports = ({ lighthouseOutputs }) => {
   return makeComment(lighthouseOutputs);
 };
