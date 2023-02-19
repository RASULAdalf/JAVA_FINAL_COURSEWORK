package lk.ijse.cmjd95.entity;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document("Item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Item {
    @Id
    private String itemCode;

    private String itemDescription;
    private String itemCategory;
    private String itemLogoUrl;
    private ArrayList<String> slideShowImageUrls;
    private double unitPrice;
    private int qtyOnHand;
    private String vendorEmail;
    private String specsDocUrl;
    private String specsDocContent;

}
