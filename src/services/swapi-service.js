export default class SwapiService {
  _apiBase = `https://swapi.dev/api`;

  async getResource(url) {
    const responce = await fetch(`${this._apiBase}${url}`);

    if (!responce.ok) {
      throw new Error(`Could not fetch ${url}, received ${responce.status}`);
    }

    return await responce.json();
  }

  async getAllPeople() {
    const responce = await this.getResource(`/people/`);

    return responce.results.map(this._adaptToClientPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);

    return this._adaptToClientPerson(person);
  }

  async getAllPlanets() {
    const responce = await this.getResource(`/planets/`);

    return responce.results.map(this._adaptToClientPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);

    return this._adaptToClientPlanet(planet);
  }

  async getAllStarships() {
    const responce = await this.getResource(`/starships/`);

    return responce.results.map(this._adaptToClientStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);

    return this._adaptToClientStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _adaptToClientPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotate_period,
      diameter: planet.diamenter,
    }
  };

  _adaptToClientStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    }
  };

  _adaptToClientPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    }
  };
}
