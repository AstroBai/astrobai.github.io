class Player {
  constructor(name, isHuman = true) {
    this.name = name;
    this.isHuman = isHuman;
    this.actions = ['observe', 'research', 'design_telescope', 'apply_funding', 'attend_conference'];
    this.reset();
  }

  // Reset player state
  reset() {
    this.funding = 1000;
    this.reputation = 0;
    this.observations = 0;
    this.telescope = 1.0;
    this.achievements = 0;
    this.credit = 1;
    this.steps = 0;
  }

  // Actions
  observe() {
    const result = Math.random() * this.telescope;
    this.observations += result;
    this.funding -= Math.random() * 100 + 10 * this.telescope;
    console.log(`${this.name} completed an observation with result: ${result}`);
  }

  research() {
    if (this.observations === 0) {
      console.log(`${this.name} has no data for research.`);
      return;
    }
    const result = this.observations;
    this.observations = 0;
    this.achievements += Math.max(result * (Math.random() * 0.6 + 0.7), 0);
    this.funding -= Math.random() * 100 + 10 * result;
    console.log(`${this.name}'s research result: ${result}`);
  }

  designTelescope() {
    this.funding -= Math.random() * 100 + 10 * (Math.pow(10, this.telescope - 1));
    const newEfficiency = this.telescope * (Math.random() * 0.2 + 1.1);
    this.telescope = newEfficiency;
    console.log(`${this.name} designed a new telescope with efficiency: ${newEfficiency}`);
  }

  applyFunding() {
    if (this.reputation === 0 || this.achievements === 0) {
      console.log(`${this.name} cannot apply for funding with zero reputation or achievements.`);
      return;
    }
    const fundingReceived = Math.random() * 1000 * Math.sqrt(this.reputation) * Math.sqrt(this.achievements) / this.credit;
    this.credit *= 1.1;
    this.funding += fundingReceived;
    console.log(`${this.name} received funding: ${fundingReceived}`);
  }

  attendConference() {
    const reputationReceived = Math.random() * Math.sqrt(this.achievements) / this.credit;
    this.credit *= 1.1;
    this.reputation += reputationReceived;
    this.funding -= Math.random() * 10 + 1;
    console.log(`${this.name} received reputation: ${reputationReceived}`);
  }

  // Get state as an array
  getState() {
    return [this.funding, this.reputation, this.observations, this.telescope, this.achievements, this.credit];
  }

  // Calculate reward
  _getReward() {
    if (this.funding <= 0) return -Infinity;
    return Math.log10(this.funding) + this.reputation + this.telescope + this.achievements;
  }

  // Check if the game is done
  _isDone() {
    return this.steps >= 100;
  }

  // AI action (replace with a machine learning model if necessary)
  aiAction() {
    const state = this.getState();
    const actionIdx = Math.floor(Math.random() * this.actions.length); // Random action for simplicity
    const bestAction = this.actions[actionIdx];

    switch (bestAction) {
      case 'observe':
        this.observe();
        break;
      case 'research':
        this.research();
        break;
      case 'design_telescope':
        this.designTelescope();
        break;
      case 'apply_funding':
        this.applyFunding();
        break;
      case 'attend_conference':
        this.attendConference();
        break;
      default:
        break;
    }

    this.steps += 1;
  }

  // Get current player status
  getStatus() {
    if (this.funding <= 0 || this.reputation <= 0) {
      this.score = 0;
    } else {
      this.score = Math.max(Math.log10(this.funding) + this.reputation + this.telescope + this.achievements - 4, 0);
    }
    return {
      name: this.name,
      observations: Math.round(this.observations * 100) / 100,
      funding: Math.round(this.funding),
      reputation: Math.round(this.reputation * 100) / 100,
      telescope: Math.round(this.telescope * 100) / 100,
      achievements: Math.round(this.achievements * 100) / 100,
      score: Math.round(this.score * 100) / 100
    };
  }
}

// Example of running the game with a human and AI player
const player1 = new Player('Player 1', true);
const player2 = new Player('AI Player', false);

// Simulate game loop
for (let i = 0; i < 100; i++) {
  console.log(`\n--- Step ${i + 1} ---`);
  
  player1.aiAction();
  player2.aiAction();

  // Output statuses
  console.log(player1.getStatus());
  console.log(player2.getStatus());

  // End game if one player is done
  if (player1._isDone() || player2._isDone()) break;
}
