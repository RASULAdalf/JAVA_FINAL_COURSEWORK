package lk.ijse.cmjd95.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ItemReview {
    private String customerEmail;
    private int starCount;
    private String review;
}
