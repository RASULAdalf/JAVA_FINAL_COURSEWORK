package lk.ijse.cmjd95.dto.response;

import lk.ijse.cmjd95.entity.ItemReview;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Data
@Getter
@Setter
public class ItemResponseDto {
    private String itemCode;
    private String itemDescription;
    private String itemCategory;
    private String itemLogoUrl;
    private ArrayList<String> slideShowImageUrls;
    private double unitPrice;
    private int qtyOnHand;
    private String vendorEmail;
    private String specsDocUrl;
    private ArrayList<ItemReview> reviews;
}
