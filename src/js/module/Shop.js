export default class Shop {
  constructor(shops) {
    this.shops = document.getElementsByClassName(shops)[0];
  }

  init() {
    this.request();
  }

  request() {
    fetch('http://localhost:3004/shop')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((json) => {
        // Object.keys(json).forEach((key) => {
        //   ns.insertCasstte(json[key]);
        // });
        this.insertShopList(this.createShopList(json));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createShopList(json) {
    return json.map((v => `
      <li class="cassette">
        <a href="#">
          <section>
            <div class="cassette__head">
              <span class="cassette__num">${v.order}</span>
              <h2 class="cassette__headline">${v.name}</h2>
              <p class="cassette__info">${v.category}</p>
              <p class="cassette__info">${v.access}</p>
            </div>
            <div class="cassette__thumbs">
              <div class="cassette__thumb">
                <img src="${v.thumb_01}" alt="${v.name}" class="cassette__img">
              </div>
              <div class="cassette__thumb">
                <img src="${v.thumb_02}" alt="${v.name}" class="cassette__img">
              </div>
            </div>
          </section>
        </a>
      </li>
    `)).join('');
  }

  insertShopList(el) {
    this.shops.insertAdjacentHTML('beforeend', el);
  }
}
