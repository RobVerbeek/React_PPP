const user = {
    name: "Sam",
    email: "samEmail@gmail.com",
    country: "US",
};

// const name = user.name;
// const email = user.email;
// const country = user.country;

const { name: userName, email, country } = user;

console.log(userName, email, country);
