# 🚀 Spring Boot Cheat Sheet
## Quick Reference for Beginners

---

## 📝 Annotations Cheat Sheet

### Application Level
```java
@SpringBootApplication  // Main application class - tells Spring "This is a Spring Boot app"
@EnableWebSecurity     // Enable Spring Security - turns on authentication and authorization
@Configuration         // Configuration class - tells Spring "This class has settings"
@ComponentScan         // Scan for components - tells Spring "Look for other classes in this package"
```

### Layer Annotations
```java
@Controller           // Web controller - handles web requests and returns HTML pages
@RestController       // REST API controller - handles web requests and returns JSON data
@Service             // Business logic layer - contains business rules and calculations
@Repository          // Data access layer - handles database operations
@Component           // General Spring component - any class that Spring should manage
```

### Dependency Injection
```java
@Autowired           // Inject dependency - tells Spring "Give me an instance of this class"
@Qualifier           // Specify which bean to inject - when you have multiple beans of same type
@Value               // Inject property value - gets values from application.properties file
@Bean                // Create a bean - tells Spring "Create this object and manage it for me"
```

### Request Mapping
```java
@RequestMapping("/api/users")     // Base URL for controller - all methods start with this URL
@GetMapping("/{id}")              // GET request - for reading data
@PostMapping("/register")         // POST request - for creating new data
@PutMapping("/{id}")             // PUT request - for updating existing data
@DeleteMapping("/{id}")           // DELETE request - for removing data
@PatchMapping("/{id}")            // PATCH request - for partial updates
```

### Request Parameters
```java
@PathVariable Long id              // URL parameter - gets value from URL like /users/{id}
@RequestParam String name          // Query parameter - gets value from ?name=value
@RequestBody User user             // JSON body - gets data from request body
@RequestHeader String token        // HTTP header - gets value from request headers
```

### Database (JPA)
```java
@Entity                            // Database table - tells JPA "This class is a database table"
@Table(name = "users")            // Table name - specifies the database table name
@Id                               // Primary key - marks field as unique identifier
@GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment - automatically generates IDs
@Column(nullable = false)         // Not null column - field cannot be empty
@Column(unique = true)            // Unique column - field must be unique in database
@OneToMany                        // One-to-many relationship - one entity has many related entities
@ManyToOne                        // Many-to-one relationship - many entities belong to one entity
@JoinColumn                       // Foreign key column - links to another table
```

### Validation
```java
@NotNull                           // Field cannot be null - required field
@Size(min = 3, max = 50)         // String length - limits text length
@Email                            // Email format - ensures valid email address
@Min(18)                          // Minimum value - ensures number is at least 18
@Max(100)                         // Maximum value - ensures number is at most 100
@Valid                            // Validate object - triggers validation on entire object
```

### Security
```java
@PreAuthorize("hasRole('ADMIN')") // Method-level security - only admins can call this method
@Secured("ROLE_ADMIN")           // Method-level security - simple role checking
@EnableGlobalMethodSecurity       // Enable method security - turns on method-level security
```

---

## 🏗️ Project Structure Template

```
src/main/java/com/yourcompany/yourproject/
├── YourProjectApplication.java    # Main class - entry point of application
├── config/                       # Configuration classes - settings and beans
│   ├── SecurityConfig.java
│   └── CorsConfig.java
├── controller/                   # REST API endpoints - handles HTTP requests
│   ├── UserController.java
│   └── AuthController.java
├── service/                      # Business logic - business rules and calculations
│   ├── UserService.java
│   └── EmailService.java
├── repository/                   # Database operations - saves and retrieves data
│   ├── UserRepository.java
│   └── OrderRepository.java
├── model/                        # Database entities - represents database tables
│   ├── User.java
│   └── Order.java
├── dto/                          # Data Transfer Objects - for API requests/responses
│   ├── UserDto.java
│   └── LoginRequest.java
└── exception/                    # Custom exceptions - error handling
    ├── UserNotFoundException.java
    └── GlobalExceptionHandler.java
```

---

## 🔧 Common Code Patterns

### 1. Controller Pattern
```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 2. Service Pattern
```java
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }
    
    public User createUser(User user) {
        // Validate input
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Encrypt password
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        
        // Save user
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = findById(id);
        
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setFullName(userDetails.getFullName());
        
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }
}
```

### 3. Repository Pattern
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Built-in methods (no need to implement):
    // save(), findById(), findAll(), delete(), count(), etc.
    
    // Custom query methods
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    // Custom queries
    @Query("SELECT u FROM User u WHERE u.role = ?1")
    List<User> findByRole(String role);
    
    @Query("SELECT u FROM User u WHERE u.createdAt >= ?1")
    List<User> findUsersCreatedAfter(LocalDateTime date);
}
```

