import { post } from "./post";

function feed() {
    console.log("This is feed");
    post();
    post();
    post();
}

function anotherFunction() {
    console.log("Another function");
}

export default feed;
export { anotherFunction };
