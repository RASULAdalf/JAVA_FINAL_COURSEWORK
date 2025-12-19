package lk.ijse.cmjd95.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PaymentDetails {
    private String accountName;
    private String accountNumber;
    private String Bank;
    private String Branch;
}
