package lk.ijse.cmjd95.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("Payout")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Payout {
    @Id
    private String payoutId;

    private String vendorEmail;
    private PaymentDetails paymentDetails;
    private double amount;
    private Date payoutDate;
    private String payoutStatus;
    private PayoutItem[] payoutItems;

}
