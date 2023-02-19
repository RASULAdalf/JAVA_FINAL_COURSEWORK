package lk.ijse.cmjd95.dto.paginate;

import lk.ijse.cmjd95.dto.response.ItemResponseDto;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedItemResponseDto {
    private List<ItemResponseDto> items;
    private int dataCount;


}
