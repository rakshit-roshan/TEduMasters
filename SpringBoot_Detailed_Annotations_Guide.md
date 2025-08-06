# 🎯 Complete Spring Boot Annotations Guide
## Detailed Explanation for Beginners

---

## 📚 Best Documentation Links

### Official Spring Documentation
- **Spring Boot Official Guide**: https://spring.io/guides
- **Spring Framework Reference**: https://docs.spring.io/spring-framework/reference/
- **Spring Security Reference**: https://docs.spring.io/spring-security/reference/
- **Spring Data JPA Reference**: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/

### Learning Resources
- **Baeldung Spring Tutorials**: https://www.baeldung.com/spring-tutorials
- **Spring Boot Tutorial**: https://www.baeldung.com/spring-boot
- **Spring Security Tutorial**: https://www.baeldung.com/spring-security-tutorial
- **Spring Data JPA Tutorial**: https://www.baeldung.com/spring-data-jpa-tutorial

### Video Tutorials
- **Spring Boot Full Course**: https://www.youtube.com/watch?v=9SGDpanrc8U
- **Spring Security Course**: https://www.youtube.com/watch?v=her_7pa0vrg
- **Spring Data JPA Course**: https://www.youtube.com/watch?v=8SGI_XS9OP0

### Practice Resources
- **Spring Initializr**: https://start.spring.io/
- **Spring Boot Examples**: https://github.com/spring-projects/spring-boot/tree/main/spring-boot-samples
- **Spring Guides**: https://spring.io/guides

---

## 🏗️ Application-Level Annotations

### @SpringBootApplication
**What it does:** This is the MAIN annotation that tells Spring "This is a Spring Boot application"

**When to use:** ONLY on your main application class (the class with the `main` method)

**Why it's important:** Without this, Spring Boot won't know this is a Spring Boot application

**Example:**
```java
package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // ← This tells Spring "Start the Spring Boot application"
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

**What happens behind the scenes:**
- Spring scans for other components in the same package
- Sets up auto-configuration
- Starts the embedded web server
- Loads application.properties

**Think of it like:** The "ON" button for your entire Spring Boot application

---

### @Configuration
**What it does:** Tells Spring "This class contains configuration settings"

**When to use:** When you want to create custom configuration classes (like SecurityConfig, DatabaseConfig, etc.)

**Why it's important:** Spring needs to know which classes contain configuration settings

**Example:**
```java
package com.example.myapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

@Configuration  // ← This tells Spring "This class has configuration settings"
public class SecurityConfig {
    
