
function getCurrentState(trafficLight) {
    if (trafficLight.stateIndex === 0) {
      return trafficLight.possibleStates[0];
    } else if (trafficLight.stateIndex === 1) {
      return trafficLight.possibleStates[1];
    } else {
      return trafficLight.possibleStates[2];
    }
  }
  
  function getNextStateIndex(trafficLight) {
    if (getCurrentState(trafficLight) === "green") {
      return 1; // Index of orange
    } else if (getCurrentState(trafficLight) === "orange") {
      return 2; 
    } else {
      return 0;
    }
  }
  
  function waitSync(secs) {
    const start = Date.now();
    while (Date.now() - start < secs * 1000) {
      // Wait
    }
  }
  
  function main() {
    const trafficLight = {
      possibleStates: ["green", "orange", "red"],
      stateIndex: 0,
    };
  
    for (let cycle = 0; cycle < 6; cycle++) {
      const currentState = getCurrentState(trafficLight);
      console.log(cycle, "The traffic light is now", currentState);
  
      waitSync(1);
      trafficLight.stateIndex = getNextStateIndex(trafficLight);
    }
  }
  
  main();
  
  