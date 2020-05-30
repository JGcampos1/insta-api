
class Insta {


  constructor() {
    this.Perfil = [];
    this.inputEl = document.querySelector(".input");
    this.buttonEl = document.querySelector(".button");
    this.luEl = document.getElementById("user-list")
    this.registerImg();
  }
  registerImg() {
    this.buttonEl.addEventListener('click', event => this.addInsta(event));
  }
  async addInsta(event) {
    this.inputEl.focus();

    event.preventDefault();
    const user = this.inputEl.value;

    const userInsta = await axios.get(`https://www.instagram.com/${user}/?__a=1`)
      .then((response) => response.data)
      .catch((error) => alert("User não encontrado"));

    console.log(userInsta);

    const {
      graphql: {
        user: {
          biography,
          username,
          business_category_name,
          profile_pic_url_hd,
        }
      }
    } = userInsta;
    const seguidores = userInsta.graphql.user.edge_follow.count;
    const seguindo = userInsta.graphql.user.edge_followed_by.count;

    this.Perfil.push({
      business_category_name,
      username,
      biography,
      profile_pic_url_hd,
      seguindo,
      seguidores,
    });
    this.inputEl.value = "";
    this.render();
    this.Perfil = [];

  }

  render() {
    this.Perfil.forEach((foto) => {

      const nameEl = document.createElement("strong");
      nameEl.appendChild(document.createTextNode(foto.username))

      const imgEl = document.createElement("img")
      imgEl.setAttribute("src", foto.profile_pic_url_hd)

      const bioEl = document.createElement("p")
      bioEl.appendChild(document.createTextNode("bio" + foto.biography))

      const followEl = document.createElement("spam");
      followEl.appendChild(document.createTextNode("Seguindo:" + foto.seguindo))

      const followerEl = document.createElement("spam");
      followerEl.appendChild(document.createTextNode("Seguidores:" + foto.seguidores))


      const categoria = document.createElement("p");
      if (foto.business_category_name != null) {
        categoria.appendChild(document.createTextNode("Categoria:" + foto.business_category_name));
      } else {
        categoria.appendChild(document.createTextNode("Categoria: Perfil Normal"));
      }

      const liEl = document.createElement("li");

      liEl.appendChild(nameEl)
      liEl.appendChild(imgEl)
      liEl.appendChild(categoria);
      liEl.appendChild(bioEl)
      liEl.appendChild(followEl)
      liEl.appendChild(followerEl)

      this.luEl.appendChild(liEl)
    })
  }
}

new Insta();