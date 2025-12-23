package lk.ijse.cmjd95.dto.query_interface;

import lk.ijse.cmjd95.entity.PaymentDetails;
import lk.ijse.cmjd95.entity.PayoutItem;

import java.util.Date;

public interface PayoutDataInterface {
    String getPayoutId();

    String getVendorEmail();

    PaymentDetails getPaymentDetails();

    double getAmount();

    Date getPayoutDate();

    String getPayoutStatus();

    PayoutItem[] getPayoutItems();


}
