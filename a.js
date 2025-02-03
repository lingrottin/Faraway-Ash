class Foo {
  will_be_tampered() {
    console.log(this);
  }

  wont_be_tampered = () => {
    console.log(this);
  };

  constructor() { }
}

let foo = new Foo();
let a = { tampered: true };

foo.will_be_tampered.call(a); // {tampered: true}
foo.wont_be_tampered.call(a); // Foo {wont_be_tampered: ƒ}