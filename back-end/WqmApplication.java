package com.wqm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// main entry point for the app
// runs the spring boot backend
@SpringBootApplication
public class WqmApplication {

```
public static void main(String[] args) {

    // starting the application
    // might add some config later if needed
    SpringApplication.run(WqmApplication.class, args);

    // just for checking if app started properly (can remove later)
    System.out.println("WQM backend started...");
}
```

}
