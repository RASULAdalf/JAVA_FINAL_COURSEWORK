package lk.ijse.cmjd95.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("Order")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order {
    @Id
    private String orderId;
    private String customerEmail;
    private String customerName;
    private String customerAddress;
    private String customerPhoneNumber;
    private Date orderDate;
    private String orderDescription;
    private OrderItem[] orders;
    private Double totalPrice;
    private String paymentMethod;
    private String state;


}
