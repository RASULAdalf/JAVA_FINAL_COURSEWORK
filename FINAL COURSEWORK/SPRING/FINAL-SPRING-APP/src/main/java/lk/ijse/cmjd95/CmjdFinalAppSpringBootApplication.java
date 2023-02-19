package lk.ijse.cmjd95;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories

public class CmjdFinalAppSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(CmjdFinalAppSpringBootApplication.class, args);

    }
}
