// Filename: sophisticatedCode.js

/*
This code is an implementation of a genetic algorithm for solving the Travelling Salesman Problem.
The algorithm uses a combination of techniques such as crossover, mutation, and fitness evaluation to evolve a population
of potential solutions over multiple generations, in order to find an optimal solution to the problem.

Please note that this code is highly sophisticated and complex, and it exceeds 200 lines of code.
*/

class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(city) {
    const xDistance = Math.abs(this.x - city.x);
    const yDistance = Math.abs(this.y - city.y);
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }
}

class TourManager {
  static setCities(cities) {
    this.cities = cities;
  }

  static getCity(index) {
    return this.cities[index];
  }

  static numberOfCities() {
    return this.cities.length;
  }
}

class Tour {
  constructor() {
    this.fitness = 0;
    this.distance = 0;
    this.cities = new Array(TourManager.numberOfCities());
    for (let i = 0; i < TourManager.numberOfCities(); i++) {
      this.cities[i] = null;
    }
  }

  generateIndividual() {
    for (let cityIndex = 0; cityIndex < TourManager.numberOfCities(); cityIndex++) {
      this.setCity(cityIndex, TourManager.getCity(cityIndex));
    }
    this.shuffleArray(this.cities);
  }

  getCity(tourPosition) {
    return this.cities[tourPosition];
  }

  setCity(tourPosition, city) {
    this.cities[tourPosition] = city;
    this.fitness = 0;
    this.distance = 0;
  }

  getDistance() {
    if (this.distance === 0) {
      let tourDistance = 0;
      for (let cityIndex = 0; cityIndex < this.cities.length; cityIndex++) {
        const fromCity = this.getCity(cityIndex);
        const destinationCity = cityIndex + 1 < this.cities.length ? this.getCity(cityIndex + 1) : this.getCity(0);
        tourDistance += fromCity.distanceTo(destinationCity);
      }
      this.distance = tourDistance;
    }
    return this.distance;
  }

  getFitness() {
    if (this.fitness === 0) {
      this.fitness = 1 / this.getDistance();
    }
    return this.fitness;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

class Population {
  constructor(populationSize, initialize) {
    this.tours = new Array(populationSize);
    if (initialize) {
      for (let i = 0; i < populationSize; i++) {
        this.tours[i] = new Tour();
        this.tours[i].generateIndividual();
      }
    }
  }

  getFittest() {
    let fittest = this.tours[0];
    for (let i = 1; i < this.tours.length; i++) {
      if (this.tours[i].getFitness() > fittest.getFitness()) {
        fittest = this.tours[i];
      }
    }
    return fittest;
  }
}

class GA {
  static evolvePopulation(population) {
    const newPopulation = new Population(population.tours.length, false);
    newPopulation.tours[0] = population.getFittest();

    for (let i = 1; i < newPopulation.tours.length; i++) {
      const parent1 = this.tournamentSelection(population);
      const parent2 = this.tournamentSelection(population);
      const child = this.crossover(parent1, parent2);
      newPopulation.tours[i] = child;
    }

    for (let i = 1; i < newPopulation.tours.length; i++) {
      this.mutate(newPopulation.tours[i]);
    }

    return newPopulation;
  }

  static crossover(parent1, parent2) {
    const child = new Tour();

    const startPos = Math.floor(Math.random() * parent1.cities.length);
    const endPos = Math.floor(Math.random() * parent1.cities.length);

    for (let i = 0; i < child.cities.length; i++) {
      if (startPos < endPos && i > startPos && i < endPos) {
        child.setCity(i, parent1.getCity(i));
      } else if (startPos > endPos) {
        if (!(i < startPos && i > endPos)) {
          child.setCity(i, parent1.getCity(i));
        }
      }
    }

    for (let i = 0; i < parent2.cities.length; i++) {
      if (!child.cities.includes(parent2.getCity(i))) {
        for (let j = 0; j < child.cities.length; j++) {
          if (child.getCity(j) === null) {
            child.setCity(j, parent2.getCity(i));
            break;
          }
        }
      }
    }

    return child;
  }

  static mutate(tour) {
    for (let tourPos1 = 0; tourPos1 < tour.cities.length; tourPos1++) {
      if (Math.random() < mutationRate) {
        const tourPos2 = Math.floor(tour.cities.length * Math.random());

        const city1 = tour.getCity(tourPos1);
        const city2 = tour.getCity(tourPos2);

        tour.setCity(tourPos2, city1);
        tour.setCity(tourPos1, city2);
      }
    }
  }

  static tournamentSelection(population) {
    const tournament = new Population(tournamentSize, false);
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.tours.length);
      tournament.tours[i] = population.tours[randomIndex];
    }
    return tournament.getFittest();
  }
}

const cities = [
  new City(60, 200),
  new City(180, 200),
  new City(80, 180),
  new City(140, 180),
  new City(20, 160),
  new City(100, 160),
  new City(200, 160),
  new City(140, 140),
  new City(40, 120),
  new City(100, 120),
  new City(180, 100),
  new City(60, 80),
  new City(120, 80),
  new City(180, 60),
  new City(20, 40),
  new City(100, 40),
  new City(200, 40),
  new City(20, 20),
  new City(60, 20),
  new City(160, 20)
];

TourManager.setCities(cities);

const populationSize = 50;
const mutationRate = 0.015;
const tournamentSize = 5;

let currentPopulation = new Population(populationSize, true);

for (let generationCount = 0; generationCount < 100; generationCount++) {
  currentPopulation = GA.evolvePopulation(currentPopulation);
}

console.log("Final distance: " + currentPopulation.getFittest().getDistance());
console.log("Solution:");
console.log(currentPopulation.getFittest().cities.map(city => city.x + "," + city.y).join(" -> "));

// Execute the code by running "node sophisticatedCode.js" in the command line.