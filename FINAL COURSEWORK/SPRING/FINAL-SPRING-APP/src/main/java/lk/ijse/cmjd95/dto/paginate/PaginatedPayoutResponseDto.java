package lk.ijse.cmjd95.dto.paginate;

import lk.ijse.cmjd95.dto.response.PayoutResponseDto;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedPayoutResponseDto {
    private List<PayoutResponseDto> items;
    private int dataCount;

}