    @Bean  // ← This creates a bean (we'll explain @Bean below)
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**What happens behind the scenes:**
- Spring treats this class specially
- It can contain @Bean methods
- Spring will call the methods to create objects

**Think of it like:** A recipe book that tells Spring how to create things

---

### @EnableWebSecurity
**What it does:** Enables Spring Security features in your application

**When to use:** On your SecurityConfig class when you want to add authentication and authorization

**Why it's important:** Without this, Spring Security won't work

**Example:**
```java
package com.example.myapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity  // ← This enables Spring Security features
public class SecurityConfig {
    // Security configuration methods go here
}
```

**What happens behind the scenes:**
- Enables security filters
- Sets up authentication mechanisms
- Configures authorization rules

**Think of it like:** Turning on the security system for your house

---

## 🏢 Layer Annotations (Architecture)

### @Controller
**What it does:** Tells Spring "This class handles web requests and returns HTML pages"

**When to use:** When you're building a traditional web application that returns HTML pages (like a website)

**Why it's important:** Spring needs to know this class should handle web requests

**Example:**
```java
package com.example.myapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller  // ← This tells Spring "This class handles web requests"
public class HomeController {
    
    @GetMapping("/home")  // ← This handles GET requests to /home
    public String homePage(Model model) {
        model.addAttribute("message", "Welcome to our website!");
        return "home";  // ← Returns the name of an HTML template
    }
}
```

**What happens behind the scenes:**
- Spring creates an instance of this class
- Maps web requests to methods
- Handles the request/response cycle

**Think of it like:** A receptionist who handles visitors and shows them to the right room

---

### @RestController
**What it does:** Tells Spring "This class handles web requests and returns JSON data (for APIs)"

**When to use:** When you're building a REST API that returns JSON data (like for mobile apps or frontend applications)

**Why it's important:** This is the most common annotation for modern web applications

**Example:**
```java
package com.example.myapp.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

@RestController  // ← This tells Spring "This class handles API requests"
public class UserController {
    
    @GetMapping("/api/users")  // ← This handles GET requests to /api/users
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);  // ← Returns JSON data
    }
}
```

**What happens behind the scenes:**
- Spring automatically converts return values to JSON
- Handles HTTP status codes
- Manages request/response headers

**Think of it like:** A waiter who takes orders and brings back food (data)

---

### @Service
**What it does:** Tells Spring "This class contains business logic"

**When to use:** For classes that contain business rules, calculations, and application logic

**Why it's important:** Separates business logic from controllers and data access

**Example:**
```java
package com.example.myapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service  // ← This tells Spring "This class contains business logic"
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User createUser(User user) {
        // Business logic: validate user data
        if (user.getUsername().length() < 3) {
            throw new RuntimeException("Username must be at least 3 characters");
        }
        
        // Business logic: check if user already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Business logic: encrypt password
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        
        // Save to database
        return userRepository.save(user);
    }
}
```

**What happens behind the scenes:**
- Spring creates an instance of this class
- Other classes can inject (use) this service
- Handles business rules and logic

**Think of it like:** A manager who makes business decisions and coordinates work

---

### @Repository
**What it does:** Tells Spring "This class handles database operations"

**When to use:** For classes that interact with the database (save, find, delete data)

**Why it's important:** Separates data access logic from business logic

**Example:**
```java
package com.example.myapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository  // ← This tells Spring "This class handles database operations"
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Spring Data JPA automatically creates these methods:
    // save(), findById(), findAll(), delete(), etc.
    
    // Custom methods (Spring creates the implementation automatically)
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
}
```

**What happens behind the scenes:**
- Spring creates an implementation of this interface
- Handles database connections
- Manages SQL queries automatically

**Think of it like:** A librarian who knows how to find and store books in the library

---

### @Component
**What it does:** Tells Spring "This is a general-purpose class that you should manage"

**When to use:** For utility classes, helper classes, or any class that doesn't fit the other categories

**Why it's important:** Spring needs to know about all classes it should manage

**Example:**
```java
package com.example.myapp.util;

import org.springframework.stereotype.Component;

@Component  // ← This tells Spring "Manage this class"
public class EmailValidator {
    
    public boolean isValidEmail(String email) {
        // Email validation logic
        return email.contains("@") && email.contains(".");
    }
}
```

**What happens behind the scenes:**
- Spring creates an instance of this class
- Other classes can inject and use this component

**Think of it like:** A general worker who can do various tasks

---

## 🔧 Dependency Injection Annotations

### @Autowired
**What it does:** Tells Spring "Please give me an instance of this class"

**When to use:** When you want to use another class in your current class

**Why it's important:** This is how classes communicate with each other in Spring

**Example:**
```java
package com.example.myapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {
    
    @Autowired  // ← This tells Spring "Give me a UserRepository instance"
    private UserRepository userRepository;
    
    @Autowired  // ← This tells Spring "Give me a PasswordEncoder instance"
    private PasswordEncoder passwordEncoder;
    
    public User createUser(User user) {
        // Now I can use userRepository and passwordEncoder
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }
}
```

**What happens behind the scenes:**
- Spring looks for a UserRepository instance
- Spring looks for a PasswordEncoder instance
- Spring gives you those instances automatically

**Think of it like:** Asking a friend "Can you give me your calculator?" - they hand it to you

---

### @Bean
**What it does:** Tells Spring "Create this object and manage it for me"

**When to use:** In @Configuration classes when you want to create custom objects

**Why it's important:** Spring needs to know how to create objects that aren't your own classes

**Example:**
```java
package com.example.myapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {
    
    @Bean  // ← This tells Spring "Create a BCryptPasswordEncoder and manage it"
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**What happens behind the scenes:**
- Spring calls this method
- Spring stores the returned object
- Other classes can ask for this object using @Autowired

**Think of it like:** Giving Spring a recipe to create something - "Here's how to make a password encoder"

**More Examples:**
```java
@Configuration
public class DatabaseConfig {
    
