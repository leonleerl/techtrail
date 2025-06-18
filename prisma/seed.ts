import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.post.deleteMany({})
  await prisma.category.deleteMany({})

  console.log('Deleted existing posts and categories')
  
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Technology',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Web Development',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Data Science',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Programming',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Mobile Development',
      },
    }),
  ])

  console.log('Created categories:', categories)

  // Create posts
  const posts = await Promise.all([
    // Technology posts
    prisma.post.create({
      data: {
        title: 'The Future of Artificial Intelligence',
        slug: 'future-of-ai',
        description: 'Exploring the latest trends and future possibilities of AI technology across various industries.',
        content: `# The Future of Artificial Intelligence

Artificial Intelligence is rapidly evolving, transforming industries and reshaping how we interact with technology. In this comprehensive analysis, we explore the latest trends and what the future holds for AI technologies across various sectors.

## Current State of AI

Today's AI landscape is dominated by machine learning algorithms, neural networks, and deep learning systems that can process vast amounts of data with unprecedented accuracy.

### Key Areas of Development

- **Natural Language Processing**: AI systems are becoming increasingly sophisticated in understanding and generating human language
- **Computer Vision**: Advanced image recognition and processing capabilities
- **Autonomous Systems**: Self-driving cars, drones, and robotics
- **Predictive Analytics**: AI-powered forecasting and decision-making tools

## Future Implications

The next decade promises even more revolutionary changes as AI becomes more integrated into our daily lives, from healthcare diagnostics to financial services and beyond.`,
        published: true,
        views: 1240,
        categoryId: categories[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Understanding Quantum Computing',
        slug: 'quantum-computing-explained',
        description: 'A comprehensive guide to quantum computing concepts and their practical applications.',
        content: `# Understanding Quantum Computing

Quantum computing represents a paradigm shift in computational power, offering the potential to solve complex problems that are intractable for classical computers.

## What is Quantum Computing?

Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously through a phenomenon called superposition.

### Key Principles

1. **Superposition**: Qubits can be in multiple states at once
2. **Entanglement**: Qubits can be correlated in ways that classical physics cannot explain
3. **Interference**: Quantum states can amplify correct answers and cancel out wrong ones

## Applications

- Cryptography and security
- Drug discovery and molecular modeling
- Financial modeling and optimization
- Weather prediction and climate modeling

The future of quantum computing holds immense promise for solving humanity's most complex challenges.`,
        published: true,
        views: 895,
        categoryId: categories[0].id,
      },
    }),
    
    // Web Development posts
    prisma.post.create({
      data: {
        title: 'React vs Angular: Which Framework to Choose in 2023',
        slug: 'react-vs-angular-2023',
        description: 'An in-depth comparison of React and Angular frameworks covering performance, ecosystem, and career prospects.',
        content: `# React vs Angular: Which Framework to Choose in 2023

Both React and Angular continue to dominate the frontend development space. This comprehensive comparison will help you make an informed decision.

## React: The Library Approach

React, developed by Facebook, is a JavaScript library focused on building user interfaces with a component-based architecture.

### Pros:
- **Flexibility**: More freedom in choosing tools and libraries
- **Learning Curve**: Easier to get started with
- **Job Market**: High demand for React developers
- **Performance**: Virtual DOM provides excellent performance

### Cons:
- **Decision Fatigue**: Too many choices can be overwhelming
- **Rapid Changes**: Frequent updates and changes in ecosystem

## Angular: The Full Framework

Angular, maintained by Google, is a complete framework that provides everything needed for large-scale applications.

### Pros:
- **Complete Solution**: Built-in routing, forms, HTTP client
- **TypeScript**: First-class TypeScript support
- **Enterprise Ready**: Great for large, complex applications
- **Consistency**: Opinionated structure ensures consistency

### Cons:
- **Complexity**: Steeper learning curve
- **Verbosity**: More boilerplate code required

## Conclusion

Choose React for flexibility and faster development cycles. Choose Angular for enterprise applications requiring structure and consistency.`,
        published: true,
        views: 2380,
        categoryId: categories[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Scalable APIs with Node.js',
        slug: 'scalable-nodejs-apis',
        description: 'Best practices and architectural patterns for creating high-performance Node.js APIs.',
        content: `# Building Scalable APIs with Node.js

Creating maintainable and high-performance APIs is crucial for modern web applications. This guide covers essential patterns and practices.

## Architecture Patterns

### 1. Layered Architecture
- **Controller Layer**: Handle HTTP requests and responses
- **Service Layer**: Business logic and validation
- **Data Layer**: Database operations and data access

### 2. Middleware Pattern
\`\`\`javascript
app.use(express.json());
app.use(cors());
app.use(helmet());
\`\`\`

## Best Practices

### Error Handling
Always implement centralized error handling:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
\`\`\`

### Input Validation
Use libraries like Joi or express-validator:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/users', 
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
\`\`\`

## Performance Optimization

- Use connection pooling for databases
- Implement caching strategies (Redis)
- Use compression middleware
- Implement rate limiting

Following these patterns will help you build robust, scalable APIs that can handle production workloads.`,
        published: true,
        views: 1678,
        categoryId: categories[1].id,
      },
    }),
    
    // Data Science posts
    prisma.post.create({
      data: {
        title: 'Introduction to Natural Language Processing',
        slug: 'intro-to-nlp',
        description: 'A beginner-friendly guide to NLP concepts and practical applications in modern AI systems.',
        content: `# Introduction to Natural Language Processing

Natural Language Processing (NLP) is transforming how computers understand and interact with human language, enabling breakthrough applications in AI.

## What is NLP?

NLP combines computational linguistics with machine learning to help computers process and analyze large amounts of natural language data.

## Core Components

### 1. Tokenization
Breaking text into individual words or tokens:
\`\`\`python
import nltk
tokens = nltk.word_tokenize("Hello world!")
print(tokens)  # ['Hello', 'world', '!']
\`\`\`

### 2. Part-of-Speech Tagging
Identifying grammatical roles of words:
\`\`\`python
import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp("The cat sat on the mat")
for token in doc:
    print(token.text, token.pos_)
\`\`\`

## Applications

- **Sentiment Analysis**: Understanding emotions in text
- **Machine Translation**: Google Translate, DeepL
- **Chatbots**: Customer service automation
- **Information Extraction**: Extracting structured data from text
- **Text Summarization**: Automatic document summarization

## Getting Started

Popular NLP libraries include:
- **NLTK**: Natural Language Toolkit for Python
- **spaCy**: Industrial-strength NLP
- **Transformers**: Hugging Face's transformer models
- **TextBlob**: Simplified text processing

NLP is an exciting field with endless possibilities for innovation and practical applications.`,
        published: true,
        views: 1125,
        categoryId: categories[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Machine Learning for Beginners',
        slug: 'ml-for-beginners',
        description: 'A comprehensive introduction to machine learning algorithms with hands-on examples and practical guidance.',
        content: `# Machine Learning for Beginners

Starting your journey with machine learning? This comprehensive guide covers fundamental algorithms and provides hands-on examples to get you started.

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed.

## Types of Machine Learning

### 1. Supervised Learning
Learning from labeled data to make predictions:
- **Classification**: Predicting categories (spam/not spam)
- **Regression**: Predicting continuous values (house prices)

### 2. Unsupervised Learning
Finding patterns in unlabeled data:
- **Clustering**: Grouping similar data points
- **Dimensionality Reduction**: Simplifying complex data

### 3. Reinforcement Learning
Learning through interaction and feedback:
- Game playing (AlphaGo)
- Autonomous vehicles
- Recommendation systems

## Popular Algorithms

### Linear Regression
\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
\`\`\`

### Decision Trees
Great for beginners due to their interpretability:
\`\`\`python
from sklearn.tree import DecisionTreeClassifier

clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)
accuracy = clf.score(X_test, y_test)
\`\`\`

## Getting Started

1. **Learn Python**: Essential for ML development
2. **Understand Statistics**: Foundation for ML concepts
3. **Practice with Datasets**: Kaggle, UCI ML Repository
4. **Use Libraries**: scikit-learn, pandas, numpy
5. **Build Projects**: Apply knowledge to real problems

Remember: Machine learning is about solving problems, not just algorithms. Focus on understanding the problem before choosing the solution.`,
        published: false,
        views: 0,
        categoryId: categories[2].id,
      },
    }),
    
    // Programming posts
    prisma.post.create({
      data: {
        title: 'Mastering TypeScript: Advanced Techniques',
        slug: 'advanced-typescript',
        description: 'Advanced TypeScript patterns, type manipulation, and architectural strategies for enterprise applications.',
        content: `# Mastering TypeScript: Advanced Techniques

Take your TypeScript skills to the next level with advanced type manipulation, decorators, and architectural patterns for large-scale applications.

## Advanced Type Patterns

### 1. Conditional Types
Create types that depend on conditions:
\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type DataResponse = ApiResponse<User>;     // { data: User }
\`\`\`

### 2. Mapped Types
Transform existing types:
\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
\`\`\`

### 3. Template Literal Types
Create string patterns:
\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type MouseEvent = EventName<'click'>; // 'onClick'
\`\`\`

## Decorators

### Class Decorators
\`\`\`typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
  
  constructor(t: string) {
    this.title = t;
  }
}
\`\`\`

### Method Decorators
\`\`\`typescript
function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyName} with\`, args);
    return method.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}
\`\`\`

## Architecture Patterns

### 1. Dependency Injection
\`\`\`typescript
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

class UserService {
  constructor(private logger: Logger) {}
  
  createUser(name: string) {
    this.logger.log(\`Creating user: \${name}\`);
    // Create user logic
  }
}
\`\`\`

### 2. Generic Repository Pattern
\`\`\`typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // Implementation
  }
  
  async save(user: User): Promise<User> {
    // Implementation
  }
  
  async delete(id: string): Promise<void> {
    // Implementation
  }
}
\`\`\`

## Best Practices

1. **Use strict mode**: Enable all strict compiler options
2. **Prefer composition over inheritance**
3. **Use utility types**: Leverage built-in utility types
4. **Type guards**: Create custom type guards for runtime safety
5. **Modular architecture**: Organize code into modules and namespaces

TypeScript's advanced features enable you to build robust, maintainable applications with excellent developer experience.`,
        published: true,
        views: 1820,
        categoryId: categories[3].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Clean Code Principles Every Developer Should Know',
        slug: 'clean-code-principles',
        description: 'Essential principles and practices for writing maintainable, readable, and professional code.',
        content: `# Clean Code Principles Every Developer Should Know

Writing clean, maintainable code is an essential skill that separates professional developers from beginners. These timeless principles will transform your codebase.

## Core Principles

### 1. Meaningful Names
Choose names that reveal intent:

**Bad:**
\`\`\`javascript
const d = new Date();
const u = users.filter(x => x.a > 18);
\`\`\`

**Good:**
\`\`\`javascript
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
\`\`\`

### 2. Functions Should Do One Thing
Keep functions small and focused:

**Bad:**
\`\`\`javascript
function processUser(user) {
  // Validate user
  if (!user.email || !user.name) {
    throw new Error('Invalid user');
  }
  
  // Save to database
  database.save(user);
  
  // Send email
  emailService.sendWelcome(user.email);
  
  // Log activity
  logger.log(\`User \${user.name} processed\`);
}
\`\`\`

**Good:**
\`\`\`javascript
function validateUser(user) {
  if (!user.email || !user.name) {
    throw new Error('Invalid user');
  }
}

function saveUser(user) {
  return database.save(user);
}

function sendWelcomeEmail(user) {
  return emailService.sendWelcome(user.email);
}

function logUserActivity(user) {
  logger.log(\`User \${user.name} processed\`);
}

function processUser(user) {
  validateUser(user);
  saveUser(user);
  sendWelcomeEmail(user);
  logUserActivity(user);
}
\`\`\`

### 3. Don't Repeat Yourself (DRY)
Eliminate code duplication:

**Bad:**
\`\`\`javascript
function calculateTaxForEmployee(salary) {
  return salary * 0.2;
}

function calculateTaxForContractor(payment) {
  return payment * 0.2;
}
\`\`\`

**Good:**
\`\`\`javascript
function calculateTax(amount) {
  return amount * 0.2;
}
\`\`\`

## Code Organization

### 1. Use Consistent Formatting
- Consistent indentation
- Meaningful whitespace
- Logical grouping of related code

### 2. Comment Why, Not What
**Bad:**
\`\`\`javascript
// Increment i by 1
i++;
\`\`\`

**Good:**
\`\`\`javascript
// Retry failed requests up to 3 times
for (let attempt = 0; attempt < 3; attempt++) {
  // Implementation
}
\`\`\`

### 3. Handle Errors Gracefully
\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const user = await userService.getUser(userId);
    return user;
  } catch (error) {
    logger.error(\`Failed to fetch user \${userId}\`, error);
    throw new UserNotFoundError(\`User \${userId} not found\`);
  }
}
\`\`\`

## Testing and Refactoring

### Write Tests First
\`\`\`javascript
describe('calculateTax', () => {
  it('should calculate 20% tax on given amount', () => {
    expect(calculateTax(1000)).toBe(200);
  });
  
  it('should handle zero amount', () => {
    expect(calculateTax(0)).toBe(0);
  });
});
\`\`\`

### Refactor Regularly
- Remove dead code
- Simplify complex expressions
- Extract common functionality
- Improve naming

## Conclusion

Clean code is not just about following rules—it's about crafting code that tells a story, is easy to understand, and can be maintained by any developer on your team. Start applying these principles today, and watch your code quality improve dramatically.`,
        published: true,
        views: 3150,
        categoryId: categories[3].id,
      },
    }),
    
    // Mobile Development posts
    prisma.post.create({
      data: {
        title: 'Flutter vs React Native: Cross-platform Development Comparison',
        slug: 'flutter-vs-react-native',
        description: 'Comprehensive comparison of Flutter and React Native for cross-platform mobile development.',
        content: `# Flutter vs React Native: Cross-platform Development Comparison

Both Flutter and React Native offer compelling solutions for cross-platform mobile development. This in-depth analysis helps you decide which framework is best for your next project.

## Flutter: Google's UI Toolkit

Flutter uses Dart programming language and provides a rich set of widgets for building native interfaces.

### Pros:
- **Single Codebase**: Write once, run on iOS and Android
- **Fast Development**: Hot reload for quick iterations
- **Native Performance**: Compiled to native ARM code
- **Rich Widgets**: Extensive widget library
- **Growing Ecosystem**: Backed by Google

### Cons:
- **Learning Curve**: Dart is less familiar than JavaScript
- **App Size**: Flutter apps tend to be larger
- **Platform-specific Features**: May require native code for some features

### Flutter Example:
\`\`\`dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Hello Flutter'),
        ),
        body: Center(
          child: Text('Hello, World!'),
        ),
      ),
    );
  }
}
\`\`\`

## React Native: Facebook's Solution

React Native allows you to build mobile apps using React and JavaScript.

### Pros:
- **JavaScript/React**: Familiar to web developers
- **Code Reuse**: Share code between web and mobile
- **Hot Reloading**: Fast development cycle
- **Native Components**: Access to native UI components
- **Large Community**: Extensive third-party libraries

### Cons:
- **Bridge Overhead**: Communication between JS and native code
- **Platform Differences**: iOS and Android may behave differently
- **Debugging**: Can be challenging for complex issues

### React Native Example:
\`\`\`javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
\`\`\`

## Performance Comparison

### Flutter Performance
- Compiled to native ARM code
- No bridge between UI and native code
- Consistent 60fps animations

### React Native Performance
- JavaScript bridge can cause bottlenecks
- Native components provide good performance
- Performance varies by device and complexity

## When to Choose What?

### Choose Flutter if:
- You want consistent UI across platforms
- Performance is critical
- You're building a graphics-heavy app
- Your team is open to learning Dart

### Choose React Native if:
- You have React/JavaScript expertise
- You want to share code with web applications
- You need extensive third-party integrations
- You prefer a more mature ecosystem

## Conclusion

Both frameworks are excellent choices for cross-platform development. Flutter excels in performance and UI consistency, while React Native offers familiarity and code sharing with web applications. Consider your team's expertise, project requirements, and long-term maintenance when making your decision.`,
        published: true,
        views: 1547,
        categoryId: categories[4].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Your First iOS App with Swift',
        slug: 'first-ios-app-swift',
        description: 'Step-by-step guide to creating your first iOS application using Swift and SwiftUI.',
        content: `# Building Your First iOS App with Swift

Follow this step-by-step tutorial to create your first iOS application using Swift and SwiftUI, covering essential concepts and best practices for iOS development.

## Setting Up Your Development Environment

### Prerequisites:
1. **Mac Computer**: Required for iOS development
2. **Xcode**: Download from Mac App Store
3. **Apple Developer Account**: Free for testing, paid for App Store

### Creating a New Project:
1. Open Xcode
2. Select "Create a new Xcode project"
3. Choose "iOS" → "App"
4. Fill in project details:
   - Product Name: "MyFirstApp"
   - Interface: SwiftUI
   - Language: Swift

## Understanding SwiftUI Basics

### Your First View:
\`\`\`swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, World!")
                .font(.largeTitle)
                .foregroundColor(.blue)
            
            Button("Tap Me!") {
                print("Button tapped!")
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
\`\`\`

## Building a Todo App

Let's create a simple todo application to learn key concepts:

### 1. Create the Data Model:
\`\`\`swift
struct TodoItem: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool = false
}
\`\`\`

### 2. Create the Main View:
\`\`\`swift
struct TodoListView: View {
    @State private var todos: [TodoItem] = []
    @State private var newTodoTitle = ""
    
    var body: some View {
        NavigationView {
            VStack {
                HStack {
                    TextField("Enter new todo", text: $newTodoTitle)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    Button("Add") {
                        addTodo()
                    }
                    .disabled(newTodoTitle.isEmpty)
                }
                .padding()
                
                List {
                    ForEach(todos) { todo in
                        TodoRowView(todo: todo) {
                            toggleTodo(todo)
                        }
                    }
                    .onDelete(perform: deleteTodos)
                }
            }
            .navigationTitle("My Todos")
        }
    }
    
    private func addTodo() {
        let newTodo = TodoItem(title: newTodoTitle)
        todos.append(newTodo)
        newTodoTitle = ""
    }
    
    private func toggleTodo(_ todo: TodoItem) {
        if let index = todos.firstIndex(where: { $0.id == todo.id }) {
            todos[index].isCompleted.toggle()
        }
    }
    
    private func deleteTodos(at offsets: IndexSet) {
        todos.remove(atOffsets: offsets)
    }
}
\`\`\`

### 3. Create the Row View:
\`\`\`swift
struct TodoRowView: View {
    let todo: TodoItem
    let onToggle: () -> Void
    
    var body: some View {
        HStack {
            Button(action: onToggle) {
                Image(systemName: todo.isCompleted ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(todo.isCompleted ? .green : .gray)
            }
            
            Text(todo.title)
                .strikethrough(todo.isCompleted)
                .foregroundColor(todo.isCompleted ? .gray : .primary)
            
            Spacer()
        }
        .padding(.vertical, 4)
    }
}
\`\`\`

## Key SwiftUI Concepts

### 1. State Management:
- \`@State\`: For local view state
- \`@Binding\`: For two-way data binding
- \`@ObservedObject\`: For external objects
- \`@EnvironmentObject\`: For app-wide state

### 2. Layout Containers:
- \`VStack\`: Vertical stack
- \`HStack\`: Horizontal stack
- \`ZStack\`: Overlapping stack
- \`LazyVGrid\`: Grid layout

### 3. Modifiers:
Chain modifiers to customize views:
\`\`\`swift
Text("Hello")
    .font(.title)
    .foregroundColor(.blue)
    .padding()
    .background(Color.yellow)
    .cornerRadius(10)
\`\`\`

## Testing Your App

### Using the Simulator:
1. Select a simulator device in Xcode
2. Press Cmd+R to build and run
3. Test your app's functionality

### On a Physical Device:
1. Connect your iPhone/iPad
2. Select your device in Xcode
3. You may need to trust the developer certificate

## Next Steps

1. **Learn More SwiftUI**: Explore animations, navigation, and advanced layouts
2. **Core Data**: Add persistent data storage
3. **Networking**: Connect to APIs and web services
4. **App Store**: Prepare your app for submission
5. **Testing**: Write unit tests and UI tests

## Best Practices

- Keep views small and focused
- Use meaningful variable names
- Separate business logic from UI
- Test on multiple devices and iOS versions
- Follow Apple's Human Interface Guidelines

Congratulations! You've built your first iOS app with Swift and SwiftUI. Continue practicing and exploring the rich iOS development ecosystem.`,
        published: true,
        views: 982,
        categoryId: categories[4].id,
      },
    }),
  ])

  console.log(`Created ${posts.length} posts`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 