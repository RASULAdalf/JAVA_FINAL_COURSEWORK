package lk.ijse.cmjd95.dto.paginate;

import lk.ijse.cmjd95.dto.response.OrderResponseDto;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaginatedOrderResponseDto {
    private List<OrderResponseDto> orders;
    private int dataCount;
}
