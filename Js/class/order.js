//information formulaire
class infoForm {
    constructor(name, firstname, mail, adress, city) {
        this.lastName = name;
        this.firstName = firstname;
        this.email = mail;
        this.address = adress;
        this.city = city;
    }
}

// information commande
class orderInfo {
    constructor(formInformation, idOrder) {
        this.contact = formInformation;
        this.products = idOrder;
    }
}