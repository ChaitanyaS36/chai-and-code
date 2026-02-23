// 14-Day C++ DSA Learning Plan Data
export const learningPlan = [
  {
    day: 1,
    title: "Syntax Repair - Part 1",
    focus: "Stop silly errors, regain confidence",
    topics: ["input / output", "if–else", "loops", "functions"],
    problems: [
      {
        id: 1,
        title: "Max of 2 Numbers",
        description: "Write a program to find the maximum of two numbers.",
        difficulty: "Easy",
        hints: ["Use if-else statement", "Compare the two numbers"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // Your code here
    
    return 0;
}`
      },
      {
        id: 2,
        title: "Even / Odd",
        description: "Check if a number is even or odd.",
        difficulty: "Easy",
        hints: ["Use modulo operator %", "If n % 2 == 0, it's even"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      },
      {
        id: 3,
        title: "Sum of N Numbers",
        description: "Calculate the sum of first N natural numbers.",
        difficulty: "Easy",
        hints: ["Use a loop", "Initialize sum = 0", "Add each number to sum"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 2,
    title: "Syntax Repair - Part 2",
    focus: "Write code without syntax fear",
    topics: ["functions", "factorial", "prime check"],
    problems: [
      {
        id: 4,
        title: "Factorial",
        description: "Calculate factorial of a number N.",
        difficulty: "Easy",
        hints: ["Use a loop", "Initialize result = 1", "Multiply from 1 to N"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      },
      {
        id: 5,
        title: "Prime Check",
        description: "Check if a number is prime.",
        difficulty: "Medium",
        hints: ["Prime numbers are > 1", "Check divisibility from 2 to sqrt(n)", "If any divisor found, not prime"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 3,
    title: "Arrays - Part 1",
    focus: "Index handling + loops",
    topics: ["arrays", "indexing", "loops"],
    problems: [
      {
        id: 6,
        title: "Sum of Array",
        description: "Find the sum of all elements in an array.",
        difficulty: "Easy",
        hints: ["Use a loop", "Access elements using arr[i]", "Add each element to sum"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 7,
        title: "Largest Element",
        description: "Find the largest element in an array.",
        difficulty: "Easy",
        hints: ["Initialize max with first element", "Compare with all other elements", "Update max if larger found"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 4,
    title: "Vectors",
    focus: "STL vectors and operations",
    topics: ["vector", "push_back", "size"],
    problems: [
      {
        id: 8,
        title: "Reverse Array",
        description: "Reverse an array using vectors.",
        difficulty: "Easy",
        hints: ["Use vector<int>", "Swap elements from start and end", "Use two pointers"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 9,
        title: "Linear Search",
        description: "Search for an element in an array.",
        difficulty: "Easy",
        hints: ["Loop through array", "Compare each element with target", "Return index if found"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 10,
        title: "Count Frequency",
        description: "Count frequency of each element in array.",
        difficulty: "Medium",
        hints: ["Use a map or frequency array", "Increment count for each element"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 5,
    title: "Strings - Part 1",
    focus: "Character handling",
    topics: ["strings", "getline", "length"],
    problems: [
      {
        id: 11,
        title: "Reverse String",
        description: "Reverse a given string.",
        difficulty: "Easy",
        hints: ["Use two pointers", "Swap characters from start and end", "Or use reverse() function"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Your code here
    
    return 0;
}`
      },
      {
        id: 12,
        title: "Count Vowels",
        description: "Count the number of vowels in a string.",
        difficulty: "Easy",
        hints: ["Check each character", "Vowels: a, e, i, o, u (both cases)", "Use tolower() for case-insensitive"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 6,
    title: "Strings - Part 2",
    focus: "String operations",
    topics: ["palindrome", "string manipulation"],
    problems: [
      {
        id: 13,
        title: "Palindrome Check",
        description: "Check if a string is a palindrome.",
        difficulty: "Easy",
        hints: ["Compare characters from start and end", "Ignore case if needed", "Use two pointers"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Your code here
    
    return 0;
}`
      },
      {
        id: 14,
        title: "Remove Spaces",
        description: "Remove all spaces from a string.",
        difficulty: "Easy",
        hints: ["Loop through string", "Build new string without spaces", "Or use erase() function"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 7,
    title: "Recursion Basics",
    focus: "Base case + self-call",
    topics: ["recursion", "base case", "recursive call"],
    problems: [
      {
        id: 15,
        title: "Factorial (Recursive)",
        description: "Calculate factorial using recursion.",
        difficulty: "Medium",
        hints: ["Base case: if n <= 1, return 1", "Recursive: return n * factorial(n-1)"],
        template: `#include <bits/stdc++.h>
using namespace std;

// Your recursive function here

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      },
      {
        id: 16,
        title: "Sum of Digits",
        description: "Find sum of digits of a number using recursion.",
        difficulty: "Medium",
        hints: ["Base case: if n == 0, return 0", "Recursive: return (n % 10) + sumOfDigits(n / 10)"],
        template: `#include <bits/stdc++.h>
using namespace std;

// Your recursive function here

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      },
      {
        id: 17,
        title: "Print 1 to N",
        description: "Print numbers from 1 to N using recursion.",
        difficulty: "Medium",
        hints: ["Base case: if n == 0, return", "Recursive: print 1 to n-1, then print n"],
        template: `#include <bits/stdc++.h>
using namespace std;

// Your recursive function here

int main() {
    int n;
    cin >> n;
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 8,
    title: "Sorting & Searching - Part 1",
    focus: "Binary search implementation",
    topics: ["binary search", "sorted arrays"],
    problems: [
      {
        id: 18,
        title: "Binary Search",
        description: "Implement binary search on a sorted array.",
        difficulty: "Medium",
        hints: ["Use two pointers: left and right", "Calculate mid = (left + right) / 2", "Adjust pointers based on comparison"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 9,
    title: "Sorting & Searching - Part 2",
    focus: "Sorting algorithms",
    topics: ["bubble sort", "selection sort", "STL sort"],
    problems: [
      {
        id: 19,
        title: "Bubble Sort",
        description: "Implement bubble sort algorithm.",
        difficulty: "Medium",
        hints: ["Use nested loops", "Compare adjacent elements", "Swap if out of order"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 20,
        title: "Selection Sort",
        description: "Implement selection sort algorithm.",
        difficulty: "Medium",
        hints: ["Find minimum element", "Swap with current position", "Repeat for each position"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 10,
    title: "DSA Pattern Problems - Part 1",
    focus: "Convert idea → loops → code",
    topics: ["patterns", "problem solving"],
    problems: [
      {
        id: 21,
        title: "Second Largest",
        description: "Find the second largest element in an array.",
        difficulty: "Medium",
        hints: ["Find largest first", "Then find largest excluding the first largest", "Or use two variables"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 22,
        title: "Move Zeros",
        description: "Move all zeros to the end of array while maintaining relative order of non-zeros.",
        difficulty: "Medium",
        hints: ["Use two pointers", "One for current position, one for non-zero position", "Swap when needed"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 11,
    title: "DSA Pattern Problems - Part 2",
    focus: "Advanced patterns",
    topics: ["prefix sum", "two sum", "frequency array"],
    problems: [
      {
        id: 23,
        title: "Prefix Sum",
        description: "Calculate prefix sum array.",
        difficulty: "Easy",
        hints: ["First element is same", "Each element = previous prefix + current element"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 24,
        title: "Two Sum",
        description: "Find two numbers that add up to target.",
        difficulty: "Medium",
        hints: ["Use nested loops", "Or use hash map for O(n) solution", "Check if target - current exists"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      },
      {
        id: 25,
        title: "Frequency Array",
        description: "Create frequency array for given numbers.",
        difficulty: "Easy",
        hints: ["Use map or array", "Increment count for each number"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 12,
    title: "Class-Level Practice - Part 1",
    focus: "Try → fail → fix (confidence building)",
    topics: ["problem solving", "error handling"],
    problems: [
      {
        id: 26,
        title: "Practice Problem 1",
        description: "Solve class problems independently. Try first, then fix errors.",
        difficulty: "Varies",
        hints: ["Read compiler errors carefully", "Fix one error at a time", "Don't rewrite whole code"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 13,
    title: "Class-Level Practice - Part 2",
    focus: "Independent problem solving",
    topics: ["confidence", "error handling"],
    problems: [
      {
        id: 27,
        title: "Practice Problem 2",
        description: "Continue solving class problems. Build confidence through practice.",
        difficulty: "Varies",
        hints: ["Practice makes perfect", "Learn from mistakes", "Keep trying"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    
    return 0;
}`
      }
    ]
  },
  {
    day: 14,
    title: "Confidence Day",
    focus: "Redo failed problems without help",
    topics: ["review", "confidence"],
    problems: [
      {
        id: 28,
        title: "Review Problem 1",
        description: "Redo a problem you failed earlier. Solve it independently.",
        difficulty: "Varies",
        hints: ["You can do it!", "Remember what you learned", "Take it step by step"],
        template: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    
    return 0;
}`
      }
    ]
  }
];

// Get problems for a specific day
export const getProblemsForDay = (day) => {
  const dayData = learningPlan.find(d => d.day === day);
  return dayData ? dayData.problems : [];
};

// Get day data
export const getDayData = (day) => {
  return learningPlan.find(d => d.day === day) || null;
};