    @Bean
    public DataSource dataSource() {
        // Create and configure database connection
        return new HikariDataSource();
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        // Create JSON converter
        return new ObjectMapper();
    }
}
```

---

### @Value
**What it does:** Injects values from application.properties file

**When to use:** When you want to use configuration values in your code

**Why it's important:** Keeps configuration separate from code

**Example:**
```java
package com.example.myapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {
    
    @Value("${app.email.from}")  // ← Gets value from application.properties
    private String fromEmail;
    
    @Value("${app.email.subject}")  // ← Gets value from application.properties
    private String defaultSubject;
    
    @Value("${server.port:8080}")  // ← Default value if not found
    private int serverPort;
    
    public void sendEmail(String to, String message) {
        System.out.println("Sending email from: " + fromEmail);
        System.out.println("Subject: " + defaultSubject);
        System.out.println("Server port: " + serverPort);
    }
}
```

**application.properties:**
```properties
app.email.from=noreply@myapp.com
app.email.subject=Welcome to our app
server.port=8080
```

**What happens behind the scenes:**
- Spring reads the application.properties file
- Spring finds the values and injects them into your variables

**Think of it like:** Reading settings from a configuration file

---

## 🌐 Request Mapping Annotations

### @RequestMapping
**What it does:** Defines the base URL for all methods in a controller

**When to use:** At the class level to set a common URL prefix

**Why it's important:** Keeps your URLs organized and consistent

**Example:**
```java
package com.example.myapp.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/users")  // ← All methods in this class start with /api/users
public class UserController {
    
    @GetMapping  // ← This becomes /api/users
    public List<User> getAllUsers() { }
    
    @GetMapping("/{id}")  // ← This becomes /api/users/{id}
    public User getUserById(@PathVariable Long id) { }
    
