package lk.ijse.cmjd95.dto.response;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderResponseVendorDisplayDto extends OrderResponseDto {
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
