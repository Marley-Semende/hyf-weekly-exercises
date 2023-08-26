function runExperiment(sampleSize) {
    const valueCounts = [0, 0, 0, 0, 0, 0];
  
    for (let i = 0; i < sampleSize; i++) {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      valueCounts[randomValue - 1]++; // Increment the corresponding count
    }
  
    const results = [];
  
    
    for (const count of valueCounts) {
      const percentage = ((count / sampleSize) * 100).toFixed(2);
      results.push(percentage);
    }
  
    return results;
  }
  
  function main() {
    const sampleSizes = [100, 1000, 1000000];
  
    
    for (const sampleSize of sampleSizes) {
      const results = runExperiment(sampleSize);
      console.log(results, sampleSize);
    }
  }
  
  main();
  