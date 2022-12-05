package org.findasnake.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    

    @RequestMapping("/API/V1/GetSnake")
    public String GetaSnake() {
        return  new Snake("🐍").toString()+ new Snake("🐸").toString();
    }
}
