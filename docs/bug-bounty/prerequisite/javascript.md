---
sidebar_position: 20
title: "JavaScript"
description: "JavaScript (JS) is a scripting language that runs in browsers and allows dynamic interaction with web pages."
---
# JavaScript Basics for Bug Bounty

## What is JavaScript?
JavaScript (JS) is a scripting language that runs in browsers and allows dynamic interaction with web pages.

### Why It Matters in Bug Bounty?
JavaScript (JS) matters in bug bounty because:  
- **XSS (Cross-Site Scripting)** – Most common JS-related vulnerability, allowing attackers to inject malicious scripts.  
- **DOM Manipulation Attacks** – Exploiting JavaScript to modify the webpage dynamically and steal sensitive data.  
- **Bypassing Client-Side Validation** – Many web apps rely on JS for validation, which can be bypassed for attacks like SQLi.  
- **Token & API Key Exposure** – JavaScript files might contain sensitive data like API keys, tokens, or credentials.  
- **CORS Misconfigurations** – Understanding how JS handles cross-origin requests helps in identifying security loopholes.  
- **Prototype Pollution** – A JS-specific vulnerability that allows modifying an object’s prototype to execute attacks.  
- **WebSocket Attacks** – JavaScript is often used for real-time communication, making it important for testing WebSocket security.  
- **Client-Side Logic Manipulation** – Modifying JS to bypass authentication, access premium features, or exploit payment systems.  
- **Race Conditions & Timing Attacks** – JavaScript-based async functions can be exploited to create concurrency issues. etc.

---