### 4. Entity Pattern
```java
@Data
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    @Column(nullable = false, unique = true)
    @Email
    private String email;
    
    @Column(nullable = false)
    private String passwordHash;
    
    @Column(length = 100)
    private String fullName;
    
    @Column(length = 20)
    private String role = "USER";
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column
    private LocalDateTime updatedAt;
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

### 5. Security Configuration Pattern
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

## 📋 Common HTTP Status Codes

```java
// Success Responses
ResponseEntity.ok(data)                    // 200 OK - Request successful
ResponseEntity.status(201).body(data)     // 201 Created - Resource created successfully
ResponseEntity.noContent().build()         // 204 No Content - Request successful, no data returned

// Client Error Responses
ResponseEntity.badRequest().body(error)    // 400 Bad Request - Invalid request data
ResponseEntity.status(401).body(error)     // 401 Unauthorized - Authentication required
ResponseEntity.status(403).body(error)     // 403 Forbidden - Access denied
ResponseEntity.notFound().build()          // 404 Not Found - Resource not found
ResponseEntity.status(409).body(error)     // 409 Conflict - Resource conflict

// Server Error Responses
ResponseEntity.status(500).body(error)     // 500 Internal Server Error - Server error
```

---

## 🔍 Common Error Messages & Solutions

### 1. "Bean Creation Failed"
```bash
# Error: Bean creation failed
# Solution: Add @Component, @Service, @Repository, or @Controller
@Service
public class UserService { }
```

### 2. "No Qualifying Bean"
```bash
# Error: No qualifying bean of type 'UserService'
# Solution: Add @Autowired or use constructor injection
@Autowired
private UserService userService;
```

### 3. "Port Already in Use"
```bash
# Error: Port 8080 is already in use
# Solution: Change port in application.properties
server.port=8081
```

### 4. "Database Connection Failed"
```bash
# Error: Could not connect to database
# Solution: Check database is running and credentials
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### 5. "CORS Error"
```bash
# Error: CORS policy blocked request
# Solution: Configure CORS in SecurityConfig
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    // CORS configuration
}
```

---

## 🚀 Quick Start Commands

### Build and Run
```bash
# Clean and build
mvn clean package

# Run application
mvn spring-boot:run

# Run JAR file
java -jar target/your-project-1.0.0.jar
```

### Database Commands
```sql
-- Create database
CREATE DATABASE your_database;

-- Connect to database
\c your_database

-- Show tables
\dt

-- Describe table
\d table_name
```

### Testing Commands
```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn jacoco:report
```

---

## 📚 Essential Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Web Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Database Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Security Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Validation Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- Test Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## 🎯 Best Practices Checklist

### Code Organization
- [ ] Use proper package structure
- [ ] Separate concerns (Controller, Service, Repository)
- [ ] Use meaningful class and method names
- [ ] Add proper documentation

### Security
- [ ] Always encrypt passwords
- [ ] Don't return sensitive data in responses
- [ ] Use HTTPS in production
- [ ] Implement proper authentication

### Error Handling
- [ ] Use try-catch blocks
- [ ] Return appropriate HTTP status codes
- [ ] Provide meaningful error messages
- [ ] Log errors properly

### Performance
- [ ] Use pagination for large datasets
- [ ] Implement caching where appropriate
- [ ] Optimize database queries
- [ ] Use connection pooling

### Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test error scenarios
- [ ] Use meaningful test names

---

## 💡 Pro Tips

1. **Use Constructor Injection** (better than @Autowired)
```java
@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

2. **Use @Slf4j for Logging**
```java
@Slf4j
@Service
public class UserService {
    public void createUser(User user) {
        log.info("Creating user: {}", user.getUsername());
        // Implementation
    }
}
```

3. **Use @Valid for Validation**
```java
@PostMapping
public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    // Implementation
}
```

4. **Use Optional for Null Safety**
```java
public User findById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
}
```

5. **Use Builder Pattern for Complex Objects**
```java
User user = User.builder()
    .username("john")
    .email("john@example.com")
    .fullName("John Doe")
    .build();
```

---

## 🎓 Learning Path

### Step 1: Basics
1. Learn @SpringBootApplication
2. Learn @Controller and @RestController
3. Learn @GetMapping and @PostMapping
4. Learn @Autowired

### Step 2: Database
1. Learn @Entity and @Table
2. Learn @Id and @GeneratedValue
3. Learn @Column
4. Learn @Repository

### Step 3: Business Logic
1. Learn @Service
2. Learn @Component
3. Learn @Bean
4. Learn @Configuration

### Step 4: Security
1. Learn @EnableWebSecurity
2. Learn @PreAuthorize
3. Learn @Secured
4. Learn security configuration

### Step 5: Advanced
1. Learn validation annotations
2. Learn relationship annotations
3. Learn custom annotations
4. Learn best practices

---

*Keep this cheat sheet handy while learning Spring Boot! It covers the most common patterns and annotations you'll use.* 🚀 