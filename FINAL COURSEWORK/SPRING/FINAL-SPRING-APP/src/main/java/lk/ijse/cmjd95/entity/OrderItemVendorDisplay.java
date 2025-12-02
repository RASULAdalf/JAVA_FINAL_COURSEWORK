package lk.ijse.cmjd95.entity;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderItemVendorDisplay {
    private String itemCode;
    private Date orderDate;
    private String itemDescription;
    private String itemCategory;
    private String itemLogoUrl;
    private int qty;
    private double itemFullPrice;
    private String customerEmail;
    private String state;

}

