const fs = require("fs");
const { title } = require("process");

//export class Contenedor {
class Contenedor {
  constructor(archivo) {
    (this.nombre = archivo), (this.id = 1);
  }

  save(objeto) {
    try {
      const files = fs.readdirSync("./data");
      let data = fs.readFileSync(`./data/${this.nombre}`, "utf-8");

      if (files.some((file) => file == this.nombre) && data != "") {
        data = JSON.parse(data);
        let ids = data.map((value) => {
          return value.id;
        });
        const idn = parseInt(Math.max(...ids) + 1);
        console.log(idn);
        objeto = { ...objeto, id: idn };
        data.push(objeto);
        data = JSON.stringify(data);

        fs.writeFileSync(`./data/${this.nombre}`, data, "utf-8");

        console.log("si existe");
        return objeto;
      } else {
        objeto = { ...objeto, id: this.id };
        objeto = JSON.stringify(Array(objeto));
        fs.writeFileSync(`./data/${this.nombre}`, objeto, "utf-8");
        console.log("el archivo se creo");
        return objeto;
      }
    } catch (error) {
      console.log(error, "hubo un error");
    }
  }

  getById(Number) {
    try {
      let data = fs.readFileSync(`./data/${this.nombre}`, "utf-8");
      data = JSON.parse(data);
      const idData = data.filter((item) => item.id == Number);
      if (idData.length > 0) {
        return idData;
      } else {
        const error = { error: "Producto no encontrado" };
        return error;
      }
    } catch (error) {
      console.log("hay un problema");
    }
  }

  updateById(id, objeto) {
    try {
      let data = fs.readFileSync(`./data/${this.nombre}`, "utf-8");
      data = JSON.parse(data);
      let idData = data.filter((item) => item.id == id);
      data = data.filter((item) => item.id != id);
      if (idData.length > 0) {
        const { title, price } = objeto;
        idData = {
          ...idData[0],
          title,
          price,
        };

        data.push(idData);
        data = JSON.stringify(data);
        fs.writeFileSync(`./data/${this.nombre}`, data, "utf-8");
        console.log("ok");
      } else {
        const error = { error: "Producto no encontrado" };
        return error;
      }
    } catch (error) {
      console.log("hay un problema", error);
    }
  }

  getAll() {
    try {
      let data = fs.readFileSync(`./data/${this.nombre}`, "utf-8");
      data = JSON.parse(data);
      return data;
    } catch (error) {
      console.log("hay un problema");
    }
  }

  deleteById(Number) {
    try {
      let data = fs.readFileSync(`./data/${this.nombre}`, "utf-8");
      data = JSON.parse(data);
      let idData = data.filter((item) => item.id != Number);
      idData = JSON.stringify(idData);
      fs.writeFileSync(`./data/${this.nombre}`, idData, "utf-8");
      return idData;
    } catch (error) {
      console.log("hay un problema");
    }
  }

  deleteAll() {
    fs.writeFileSync(`./data/${this.nombre}`, "", "utf-8");
  }
}

module.exports = Contenedor;