    @PostMapping  // ← This becomes /api/users
    public User createUser(@RequestBody User user) { }
}
```

**What happens behind the scenes:**
- Spring combines the class-level @RequestMapping with method-level mappings
- Creates the full URL path

**Think of it like:** Setting a folder path - everything goes inside that folder

---

### @GetMapping
**What it does:** Handles HTTP GET requests (for reading data)

**When to use:** When you want to retrieve data from the server

**Why it's important:** GET requests are for reading, not changing data

**Example:**
```java
@GetMapping("/users")  // ← Handles GET /users
public List<User> getAllUsers() {
    return userService.findAll();
}

@GetMapping("/users/{id}")  // ← Handles GET /users/123
public User getUserById(@PathVariable Long id) {
    return userService.findById(id);
}

@GetMapping("/users/search")  // ← Handles GET /users/search?name=john
public List<User> searchUsers(@RequestParam String name) {
    return userService.findByName(name);
}
```

**What happens behind the scenes:**
- Spring maps HTTP GET requests to these methods
- Automatically converts return values to JSON
- Handles URL parameters

**Think of it like:** Reading a book - you're getting information, not changing anything

---

### @PostMapping
**What it does:** Handles HTTP POST requests (for creating new data)

**When to use:** When you want to create new resources

**Why it's important:** POST requests are for creating, not reading

**Example:**
```java
@PostMapping("/users")  // ← Handles POST /users
public ResponseEntity<User> createUser(@RequestBody User user) {
    User createdUser = userService.createUser(user);
    return ResponseEntity.status(201).body(createdUser);
}

@PostMapping("/users/login")  // ← Handles POST /users/login
public ResponseEntity<?> login(@RequestParam String username, 
                              @RequestParam String password) {
    if (userService.authenticate(username, password)) {
        return ResponseEntity.ok("Login successful");
    } else {
        return ResponseEntity.status(401).body("Login failed");
    }
}
```

**What happens behind the scenes:**
- Spring receives the HTTP POST request
- Converts JSON body to Java object
- Calls your method
- Converts return value back to JSON

**Think of it like:** Filling out a form and submitting it - you're creating something new

---

### @PutMapping
**What it does:** Handles HTTP PUT requests (for updating existing data)

**When to use:** When you want to update existing resources

**Why it's important:** PUT is for updating, not creating

**Example:**
```java
@PutMapping("/users/{id}")  // ← Handles PUT /users/123
public ResponseEntity<User> updateUser(@PathVariable Long id, 
                                      @RequestBody User userDetails) {
    User updatedUser = userService.updateUser(id, userDetails);
    return ResponseEntity.ok(updatedUser);
}
```

**What happens behind the scenes:**
- Spring receives the HTTP PUT request
- Updates the existing resource
- Returns the updated data

**Think of it like:** Editing a document - you're changing something that already exists

---

### @DeleteMapping
**What it does:** Handles HTTP DELETE requests (for removing data)

**When to use:** When you want to delete resources

**Why it's important:** DELETE is for removing, not reading or creating

**Example:**
```java
@DeleteMapping("/users/{id}")  // ← Handles DELETE /users/123
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
}
```

**What happens behind the scenes:**
- Spring receives the HTTP DELETE request
- Removes the resource
- Returns no content (204 status)

**Think of it like:** Throwing something away - you're removing it completely

---

## 📝 Request Parameter Annotations

### @PathVariable
**What it does:** Gets values from the URL path

**When to use:** When you have dynamic values in your URL

**Why it's important:** Allows you to handle different IDs, names, etc.

**Example:**
```java
@GetMapping("/users/{id}")  // ← {id} is a path variable
public User getUserById(@PathVariable Long id) {
    return userService.findById(id);
}

@GetMapping("/users/{id}/orders/{orderId}")  // ← Multiple path variables
public Order getUserOrder(@PathVariable Long id, 
                         @PathVariable Long orderId) {
    return orderService.findUserOrder(id, orderId);
}

@GetMapping("/users/{id}")
public User getUserById(@PathVariable("id") Long userId) {  // ← Explicit name
    return userService.findById(userId);
}
```

**What happens behind the scenes:**
- Spring extracts the value from the URL
- Converts it to the specified type (Long, String, etc.)
- Passes it to your method

**Think of it like:** Reading a house number from an address - "123 Main Street" → 123

---

### @RequestParam
**What it does:** Gets values from query parameters (?name=value)

**When to use:** When you have optional parameters or search criteria

**Why it's important:** Allows flexible parameter passing

**Example:**
```java
@GetMapping("/users/search")  // ← Handles /users/search?name=john&age=25
public List<User> searchUsers(@RequestParam String name,
                              @RequestParam(required = false) Integer age) {
    return userService.searchUsers(name, age);
}

@GetMapping("/users")
public List<User> getUsers(@RequestParam(defaultValue = "0") int page,
                           @RequestParam(defaultValue = "10") int size) {
    return userService.getUsers(page, size);
}

@GetMapping("/users")
public List<User> getUsers(@RequestParam(value = "user_name", required = false) String name) {
    // Parameter name is different from variable name
    return userService.findByName(name);
}
```

**What happens behind the scenes:**
- Spring reads the query parameters from the URL
- Converts them to the specified types
- Passes them to your method

**Think of it like:** Reading form fields - "Name: John, Age: 25"

---

### @RequestBody
**What it does:** Gets data from the HTTP request body (usually JSON)

**When to use:** When you're receiving complex data from the client

**Why it's important:** Allows you to receive structured data

**Example:**
```java
@PostMapping("/users")
public User createUser(@RequestBody User user) {
    // user object contains all the data from the JSON body
    return userService.createUser(user);
}

@PostMapping("/users")
public User createUser(@RequestBody @Valid User user) {  // ← @Valid for validation
    return userService.createUser(user);
}
```

**JSON Request Body:**
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "age": 25
}
```

