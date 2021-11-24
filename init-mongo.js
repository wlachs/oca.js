db.createUser(
  {
    user: "oca_admin",
    pwd: "oca_password",
    roles: [
      {
        role: "readWrite",
        db: "test"
      }
    ]
  }
);
db.createCollection("test"); //MongoDB creates the database when you first store data in that database
