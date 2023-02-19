package lk.ijse.cmjd95.dto.request;

import lk.ijse.cmjd95.entity.OrderItem;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class OrderRequestDto {
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