**What happens behind the scenes:**
- Spring reads the JSON from the request body
- Converts it to a Java object
- Passes it to your method

**Think of it like:** Receiving a package with all the details inside

---

### @RequestHeader
**What it does:** Gets values from HTTP headers

**When to use:** When you need authentication tokens, content type, etc.

**Why it's important:** Headers contain metadata about the request

**Example:**
```java
@GetMapping("/users/profile")
public User getProfile(@RequestHeader("Authorization") String token) {
    return userService.getProfileFromToken(token);
}

@GetMapping("/users")
public List<User> getUsers(@RequestHeader(value = "Accept-Language", 
                                        defaultValue = "en") String language) {
    return userService.getUsers(language);
}
```

**What happens behind the scenes:**
- Spring reads the HTTP headers
- Extracts the specified header value
- Passes it to your method

**Think of it like:** Reading the envelope information on a letter

---

## 🗄️ Database Annotations (JPA)

### @Entity
**What it does:** Tells JPA "This class represents a database table"

**When to use:** On classes that you want to store in the database

**Why it's important:** JPA needs to know which classes to map to database tables

**Example:**
```java
package com.example.myapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity  // ← This tells JPA "This class is a database table"
@Table(name = "users")  // ← Optional: specify table name
public class User {
    // Fields will become database columns
    private Long id;
    private String username;
    private String email;
}
```

**What happens behind the scenes:**
- JPA creates a database table based on this class
- Maps class fields to table columns
- Handles database operations automatically

**Think of it like:** Telling the database "This is a blueprint for a table"

---

### @Table
**What it does:** Specifies the database table name

**When to use:** When you want a different table name than the class name

**Why it's important:** Controls how your data is stored in the database

**Example:**
```java
@Entity
@Table(name = "user_accounts")  // ← Table will be named "user_accounts"
public class User {
    // Fields here
}

@Entity
@Table(name = "users", schema = "public")  // ← Specify schema too
public class User {
    // Fields here
}
```

**What happens behind the scenes:**
- JPA creates a table with the specified name
- All database operations use this table name

**Think of it like:** Naming a file - "user_accounts.txt" instead of "User.txt"

---

### @Id
**What it does:** Marks a field as the primary key

**When to use:** On the field that uniquely identifies each record

**Why it's important:** Every database table needs a primary key

**Example:**
```java
@Entity
public class User {
    
    @Id  // ← This field is the primary key
    private Long id;
    
    private String username;
    private String email;
}
```

**What happens behind the scenes:**
- JPA marks this column as the primary key
- Database enforces uniqueness
- Used for finding and updating records

**Think of it like:** A social security number - unique identifier for each person

---

### @GeneratedValue
**What it does:** Tells JPA how to generate values for the primary key

**When to use:** On @Id fields when you want automatic ID generation

**Why it's important:** You don't want to manually set IDs

**Example:**
```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ← Auto-increment
    private Long id;
    
    private String username;
}

// Other strategies:
@GeneratedValue(strategy = GenerationType.AUTO)      // ← Let JPA decide
@GeneratedValue(strategy = GenerationType.SEQUENCE)  // ← Use database sequence
@GeneratedValue(strategy = GenerationType.TABLE)     // ← Use separate table
```

**What happens behind the scenes:**
- Database automatically generates unique IDs
- Each new record gets the next available ID

**Think of it like:** Automatic numbering - 1, 2, 3, 4...

---

### @Column
**What it does:** Configures how a field is stored in the database

**When to use:** When you want to customize column properties

**Why it's important:** Controls data integrity and storage

**Example:**
```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)  // ← Not null, unique, max 50 chars
    private String username;
    
    @Column(nullable = false, unique = true)  // ← Not null, unique
    private String email;
    
    @Column(length = 100)  // ← Max 100 characters
    private String fullName;
    
    @Column(name = "password_hash")  // ← Different column name
    private String passwordHash;
    
    @Column(columnDefinition = "TEXT")  // ← Custom column type
    private String bio;
}
```

