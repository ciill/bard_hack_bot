const lda = require('lda')
const _ = require('lodash')

const machine_learning_terms = [
  'machinelearning',
  'ai',
  'data',
  'learning',
  'datascience',
  'bigdata',
  'python',
  'fintech',
  'legaltech',
  'finance',
  'law',
  'probability',
  'automation'
]

module.exports = function classify(tweets_arr) {
  console.log(`Classifying ${tweets_arr.length} tweets`)
  const tweets = tweets_arr.join(' || ').match(/[^\.!\?]+[\.!\?]+/g);
  const lda_raw_result = lda(tweets, 3, 5)
  // For each topic.
  let matched_terms = []

  for (var i in lda_raw_result) {
    var row = lda_raw_result[i];
    // For each term.
    for (var j in row) {
      var term = row[j];
      if (machine_learning_terms.includes(term.term))
        matched_terms.push(term.term)
    }
  }
  matched_terms = _.uniq(matched_terms)
  console.log(`Found ${matched_terms.length} matching terms`)
  if (matched_terms.length > 0)
    return {
      'should_follow': true,
      'matched_terms': matched_terms
    }
  else
    return {
      'should_follow': false
    }
}