## 🔗 **Learning Resources**
📚 **JavaScript Basics**
- [W3schools - JavaScript](https://www.w3schools.com/js/)  
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

📺 **Video Recources**
- [freeCodeCamp - JavaScript Course for Beginners 2024](https://youtu.be/Zi-Q0t4gMC8)

---

## 🚀 JavaScript Fundamentals  

### Hello World

### Alerts & Prompts
**Alert**  
```js
alert("Hello from alert");

let name = "HeHe";
alert(name);
```
**Prompt**  
```js
let firstName = prompt("What is your first name");
let lastName = prompt("What is your last name");
let fullName = firstName + " " + lastName;
alert(fullName);
```
### Variables  
JavaScript uses `var`, `let`, and `const` to declare variables.  

```js
var oldVar = "Avoid using var"; 
let modernVar = "Preferred in ES6"; 
const fixedVar = "Cannot be changed"; 
let number = 5;
let happy = true;
```
#### Variables Operations
```js
let x = 3;
let y = 2;
let z = x + y; // 5

let city = "Hello";
let country = "World";
let place = city + " " + country; // Hello World
```
#### Variables Data Types
```js
let age = 1337; // Number
let name = "Zero Day"; // String
let canCode = true; // Boolean, could also be false
```
### Operators
**Assignment Operator (=)**
```js
let x = 100; //Assign the value 100 to x
```
**Arithmetic Operators**
```js
let x = 8;
let y = 2;
let a = x + y; // 5 // Addition (+)
let b = x - y; // Subtraction (-)
let c = x * y; // Multiplication (*)
let d = x / y; // Division (/)
let e = 7 % 2; // Modulus (%) // Remainder
let f = x ** 2; // Exponentiation // Math.pow(x,2);
```
**Logical Operator ||**  
```js
true || false;       // True
10 > 5 || 10 > 20;   // True
false || false;      // False
10 > 100 || 10 > 20; // False
```
**Logical Operator &&**  
```js
true && true;        // True
1 > 2 && 2 > 1;      // False
true && false;       // False
4 === 4 && 3 > 1;    // True
```
**Comparison Operators**  
```js
1 > 3                // False
3 > 1                // True
250 >= 250           // True
1 === 1              // True
1 === 2              // False
1 === '1'            // False
```
**Logical Operator !**  
```js
let lateToWork = true;
let oppositeValue = !lateToWork;

console.log(oppositeValue); // False
```
**Nullish coalescing operator ??**  
```js
null ?? 'I win';           //  'I win'
undefined ?? 'Me too';     //  'Me too'

false ?? 'I lose'          //  False
0 ?? 'I lose again'        //  0
'' ?? 'Damn it'            //  ''
```
**== vs ===**  
The == just check the value, === check both the value and the type.
```js
0 == false   // true
0 === false  // false, different type
1 == "1"     // true,  automatic type conversion 
1 === "1"    // false, different type
null == undefined  // true
null === undefined // false
'0' == false       // true
'0' === false      // false
```

### Data Types 

String, Number, Bigint, Boolean, Undefined, Null, Symbol, Object  

**String**  
```js
let single = 'Are you a hacker?';  // '
let double = "Are you a hacker?";  // "
```
String concatenation:  
```js
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // "John Doe"
//or
let fullName = `${firstName} ${lastName}`;
```
**Numbers**  
```js
let a = 13.00; // with decimals
let b = 13; // w/o decimals
```
**BigInt**  

```js
let a = BigInt("123456789012345678901234567890");
```
**Booleans**  
```js
let a = 10;
let b = 10;
let c = 15;
(a == b)    // True
(a == c)    // False
```

**Undefined**  
```js
let a; // Value of a is undefined here // Type is also undefined
```

### Functions  
```js
function greet(name) {
    return "Hello, " + name;
}
console.log(greet("Hacker")); // Output: Hello, Hacker
```
```js
function guessTool() {
  let name = prompt("What's your name?");

  if (name === "subfinder") {
    alert("Fast passive subdomain enumeration tool -> Subfinder");
  }
}

guessTool(); // calling the function
```

### Objects
```js
let fruit = new Object(); // "Object Constructor" syntax

let user = {}; // "Object Literal" syntax

let student = {
  firsName: "John",
  lastName: "Doe",
};

let anotherStudent = {
  firstName: "Jane",
  lastName: "Doe",
  female: true,
  greet: function () {
    alert("Hey");
  },
};
```

### If else

```js
let country = prompt("What country are you from?");

if (country === "Bangladesh") {
  alert("You are cool");
}

if (country !== "Noakhali") {
  alert("Too bad for you");
}
```
```js
if (condition) {
    // block of code to be executed if the condition is true
} else {
    // block of code to be executed if the condition is false
}
```
Basic if-else **ladder**  
```js
if (condition1) {
    // block of code to be executed if condition1 is true
} else if (condition2) {
    // block of code to be executed if the condition1 is false and condition2 is true
} else {
    // block of code to be executed if the condition1 is false and condition2 is false
}
```
### Switch Statement
```js
switch (expression) {
    case x:
        // code block
        break;
    case y:
        // code block
        break;
    default:
        // code block
}
```
```js
const food = 'salad';

switch (food) {
  case 'oyster':
    console.log('The taste of the sea');
    break;
  case 'pizza':
    console.log('A delicious pie');
    break;
  default:
    console.log('Enjoy your meal');
}
```
### Arrays
**Array declaration**  
```js
let myList = [];
let fruits = ["apples", "oranges", "bananas"];
myList = ['banana', 3, go, ['John', 'Doe'], {'firstName': 'John', 'lastName': 'Smith'}]
```
**Access an Array**  
```js
fruits
fruits[0]
fruits[1]
fruits[2]
fruits[3]
```
**Update an Array item**  
```js
fruits[1] = "Mango";
fruits[1] = 3;
```
**Remove first item**  
```js
fruits.shift()
```
**Objects and Arrays combined**  
```js
let user = {
    username: "admin",
    password: "12345"
};

let data = ["XSS", "CSRF", "Clickjacking"];
console.log(user.username); // Output: admin
console.log(data[1]); // Output: CSRF
```

### For Loop
```js
for (initialization; condition; incrementation;) {
    // code block to be executed
}
```
```js
for (let i = 0; i < 4; i += 1) {
  console.log(i);
};
// Output: 0, 1, 2, 3
```
```js
for (let i = 0; i < 5; i++) {
    text += "Iteration number: " + i + "<br>";
}
```

### While Loop
```js
while (condition) {
    // code block to be executed
}

let i = 0;
while (i < 5) {        
  console.log(i);
  i++;
}
```
### Do While Loop
```js
do {
    // run this code in block
    i++;
} while (condition);
```
```js
x = 0
i = 0

do {
  x = x + i;
  console.log(x)
  i++;
} while (i < 5);
// Output: 0 1 3 6 10
```




**Bug Bounty Use Case:** Poorly coded functions can **leak sensitive info**.

**Security Tip:** **Avoid storing passwords** in JavaScript variables.

---

## 🎯 DOM Manipulation & Security Risks  

### 1️⃣ **Accessing Elements**
JavaScript interacts with HTML through the **Document Object Model (DOM)**.

```js
document.getElementById("id");
document.querySelector(".class");
document.querySelectorAll("div");
```

### 2️⃣ **Modifying Elements**
Attackers can manipulate the DOM to perform attacks.

```js
document.body.innerHTML = "<h1>Hacked!</h1>";
```

👉 **Bug Bounty Use Case:** **Stored XSS** if user input is inserted **without sanitization**.

### 3️⃣ **Event Listeners & Exploits**
JavaScript listens to user actions, which can be **abused**.

```js
document.getElementById("login").addEventListener("click", function() {
    alert("Logged in!");
});
```

👉 **Bug Bounty Use Case:** **Keylogging attack** using JavaScript event listeners.

```js
document.addEventListener("keydown", function(e) {
    console.log("Key pressed: " + e.key);
});
```

---

## 🛡️ Security Concerns in JavaScript  

### 🔥 1. Cross-Site Scripting (XSS)  
**Example of an insecure website:**
```html
<input type="text" id="search">
<script>
    let userInput = document.getElementById("search").value;
    document.body.innerHTML = "Search: " + userInput; // 🚨 XSS Risk!
</script>
```
👉 **Exploitable Input:**  
```html
<script>alert("XSS")</script>
```
✅ **Fix:** Always **sanitize user input**.

---

### 🔥 2. Session Hijacking  
Attackers steal session tokens using JavaScript.

```js
console.log(document.cookie); // 🚨 Sensitive cookies exposed
```
✅ **Fix:** Use **HttpOnly** and **SameSite** attributes for cookies.

---

### 🔥 3. Client-Side Validation Bypass  
Never rely on **client-side** validation.

```js
<form onsubmit="return validateForm()">
<input type="text" id="username" required>
<input type="submit">
</form>

<script>
    function validateForm() {
        let user = document.getElementById("username").value;
        if (user === "admin") {
            alert("Not allowed!");
            return false;
        }
    }
</script>
```
👉 **Exploitable:** Attackers can disable JavaScript in DevTools (`F12`) and bypass validation.

✅ **Fix:** Always validate **on the server-side**.

---


🚀 **Next Step:** Move to [Networking Basics](./networking-basics)  
