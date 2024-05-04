const db = require('./utils/db');

module.exports = class services{
    constructor(service_id, name , phone_no , location , services_description){
        this.service_id = service_id;
        this.name = name;
        this.phone_no = phone_no;
        this.location = location;
        this.services_description = services_description;
    }
    save() {
        return db.execute(
          'INSERT INTO services (service_id, name, phone_no, location,services_description) VALUES (?, ?, ?, ?)',
          [this.service_id, this.name, this.phone_no,this.location,this.services_description]
        );
      }
    
    static fetchAll(){
      return db.execute(' SELECT * FROM  services')
    }
};