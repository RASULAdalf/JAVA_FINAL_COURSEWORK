package lk.ijse.cmjd95.dto.query_interface;

import java.util.ArrayList;

public interface ItemDataInterface {
    String getItemCode();

    String getItemDescription();

    String getItemCategory();

    String getItemLogoUrl();

    ArrayList<String> getSlideShowImageUrls();

    double getUnitPrice();

    int getQtyOnHand();

    String getVendorEmail();

    String getSpecsDocUrl();

    String getSpecsDocContent();
}
