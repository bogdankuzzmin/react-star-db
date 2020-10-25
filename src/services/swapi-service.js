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

    return responce.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }

  async getAllPlanets() {
    const responce = await this.getResource(`/planets/`);

    return responce.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }

  async getAllStarships() {
    const responce = await this.getResource(`/starships/`);

    return responce.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }
}   
