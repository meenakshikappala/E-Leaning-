export interface VideoItem {
  id: string;
  name: string;
  channel?: string;
  url: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface InterviewItem {
  id: string;
  q: string;
  a: string;
  category?: string;
  keyPoints?: string[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  hint: string;
  starterCodeJS: string;
  starterCodePy: string;
  testCases: { input: string; expected: string }[];
  solutionExplanation: string;
}

export interface SubjectModule {
  id: string;
  title: string;
  shortName: string;
  badge: string;
  iconName: string;
  color: string;
  summary: string;
  topics: string[];
  notesUrl: string;
  overviewNotes: { heading: string; content: string; codeSnippet?: string }[];
  videos: VideoItem[];
  interview: InterviewItem[];
  coding: CodingChallenge[];
}

export interface AptitudeTopic {
  title: string;
  url: string;
  channel: string;
  keyConcept: string;
  formula?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface HRQuestion {
  id: number;
  question: string;
  answer: string;
  interviewerIntent: string;
  tips: string[];
}

export const SUBJECTS_DATA: Record<string, SubjectModule> = {
  python: {
    id: "python",
    title: "Python Programming",
    shortName: "Python",
    badge: "🐍 High Demand",
    iconName: "Terminal",
    color: "from-blue-600 to-indigo-700",
    summary: "Basics, OOP, File Handling, Exception Handling, Functions, and Core Libraries.",
    topics: ["Syntax & Variables", "Data Structures (List, Tuple, Dict, Set)", "Functions & Lambdas", "OOP (Classes & Inheritance)", "File I/O", "Exception Handling"],
    notesUrl: "https://www.geeksforgeeks.org/python/python-programming-language-tutorial/",
    overviewNotes: [
      {
        heading: "1. Core Characteristics & Execution Model",
        content: "Python is an interpreted, high-level, dynamically typed language created by Guido van Rossum. It uses automatic garbage collection and supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
        codeSnippet: "# Dynamic typing example\nx = 42          # int\nx = 'Portal'    # str\nnumbers = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in numbers if n % 2 == 0]"
      },
      {
        heading: "2. Lists vs. Tuples vs. Sets vs. Dictionaries",
        content: "• List: Mutable, ordered, duplicates allowed: [1, 2, 3]\n• Tuple: Immutable, ordered, hashable, faster: (1, 2, 3)\n• Set: Mutable, unordered, unique elements only: {1, 2, 3}\n• Dict: Key-value mapping, key must be hashable: {'a': 1, 'b': 2}"
      },
      {
        heading: "3. Object-Oriented Programming (OOP) in Python",
        content: "Encapsulation, Inheritance, Polymorphism, and Abstraction are realized through classes. The self parameter references the current instance, and __init__ serves as the constructor.",
        codeSnippet: "class Student:\n    def __init__(self, name, roll):\n        self.name = name\n        self._roll = roll  # protected convention\n\n    def display(self):\n        return f'Student: {self.name}, Roll: {self._roll}'"
      },
      {
        heading: "4. Exception Handling",
        content: "Structured error handling prevents crash and guarantees cleanup using try, except, else, and finally blocks.",
        codeSnippet: "try:\n    with open('data.txt', 'r') as f:\n        content = f.read()\nexcept FileNotFoundError:\n    content = 'Default fallback'\nfinally:\n    print('Execution complete')"
      }
    ],
    videos: [
      { id: "py-1", name: "Python Basics (1 Hour Crash Course)", channel: "Programming with Mosh", url: "https://youtu.be/kqtD5dpn9C8", duration: "1h 05m", difficulty: "Beginner" },
      { id: "py-2", name: "OOP in Python (Classes, Objects, Inheritance)", channel: "Programming with Mosh", url: "https://youtu.be/JeznW_7DlB0", duration: "48m", difficulty: "Intermediate" },
      { id: "py-3", name: "File Handling in Python Complete Guide", channel: "Bro Code", url: "https://youtu.be/Uh2ebFW8OYM", duration: "32m", difficulty: "Beginner" },
      { id: "py-4", name: "Exception Handling with Try/Except/Finally", channel: "Programming with Mosh", url: "https://youtu.be/NMTEjQ8-AJM", duration: "25m", difficulty: "Beginner" },
      { id: "py-5", name: "Functions, Parameters, & Return Values", channel: "Bro Code", url: "https://youtu.be/9Os0o3wzS_I", duration: "36m", difficulty: "Beginner" }
    ],
    interview: [
      {
        id: "py-i-1",
        q: "What is Python?",
        a: "Python is a high-level, interpreted, object-oriented programming language. It is easy to learn, readable, and widely used for web development, data science, artificial intelligence, automation, and software development.",
        category: "Basics"
      },
      {
        id: "py-i-2",
        q: "What are the features of Python?",
        a: "- Easy to learn and use\n- Interpreted language\n- Object-oriented\n- Platform independent\n- Open source\n- Large standard library\n- Supports multiple programming paradigms",
        category: "Basics"
      },
      {
        id: "py-i-3",
        q: "What is the difference between a List and a Tuple?",
        a: "- List: Mutable (can be changed), uses [ ], slower memory allocation.\n- Tuple: Immutable (cannot be changed after creation), uses ( ), faster execution and can be used as dictionary keys.\n\nExample:\nmy_list = [1, 2, 3]\nmy_tuple = (1, 2, 3)",
        category: "Data Structures"
      },
      {
        id: "py-i-4",
        q: "What is the difference between \"==\" and \"=\"?",
        a: "- \"=\" is the assignment operator used to assign a value to a variable.\n- \"==\" is the equality comparison operator used to verify if two values are equal.\n\nExample:\nx = 10\nprint(x == 10)   # Output: True",
        category: "Syntax"
      },
      {
        id: "py-i-5",
        q: "What are Python data types?",
        a: "Common built-in data types:\n- Numeric: int, float, complex\n- Sequence: str, list, tuple\n- Set: set, frozenset\n- Mapping: dict\n- Boolean: bool\n- Binary: bytes, bytearray",
        category: "Basics"
      },
      {
        id: "py-i-6",
        q: "What is a function in Python?",
        a: "A function is a reusable block of code that performs a specific task. It is defined using the \"def\" keyword followed by parameters and a return statement.\n\nExample:\ndef greet(name):\n    return f\"Hello, {name}!\"",
        category: "Functions"
      },
      {
        id: "py-i-7",
        q: "What is the difference between \"break\" and \"continue\"?",
        a: "- break: Terminates the nearest enclosing loop immediately and jumps execution to the statement following the loop.\n- continue: Skips the remaining code inside the current iteration and starts the next iteration of the loop.",
        category: "Control Flow"
      },
      {
        id: "py-i-8",
        q: "What is Object-Oriented Programming (OOP)?",
        a: "OOP is a programming paradigm organized around classes and objects. The 4 pillar principles are:\n1. Encapsulation: Bundling data and methods into a single unit.\n2. Inheritance: Deriving properties from parent classes.\n3. Polymorphism: Different classes defining the same interface.\n4. Abstraction: Hiding implementation details and exposing only essentials.",
        category: "OOP"
      },
      {
        id: "py-i-9",
        q: "What is exception handling?",
        a: "Exception handling is a mechanism to handle runtime errors gracefully without terminating the program abnormally. In Python, it uses try, except, else, and finally blocks.\n\nExample:\ntry:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")",
        category: "Exceptions"
      },
      {
        id: "py-i-10",
        q: "Why is Python popular?",
        a: "Python is popular due to its human-readable syntax, vast ecosystem of production libraries (Pandas, NumPy, Django, TensorFlow, PyTorch), multi-platform compatibility, vibrant developer community, and versatility across web, automation, machine learning, and data analytics.",
        category: "General"
      }
    ],
    coding: [
      {
        id: "py-c-1",
        title: "Check Prime Number",
        difficulty: "Easy",
        description: "Write a function to check if a given integer n is a prime number (divisible only by 1 and itself).",
        hint: "Numbers <= 1 are not prime. Check divisibility from 2 up to sqrt(n). If divisible by any factor, return false.",
        starterCodeJS: `function checkPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log("Is 17 prime?:", checkPrime(17));
console.log("Is 24 prime?:", checkPrime(24));
console.log("Is 2 prime?:", checkPrime(2));`,
        starterCodePy: `def check_prime(n):
    if n <= 1:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True

print("Is 17 prime?:", check_prime(17))
print("Is 24 prime?:", check_prime(24))
print("Is 2 prime?:", check_prime(2))`,
        testCases: [
          { input: "17", expected: "true" },
          { input: "24", expected: "false" },
          { input: "2", expected: "true" }
        ],
        solutionExplanation: "Any composite number has at least one divisor less than or equal to its square root. Testing up to √n gives O(√n) time complexity."
      },
      {
        id: "py-c-2",
        title: "Fibonacci Series Generator",
        difficulty: "Easy",
        description: "Generate the first N numbers of the Fibonacci sequence starting with 0 and 1.",
        hint: "Initialize a = 0, b = 1. Iteratively calculate next = a + b and append to an array.",
        starterCodeJS: `function printFibonacci(terms) {
  if (terms <= 0) return [];
  if (terms === 1) return [0];
  const out = [0, 1];
  for (let i = 2; i < terms; i++) {
    out.push(out[i - 1] + out[i - 2]);
  }
  return out;
}

console.log("First 8 Fibonacci numbers:", printFibonacci(8).join(", "));`,
        starterCodePy: `def print_fibonacci(terms):
    if terms <= 0:
        return []
    if terms == 1:
        return [0]
    out = [0, 1]
    for _ in range(2, terms):
        out.append(out[-1] + out[-2])
    return out

print("First 8 Fibonacci numbers:", print_fibonacci(8))`,
        testCases: [
          { input: "5", expected: "[0, 1, 1, 2, 3]" },
          { input: "8", expected: "[0, 1, 1, 2, 3, 5, 8, 13]" }
        ],
        solutionExplanation: "Using an iterative loop gives O(N) time and O(N) space, avoiding the exponential overhead of naive recursion."
      },
      {
        id: "py-c-3",
        title: "Find Factorial",
        difficulty: "Easy",
        description: "Calculate n! (n factorial), the product of all positive integers less than or equal to n. Note that 0! = 1.",
        hint: "Initialize fact = 1 and multiply fact *= i for i from 1 to n.",
        starterCodeJS: `function findFactorial(n) {
  if (n < 0) return null;
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

console.log("Factorial of 5:", findFactorial(5));
console.log("Factorial of 0:", findFactorial(0));
console.log("Factorial of 7:", findFactorial(7));`,
        starterCodePy: `def find_factorial(n):
    if n < 0:
        return None
    fact = 1
    for i in range(1, n + 1):
        fact *= i
    return fact

print("Factorial of 5:", find_factorial(5))
print("Factorial of 0:", find_factorial(0))`,
        testCases: [
          { input: "5", expected: "120" },
          { input: "0", expected: "1" }
        ],
        solutionExplanation: "Linear accumulation runs in O(N) time and O(1) auxiliary space."
      },
      {
        id: "py-c-4",
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Reverse a given string without using built-in reverse helper functions, or with clean idiomatic slicing.",
        hint: "In Python, string[::-1] performs reverse slicing. In JS, split, reverse, join or a two-pointer loop.",
        starterCodeJS: `function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log("Original: 'smartlearning'");
console.log("Reversed:", reverseString("smartlearning"));`,
        starterCodePy: `def reverse_string(s):
    # Idiomatic Python slice
    return s[::-1]

print("Original: 'smartlearning'")
print("Reversed:", reverse_string("smartlearning"))`,
        testCases: [
          { input: "'hello'", expected: "'olleh'" },
          { input: "'python'", expected: "'nohtyp'" }
        ],
        solutionExplanation: "Slicing or scanning from the end runs in O(N) linear time."
      },
      {
        id: "py-c-5",
        title: "Check Palindrome",
        difficulty: "Easy",
        description: "Determine whether an integer or string reads the same forwards and backwards.",
        hint: "Convert number to string and compare with reversed string, or reverse mathematically with modulo 10.",
        starterCodeJS: `function isPalindrome(num) {
  const str = String(num);
  const rev = str.split("").reverse().join("");
  return str === rev;
}

console.log("Is 121 palindrome?:", isPalindrome(121));
console.log("Is 1234 palindrome?:", isPalindrome(1234));
console.log("Is 'radar' palindrome?:", isPalindrome("radar"));`,
        starterCodePy: `def is_palindrome(val):
    s = str(val)
    return s == s[::-1]

print("Is 121 palindrome?:", is_palindrome(121))
print("Is 1234 palindrome?:", is_palindrome(1234))
print("Is 'racecar' palindrome?:", is_palindrome("racecar"))`,
        testCases: [
          { input: "121", expected: "true" },
          { input: "123", expected: "false" }
        ],
        solutionExplanation: "Comparing forward and backward characters from both ends stops early at the first mismatch."
      }
    ]
  },

  java: {
    id: "java",
    title: "Java Technology",
    shortName: "Java",
    badge: "☕ Enterprise Core",
    iconName: "Coffee",
    color: "from-amber-600 to-red-700",
    summary: "Basics, OOP, JVM architecture, Collections framework, Exception handling, and Multithreading.",
    topics: ["JVM, JRE & JDK", "OOP Pillars", "Collections Framework", "Exception Hierarchy", "Multithreading & Concurrency", "Memory Management & Garbage Collection"],
    notesUrl: "https://www.geeksforgeeks.org/java/java/",
    overviewNotes: [
      {
        heading: "1. The Java Platform & Architecture",
        content: "Java follows the Write Once, Run Anywhere (WORA) philosophy. Source code (.java) compiles to bytecode (.class) using javac. The JVM interprets or JIT-compiles this bytecode into native machine instructions.",
        codeSnippet: "// Standard Java Entry Point\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to Smart Learning Java!\");\n    }\n}"
      },
      {
        heading: "2. JDK vs JRE vs JVM",
        content: "• JDK (Java Development Kit): Contains JRE + tools (javac, javadoc, jar, debugger).\n• JRE (Java Runtime Environment): Provides JVM + core Java libraries needed to run code.\n• JVM (Java Virtual Machine): Abstract computing machine that executes bytecode, manages heap and stack, and runs garbage collection."
      },
      {
        heading: "3. Collections Framework",
        content: "The java.util Collections Framework provides standardized data structures:\n• List: ArrayList (dynamic array), LinkedList (doubly linked)\n• Set: HashSet (O(1) average lookup), TreeSet (Red-Black tree, sorted)\n• Map: HashMap (key-value hash table), TreeMap (sorted key navigation)",
        codeSnippet: "List<String> list = new ArrayList<>();\nlist.add(\"Java\");\nlist.add(\"Python\");\nfor (String item : list) {\n    System.out.println(item);\n}"
      },
      {
        heading: "4. Exception Handling",
        content: "Checked exceptions (e.g. IOException, SQLException) must be caught or declared with 'throws'. Unchecked exceptions (subclasses of RuntimeException like NullPointerException, ArrayIndexOutOfBoundsException) do not require explicit declaration."
      }
    ],
    videos: [
      { id: "java-1", name: "Java Basics Tutorial (Step-by-Step)", channel: "Programming with Mosh", url: "https://youtu.be/eIrMbAQSU34", duration: "2h 30m", difficulty: "Beginner" },
      { id: "java-2", name: "OOP in Java (Classes, Polymorphism, Abstract Classes)", channel: "Bro Code", url: "https://youtu.be/4uLwoVmLAIo", duration: "1h 15m", difficulty: "Intermediate" },
      { id: "java-3", name: "Exception Handling in Java Complete Breakdown", channel: "Bro Code", url: "https://youtu.be/Sk72GF7PV8w", duration: "38m", difficulty: "Beginner" },
      { id: "java-4", name: "Java Collections Framework Masterclass", channel: "Programming with Mosh", url: "https://youtu.be/xk4_1vDrzzo", duration: "1h 02m", difficulty: "Intermediate" },
      { id: "java-5", name: "Java Multithreading & Thread Synchronization", channel: "Bro Code", url: "https://youtu.be/r_MbozD32eo", duration: "45m", difficulty: "Advanced" }
    ],
    interview: [
      {
        id: "java-i-1",
        q: "What is Java?",
        a: "Java is a high-level, class-based, object-oriented, platform-independent programming language developed by Sun Microsystems (now Oracle). It follows the principle \"Write Once, Run Anywhere (WORA).\"",
        category: "Basics"
      },
      {
        id: "java-i-2",
        q: "What are the features of Java?",
        a: "- Object-Oriented\n- Platform Independent (Bytecode & JVM)\n- Secure (No explicit pointers, bytecode verifier)\n- Robust (Strong memory management & GC)\n- Multithreaded\n- Portable\n- High Performance (JIT Compiler)\n- Distributed & Dynamic",
        category: "Basics"
      },
      {
        id: "java-i-3",
        q: "What is the difference between JDK, JRE, and JVM?",
        a: "- JDK (Java Development Kit): For developing Java apps; includes JRE + compiler (javac) + tools.\n- JRE (Java Runtime Environment): Environment required to run compiled Java apps; includes JVM + libraries.\n- JVM (Java Virtual Machine): Executes Java bytecode line by line or via JIT compilation.",
        category: "Architecture"
      },
      {
        id: "java-i-4",
        q: "What is Object-Oriented Programming (OOP)?",
        a: "OOP is a paradigm based on objects containing data (fields) and code (methods). The four core principles are Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (multiple forms via overloading/overriding), and Abstraction (hiding implementation details).",
        category: "OOP"
      },
      {
        id: "java-i-5",
        q: "What is the difference between \"==\" and \".equals()\"?",
        a: "- \"==\" is an operator that compares primitive values or memory references (checks if both variables point to the exact same object in heap memory).\n- \".equals()\" is a method from Object class that compares the logical values/contents of objects when properly overridden (e.g. String.equals compares character sequence).",
        category: "Core"
      },
      {
        id: "java-i-6",
        q: "What is the difference between a Class and an Object?",
        a: "- Class: A blueprint, template, or prototype from which objects are created. It occupies no memory until instantiated.\n- Object: An instance of a class having a distinct state (attributes) and behavior (methods), allocated in JVM heap memory.",
        category: "OOP"
      },
      {
        id: "java-i-7",
        q: "What is Inheritance?",
        a: "Inheritance is an OOP mechanism where a subclass acquires fields and methods of a superclass using the 'extends' keyword. Java supports single inheritance for classes, preventing diamond problem ambiguity, and multiple inheritance through interfaces.",
        category: "OOP"
      },
      {
        id: "java-i-8",
        q: "What is Exception Handling in Java?",
        a: "Exception handling maintains the normal flow of the program despite runtime errors. It utilizes:\n- try: Wraps code that may throw exceptions\n- catch: Handles specific exceptions\n- finally: Block that executes regardless of whether an exception occurred (often for resource cleanup)\n- throw / throws: Explicitly throw an exception or declare in method signature.",
        category: "Exceptions"
      },
      {
        id: "java-i-9",
        q: "What is Method Overloading and Method Overriding?",
        a: "- Overloading (Compile-time Polymorphism): Same method name within the same class, differing in number, type, or order of parameters.\n- Overriding (Runtime Polymorphism): A subclass provides its specific implementation of a method defined in its parent class with the exact same name, return type, and parameters.",
        category: "OOP"
      },
      {
        id: "java-i-10",
        q: "What is the difference between \"Array\" and \"ArrayList\"?",
        a: "- Array: Fixed size once created, can store both primitives and objects, faster performance, uses length attribute.\n- ArrayList: Dynamic resizing, part of the Collections Framework, stores only objects (wrapper classes for primitives), rich utility methods like add(), remove(), size().",
        category: "Collections"
      }
    ],
    coding: [
      {
        id: "java-c-1",
        title: "Prime Number Checker",
        difficulty: "Easy",
        description: "Implement a prime check algorithm checking divisors up to n/2 or sqrt(n).",
        hint: "Return 'Not Prime' if n <= 1 or divisible by any i in [2, n/2].",
        starterCodeJS: `function javaPrime(n) {
  if (n <= 1) return "Not Prime";
  for (let i = 2; i <= Math.floor(n / 2); i++) {
    if (n % i === 0) return "Not Prime";
  }
  return "Prime";
}

console.log("Check 19:", javaPrime(19));
console.log("Check 25:", javaPrime(25));`,
        starterCodePy: `def java_prime(n):
    if n <= 1:
        return "Not Prime"
    for i in range(2, n // 2 + 1):
        if n % i == 0:
            return "Not Prime"
    return "Prime"

print("Check 19:", java_prime(19))
print("Check 25:", java_prime(25))`,
        testCases: [
          { input: "19", expected: "'Prime'" },
          { input: "25", expected: "'Not Prime'" }
        ],
        solutionExplanation: "Testing factors up to n/2 proves no non-trivial factor exists."
      },
      {
        id: "java-c-2",
        title: "Fibonacci Iteration Setup",
        difficulty: "Easy",
        description: "Print the first N terms of Fibonacci sequence using two pointer state variables.",
        hint: "Keep two variables a and b, updating c = a + b.",
        starterCodeJS: `function generateFibo(count) {
  let a = 0, b = 1;
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(a);
    let c = a + b;
    a = b;
    b = c;
  }
  return result;
}

console.log("Fibonacci:", generateFibo(7).join(" -> "));`,
        starterCodePy: `def generate_fibo(count):
    a, b = 0, 1
    res = []
    for _ in range(count):
        res.append(a)
        a, b = b, a + b
    return res

print("Fibonacci:", generate_fibo(7))`,
        testCases: [
          { input: "7", expected: "[0, 1, 1, 2, 3, 5, 8]" }
        ],
        solutionExplanation: "Constant O(1) extra space without recursive call stack overhead."
      },
      {
        id: "java-c-3",
        title: "Integer Palindrome via Modulo",
        difficulty: "Easy",
        description: "Reverse an integer mathematically without string conversion and check if it is a palindrome.",
        hint: "Extract digits with num % 10 and build reversed = reversed * 10 + rem.",
        starterCodeJS: `function isNumPalindrome(num) {
  if (num < 0) return false;
  let original = num;
  let reversed = 0;
  let temp = num;
  while (temp > 0) {
    let rem = temp % 10;
    reversed = (reversed * 10) + rem;
    temp = Math.floor(temp / 10);
  }
  return original === reversed;
}

console.log("Is 121 palindrome?:", isNumPalindrome(121));
console.log("Is 123 palindrome?:", isNumPalindrome(123));`,
        starterCodePy: `def is_num_palindrome(num):
    if num < 0:
        return False
    original, reversed_val, temp = num, 0, num
    while temp > 0:
        rem = temp % 10
        reversed_val = (reversed_val * 10) + rem
        temp //= 10
    return original == reversed_val

print("Is 121 palindrome?:", is_num_palindrome(121))
print("Is 123 palindrome?:", is_num_palindrome(123))`,
        testCases: [
          { input: "121", expected: "true" },
          { input: "123", expected: "false" }
        ],
        solutionExplanation: "Reversing mathematically avoids string heap allocations."
      }
    ]
  },

  c: {
    id: "c",
    title: "C Programming Language",
    shortName: "C Language",
    badge: "⚡ System Low-Level",
    iconName: "Cpu",
    color: "from-cyan-600 to-blue-800",
    summary: "Variables, Functions, Pointers, Memory Management (malloc/calloc), Structures, and File Handling.",
    topics: ["Variables & Data Types", "Pointers & Addresses", "Memory Allocation (malloc, free)", "Structures & Unions", "File I/O", "Preprocessor Directives"],
    notesUrl: "https://www.geeksforgeeks.org/c/c-programming-language/",
    overviewNotes: [
      {
        heading: "1. The Foundational Procedural Language",
        content: "C was created by Dennis Ritchie in 1972 at Bell Labs. It provides low-level memory access with a clean assembly-like mapping, making it the bedrock of operating systems, compilers, and embedded devices.",
        codeSnippet: "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int *ptr = &x;\n    printf(\"Value: %d, Address: %p\\n\", *ptr, (void*)ptr);\n    return 0;\n}"
      },
      {
        heading: "2. Pointers & Dynamic Memory",
        content: "• & operator retrieves the memory address of a variable.\n• * dereferences an address to access or modify value.\n• malloc(size): Allocates uninitialized memory in heap.\n• calloc(n, size): Allocates zero-initialized memory.\n• free(ptr): Returns allocated memory back to OS to prevent memory leaks."
      },
      {
        heading: "3. Structures vs. Unions",
        content: "• Structure (struct): Each member variable possesses its own independent memory offset. Total size >= sum of member sizes.\n• Union (union): All members share the exact same starting memory address. Total size equals the size of its largest member."
      }
    ],
    videos: [
      { id: "c-1", name: "C Basics (Variables, Data Types, I/O)", channel: "Programming with Mosh / FreeCodeCamp", url: "https://youtu.be/KJgsSFOSQv0", duration: "1h 40m", difficulty: "Beginner" },
      { id: "c-2", name: "Functions & Call by Value / Reference in C", channel: "Neso Academy", url: "https://youtu.be/7Dh73z3icd8", duration: "32m", difficulty: "Beginner" },
      { id: "c-3", name: "Pointers in C - Clear Deep Dive", channel: "Neso Academy", url: "https://youtu.be/zuegQmMdy8M", duration: "50m", difficulty: "Intermediate" },
      { id: "c-4", name: "Structures and Memory Padding in C", channel: "Neso Academy", url: "https://youtu.be/Bz4MxDeEM6k", duration: "35m", difficulty: "Intermediate" },
      { id: "c-5", name: "File Handling (fopen, fread, fwrite, fclose)", channel: "Neso Academy", url: "https://youtu.be/4mB5H5lcymA", duration: "42m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "c-i-1",
        q: "What is C?",
        a: "C is a general-purpose, procedural programming language developed by Dennis Ritchie in 1972 at Bell Labs. It is widely used for system programming, embedded systems, OS kernels, and performance-critical applications.",
        category: "Basics"
      },
      {
        id: "c-i-2",
        q: "What are the features of C?",
        a: "- Simple and efficient\n- Portable across architectures\n- Structured / Modular programming\n- Direct hardware and pointer manipulation\n- Fast execution with minimal runtime overhead\n- Rich built-in library functions\n- Dynamic memory allocation",
        category: "Basics"
      },
      {
        id: "c-i-3",
        q: "What is the difference between a Compiler and an Interpreter?",
        a: "- Compiler: Translates the whole source file into machine code object files before execution. Reports syntax errors as a batch. Resulting executable runs fast.\n- Interpreter: Translates and executes instructions line by line directly at runtime. Easier debugging, but slower runtime execution.",
        category: "Concepts"
      },
      {
        id: "c-i-4",
        q: "What is the difference between \"while\" and \"do-while\" loops?",
        a: "- while loop (Entry-controlled): Evaluates condition first. If condition is false initially, body never runs.\n- do-while loop (Exit-controlled): Executes loop body once guaranteed before testing condition at the bottom.",
        category: "Control Flow"
      },
      {
        id: "c-i-5",
        q: "What is a Pointer?",
        a: "A pointer is a variable that stores the memory address of another variable. Syntax: int *ptr = &val;. Pointers facilitate dynamic allocation, array manipulation, pass-by-reference, and data structure construction.",
        category: "Pointers"
      },
      {
        id: "c-i-6",
        q: "What is the difference between \"malloc()\" and \"calloc()\"?",
        a: "- malloc(size): Allocates a single block of memory in bytes. Does not clear memory; retains garbage values.\n- calloc(num, size): Allocates contiguous memory for an array of elements and zeroes out every byte.",
        category: "Memory"
      },
      {
        id: "c-i-7",
        q: "What is the difference between a Structure and a Union?",
        a: "- Structure: Every member has separate memory storage. Can use all members simultaneously.\n- Union: All members share the same memory location (sized to largest member). Only one member can be used reliably at any given time.",
        category: "Data Structures"
      },
      {
        id: "c-i-8",
        q: "What is Recursion?",
        a: "Recursion is a programming technique where a function calls itself directly or indirectly until reaching a base condition. Requires careful base-case design to prevent stack overflow.",
        category: "Functions"
      },
      {
        id: "c-i-9",
        q: "What is the difference between \"break\" and \"continue\"?",
        a: "- break: Terminates loop or switch statement immediately.\n- continue: Skips remaining statements in the current iteration and advances loop index to next round.",
        category: "Control Flow"
      },
      {
        id: "c-i-10",
        q: "What is the difference between Call by Value and Call by Reference?",
        a: "- Call by Value: Value is copied into formal parameters. Modifications inside function do not affect caller.\n- Call by Reference (via pointers in C): Memory address is passed. Modifications through dereferenced pointers directly alter original variable.",
        category: "Functions"
      }
    ],
    coding: [
      {
        id: "c-c-1",
        title: "Armstrong Number Checker",
        difficulty: "Easy",
        description: "An Armstrong number (Narcissistic number) is a number that equals the sum of its own digits each raised to the power of the number of digits (e.g. 153 = 1^3 + 5^3 + 3^3).",
        hint: "Count total digits first. Then loop: rem = temp % 10, sum += pow(rem, digits), temp /= 10.",
        starterCodeJS: `function isArmstrong(num) {
  const digits = num.toString().length;
  let temp = num;
  let sum = 0;
  while (temp > 0) {
    let rem = temp % 10;
    sum += Math.pow(rem, digits);
    temp = Math.floor(temp / 10);
  }
  return sum === num;
}

console.log("Is 153 Armstrong?:", isArmstrong(153));
console.log("Is 370 Armstrong?:", isArmstrong(370));
console.log("Is 123 Armstrong?:", isArmstrong(123));`,
        starterCodePy: `def is_armstrong(num):
    s = str(num)
    power = len(s)
    total = sum(int(ch) ** power for ch in s)
    return total == num

print("Is 153 Armstrong?:", is_armstrong(153))
print("Is 370 Armstrong?:", is_armstrong(370))
print("Is 123 Armstrong?:", is_armstrong(123))`,
        testCases: [
          { input: "153", expected: "true" },
          { input: "123", expected: "false" }
        ],
        solutionExplanation: "Digit extraction with modulo running in O(log10(N)) time."
      },
      {
        id: "c-c-2",
        title: "Find Largest Element in Array",
        difficulty: "Easy",
        description: "Given an array of numbers, scan through to find and return the maximum value.",
        hint: "Initialize max = arr[0] and iterate through the array from index 1, updating max whenever a greater element is encountered.",
        starterCodeJS: `function findMax(arr) {
  if (!arr.length) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

const scores = [12, 35, 1, 10, 34, 1, 99, 45];
console.log("Largest Element:", findMax(scores));`,
        starterCodePy: `def find_max(arr):
    if not arr:
        return None
    max_val = arr[0]
    for x in arr[1:]:
        if x > max_val:
            max_val = x
    return max_val

print("Largest Element:", find_max([12, 35, 1, 10, 34, 1, 99, 45]))`,
        testCases: [
          { input: "[12, 35, 1, 10, 34, 99]", expected: "99" }
        ],
        solutionExplanation: "Single linear pass checks every element in O(N) time and O(1) space."
      },
      {
        id: "c-c-3",
        title: "Right-Angled Triangle Pattern",
        difficulty: "Easy",
        description: "Print a right-angled triangle pattern of numbers for N rows.",
        hint: "Use nested loops: outer loop for row from 1 to N, inner loop for column from 1 to row.",
        starterCodeJS: `function printTriangle(rows) {
  let lines = [];
  for (let i = 1; i <= rows; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += j + " ";
    }
    lines.push(row.trim());
  }
  return lines.join("\\n");
}

console.log(printTriangle(5));`,
        starterCodePy: `def print_triangle(rows):
    lines = []
    for i in range(1, rows + 1):
        line = " ".join(str(j) for j in range(1, i + 1))
        lines.append(line)
    return "\\n".join(lines)

print(print_triangle(5))`,
        testCases: [
          { input: "3", expected: "1\\n1 2\\n1 2 3" }
        ],
        solutionExplanation: "The inner loop runs 1 + 2 + ... + N = N(N+1)/2 times."
      }
    ]
  },

  dbms: {
    id: "dbms",
    title: "Database Management Systems (DBMS)",
    shortName: "DBMS",
    badge: "🗄️ Relational Data",
    iconName: "Database",
    color: "from-emerald-600 to-teal-800",
    summary: "Relational modeling, ER diagrams, Normalization (1NF to BCNF), SQL Joins, Indexing, and ACID properties.",
    topics: ["RDBMS Architecture", "ER Modeling & Keys", "Normalization (1NF, 2NF, 3NF, BCNF)", "SQL Subqueries & Joins", "ACID & Transactions", "Indexing (B-Trees)"],
    notesUrl: "https://www.geeksforgeeks.org/dbms/dbms/",
    overviewNotes: [
      {
        heading: "1. Relational Database Concepts",
        content: "A Database Management System (DBMS) manages organized collections of structured information. In relational DBMS (RDBMS), data is stored in relations (tables) made of tuples (rows) and attributes (columns).",
        codeSnippet: "-- SQL Table definition with constraints\nCREATE TABLE Employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50) NOT NULL,\n    dept_id INT,\n    salary DECIMAL(10, 2),\n    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)\n);"
      },
      {
        heading: "2. Key Types in Relational Schemas",
        content: "• Primary Key: Unique, non-null attribute uniquely identifying each tuple.\n• Candidate Key: Minimal super key capable of qualifying as primary key.\n• Foreign Key: Attribute matching primary key in another table, guaranteeing referential integrity.\n• Composite Key: Key composed of two or more columns."
      },
      {
        heading: "3. Normalization Rules",
        content: "• 1NF: Atomic values only, no repeating groups.\n• 2NF: In 1NF and no partial dependencies (every non-key attribute fully dependent on whole primary key).\n• 3NF: In 2NF and no transitive dependencies (no non-key attribute depends on another non-key attribute).\n• BCNF (Boyce-Codd NF): For every functional dependency X -> Y, X must be a super key."
      },
      {
        heading: "4. ACID Properties of Transactions",
        content: "• Atomicity: All or nothing execution.\n• Consistency: Database transitions from one valid state to another satisfying all schema constraints.\n• Isolation: Concurrent transactions execute without interfering with one another.\n• Durability: Once committed, updates persist permanently even through power failure."
      }
    ],
    videos: [
      { id: "db-1", name: "Introduction to DBMS & Relational Architecture", channel: "Gate Smashers", url: "https://youtu.be/ztHopE5Wnpc", duration: "18m", difficulty: "Beginner" },
      { id: "db-2", name: "ER Model & ER to Relational Mapping", channel: "Gate Smashers", url: "https://youtu.be/Q45sr5p_NmQ", duration: "24m", difficulty: "Intermediate" },
      { id: "db-3", name: "Normalization (1NF, 2NF, 3NF, BCNF) Made Easy", channel: "Gate Smashers", url: "https://youtu.be/oC7CajQNRX0", duration: "32m", difficulty: "Intermediate" },
      { id: "db-4", name: "SQL Joins (Inner, Left, Right, Full Outer)", channel: "Gate Smashers", url: "https://youtu.be/9yeOJ0ZMUYw", duration: "20m", difficulty: "Beginner" },
      { id: "db-5", name: "ACID Properties & Transaction Schedules", channel: "Gate Smashers", url: "https://youtu.be/GAe5oB742dw", duration: "22m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "db-i-1",
        q: "What is DBMS?",
        a: "DBMS (Database Management System) is software used to define, construct, manipulate, and share databases among various users and applications. It protects data consistency, security, and integrity (e.g. PostgreSQL, MySQL, Oracle).",
        category: "Basics"
      },
      {
        id: "db-i-2",
        q: "What is the difference between DBMS and RDBMS?",
        a: "- DBMS: Stores data in file or hierarchical format, may not enforce relationships between tables, can allow data redundancy.\n- RDBMS: Stores data in related tabular relations with schemas, enforces referential integrity through foreign keys, and adheres strictly to Codd's relational rules.",
        category: "Architecture"
      },
      {
        id: "db-i-3",
        q: "What is a Primary Key?",
        a: "A Primary Key is a constraint on one or more columns that uniquely identifies every row in a table. It strictly disallows NULL values and duplicate entries.",
        category: "Keys"
      },
      {
        id: "db-i-4",
        q: "What is a Foreign Key?",
        a: "A Foreign Key is a field in one table that references the Primary Key of another table. It enforces referential integrity so orphaned child records cannot exist.",
        category: "Keys"
      },
      {
        id: "db-i-5",
        q: "What is Normalization?",
        a: "Normalization is the systematic process of designing database tables to minimize data redundancy and eliminate update, insertion, and deletion anomalies. Major normal forms are 1NF, 2NF, 3NF, and BCNF.",
        category: "Normalization"
      },
      {
        id: "db-i-6",
        q: "What are SQL commands?",
        a: "SQL commands are categorized as:\n- DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE\n- DML (Data Manipulation Language): INSERT, UPDATE, DELETE\n- DQL (Data Query Language): SELECT\n- DCL (Data Control Language): GRANT, REVOKE\n- TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT",
        category: "SQL"
      },
      {
        id: "db-i-7",
        q: "What is a JOIN in SQL?",
        a: "A JOIN clause is used to combine rows from two or more tables based on a related column.\n- INNER JOIN: Rows matching in both tables\n- LEFT JOIN: All rows from left table + matching from right\n- RIGHT JOIN: All rows from right table + matching from left\n- FULL OUTER JOIN: All rows where there is a match in either table",
        category: "SQL"
      },
      {
        id: "db-i-8",
        q: "What is a Transaction?",
        a: "A transaction is a single logical unit of database work comprising one or more SQL statements executed together. It must uphold the ACID properties to ensure database integrity.",
        category: "Transactions"
      },
      {
        id: "db-i-9",
        q: "What are ACID properties?",
        a: "- Atomicity: All operations in transaction succeed or all fail\n- Consistency: Preserves all validation constraints\n- Isolation: Transactions do not see uncommitted concurrent writes\n- Durability: Committed data survives system crashes",
        category: "Transactions"
      },
      {
        id: "db-i-10",
        q: "What is an Index?",
        a: "An Index is an auxiliary data structure (typically a B+ Tree) that speeds up row retrieval operations at the cost of additional disk storage and slower write operations (INSERT/UPDATE/DELETE).",
        category: "Optimization"
      }
    ],
    coding: [
      {
        id: "db-c-1",
        title: "SQL Query Simulator (Inner Join & Grouping)",
        difficulty: "Easy",
        description: "Simulate an SQL INNER JOIN and salary average calculation using JavaScript array methods.",
        hint: "Use array filter/find to match dept_id, then calculate average salary by department.",
        starterCodeJS: `// Simulating SQL:
// SELECT d.name, AVG(e.salary) FROM Employees e 
// JOIN Departments d ON e.dept_id = d.id GROUP BY d.name;

const departments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" }
];

const employees = [
  { id: 101, name: "Alice", dept_id: 1, salary: 90000 },
  { id: 102, name: "Bob", dept_id: 1, salary: 80000 },
  { id: 103, name: "Charlie", dept_id: 2, salary: 65000 }
];

function calculateDeptAverages() {
  const map = {};
  for (const emp of employees) {
    const dept = departments.find(d => d.id === emp.dept_id);
    if (!dept) continue;
    if (!map[dept.name]) map[dept.name] = [];
    map[dept.name].push(emp.salary);
  }
  
  const results = {};
  for (const dept in map) {
    const sum = map[dept].reduce((a, b) => a + b, 0);
    results[dept] = sum / map[dept].length;
  }
  return results;
}

console.log("Department Average Salaries:", JSON.stringify(calculateDeptAverages(), null, 2));`,
        starterCodePy: `departments = [{"id": 1, "name": "Engineering"}, {"id": 2, "name": "Marketing"}]
employees = [
    {"name": "Alice", "dept_id": 1, "salary": 90000},
    {"name": "Bob", "dept_id": 1, "salary": 80000},
    {"name": "Charlie", "dept_id": 2, "salary": 65000}
]

def avg_by_dept():
    from collections import defaultdict
    dept_map = {d["id"]: d["name"] for d in departments}
    sums = defaultdict(list)
    for e in employees:
        sums[dept_map[e["dept_id"]]].append(e["salary"])
    return {k: sum(v)/len(v) for k, v in sums.items()}

print("Department Averages:", avg_by_dept())`,
        testCases: [
          { input: "employees", expected: "{'Engineering': 85000, 'Marketing': 65000}" }
        ],
        solutionExplanation: "Demonstrates relational join semantics via hash map indexing."
      }
    ]
  },

  html: {
    id: "html",
    title: "HTML & Web Foundations",
    shortName: "HTML",
    badge: "🌐 Frontend Core",
    iconName: "Globe",
    color: "from-orange-500 to-amber-700",
    summary: "HTML5 semantic elements, Forms, Tables, Multimedia, Document Object Model (DOM), and SEO tags.",
    topics: ["HTML5 Document Structure", "Semantic Tags (<header>, <main>, <nav>)", "Forms & Input Types", "Tables & Accessibility", "Links & Image Optimization", "DOM Tree & Web Standards"],
    notesUrl: "https://www.geeksforgeeks.org/html/html-complete-guide/",
    overviewNotes: [
      {
        heading: "1. HTML5 Core Concepts",
        content: "HyperText Markup Language (HTML) creates the structural backbone of web pages. HTML5 introduces semantic tags, native media tags (<audio>, <video>), canvas graphics, and responsive viewport meta tags.",
        codeSnippet: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Smart Learning</title>\n</head>\n<body>\n  <header><h1>Header</h1></header>\n</body>\n</html>"
      },
      {
        heading: "2. Semantic HTML Benefits",
        content: "Semantic elements clearly convey meaning to both browsers and developers, boosting SEO, screen reader accessibility, and maintainability (e.g. <header>, <nav>, <section>, <article>, <aside>, <footer>)."
      },
      {
        heading: "3. Forms & Validation",
        content: "HTML5 forms support client-side validation attributes like required, pattern, min, max, type=\"email\", type=\"number\", and type=\"date\"."
      }
    ],
    videos: [
      { id: "html-1", name: "HTML5 Full Crash Course for Beginners", channel: "Traversy Media", url: "https://youtu.be/qz0aGYrrlhU", duration: "1h 00m", difficulty: "Beginner" },
      { id: "html-2", name: "HTML5 Forms & Modern Inputs", channel: "Web Dev Simplified", url: "https://youtu.be/fNcJuPIZ2WE", duration: "25m", difficulty: "Beginner" },
      { id: "html-3", name: "HTML Tables & Semantic Data Formatting", channel: "Kevin Powell", url: "https://youtu.be/UB1O30fR-EE", duration: "18m", difficulty: "Beginner" },
      { id: "html-4", name: "Images, Responsive Picture Tag, and Links", channel: "Kevin Powell", url: "https://youtu.be/mJgBOIoGihA", duration: "22m", difficulty: "Beginner" },
      { id: "html-5", name: "Semantic HTML - Why It Really Matters", channel: "Kevin Powell", url: "https://youtu.be/kUMe1FH4CHE", duration: "20m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "html-i-1",
        q: "What is HTML?",
        a: "HTML (HyperText Markup Language) is the standard markup language used to structure web pages and their content using tags and attributes.",
        category: "Basics"
      },
      {
        id: "html-i-2",
        q: "What is the difference between HTML and HTML5?",
        a: "- HTML: Older standard without native multimedia support, requiring external plugins like Flash; lacked semantic structure.\n- HTML5: Introduced semantic tags (<nav>, <article>, <header>), native <video> & <audio>, <canvas>, local storage, and improved form validation.",
        category: "HTML5"
      },
      {
        id: "html-i-3",
        q: "What are HTML tags?",
        a: "HTML tags are keywords enclosed in angle brackets (< >) that instruct the browser on how to display content. Most tags come in pairs: opening tag (e.g. <p>) and closing tag (e.g. </p>).",
        category: "Syntax"
      },
      {
        id: "html-i-4",
        q: "What are semantic tags in HTML5?",
        a: "Semantic tags describe their meaning to human developers and search engine spiders alike. Examples include <header>, <nav>, <main>, <section>, <article>, and <footer>.",
        category: "Semantics"
      },
      {
        id: "html-i-5",
        q: "What is the difference between \"<div>\" and \"<span>\"?",
        a: "- <div>: Block-level element that always starts on a new line and takes up full container width by default.\n- <span>: Inline element that only occupies the width necessary for its content without causing line breaks.",
        category: "Layout"
      },
      {
        id: "html-i-6",
        q: "What is the purpose of the \"<form>\" tag?",
        a: "The <form> element encapsulates interactive controls (inputs, checkboxes, selects, submit buttons) designed to capture and submit user input to a server via HTTP methods (GET/POST).",
        category: "Forms"
      },
      {
        id: "html-i-7",
        q: "What is the difference between \"id\" and \"class\"?",
        a: "- id: Unique identifier per page; no two elements should share the same id. Targeted in CSS with #.\n- class: Reusable identifier that can be assigned to multiple elements for common styling. Targeted in CSS with .",
        category: "Attributes"
      },
      {
        id: "html-i-8",
        q: "What are the basic structure tags of an HTML document?",
        a: "The minimum valid HTML structure consists of: <!DOCTYPE html>, <html>, <head> (containing metadata, title, link tags), and <body> (containing user-visible content).",
        category: "Structure"
      },
      {
        id: "html-i-9",
        q: "What is the purpose of the \"<img>\" tag?",
        a: "The <img> tag embeds images. Essential attributes include 'src' (source URL/path) and 'alt' (alternative descriptive text for accessibility, SEO, and screen readers).",
        category: "Media"
      },
      {
        id: "html-i-10",
        q: "What is the purpose of the \"<a>\" tag?",
        a: "The <a> (anchor) tag creates hyperlinks connecting web resources. Key attributes include 'href' (destination URI), 'target=\"_blank\"' (opens in new tab), and 'rel=\"noopener noreferrer\"' (security).",
        category: "Navigation"
      }
    ],
    coding: [
      {
        id: "html-c-1",
        title: "Generate Semantic HTML Document String",
        difficulty: "Easy",
        description: "Write code that constructs a clean semantic HTML card component string.",
        hint: "Construct an article containing a header, figure with img, section with text, and a footer with a link.",
        starterCodeJS: `function generateCard(title, description, imgUrl, linkUrl) {
  return \`<article class="card">
  <header>
    <h2>\${title}</h2>
  </header>
  <img src="\${imgUrl}" alt="\${title}" />
  <p>\${description}</p>
  <footer>
    <a href="\${linkUrl}">Read more</a>
  </footer>
</article>\`;
}

console.log(generateCard("Learning Portal", "Master CS interviews today!", "banner.jpg", "https://portal.dev"));`,
        starterCodePy: `def generate_card(title, desc, img_url, link_url):
    return f"""<article class="card">
  <header>
    <h2>{title}</h2>
  </header>
  <img src="{img_url}" alt="{title}" />
  <p>{desc}</p>
  <footer>
    <a href="{link_url}">Read more</a>
  </footer>
</article>"""

print(generate_card("Learning Portal", "Master CS interviews today!", "banner.jpg", "https://portal.dev"))`,
        testCases: [
          { input: "title", expected: "<article class='card'>" }
        ],
        solutionExplanation: "Demonstrates standard semantic HTML hierarchy conforming to W3C guidelines."
      }
    ]
  },

  dsa: {
    id: "dsa",
    title: "Data Structures (DSA)",
    shortName: "Data Structures",
    badge: "📚 Core CS",
    iconName: "Boxes",
    color: "from-purple-600 to-indigo-800",
    summary: "Arrays, Linked Lists, Stacks, Queues, Binary Trees, Heaps, and Graph representations.",
    topics: ["Arrays & Dynamic Arrays", "Singly & Doubly Linked Lists", "Stacks (LIFO) & Queues (FIFO)", "Binary Trees & BSTs", "Heaps & Priority Queues", "Graph Adjacency Lists"],
    notesUrl: "https://www.geeksforgeeks.org/data-structures/",
    overviewNotes: [
      {
        heading: "1. What are Data Structures?",
        content: "A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory efficiently.",
        codeSnippet: "// Simple Singly Linked List Node\nclass ListNode {\n  constructor(val, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}"
      },
      {
        heading: "2. Linear vs. Non-Linear Structures",
        content: "• Linear: Elements arranged sequentially (Arrays, Linked Lists, Stacks, Queues).\n• Non-Linear: Hierarchical or interconnected relations (Trees, Graphs, Tries, Heaps)."
      }
    ],
    videos: [
      { id: "dsa-1", name: "Arrays & Linked Lists From Zero to Hero", channel: "NeetCode", url: "https://youtu.be/sVxBVvlnJsM", duration: "1h 10m", difficulty: "Beginner" },
      { id: "dsa-2", name: "Binary Trees & Graph Algorithms Overview", channel: "FreeCodeCamp", url: "https://youtu.be/0jMp7FZfVYk", duration: "2h 15m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "dsa-i-1",
        q: "What is the difference between an Array and a Linked List?",
        a: "- Array: Contiguous memory allocation, O(1) random access by index, expensive insertions/deletions (O(N)), fixed size.\n- Linked List: Non-contiguous nodes connected via pointers, O(N) access by index, O(1) insertion/deletion at known node, dynamic sizing.",
        category: "Linear"
      },
      {
        id: "dsa-i-2",
        q: "What is a Stack and where is it used?",
        a: "A Stack is a LIFO (Last-In, First-Out) linear structure supporting push, pop, and peek in O(1) time. Real-world uses: Call stack execution, undo/redo mechanisms, parenthetical balance validation, and DFS.",
        category: "Linear"
      },
      {
        id: "dsa-i-3",
        q: "What is a Binary Search Tree (BST)?",
        a: "A BST is a binary tree where for every node: all values in its left subtree are strictly less than the node, and all values in its right subtree are strictly greater. Inorder traversal yields sorted order.",
        category: "Trees"
      }
    ],
    coding: [
      {
        id: "dsa-c-1",
        title: "Reverse a Linked List",
        difficulty: "Medium",
        description: "Given the head of a singly linked list, reverse the list and return the new head.",
        hint: "Maintain three pointers: prev = null, curr = head, next = null. In loop: next = curr.next; curr.next = prev; prev = curr; curr = next.",
        starterCodeJS: `class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev;
}

// Helper to test
let list = new Node(1, new Node(2, new Node(3, new Node(4))));
let rev = reverseList(list);
let out = [];
while (rev) { out.push(rev.val); rev = rev.next; }
console.log("Reversed List:", out.join(" -> "));`,
        starterCodePy: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

head = Node(1, Node(2, Node(3, Node(4))))
rev = reverse_list(head)
out = []
while rev:
    out.append(rev.val)
    rev = rev.next
print("Reversed List:", " -> ".join(map(str, out)))`,
        testCases: [
          { input: "[1, 2, 3, 4]", expected: "[4, 3, 2, 1]" }
        ],
        solutionExplanation: "Iterates through the list in O(N) time with O(1) auxiliary space."
      }
    ]
  },

  algorithms: {
    id: "algorithms",
    title: "Algorithms & Complexity",
    shortName: "Algorithms",
    badge: "🔢 Logic & Math",
    iconName: "Calculator",
    color: "from-rose-600 to-pink-800",
    summary: "Time and space complexity (Big-O), Sorting, Searching, Greedy, and Dynamic Programming.",
    topics: ["Big-O Asymptotic Analysis", "QuickSort & MergeSort", "Binary Search", "Two Pointers & Sliding Window", "Greedy Approaches", "Dynamic Programming Basics"],
    notesUrl: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
    overviewNotes: [
      {
        heading: "1. Asymptotic Complexity (Big-O)",
        content: "Big-O notation describes the upper bound of execution time or memory space as input size N grows towards infinity.",
        codeSnippet: "// O(log N) Binary Search\nfunction binarySearch(arr, target) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    let m = Math.floor((l + r) / 2);\n    if (arr[m] === target) return m;\n    if (arr[m] < target) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n}"
      }
    ],
    videos: [
      { id: "algo-1", name: "15 Sorting Algorithms Visualized & Explained", channel: "Abdul Bari", url: "https://youtu.be/ZZuD6iUe3Pc", duration: "55m", difficulty: "Intermediate" },
      { id: "algo-2", name: "Dynamic Programming from Scratch", channel: "FreeCodeCamp", url: "https://youtu.be/oBt53YbR9Kk", duration: "5h 10m", difficulty: "Advanced" }
    ],
    interview: [
      {
        id: "algo-i-1",
        q: "What is Time and Space Complexity?",
        a: "- Time Complexity: Measures the rate of growth of operations as the input size N increases.\n- Space Complexity: Measures the auxiliary memory consumed by the algorithm beyond the inputs.",
        category: "Complexity"
      },
      {
        id: "algo-i-2",
        q: "When is Dynamic Programming (DP) applied?",
        a: "Dynamic Programming applies when a problem exhibits both:\n1. Overlapping Subproblems: Subproblems are computed repeatedly.\n2. Optimal Substructure: The optimal solution to the main problem can be constructed from optimal solutions of its subproblems.",
        category: "DP"
      }
    ],
    coding: [
      {
        id: "algo-c-1",
        title: "Binary Search",
        difficulty: "Easy",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found, else -1.",
        hint: "Maintain left and right boundaries. Middle is floor((left+right)/2). Narrow boundaries based on target comparison.",
        starterCodeJS: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log("Found 23 at index:", binarySearch(sorted, 23));
console.log("Found 99:", binarySearch(sorted, 99));`,
        starterCodePy: `def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1

sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Found 23 at index:", binary_search(sorted_arr, 23))
print("Found 99:", binary_search(sorted_arr, 99))`,
        testCases: [
          { input: "[2, 5, 8, 12, 23], 23", expected: "4" }
        ],
        solutionExplanation: "Halves the search space on each comparison, yielding O(log N) time complexity."
      }
    ]
  },

  os: {
    id: "os",
    title: "Operating Systems",
    shortName: "Operating Systems",
    badge: "🖥️ Kernel & Hardware",
    iconName: "HardDrive",
    color: "from-blue-700 to-indigo-900",
    summary: "Processes, Threads, CPU Scheduling, Deadlocks, Virtual Memory, and File Systems.",
    topics: ["Processes vs Threads", "CPU Scheduling (FCFS, SJF, Round Robin)", "Deadlocks & Banker's Algorithm", "Virtual Memory & Paging", "Page Replacement (FIFO, LRU)", "File Systems"],
    notesUrl: "https://www.geeksforgeeks.org/operating-systems/",
    overviewNotes: [
      {
        heading: "1. Operating System Fundamentals",
        content: "An OS acts as an intermediary between user applications and computer hardware, managing CPU, memory, storage devices, and I/O subsystems."
      },
      {
        heading: "2. Processes vs Threads",
        content: "• Process: An executing program instance with independent address space, file descriptors, and security context.\n• Thread: A lightweight unit of execution within a process sharing the same address space and memory."
      }
    ],
    videos: [
      { id: "os-1", name: "CPU Scheduling Algorithms Explained", channel: "Gate Smashers", url: "https://youtu.be/6A3uF0t6mQw", duration: "25m", difficulty: "Intermediate" },
      { id: "os-2", name: "Memory Management & Paging", channel: "Gate Smashers", url: "https://youtu.be/URoR9f6kXyU", duration: "30m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "os-i-1",
        q: "What is a Process and what are its states?",
        a: "A process is a program in execution. Typical states: New, Ready, Running, Waiting (Blocked), and Terminated.",
        category: "Processes"
      },
      {
        id: "os-i-2",
        q: "What is Deadlock and what are the 4 Coffman conditions?",
        a: "A deadlock occurs when a set of processes are permanently blocked because each holds a resource while waiting for another held by another process.\nThe 4 mandatory conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        category: "Concurrency"
      }
    ],
    coding: [
      {
        id: "os-c-1",
        title: "FIFO Page Replacement Simulation",
        difficulty: "Easy",
        description: "Calculate the number of page faults for a reference string using First-In-First-Out with K frames.",
        hint: "Use a queue or set of capacity K. If page not in frames, increment fault and evict oldest if full.",
        starterCodeJS: `function fifoPageFaults(pages, capacity) {
  const memory = [];
  let pageFaults = 0;

  for (const page of pages) {
    if (!memory.includes(page)) {
      if (memory.length === capacity) {
        memory.shift(); // Evict oldest
      }
      memory.push(page);
      pageFaults++;
    }
  }
  return pageFaults;
}

const pageStream = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
console.log("Total Page Faults (3 frames):", fifoPageFaults(pageStream, 3));`,
        starterCodePy: `def fifo_page_faults(pages, capacity):
    memory = []
    faults = 0
    for p in pages:
        if p not in memory:
            if len(memory) == capacity:
                memory.pop(0)
            memory.append(p)
            faults += 1
    return faults

print("Page Faults:", fifo_page_faults([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2], 3))`,
        testCases: [
          { input: "[7, 0, 1, 2, 0, 3], 3", expected: "6" }
        ],
        solutionExplanation: "Simulates memory frames using a FIFO eviction queue."
      }
    ]
  },

  networks: {
    id: "networks",
    title: "Computer Networks",
    shortName: "Computer Networks",
    badge: "🌐 OSI & TCP/IP",
    iconName: "Network",
    color: "from-cyan-700 to-sky-900",
    summary: "OSI 7-layer model, TCP/IP stack, IP addressing, DNS, HTTP/HTTPS, Routing, and Security.",
    topics: ["OSI vs TCP/IP Models", "IP Addressing & Subnetting", "TCP vs UDP Protocols", "DNS & HTTP/HTTPS Handshakes", "Routing Algorithms", "Network Security (TLS/Firewalls)"],
    notesUrl: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    overviewNotes: [
      {
        heading: "1. The 7 Layers of OSI",
        content: "1. Physical, 2. Data Link (MAC, framing), 3. Network (IP, routing), 4. Transport (TCP/UDP, reliability), 5. Session, 6. Presentation (encryption), 7. Application (HTTP, DNS)."
      }
    ],
    videos: [
      { id: "net-1", name: "OSI vs TCP/IP Model Full Breakdown", channel: "NetworkChuck", url: "https://youtu.be/2bXyq0v2tWw", duration: "28m", difficulty: "Beginner" },
      { id: "net-2", name: "Routing Protocols (OSPF, BGP, RIP)", channel: "David Bombal", url: "https://youtu.be/6sRUBFvV6J8", duration: "35m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "net-i-1",
        q: "What is the difference between TCP and UDP?",
        a: "- TCP (Transmission Control Protocol): Connection-oriented, guarantees packet delivery via 3-way handshake and acknowledgements, slower, supports flow/congestion control.\n- UDP (User Datagram Protocol): Connectionless, no delivery guarantees, lightweight, ultra-low latency, ideal for video streaming and gaming.",
        category: "Transport"
      },
      {
        id: "net-i-2",
        q: "What happens when you type a URL into a browser?",
        a: "1. DNS lookup (browser cache -> OS cache -> resolver -> authoritative servers) resolves domain to IP.\n2. TCP 3-way handshake (SYN, SYN-ACK, ACK) and TLS handshake.\n3. HTTP GET request dispatched.\n4. Server responds with HTML/CSS/JS payload.\n5. Browser engine parses DOM and renders layout.",
        category: "Web"
      }
    ],
    coding: [
      {
        id: "net-c-1",
        title: "Validate IPv4 Address",
        difficulty: "Easy",
        description: "Check if a given string represents a valid IPv4 address (4 octets between 0 and 255 without leading zeros).",
        hint: "Split by dot into 4 parts. Verify each part is numeric, 0 <= val <= 255, and no leading zeroes for numbers > 0.",
        starterCodeJS: `function isValidIPv4(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  for (const part of parts) {
    if (!/^\\d+$/.test(part)) return false;
    const num = Number(part);
    if (num < 0 || num > 255) return false;
    if (part.length > 1 && part.startsWith("0")) return false;
  }
  return true;
}

console.log("192.168.1.1:", isValidIPv4("192.168.1.1"));
console.log("256.100.0.1:", isValidIPv4("256.100.0.1"));
console.log("192.168.01.1:", isValidIPv4("192.168.01.1"));`,
        starterCodePy: `def is_valid_ipv4(ip):
    parts = ip.split(".")
    if len(parts) != 4:
        return False
    for p in parts:
        if not p.isdigit():
            return False
        num = int(p)
        if num < 0 or num > 255:
            return False
        if len(p) > 1 and p.startswith("0"):
            return False
    return True

print("192.168.1.1:", is_valid_ipv4("192.168.1.1"))
print("256.100.0.1:", is_valid_ipv4("256.100.0.1"))`,
        testCases: [
          { input: "'172.16.254.1'", expected: "true" }
        ],
        solutionExplanation: "Checks format and numerical boundaries in O(1) time."
      }
    ]
  },

  se: {
    id: "se",
    title: "Software Engineering & Architecture",
    shortName: "Software Engineering",
    badge: "⚙️ SDLC & Design",
    iconName: "Settings",
    color: "from-slate-700 to-zinc-900",
    summary: "Software Development Life Cycle (SDLC), Agile/Scrum, Design Patterns, SOLID Principles, and Testing.",
    topics: ["SDLC Methodologies (Waterfall, Agile, Scrum)", "SOLID Principles", "GoF Design Patterns (Singleton, Factory, Observer)", "Software Testing (Unit, Integration, E2E)", "CI/CD & DevOps"],
    notesUrl: "https://www.geeksforgeeks.org/software-engineering-introduction/",
    overviewNotes: [
      {
        heading: "1. The SOLID Principles",
        content: "• S - Single Responsibility Principle\n• O - Open/Closed Principle\n• L - Liskov Substitution Principle\n• I - Interface Segregation Principle\n• D - Dependency Inversion Principle"
      }
    ],
    videos: [
      { id: "se-1", name: "Agile vs Waterfall SDLC Explained", channel: "Fireship", url: "https://youtu.be/3bKuoH8Q2wQ", duration: "12m", difficulty: "Beginner" },
      { id: "se-2", name: "Design Patterns in Software Engineering", channel: "Fireship", url: "https://youtu.be/NU_1StN5Tkk", duration: "15m", difficulty: "Intermediate" }
    ],
    interview: [
      {
        id: "se-i-1",
        q: "What is SDLC?",
        a: "Software Development Life Cycle (SDLC) is the structured framework defining the stages of software creation: Requirements Analysis, System Design, Implementation (Coding), Testing, Deployment, and Maintenance.",
        category: "SDLC"
      },
      {
        id: "se-i-2",
        q: "What is the Singleton Pattern?",
        a: "A creational design pattern that guarantees a class has only one instance and provides a global access point to that instance (e.g. database connection pool, logger service).",
        category: "Patterns"
      }
    ],
    coding: [
      {
        id: "se-c-1",
        title: "Implement Thread-Safe Singleton Pattern",
        difficulty: "Easy",
        description: "Create a class where calling getInstance returns the exact same instance every time.",
        hint: "Check if the static instance property exists; if not, create it and store it.",
        starterCodeJS: `class DatabaseService {
  constructor() {
    if (DatabaseService.instance) {
      return DatabaseService.instance;
    }
    this.connectionId = Math.floor(Math.random() * 10000);
    DatabaseService.instance = this;
  }

  static getInstance() {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
}

const db1 = DatabaseService.getInstance();
const db2 = DatabaseService.getInstance();
console.log("Same Instance?:", db1 === db2);
console.log("Connection ID 1:", db1.connectionId);
console.log("Connection ID 2:", db2.connectionId);`,
        starterCodePy: `class DatabaseService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseService, cls).__new__(cls)
            cls._instance.connection_id = 42
        return cls._instance

db1 = DatabaseService()
db2 = DatabaseService()
print("Same Instance?:", db1 is db2)
print("Connection IDs:", db1.connection_id, db2.connection_id)`,
        testCases: [
          { input: "db1 === db2", expected: "true" }
        ],
        solutionExplanation: "Encapsulates instance creation to enforce a single shared global instance."
      }
    ]
  }
};

export const APTITUDE_DATA = {
  logical: [
    {
      title: "1. Number Series Tricks & Shortcuts",
      url: "https://www.youtube.com/results?search_query=CareerRide+Number+Series",
      channel: "CareerRide",
      keyConcept: "Identify arithmetic steps, geometric multiplication, alternating series, prime intervals, or square/cube offsets.",
      formula: "Tn = a + (n - 1)d  or  geometric Tn = a * r^(n-1)"
    },
    {
      title: "2. Syllogism Concepts & Venn Diagrams",
      url: "https://www.youtube.com/results?search_query=CareerRide+Syllogism",
      channel: "CareerRide",
      keyConcept: "Draw universal positive (All A are B), universal negative (No A is B), and particular (Some A are B) circles to test conclusions without assumptions.",
      formula: "Rules: 2 negatives give no conclusion. Particular premise implies particular conclusion."
    },
    {
      title: "3. Blood Relations Family Tree Decoding",
      url: "https://www.youtube.com/results?search_query=CareerRide+Blood+Relations",
      channel: "CareerRide",
      keyConcept: "Map generations vertically and siblings horizontally with gender symbols (+ for male, - for female).",
      formula: "Maternal = Mother's side, Paternal = Father's side"
    },
    {
      title: "4. Direction Sense & Pythagoras Applications",
      url: "https://www.youtube.com/results?search_query=CareerRide+Direction+Sense",
      channel: "CareerRide",
      keyConcept: "Cardinal directions: North, East, South, West. Right turn from North goes East. Use Hypotenuse² = Base² + Perpendicular².",
      formula: "Shortest Distance = √(Δx² + Δy²)"
    },
    {
      title: "5. Linear & Circular Seating Arrangement",
      url: "https://www.youtube.com/results?search_query=CareerRide+Seating+Arrangement",
      channel: "CareerRide",
      keyConcept: "In circular tables facing center: Left is clockwise, Right is counter-clockwise. Fill fixed absolute positions first.",
      formula: "Number of arrangements of n items in circle = (n - 1)!"
    }
  ],
  quantitative: [
    {
      title: "Percentages Formulas & Shortcuts",
      url: "https://www.youtube.com/results?search_query=CareerRide+Percentages+Aptitude",
      channel: "CareerRide",
      keyConcept: "Percentage change = (Difference / Original Value) * 100. Successive percentage change = x + y + (xy / 100).",
      formula: "Value = (P / 100) * Total"
    },
    {
      title: "Profit & Loss, Discount, Marked Price",
      url: "https://www.youtube.com/results?search_query=CareerRide+Profit+and+Loss",
      channel: "CareerRide",
      keyConcept: "Profit = SP - CP. Profit % = (Profit / CP) * 100. Loss % = (Loss / CP) * 100.",
      formula: "SP = CP * (100 + Gain%) / 100"
    },
    {
      title: "Time & Work (Unitary & LCM Methods)",
      url: "https://www.youtube.com/results?search_query=CareerRide+Time+and+Work",
      channel: "CareerRide",
      keyConcept: "If A finishes work in X days, 1 day work is 1/X. Use LCM of individual days as total work units.",
      formula: "Total Work = Efficiency * Time"
    },
    {
      title: "Time, Speed & Distance, Relative Velocity",
      url: "https://www.youtube.com/results?search_query=CareerRide+Time+Speed+Distance",
      channel: "CareerRide",
      keyConcept: "Convert km/h to m/s by multiplying with 5/18. Same direction relative speed = S1 - S2; Opposite = S1 + S2.",
      formula: "Speed = Distance / Time; Average Speed = 2xy / (x + y)"
    },
    {
      title: "Ratio, Proportion & Variations",
      url: "https://www.youtube.com/results?search_query=CareerRide+Ratio+and+Proportion",
      channel: "CareerRide",
      keyConcept: "If a:b = c:d, then ad = bc (Product of extremes = Product of means).",
      formula: "Duplicate ratio of a:b = a²:b²"
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: "What is 20% of 250?",
      options: ["40", "50", "60", "70"],
      correctAnswer: 1,
      explanation: "20% of 250 = (20 / 100) * 250 = 0.2 * 250 = 50.",
      topic: "Percentages"
    },
    {
      id: 2,
      question: "If the cost price is ₹500 and the selling price is ₹600, what is the profit percentage?",
      options: ["10%", "15%", "20%", "25%"],
      correctAnswer: 2,
      explanation: "Profit = Selling Price - Cost Price = 600 - 500 = ₹100. Profit % = (100 / 500) * 100 = 20%.",
      topic: "Profit & Loss"
    },
    {
      id: 3,
      question: "A train travels 120 km in 2 hours. What is its average speed in km/h?",
      options: ["50 km/h", "55 km/h", "60 km/h", "70 km/h"],
      correctAnswer: 2,
      explanation: "Speed = Distance / Time = 120 km / 2 h = 60 km/h.",
      topic: "Speed & Distance"
    },
    {
      id: 4,
      question: "If person A completes a full work in 10 days, what fraction of work does A complete in one day?",
      options: ["1/5", "1/10", "1/15", "1/20"],
      correctAnswer: 1,
      explanation: "Work per day = 1 / Total days = 1 / 10.",
      topic: "Time & Work"
    },
    {
      id: 5,
      question: "Find the simplest ratio of 20 : 40.",
      options: ["1:2", "2:1", "3:2", "4:5"],
      correctAnswer: 0,
      explanation: "Divide both sides by the greatest common divisor 20: 20/20 = 1, 40/20 = 2. Result is 1:2.",
      topic: "Ratios"
    },
    {
      id: 6,
      question: "What is 25% of 80?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 1,
      explanation: "25% = 1/4. (1/4) * 80 = 20.",
      topic: "Percentages"
    },
    {
      id: 7,
      question: "The arithmetic average of 10, 20, and 30 is:",
      options: ["10", "20", "30", "40"],
      correctAnswer: 1,
      explanation: "Average = (10 + 20 + 30) / 3 = 60 / 3 = 20.",
      topic: "Averages"
    },
    {
      id: 8,
      question: "What is the square of 15 (15²)?",
      options: ["200", "210", "225", "250"],
      correctAnswer: 2,
      explanation: "15 * 15 = 225. Shortcut for numbers ending in 5: (1 * (1 + 1)) concatenate 25 = 225.",
      topic: "Mental Math"
    },
    {
      id: 9,
      question: "What is the simple interest on ₹1000 at 10% annual interest rate for 2 years?",
      options: ["₹100", "₹150", "₹200", "₹250"],
      correctAnswer: 2,
      explanation: "Simple Interest = (P * R * T) / 100 = (1000 * 10 * 2) / 100 = ₹200.",
      topic: "Interest"
    },
    {
      id: 10,
      question: "What is 30% of 300?",
      options: ["60", "75", "90", "120"],
      correctAnswer: 2,
      explanation: "30% of 300 = (30 / 100) * 300 = 30 * 3 = 90.",
      topic: "Percentages"
    },
    {
      id: 11,
      question: "Find the next number in the series: 2, 6, 12, 20, 30, ___?",
      options: ["36", "40", "42", "48"],
      correctAnswer: 2,
      explanation: "Differences: +4, +6, +8, +10, so next difference is +12. 30 + 12 = 42. (Alternatively n * (n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42).",
      topic: "Number Series"
    },
    {
      id: 12,
      question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
      options: ["Mother", "Sister", "Grandmother", "Aunt"],
      correctAnswer: 0,
      explanation: "'Only daughter of my mother' is the woman herself. Therefore, she is the mother of the man.",
      topic: "Blood Relations"
    }
  ]
};

export const HR_INTERVIEW_DATA: HRQuestion[] = [
  {
    id: 1,
    question: "Tell me about yourself.",
    answer: "My name is [Your Name]. I am pursuing my B.Tech in Computer Science Engineering. I have built foundational knowledge in Python, Java, C, DBMS, and web technologies through academic projects and coding labs. I consider myself a quick learner, disciplined, and eager to apply my problem-solving skills to real-world IT challenges.",
    interviewerIntent: "Assesses communication skills, confidence, structured thinking, and alignment with the role.",
    tips: ["Follow Present -> Past -> Future structure.", "Keep it under 90 seconds.", "Focus on technical competence and passion for the industry."]
  },
  {
    id: 2,
    question: "Why do you want to join our company?",
    answer: "I want to join your company because it offers an inspiring learning environment, robust mentorship for fresh graduates, and the opportunity to work on scalable, impactful projects that touch thousands of users.",
    interviewerIntent: "Checks if you researched the company and have genuine enthusiasm rather than applying blindly.",
    tips: ["Mention company values, recent products, or reputation in training fresh talent."]
  },
  {
    id: 3,
    question: "Why should we hire you?",
    answer: "I bring a solid grounding in core computer science subjects, hands-on programming practice, and a proactive attitude towards learning new tech stacks. I am reliable, adapt quickly to team workflows, and am committed to adding value from day one.",
    interviewerIntent: "Tests self-awareness, unique value proposition, and cultural fit.",
    tips: ["Highlight technical readiness combined with enthusiasm to learn and collaborate."]
  },
  {
    id: 4,
    question: "What are your strengths?",
    answer: "My key strengths are rapid learning agility, analytical problem solving, positive adaptability, and clear communication within teams.",
    interviewerIntent: "Evaluating if your strengths match the competencies required for software engineering.",
    tips: ["Back up every strength with a quick example (e.g. debugging a tough project on deadline)."]
  },
  {
    id: 5,
    question: "What are your weaknesses?",
    answer: "Earlier, I used to spend extra time attempting to make every minor detail perfect. I realized this could impact delivery schedules, so I now prioritize tasks using time-boxing and minimum viable milestones.",
    interviewerIntent: "Checks for honesty, humility, and proactive self-improvement.",
    tips: ["Never say 'I have no weakness' or 'I work too hard'. Share a real weakness and your system for managing it."]
  },
  {
    id: 6,
    question: "Where do you see yourself in 5 years?",
    answer: "In 5 years, I envision myself as a senior software engineer who has mastered core architectural systems, mentoring junior team members, and taking ownership of key feature releases.",
    interviewerIntent: "Tests commitment, ambition, and career longevity.",
    tips: ["Show commitment to continuous technical growth and taking on leadership responsibilities."]
  },
  {
    id: 7,
    question: "What are your career goals?",
    answer: "In the short term, my goal is to gain hands-on production experience and become proficient in modern cloud and software frameworks. Long term, I aim to lead technical initiatives and architect reliable software solutions.",
    interviewerIntent: "Verifies if your personal roadmap aligns with the company's trajectory.",
    tips: ["Separate into clear Short-Term and Long-Term goals."]
  },
  {
    id: 8,
    question: "Are you willing to relocate or work in rotational shifts?",
    answer: "Yes, I am fully open to relocating and flexible with shifts based on business and client requirements. At this stage of my career, learning and contribution are my top priorities.",
    interviewerIntent: "Evaluates logistical availability and flexibility.",
    tips: ["Be clear and honest; flexibility is highly valued in IT services and enterprise firms."]
  },
  {
    id: 9,
    question: "Can you work under pressure and tight deadlines?",
    answer: "Yes. When facing tight deadlines, I remain calm, break the problem into smaller milestones, prioritize high-impact components, and communicate transparently with my team to deliver on time.",
    interviewerIntent: "Assesses emotional resilience, stress management, and pragmatic prioritization.",
    tips: ["Cite a stressful exam or project deadline where structured planning helped you deliver."]
  },
  {
    id: 10,
    question: "What motivates you?",
    answer: "I am driven by the feeling of solving a challenging bug, mastering a new framework, and seeing software I wrote actually work and help someone accomplish their goals.",
    interviewerIntent: "Determines internal drive and passion for computer science.",
    tips: ["Tie motivation to craftsmanship, solving problems, and tangible outcomes."]
  },
  {
    id: 11,
    question: "What are your hobbies outside of academics?",
    answer: "Outside of coding, I enjoy photography, which trains my attention to detail; traveling to discover new cultures; listening to music; and watching educational tech documentaries.",
    interviewerIntent: "Checks for work-life balance, creativity, and a well-rounded personality.",
    tips: ["Be genuine; hobbies reflect creativity, focus, and curiosity."]
  },
  {
    id: 12,
    question: "Describe yourself in three words.",
    answer: "Hardworking, Honest, and Adaptable.",
    interviewerIntent: "Tests conciseness and key character traits.",
    tips: ["Pick three strong words and be ready to justify each in one sentence."]
  },
  {
    id: 13,
    question: "What do you know about our company?",
    answer: "I know that your company is a leading technology organization recognized for high-quality engineering solutions, customer satisfaction, and a culture that actively fosters career progression and skill development.",
    interviewerIntent: "Verifies if you did basic homework on the organization before the interview.",
    tips: ["Add specific facts like company products, recent milestones, or industry awards."]
  },
  {
    id: 14,
    question: "What is your greatest achievement so far?",
    answer: "One of my proudest achievements was successfully completing my engineering capstone project on schedule while maintaining top grades, which required disciplined time management and team coordination.",
    interviewerIntent: "Tests pride in accomplishment, dedication, and teamwork.",
    tips: ["Highlight obstacles overcome and the measurable outcome."]
  },
  {
    id: 15,
    question: "How do you handle failure or negative feedback?",
    answer: "I view feedback as a constructive learning opportunity. I listen without being defensive, analyze where I fell short, make a corrective plan, and implement the learnings so I do not repeat the same mistake.",
    interviewerIntent: "Checks coachability, emotional maturity, and growth mindset.",
    tips: ["Emphasize how feedback helped you improve your subsequent work."]
  },
  {
    id: 16,
    question: "What are your salary expectations?",
    answer: "As a fresh graduate, my primary objective is to learn, develop my skills, and build a strong career foundation. I am confident that the company offers competitive, industry-standard compensation for this role.",
    interviewerIntent: "Determines market awareness and whether expectations are within budget.",
    tips: ["For freshers, focus on standard industry pay and learning growth."]
  },
  {
    id: 17,
    question: "Are you a team player? Give an example.",
    answer: "Yes, absolutely. During our university hackathon and lab projects, I collaborated closely with my peers, shared code reviews, and helped teammates overcome blockers so our entire group succeeded.",
    interviewerIntent: "Measures empathy, collaboration, and readiness for agile development teams.",
    tips: ["Software is built by teams; show that you listen and support colleagues."]
  },
  {
    id: 18,
    question: "How do you manage your time and prioritize tasks?",
    answer: "I use the Eisenhower matrix: differentiating between urgent and important tasks. I keep a daily priority checklist, set focused time blocks, and eliminate distractions during core study or development hours.",
    interviewerIntent: "Evaluates organizational habits and autonomy.",
    tips: ["Mention modern tools or methods like Kanban boards, to-do lists, or Pomodoro."]
  },
  {
    id: 19,
    question: "Do you have any questions for us?",
    answer: "Yes, thank you! I would love to know:\n1. What technology stacks will freshers primarily work on?\n2. What does the onboarding and training process look like for this role?\n3. What qualities do the most successful engineers on your team exhibit?",
    interviewerIntent: "A critical test! Asking thoughtful questions demonstrates interest, curiosity, and strategic thinking.",
    tips: ["Always ask 2-3 genuine questions; never say 'No, I have no questions'."]
  },
  {
    id: 20,
    question: "Why do you want to work in the IT industry specifically?",
    answer: "The IT industry provides the unique opportunity to build solutions that scale globally and impact millions of lives. Technology evolves rapidly, which satisfies my passion for lifelong learning and problem-solving.",
    interviewerIntent: "Checks long-term passion and intrinsic motivation for software engineering.",
    tips: ["Connect your personal curiosity for tech with the real-world utility of software."]
  }
];