**What happens behind the scenes:**
- JPA creates columns with the specified properties
- Database enforces the constraints

**Think of it like:** Setting up form fields with specific rules

---

### @OneToMany
**What it does:** Defines a one-to-many relationship

**When to use:** When one entity has many related entities

**Why it's important:** Establishes relationships between tables

**Example:**
```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)  // ← One user has many orders
    private List<Order> orders = new ArrayList<>();
}

@Entity
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne  // ← Many orders belong to one user
    @JoinColumn(name = "user_id")
    private User user;
}
```

**What happens behind the scenes:**
- JPA creates foreign key relationships
- Handles loading related data automatically

**Think of it like:** A customer (User) who has many orders (Order)

---

### @ManyToOne
**What it does:** Defines a many-to-one relationship

**When to use:** When many entities belong to one entity

**Why it's important:** Establishes relationships between tables

**Example:**
```java
@Entity
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne  // ← Many orders belong to one user
    @JoinColumn(name = "user_id")  // ← Foreign key column
    private User user;
    
    private BigDecimal amount;
}
```

**What happens behind the scenes:**
- JPA creates a foreign key column
- Links to the parent table

**Think of it like:** Many students (Order) belong to one class (User)

---

## ✅ Validation Annotations

### @NotNull
**What it does:** Ensures a field is not null

**When to use:** When a field is required

**Why it's important:** Prevents null pointer exceptions

**Example:**
```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Username is required")  // ← Must not be null
    private String username;
    
    @NotNull(message = "Email is required")
    private String email;
}
```

**What happens behind the scenes:**
- Validation framework checks if the field is null
- Throws exception if validation fails

**Think of it like:** Making a field required on a form

---

### @Size
**What it does:** Validates string length

**When to use:** When you want to limit text length

**Why it's important:** Prevents overly long data

**Example:**
```java
@Entity
public class User {
    
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;
    
    @Size(max = 100, message = "Full name cannot exceed 100 characters")
    private String fullName;
}
```

**What happens behind the scenes:**
- Validation framework checks string length
- Throws exception if too short or too long

**Think of it like:** Setting character limits on a form

---

### @Email
**What it does:** Validates email format

**When to use:** When you want to ensure valid email addresses

**Why it's important:** Prevents invalid email data

**Example:**
```java
@Entity
public class User {
    
    @Email(message = "Please provide a valid email address")
    private String email;
}
```

**What happens behind the scenes:**
- Validation framework checks email format
- Ensures it contains @ and proper structure

**Think of it like:** Email validation on a registration form

---

### @Min and @Max
**What it does:** Validates numeric ranges

**When to use:** When you want to limit number values

**Why it's important:** Prevents invalid numeric data

**Example:**
```java
@Entity
public class User {
    
    @Min(value = 18, message = "User must be at least 18 years old")
    private Integer age;
    
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;
    
    @Min(value = 0)
    @Max(value = 100)
    private Integer score;
}
```

**What happens behind the scenes:**
- Validation framework checks numeric values
- Ensures they're within the specified range

**Think of it like:** Setting minimum and maximum values on a form

---

### @Valid
**What it does:** Triggers validation on an object

**When to use:** When you want to validate an entire object

**Why it's important:** Ensures all validation rules are checked

**Example:**
```java
@PostMapping("/users")
public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    // @Valid triggers validation on the User object
    return userService.createUser(user);
}
```

**What happens behind the scenes:**
- Validation framework checks all validation annotations
- Throws exception if any validation fails

**Think of it like:** Checking all form fields before submitting

---

## 🔐 Security Annotations

### @PreAuthorize
**What it does:** Checks permissions before allowing method execution

**When to use:** When you want method-level security

**Why it's important:** Controls access to sensitive operations

**Example:**
```java
@Service
public class UserService {
    
    @PreAuthorize("hasRole('ADMIN')")  // ← Only admins can call this method
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")  // ← Users or admins
    public User getUserProfile(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @PreAuthorize("#user.id == authentication.principal.id")  // ← Only own profile
    public void updateProfile(User user) {
        userRepository.save(user);
    }
}
```

