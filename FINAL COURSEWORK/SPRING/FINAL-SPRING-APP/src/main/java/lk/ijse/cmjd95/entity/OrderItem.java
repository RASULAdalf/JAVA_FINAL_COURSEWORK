package lk.ijse.cmjd95.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderItem {
    private String itemCode;
    private String itemDescription;
    private String itemLogoUrl;
    private double unitPrice;
    private int qty;
    private double itemFullPrice;

}
