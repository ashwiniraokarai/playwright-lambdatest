import { StringifyOptions } from "querystring";

//Conventional Style of contsructor var assignment
class BookOne {
	private name: String;
    private author: String;

    constructor(name: String, author: String) {
        this.name = name;
        this.author = author;
    }

}

//Shorthand for constructor var assignment
class BookTwo {
    constructor(private name: String, private author: String) {
       //do something
       //you DON'T need to do the this. assignments!
    }

}