**What happens behind the scenes:**
- Spring Security checks user permissions
- Only allows execution if conditions are met
- Throws exception if access denied

**Think of it like:** Checking ID at a secure building entrance

---

### @Secured
**What it does:** Simple role-based security

**When to use:** For basic role checking

**Why it's important:** Simple way to restrict access

**Example:**
```java
@Service
public class UserService {
    
    @Secured("ROLE_ADMIN")  // ← Only users with ROLE_ADMIN can access
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    @Secured({"ROLE_USER", "ROLE_ADMIN"})  // ← Multiple roles allowed
    public User getUserProfile(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

**What happens behind the scenes:**
- Spring Security checks user roles
- Compares with required roles
- Allows or denies access

**Think of it like:** Checking if someone has the right badge

---

## 🎯 When to Use Each Annotation - Decision Tree

### For Classes:
```
Is this the main application class?
├─ Yes → Use @SpringBootApplication
└─ No → Is this a configuration class?
    ├─ Yes → Use @Configuration
    └─ No → What type of class is this?
        ├─ Handles web requests → Use @Controller or @RestController
        ├─ Contains business logic → Use @Service
        ├─ Handles database operations → Use @Repository
        └─ Other utility class → Use @Component
```

### For Methods:
```
What type of method is this?
├─ HTTP GET request → Use @GetMapping
├─ HTTP POST request → Use @PostMapping
├─ HTTP PUT request → Use @PutMapping
├─ HTTP DELETE request → Use @DeleteMapping
├─ Creates a Spring-managed object → Use @Bean
└─ Other method → No annotation needed
```

### For Fields:
```
What type of field is this?
├─ Primary key → Use @Id
├─ Database column → Use @Column
├─ Foreign key → Use @ManyToOne or @OneToMany
├─ Injected dependency → Use @Autowired
├─ Configuration value → Use @Value
└─ Regular field → No annotation needed
```

---

## 💡 Pro Tips for Using Annotations

### 1. **Start Simple**
```java
// Start with basic annotations
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
```

### 2. **Add Complexity Gradually**
```java
// Add validation
@PostMapping
public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    return ResponseEntity.status(201).body(userService.createUser(user));
}

// Add security
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
}
```

### 3. **Use Meaningful Names**
```java
// Good
@GetMapping("/users/{id}")
public User getUserById(@PathVariable Long id) { }

// Bad
@GetMapping("/u/{i}")
public User getU(@PathVariable Long i) { }
```

### 4. **Group Related Annotations**
```java
// Group validation annotations
@NotNull
@Size(min = 3, max = 50)
@Column(nullable = false, unique = true)
private String username;
```

### 5. **Document Your Annotations**
```java
/**
 * Creates a new user in the system
 * @param user The user to create (must be valid)
 * @return The created user without sensitive data
 */
@PostMapping
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    // Implementation
}
```

---

## 🚨 Common Mistakes to Avoid

### 1. **Missing @SpringBootApplication**
```java
// ❌ Wrong - Spring won't know this is a Spring Boot app
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// ✅ Correct
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### 2. **Forgetting @Autowired**
```java
// ❌ Wrong - userService will be null
public class UserController {
    private UserService userService;  // Not injected!
}

// ✅ Correct
public class UserController {
    @Autowired
    private UserService userService;
}
```

### 3. **Wrong HTTP Method**
```java
// ❌ Wrong - Using GET to create data
@GetMapping("/users")
public User createUser(@RequestBody User user) { }

// ✅ Correct - Using POST to create data
@PostMapping("/users")
public User createUser(@RequestBody User user) { }
```

### 4. **Missing @Entity**
```java
// ❌ Wrong - JPA won't know this is a database table
public class User {
    private Long id;
    private String username;
}

// ✅ Correct
@Entity
public class User {
    @Id
    private Long id;
    private String username;
}
```

---

*This guide covers all the essential Spring Boot annotations with detailed explanations, examples, and best practices. Use it as your reference when building Spring Boot applications!* 🚀 