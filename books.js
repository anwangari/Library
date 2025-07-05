function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    if (this.read === "yes") {
        infoLog = "read";
    } else infoLog = "not read yet";

    this.info = `${this.title}` + ' by ' + `${this.author}` + ', ' + `${this.pages}` + ' pages, ' + `${infoLog}` + '.';
}

const theAlchemist = new Book("The Alchemist", "Tony Njuguna", 255, "no")
const thinkAndGrowRich = new Book("Think and Grow Rich", "Napoleon Hill", 238, "yes")

console.log(theAlchemist.info)
console.log(thinkAndGrowRich.info)

let prot = Book.prototype

console.log(prot)