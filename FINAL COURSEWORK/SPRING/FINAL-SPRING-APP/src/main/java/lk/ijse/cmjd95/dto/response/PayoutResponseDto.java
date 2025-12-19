package lk.ijse.cmjd95.dto.response;

import lk.ijse.cmjd95.entity.PaymentDetails;
import lk.ijse.cmjd95.entity.PayoutItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter

public class PayoutResponseDto {
    private String payoutId;

    private String vendorEmail;
    private PaymentDetails paymentDetails;
    private double amount;
    private Date payoutDate;
    private String payoutStatus;
    private PayoutItem[] payoutItems;
}
