package com.atyanidan.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfiguration {
    @Bean
    public OpenAPI defineOpenApi() {
        Server server = new Server();
        server.setUrl("http://localhost:9003");
        server.setDescription("Development");

        /*Contact myContact = new Contact();
        myContact.setName("Jane Doe");
        myContact.setEmail("your.email@gmail.com");*/

        Info information = new Info()
                .title("Atya Nidan")
                .version("1.0")
                .description("Documentation providing list of APIs created for the application");

        return new OpenAPI().info(information).servers(List.of(server));
    }
}
